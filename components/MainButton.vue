<script setup lang="ts">
import type { FunctionalComponent } from "vue";

const props = defineProps<{
  label: string;
  icon?: FunctionalComponent;
  disabled?: boolean;
  loading?: boolean;
  priority?: "primary" | "secondary" | "tertiary";
  variant?: "default" | "block";
  size?: "default" | "small";
}>();

const priorityClasses = computed(() => {
  if (props.disabled) {
    return "bg-slate-100 text-slate-300";
  }

  switch (props.priority) {
    case "secondary":
      return "bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400";
    case "tertiary":
      return "text-slate-400 hover:bg-slate-200 hover:text-slate-600 active:bg-slate-300";
    default:
      return "bg-primary text-white hover:bg-primary-700 active:bg-primary-800";
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "block":
      return "rounded-md";
    default:
      return "rounded-2xl";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "small":
      return "text-xs px-4 h-10 -mx-4";
    default:
      return "px-5 text-sm h-12 tracking-wide";
  }
});

const iconSize = computed(() => {
  if (props.size === "small") return 16;
  if (props.variant === "block") return 22;
  return 18;
});
</script>

<template>
  <button
    class="relative whitespace-nowrap tracking-wide transition-colors"
    :class="[priorityClasses, variantClasses, sizeClasses]"
    :disabled
  >
    <div
      class="flex items-center justify-center transition-all"
      :class="{ '-translate-y-2 opacity-0': loading }"
    >
      <component
        :is="icon"
        v-if="!!icon"
        :size="iconSize"
        :stroke-width="1.5"
        :class="size === 'small' ? 'mr-2' : '-ml-1 mr-2.5'"
      />
      {{ label }}
    </div>
    <Transition
      enter-from-class="translate-y-2 opacity-0"
      leave-to-class="translate-y-2 opacity-0"
      class="transition-all"
    >
      <div
        v-if="loading"
        class="absolute inset-0 flex items-center justify-center"
      >
        <MainLoader :size="24" />
      </div>
    </Transition>
  </button>
</template>
