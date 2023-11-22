<script setup lang="ts">
import { ref } from "vue";
import MainButton from "@/components/MainButton.vue";
import { ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const form = ref({
  email: "",
  password: "",
});

const loading = ref(false);
const errorMessage = ref<string | null>(null);

const submitHandler = async () => {
  const { email, password } = form.value;

  loading.value = true;
  try {
    await authStore.login(email, password);
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
      return;
    }
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <p v-if="!!errorMessage" class="mb-4 text-sm text-red-600">
    {{ errorMessage }}
  </p>
  <form @submit.prevent="submitHandler">
    <div class="flex flex-col space-y-2">
      <input v-model="form.email" autofocus type="email" placeholder="Email" />
      <input v-model="form.password" type="password" placeholder="Password" />
    </div>

    <MainButton
      class="mx-auto mt-6"
      :icon="ArrowLeftOnRectangleIcon"
      :label="loading ? 'Loading…' : 'Login'"
      type="submit"
    />
  </form>
</template>

<style scoped lang="scss">
input {
  @apply border h-12 px-4 rounded-md;
}
</style>
