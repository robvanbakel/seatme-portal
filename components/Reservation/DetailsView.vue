<script setup lang="ts">
import type { Reservation } from "~/types";

const props = defineProps<{
  reservationId: string;
}>();

const client = useSupabaseClient();
const reservationsStore = useReservationsStore();

const cachedReservation = computed(() => {
  return reservationsStore.reservations?.find(({ id }) => {
    return id === props.reservationId;
  });
});

const { data: reservation, pending } = useAsyncData(
  props.reservationId,
  async () => {
    if (cachedReservation.value) return cachedReservation.value;

    const { data } = await client
      .from("reservation")
      .select()
      .eq("id", props.reservationId)
      .single<Reservation>();

    return data;
  },
);
</script>

<template>
  <MainLoader v-if="pending" self-center />
  <template v-else-if="reservation">
    <h1 class="text-4xl font-bold text-slate-800">
      {{ reservation.name }}
    </h1>
    <ReservationDetailsActions :reservationId class="mt-4" />
    <ReservationDetailsForm :reservation class="mt-12" />
  </template>
</template>
