<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
  timestamp: string;
}>();

const hour = dayjs(props.timestamp).hour();
const minute = dayjs(props.timestamp).minute();

const hourRotation = (hour + minute / 60) * (360 / 12);
const minuteRotation = minute * (360 / 60);
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <mask :id="timestamp">
      <rect width="100%" height="100%" fill="white" />
      <rect
        x="9.25"
        y="4.25"
        fill="black"
        width="1.5"
        height="6.5"
        rx="0.75"
        :transform="`rotate(${minuteRotation})`"
        transform-origin="10"
      />
      <rect
        x="9.25"
        y="5.25"
        width="1.5"
        height="5.5"
        rx="0.75"
        fill="black"
        :transform="`rotate(${hourRotation})`"
        transform-origin="10"
      />
    </mask>

    <circle cx="10" cy="10" r="8" :mask="`url(#${timestamp})`" />
  </svg>
</template>
