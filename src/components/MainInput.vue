<script setup lang="ts">
import { ref, computed, type Component } from "vue";
import MainTextField from "@/components/MainTextField.vue";
import { updateReservation } from "@/api/reservations";
import { ArrowUturnLeftIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
  field: string;
  icon?: Component;
  label?: string;
  data: { [key: string]: any } & { id: string };
  type?: "datetime-local" | "textarea";
}>();

const emit = defineEmits<{
  afterSubmit: [];
}>();

const fieldValue = ref(props.data[props.field]);
const fieldElement = ref<typeof MainTextField>();

const initialValue = fieldValue.value;
const lastSavedValue = ref(fieldValue.value);

const valueChanged = computed(() => lastSavedValue.value !== initialValue);

const updateFieldValue = async (data?: any) => {
  await updateReservation(props.data.id, props.field, data ?? fieldValue.value);
  lastSavedValue.value = fieldValue.value;
  emit("afterSubmit");
};

const submitHandler = async () => {
  if (fieldValue.value === lastSavedValue.value) return;
  await updateFieldValue();
};

const revertHandler = async () => {
  if (!valueChanged.value) return;
  await updateFieldValue(initialValue);
  fieldValue.value = initialValue;
  lastSavedValue.value = initialValue;
};

const blurField = () => {
  fieldElement.value?.blur();
};
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="field"
      class="mb-2 flex justify-between text-sm text-slate-800"
    >
      <div class="flex space-x-2 whitespace-nowrap">
        <slot name="icon">
          <component :is="icon" class="w-4" />
        </slot>
        <span>{{ label }}</span>
      </div>
      <slot name="labelDetail"> </slot>
    </label>

    <slot
      v-bind="{
        updateFieldValue,
        valueChanged,
        revertHandler,
        blurField,
        submitHandler,
      }"
    >
      <main-text-field
        :id="field"
        ref="fieldElement"
        v-model="fieldValue"
        v-bind="{ type }"
        class="w-full"
        :textarea="type === 'textarea'"
        @blur="submitHandler"
        @keyup.enter="blurField"
      >
        <template #fieldDetails>
          <div
            class="absolute right-0 mr-4"
            :class="{ 'top-3': type === 'textarea' }"
          >
            <slot name="fieldDetails">
              <button
                v-if="valueChanged"
                class="rounded border border-slate-300 bg-slate-100 px-2 py-1 hover:bg-slate-200 active:bg-slate-300"
                @click="revertHandler"
              >
                <ArrowUturnLeftIcon class="w-3 text-slate-400" />
              </button>
            </slot>
          </div>
        </template>
      </main-text-field>
    </slot>
  </div>
</template>
