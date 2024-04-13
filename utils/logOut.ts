export default async () => {
  const supabase = useSupabaseClient();

  await supabase.auth.signOut();
  return navigateTo("/login");
};
