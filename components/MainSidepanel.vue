<script setup lang="ts">
import mitt from "@/lib/mitt";

const reservationId = ref<string | null>(null);

mitt.on("openReservation", (id) => {
  reservationId.value = id;
});

const closePanel = () => {
  mitt.emit("openReservation", null);
  reservationId.value = null;
};
</script>

<template>
  <Transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    class="transition-opacity ease-in-out"
  >
    <div
      v-if="reservationId"
      class="fixed inset-0 bg-slate-950/25"
      @click="closePanel"
    ></div>
  </Transition>

  <Transition
    enter-from-class="translate-x-full "
    leave-to-class="translate-x-full"
    class="transition-transform duration-200 ease-in-out"
  >
    <div
      v-if="reservationId"
      class="fixed inset-y-0 right-0 h-full w-[30rem] max-w-full overflow-y-scroll bg-slate-50 p-9 pt-12 shadow-2xl shadow-slate-950/25"
    >
      <ReservationDetailsView :reservationId />
    </div>
  </Transition>
</template>
