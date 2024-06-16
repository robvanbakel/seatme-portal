<script setup lang="ts">
import dayjs from "dayjs";
import { computedWithControl } from "@vueuse/core";
import { CronJob } from "cron";
import { IconUserFilled } from "@tabler/icons-vue";
import { useSettingsStore } from "@/stores/settings";
import type { Reservation } from "@/types";
import mitt from "@/lib/mitt";

const settingsStore = useSettingsStore();

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
        ? "bg-primary text-white hover:bg-primary-700"
        : "bg-primary-400 text-white hover:bg-primary-700";
  },
);

const openReservation = () => {
  mitt.emit("openReservation", props.reservation.id);
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
      <div class="flex items-center">
        <ReservationClockIcon
          :timestamp="reservation.arrival_time"
          class="mr-2 w-4"
        />
        <span class="text-sm">
          {{ dayjs(reservation.arrival_time).format("HH:mm") }}
        </span>
      </div>
      <div class="flex items-center">
        <IconUserFilled class="mr-2 w-4" />
        <span class="text-sm">{{ reservation.party_size }} people</span>
      </div>
    </div>
  </div>
</template>
