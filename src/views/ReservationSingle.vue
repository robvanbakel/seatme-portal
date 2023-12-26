<script setup lang="ts">
import { computed } from "vue";
import { useReservationsStore } from "@/stores/reservations";
import MainButton from "@/components/MainButton.vue";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";
import {
  EnvelopeIcon,
  PhoneIcon,
  StarIcon,
  PencilSquareIcon,
  ClockIcon,
} from "@heroicons/vue/20/solid";
import MainInput from "@/components/MainInput.vue";
import { useToggle } from "@vueuse/core";
import PartySizeIcon from "@/components/PartySizeIcon.vue";

const props = defineProps<{
  reservationId: string;
}>();

const reservationsStore = useReservationsStore();

const [nameUpdateMode, setNameUpdateMode] = useToggle();

const reservation = computed(() => {
  const data = reservationsStore.reservations.find(
    ({ id }) => id === props.reservationId
  );

  return data;
});
</script>

<template>
  <template v-if="reservation">
    <div class="group relative flex h-12 items-center">
      <MainInput
        v-if="nameUpdateMode"
        class="grow"
        field="name"
        :data="reservation"
        @after-submit="setNameUpdateMode(false)"
      />
      <template v-else>
        <h1 class="text-4xl font-bold text-slate-800">
          {{ reservation.name }}
        </h1>

        <button
          v-if="!nameUpdateMode"
          class="invisible ml-2 rounded-md p-2 text-slate-600 hover:bg-slate-200 active:bg-slate-400 group-hover:visible"
          @click="setNameUpdateMode(true)"
        >
          <PencilIcon class="w-4" />
        </button>
      </template>
    </div>

    <div v-if="!reservation.checked_in_at" class="mt-4 flex space-x-4">
      <MainButton
        class="grow"
        variant="block"
        :icon="CheckCircleIcon"
        label="Check-in"
      />
      <MainButton
        class="grow"
        priority="secondary"
        variant="block"
        :icon="XCircleIcon"
        label="Cancel"
      />
    </div>

    <div class="mt-12 space-y-6">
      <MainInput
        field="arrival_time"
        label="Arrival time"
        type="datetime-local"
        :icon="ClockIcon"
        :data="reservation"
      />

      <main-input field="party_size" label="Party size" :data="reservation">
        <template #icon>
          <PartySizeIcon :party-size="reservation.party_size" class="w-4" />
        </template>
        <template #default="{ updateFieldValue }">
          <div class="grid grid-cols-5 gap-3">
            <button
              v-for="i in 10"
              :key="i"
              class="h-9 rounded-md text-sm"
              :disabled="reservation.party_size === i"
              :class="
                reservation.party_size === i
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-200 text-slate-800 hover:bg-indigo-300 active:bg-indigo-400'
              "
              @click="updateFieldValue(i)"
            >
              {{ i }}
            </button>
          </div>
        </template>
      </main-input>

      <main-input
        field="email"
        label="Email"
        :icon="EnvelopeIcon"
        :data="reservation"
      >
        <template
          v-if="reservation.preferred_contact_method === 'email'"
          #labelDetail
        >
          <div class="flex items-center text-xs font-medium text-slate-400">
            <StarIcon class="mr-1 w-3" /> Preferred by guest
          </div>
        </template>
      </main-input>

      <main-input
        field="phone"
        label="Phone"
        :icon="PhoneIcon"
        :data="reservation"
      >
        <template
          v-if="reservation.preferred_contact_method === 'phone'"
          #labelDetail
        >
          <div class="flex items-center text-xs font-medium text-slate-400">
            <StarIcon class="mr-1 w-3" /> Preferred by guest
          </div>
        </template>
      </main-input>

      <MainInput
        field="notes"
        label="Notes"
        type="textarea"
        :icon="PencilSquareIcon"
        :data="reservation"
      />
    </div>
  </template>
</template>
