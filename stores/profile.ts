import { defineStore } from "pinia";

type Profile = {
  email: string;
  restaurant: {
    id: string;
    name: string;
  };
};

export const useProfileStore = defineStore("profile", () => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const profile = ref<Profile | null>(null);

  const fetchProfile = async () => {
    const { data } = await client
      .from("profile")
      .select("restaurant(id, name)")
      .single<{ restaurant: Profile["restaurant"] }>();

    if (!data) throw new Error("Profile not found");

    const email = user.value?.email;

    if (!email) throw new Error("Email not found");

    profile.value = {
      email,
      restaurant: data.restaurant,
    };
  };

  return { profile, fetchProfile };
});
