import { createApp } from "vue";
import { createPinia } from "pinia";
import supabase from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth";

import App from "@/App.vue";
import router from "@/router";

import "@/assets/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

supabase.auth.onAuthStateChange(async (event, session) => {
  const authStore = useAuthStore();
  authStore.user = session?.user ?? null;

  if (session) return;

  router.push({ name: "login" });
});
