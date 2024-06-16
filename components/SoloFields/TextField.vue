<script setup lang="ts">
import type { FunctionalComponent } from "vue";
import { IconExclamationCircle } from "@tabler/icons-vue";

const fieldValue = defineModel<string | null>({
  set(value) {
    if (props.castNull) {
      return value || null;
    }
    return value;
  },
});

const props = defineProps<{
  label: string;
  errorBag?: string[];
  icon?: FunctionalComponent;
  castNull?: boolean;
}>();

const emit = defineEmits<{
  submit: [];
}>();

const errorClasses =
  "border-error-500 [&:not(:focus)]:bg-error-50 ring-1 ring-error-500";

const errorMessage = computed(() => props.errorBag?.[0]);

const hasFieldIndicator = computed(() => {
  return !!errorMessage.value;
});

const blurField = (event: KeyboardEvent) => {
  if (!(event.target instanceof HTMLInputElement)) return;
  event.target.blur();
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

    <div class="relative h-12 w-full">
      <input
        :id="label"
        v-model="fieldValue"
        class="absolute size-full rounded-md px-4 text-slate-800 hover:ring-1 focus:ring-primary"
        type="text"
        :class="[
          errorMessage ? errorClasses : 'border-slate-200',
          { 'pr-12': hasFieldIndicator },
        ]"
        @blur="emit('submit')"
        @keydown.enter="blurField"
      />
      <Transition
        enter-from-class="translate-x-4 opacity-0"
        leave-to-class="opacity-0"
        class="transition-all"
      >
        <div
          v-if="hasFieldIndicator"
          class="absolute right-0 flex h-full w-12 items-center justify-center"
        >
          <IconExclamationCircle
            v-if="errorMessage"
            class="text-error-500"
            role="button"
            :size="24"
            :stroke-width="2"
            @click="console.log(errorMessage)"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>
