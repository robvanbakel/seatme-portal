import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", () => {
  const upcomingThreshold = 30;

  return {
    upcomingThreshold,
  };
});
