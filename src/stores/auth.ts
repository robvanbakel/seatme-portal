import { ref, computed } from "vue";
import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<Record<string, any> | null>(null);
  const isLoggedIn = computed(() => !!user.value);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    router.push("/");
  };

  const logout = () => supabase.auth.signOut();

  return {
    user,
    isLoggedIn,
    login,
    logout,
  };
});
