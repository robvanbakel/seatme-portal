<script setup lang="ts">
import type { FunctionalComponent } from "vue";

const fieldValue = defineModel<number>();

defineProps<{
  label: string;
  errorBag?: string[];
  icon?: FunctionalComponent;
  castNull?: boolean;
}>();

const updateFieldValue = (partySize: number) => {
  fieldValue.value = partySize;
};
</script>

<template>
  <div>
    <label v-if="label" :for="label" class="flex justify-between pb-2 text-sm">
      <div class="flex items-center gap-1.5 whitespace-nowrap text-slate-800">
        <slot v-if="icon" name="icon">
          <component :is="icon" :size="14" />
        </slot>
        <span class="font-semibold">{{ label }}</span>
      </div>
      <slot name="labelDetail"></slot>
    </label>

    <div class="">
      <div class="grid grid-cols-5 gap-3">
        <button
          v-for="i in 10"
          :key="i"
          class="h-9 rounded-md text-sm"
          :disabled="fieldValue === i"
          :class="
            fieldValue === i
              ? 'bg-primary text-white'
              : 'bg-primary-200 text-slate-800 hover:bg-primary-300 active:bg-primary-400'
          "
          @click="updateFieldValue(i)"
        >
          {{ i }}
        </button>
      </div>
    </div>
  </div>
</template>
