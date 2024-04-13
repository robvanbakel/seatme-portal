<script setup lang="ts">
import { IconCircleCheck, IconCircleX } from "@tabler/icons-vue";
import dayjs from "dayjs";

const client = useSupabaseClient<any>();

const props = defineProps<{
  reservationId: string;
}>();

const onCheckIn = async () => {
  await client
    .from("reservation")
    .update({ checked_in_at: dayjs().toISOString() })
    .eq("id", props.reservationId);
};

const onCancel = async () => {
  await client
    .from("reservation")
    .update({ checked_in_at: null })
    .eq("id", props.reservationId);
};
</script>

<template>
  <div class="mt-4 flex gap-4">
    <MainButton
      class="grow"
      variant="block"
      :icon="IconCircleCheck"
      label="Check-in"
      @click="onCheckIn"
    />
    <MainButton
      class="grow"
      priority="secondary"
      variant="block"
      :icon="IconCircleX"
      label="Cancel"
      @click="onCancel"
    />
  </div>
</template>
