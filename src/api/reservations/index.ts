import supabase from "@/lib/supabase";
import type { Reservation } from "@/types/reservations";
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();

export const fetchReservations = (
  options: Partial<{
    from: string;
    to: string;
  }> = {}
) => {
  return supabase
    .from("reservation")
    .select("*")
    .lt("arrival_time", options.to ?? settingsStore.currentWindow.to)
    .gte("arrival_time", options.from ?? settingsStore.currentWindow.from)
    .returns<Reservation[]>();
};
