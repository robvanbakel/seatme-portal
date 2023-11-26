<script setup lang="ts">
import dayjs from "dayjs";
import type { Reservation } from "@/types/reservations";
import { ClockIcon, UserIcon } from "@heroicons/vue/20/solid";
import { useSettingsStore } from "@/stores/settings";
import { computedWithControl } from "@vueuse/core";
import { CronJob } from "cron";
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const settingsStore = useSettingsStore();
const router = useRouter();

const props = defineProps<{
  reservation: Reservation;
}>();

const statusSpecificClasses = computedWithControl(
  () => props.reservation,
  () => {
    return props.reservation.checked_in_at
      ? "bg-slate-100 p-4 text-slate-400 hover:bg-slate-200"
      : dayjs(props.reservation.arrival_time)
          .subtract(settingsStore.upcomingThreshold, "minute")
          .isBefore()
      ? "bg-indigo-600 text-white hover:bg-indigo-700"
      : "bg-indigo-400 text-white hover:bg-indigo-700";
  }
);

const openReservation = () => {
  router.push({
    name: "reservationSingle",
    params: { reservationId: props.reservation.id },
  });
};

const cronJob = new CronJob("* * * * *", () => {
  statusSpecificClasses.trigger();
});

onMounted(() => {
  cronJob.start();
});

onUnmounted(() => {
  cronJob.stop();
});
</script>

<template>
  <div
    role="button"
    class="flex h-36 flex-col justify-between rounded-xl p-4 transition-colors"
    :class="statusSpecificClasses"
    @click="openReservation"
  >
    <h4 class="font-semibold">{{ reservation.name }}</h4>
    <div class="space-y-1">
      <div class="flex">
        <ClockIcon class="mr-2 w-4" />
        <span class="text-sm">
          {{ dayjs(reservation.arrival_time).format("HH:mm") }}
        </span>
      </div>
      <div class="flex">
        <UserIcon class="mr-2 w-4" />
        <span class="text-sm">{{ reservation.party_size }} people</span>
      </div>
    </div>
  </div>
</template>
