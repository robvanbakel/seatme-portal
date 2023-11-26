import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "today",
      component: () => import("@/views/DailyView.vue"),
      children: [
        {
          path: ":reservationId",
          name: "reservationSingle",
          props: true,
          components: {
            sidepanel: () => import("@/views/ReservationSingle.vue"),
          },
        },
      ],
    },
    {
      path: "/reservations",
      name: "reservations",
      component: () => import("@/views/ReservationsView.vue"),
    },
    {
      path: "/reports",
      name: "reports",
      component: () => import("@/views/ReportsView.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/SettingsView.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: {
        auth: true,
      },
      component: () => import("@/views/auth/LoginView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn && !to.meta.auth) {
    next({ name: "login", replace: true, force: true });
    return;
  }

  if (authStore.isLoggedIn && to.meta.auth) {
    next(from);
    return;
  }

  next();
});

export default router;
