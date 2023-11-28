import { defineStore } from "pinia";
import { ref } from "vue";
import type { Reservation } from "@/types/reservations";
import { fetchReservations } from "@/api/reservations";
import supabase from "@/lib/supabase";

export const useReservationsStore = defineStore("reservations", () => {
  const reservations = ref<Reservation[]>([]);
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;

    try {
      const { data, error } = await fetchReservations();

      if (error ?? !data) {
        throw new Error(error.message ?? "Could not fetch data");
      }

      reservations.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const subscription = supabase.channel("reservation").on<Reservation>(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "reservation",
    },
    async (payload) => {
      if (payload.eventType === "INSERT") {
        reservations.value.push(payload.new);
      }

      if (payload.eventType === "UPDATE") {
        const index = reservations.value.findIndex(
          (reservation) => reservation.id === payload.new.id
        );

        reservations.value[index] = payload.new;
      }

      if (payload.eventType === "DELETE") {
        const index = reservations.value.findIndex(
          (reservation) => reservation.id === payload.old.id
        );

        reservations.value.splice(index, 1);
      }
    }
  );

  const init = async () => {
    await fetchData();
    subscription.subscribe();
  };

  const exit = () => {
    subscription.unsubscribe();
  };

  return { reservations, loading, init, exit };
});
