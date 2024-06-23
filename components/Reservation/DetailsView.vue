<script setup lang="ts">
const props = defineProps<{
  reservationId: string;
}>();

const reservationsStore = useReservationsStore();

const { data: reservation, status } = useAsyncData(props.reservationId, () => {
  return reservationsStore.findOne(props.reservationId);
});
</script>

<template>
  <MainLoader v-if="status === 'pending'" self-center />
  <template v-else-if="reservation">
    <h1 class="text-4xl font-bold text-slate-800">
      {{ reservation.name }}
    </h1>
    <ReservationDetailsActions :reservationId class="mt-4" />
    <ReservationDetailsForm :reservation class="mt-12" />
  </template>
</template>
