export default defineNuxtPlugin(() => {
  const client = useSupabaseClient();

  client.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") return;
    await navigateTo("/login");
  });
});
