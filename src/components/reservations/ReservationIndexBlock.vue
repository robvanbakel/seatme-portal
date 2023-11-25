<script setup lang="ts">
import { computed } from "vue";
import dayjs from "dayjs";
import type { ReservationIndex } from "@/types/reservations";
import { ClockIcon, UserIcon } from "@heroicons/vue/20/solid";
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();

const props = defineProps<{
  reservation: ReservationIndex;
}>();

const statusSpecificClasses = computed(() => {
  if (props.reservation.checked_in_at) {
    return "bg-slate-100 p-4 text-slate-400 hover:bg-slate-200";
  }

  if (
    dayjs(props.reservation.arrival_time)
      .subtract(settingsStore.upcomingThreshold, "minute")
      .isBefore()
  ) {
    return "bg-indigo-600 text-white hover:bg-indigo-700";
  }

  return "bg-indigo-400 text-white hover:bg-indigo-700";
});
</script>

<template>
  <div
    role="button"
    class="flex h-36 flex-col justify-between rounded-xl p-4 transition-colors"
    :class="statusSpecificClasses"
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
