<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { IconLogin2 } from "@tabler/icons-vue";

definePageMeta({
  layout: "auth",
});

const loading = ref(false);

const supabase = useSupabaseClient();

const errorMessage = ref<string | null>(null);

const { handleSubmit, defineField, meta, resetField } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  ),
});

const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  try {
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      loading.value = false;
      errorMessage.value = "Invalid credentials";
      resetField("password");
      return;
    }

    navigateTo("/");
  } catch (err) {
    loading.value = false;
    errorMessage.value = "Something went wrong, please try again later.";
  }
});
</script>

<template>
  <div>
    <p v-if="!!errorMessage" class="mb-4 text-sm text-destructive">
      {{ errorMessage }}
    </p>
    <form :onSubmit>
      <div class="flex flex-col space-y-2">
        <input
          v-model="email"
          class="border-slate-200 placeholder:text-slate-400"
          autofocus
          type="text"
          placeholder="Email"
        />
        <input
          v-model="password"
          class="border-slate-200 placeholder:text-slate-400"
          type="password"
          placeholder="Password"
        />
      </div>
      <MainButton
        class="mx-auto mt-6"
        :disabled="!meta.dirty || !meta.valid"
        :loading
        :icon="IconLogin2"
        label="Login"
        type="submit"
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
input {
  @apply border h-12 px-4 rounded-md;
}
</style>
