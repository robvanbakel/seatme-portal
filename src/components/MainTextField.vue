<script setup lang="ts">
import { ref } from "vue";

defineOptions({ inheritAttrs: false });

defineProps<{
  textarea?: boolean;
}>();

const fieldElement = ref<HTMLInputElement>();
const modelValue = defineModel();

const blur = () => {
  fieldElement.value?.blur();
};

defineExpose({ blur });
</script>

<template>
  <div class="relative flex items-center">
    <textarea
      v-if="textarea"
      ref="fieldElement"
      v-bind="$attrs"
      v-model="modelValue"
      class="h-32 min-h-[48px] resize-y rounded-md border-slate-200 px-4 text-slate-800 hover:ring-1 focus:ring-indigo-600"
    ></textarea>
    <input
      v-else
      ref="fieldElement"
      v-bind="$attrs"
      v-model="modelValue"
      class="h-12 rounded-md border-slate-200 px-4 text-slate-800 hover:ring-1 focus:ring-indigo-600"
    />
    <slot name="fieldDetails"></slot>
  </div>
</template>
