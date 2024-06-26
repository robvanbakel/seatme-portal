import { defineStore } from "pinia";
import type { Reservation } from "@/types";

export const useReservationsStore = defineStore("reservations", () => {
  const client = useSupabaseClient();

  const { data: reservations } = useAsyncData("reservations", async () => {
    const { data } = await client
      .from("reservation")
      .select()
      .returns<Reservation[]>();

    return data;
  });

  const realtimeChannel = client.channel("reservation").on<Reservation>(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "reservation",
    },
    (payload) => {
      if (!reservations.value) return;

      if (payload.eventType === "INSERT") {
        reservations.value.push(payload.new);
      }

      if (payload.eventType === "UPDATE") {
        const index = reservations.value.findIndex(
          (reservation) => reservation.id === payload.new.id,
        );

        reservations.value[index] = payload.new;
      }

      if (payload.eventType === "DELETE") {
        const index = reservations.value.findIndex(
          (reservation) => reservation.id === payload.old.id,
        );

        reservations.value.splice(index, 1);
      }
    },
  );

  realtimeChannel.subscribe();

  const findOne = async (
    reservationId: string,
    options: Partial<{ disableCache: boolean }> = {},
  ) => {
    if (!options.disableCache) {
      const cachedReservation = reservations.value?.find(({ id }) => {
        return id === reservationId;
      });

      if (cachedReservation) return cachedReservation;
    }

    const { data } = await client
      .from("reservation")
      .select()
      .eq("id", reservationId)
      .single<Reservation>();

    return data;
  };

  return { reservations, findOne };
});
