import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/eslint-module",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "shadcn-nuxt",
  ],
  css: ["@/assets/styles/main.scss"],
  tailwindcss: {
    exposeConfig: true,
  },
  eslint: {
    lintOnStart: false,
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  app: {
    head: {
      title: "SeatMe",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  routeRules: {
    "/api/**": {
      cors: true,
    },
  },
});
