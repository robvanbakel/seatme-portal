import { ref, onUnmounted } from "vue";
import type { ReservationIndex } from "@/types/reservations";
import { fetchReservations } from "@/api/reservations";
import supabase from "@/lib/supabase";

export const useReservations = () => {
  const reservations = ref<ReservationIndex[]>([]);
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;
    try {
      const { data, error } = await fetchReservations();
      if (!data || error) throw new Error("Could not fech data");
      reservations.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  const subscription = supabase
    .channel("reservation")
    .on<ReservationIndex>(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "reservation",
      },
      (payload) => {
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
    )
    .subscribe();

  onUnmounted(() => {
    subscription.unsubscribe();
  });

  return { reservations, loading };
};
