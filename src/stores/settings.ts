import { defineStore } from "pinia";
import dayjs from "dayjs";

export const useSettingsStore = defineStore("settings", () => {
  const upcomingThreshold = 30;

  const currentWindow = {
    from: dayjs().startOf("day").format("YYYY-MM-DD HH:mm"),
    to: dayjs().add(1, "day").startOf("day").format("YYYY-MM-DD HH:mm"),
  };

  return {
    upcomingThreshold,
    currentWindow,
  };
});
