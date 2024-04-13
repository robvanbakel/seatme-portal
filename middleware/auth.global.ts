export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  if (to.meta.layout !== "auth" || !user.value) return;

  return navigateTo("/");
});
