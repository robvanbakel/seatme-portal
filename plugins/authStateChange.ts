export default defineNuxtPlugin(() => {
  const client = useSupabaseClient();
  const profileStore = useProfileStore();

  client.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") return;

    profileStore.reset();

    await navigateTo("/login");
  });
});
