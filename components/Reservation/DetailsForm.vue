<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import dayjs from "dayjs";
import {
  IconUserFilled,
  IconMailFilled,
  IconPhoneFilled,
  IconFileFilled,
  IconCalendarFilled,
} from "@tabler/icons-vue";
import type { Reservation } from "~/types";
import PartySizePicker from "~/components/SoloFields/PartySizePicker.vue";

const props = defineProps<{
  reservation: Reservation;
}>();

const client = useSupabaseClient<any>();

const emailSchema = z.string().email();
const phoneSchema = z.string().refine(
  (val) => {
    return val.split("").filter((char) => !isNaN(parseInt(char))).length >= 10;
  },
  {
    message: "Invalid phone number",
  },
);

const zodSchema = z.object({
  party_size: z.number().max(99),
  arrival_time: z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/, "Invalid date"),
  email: z.union([emailSchema, z.null()]),
  phone: z.union([phoneSchema, z.null()]),
  notes: z.union([z.string(), z.null()]),
});

const { defineField, values, errorBag, isFieldDirty, resetField } = useForm({
  validationSchema: toTypedSchema(zodSchema),
  initialValues: props.reservation,
});

const [partySize] = defineField("party_size");
const [arrivalTime] = defineField("arrival_time");
const [email] = defineField("email");
const [phone] = defineField("phone");
const [notes] = defineField("notes");

const updateField = async (field: keyof z.infer<typeof zodSchema>) => {
  if (errorBag.value[field]) return;

  if (!isFieldDirty(field)) return;

  const newValue = values[field];

  await client
    .from("reservation")
    .update({ [field]: newValue })
    .eq("id", props.reservation.id);

  resetField(field, { value: newValue });
};

const formattedTime = computed({
  get: () => arrivalTime.value,
  set: (value) => {
    const parsedDate = dayjs(value);

    if (!parsedDate.isValid()) {
      arrivalTime.value = value;
      return;
    }

    arrivalTime.value = parsedDate.format("YYYY-MM-DDTHH:mm");
  },
});
</script>

<template>
  <div class="space-y-6">
    <SoloFieldsDateTimeField
      v-model.lazy="formattedTime"
      label="Arrival time"
      :errorBag="errorBag.arrival_time"
      :icon="IconCalendarFilled"
      @submit="updateField('arrival_time')"
    />

    <PartySizePicker
      v-model="partySize"
      label="Party size"
      :errorBag="errorBag.party_size"
      :icon="IconUserFilled"
      @update:model-value="updateField('party_size')"
    />

    <SoloFieldsTextField
      v-model="email"
      cast-null
      label="Email"
      :errorBag="errorBag.email"
      :icon="IconMailFilled"
      @submit="updateField('email')"
    />

    <SoloFieldsTextField
      v-model="phone"
      cast-null
      label="Phone"
      :errorBag="errorBag.phone"
      :icon="IconPhoneFilled"
      @submit="updateField('phone')"
    />

    <SoloFieldsTextArea
      v-model="notes"
      cast-null
      label="Notes"
      :errorBag="errorBag.notes"
      :icon="IconFileFilled"
      @submit="updateField('notes')"
    />
  </div>
</template>
