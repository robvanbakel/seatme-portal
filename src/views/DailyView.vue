<script setup lang="ts">
import { computed } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import MainButton from "@/components/MainButton.vue";
import ReservationIndexBlock from "@/components/reservations/ReservationIndexBlock.vue";
import { useReservationsStore } from "@/stores/reservations";
import ReservationIndexBlockSkeleton from "@/components/reservations/ReservationIndexBlockSkeleton.vue";

const reservationsStore = useReservationsStore();

const upcomingReservations = computed(() => {
  return reservationsStore.reservations
    .filter(({ checked_in_at }) => !checked_in_at)
    .sort(
      (a, b) =>
        new Date(a.arrival_time).valueOf() - new Date(b.arrival_time).valueOf()
    );
});

const checkedInReservations = computed(() => {
  return reservationsStore.reservations
    .filter(({ checked_in_at }) => !!checked_in_at)
    .sort(
      (a, b) =>
        new Date(b.arrival_time).valueOf() - new Date(a.arrival_time).valueOf()
    );
});
</script>

<template>
  <main-layout title="Today">
    <template #headerActions>
      <MainButton label="New reservation" :icon="PlusIcon" />
    </template>

    <div class="space-y-9">
      <div>
        <div class="mb-4 flex items-baseline">
          <h3 class="text-2xl font-semibold text-slate-400">Upcoming</h3>
          <span
            v-if="!reservationsStore.loading"
            class="ml-2 text-sm text-slate-400"
          >
            {{ upcomingReservations.length }} reservations
          </span>
        </div>
        <div class="grid grid-cols-auto-fill-80 gap-6">
          <template v-if="reservationsStore.loading">
            <ReservationIndexBlockSkeleton v-for="i in 3" :key="i" />
          </template>
          <template v-else>
            <ReservationIndexBlock
              v-for="reservation in upcomingReservations"
              :key="reservation.id"
              v-bind="{ reservation }"
            />
          </template>
        </div>
      </div>
      <div v-if="checkedInReservations.length">
        <div class="mb-4 flex items-baseline">
          <h3 class="text-2xl font-semibold text-slate-400">Checked in</h3>
          <span
            v-if="!reservationsStore.loading"
            class="ml-2 text-sm text-slate-400"
          >
            {{ checkedInReservations.length }} reservations
          </span>
        </div>
        <div class="grid grid-cols-auto-fill-80 gap-6">
          <template v-if="reservationsStore.loading">
            <ReservationIndexBlockSkeleton v-for="i in 6" :key="i" />
          </template>
          <template v-else>
            <ReservationIndexBlock
              v-for="reservation in checkedInReservations"
              :key="reservation.id"
              v-bind="{ reservation }"
            />
          </template>
        </div>
      </div>
    </div>
  </main-layout>
</template>
