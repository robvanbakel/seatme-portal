<script setup lang="ts">
const open = defineModel<boolean>({ required: true });

const closePanel = () => {
  open.value = false;
};
</script>

<template>
  <Transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    class="transition-opacity ease-in-out"
  >
    <div
      v-if="open"
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
      v-if="open"
      class="fixed inset-y-0 right-0 h-full w-1/3 min-w-[30rem] max-w-full overflow-y-scroll bg-slate-50 p-9 pt-12 shadow-2xl shadow-slate-950/25"
    >
      <slot> </slot>
    </div>
  </Transition>
</template>
