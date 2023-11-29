import supabase from "@/lib/supabase";
import type { Reservation } from "@/types/reservations";
import { useSettingsStore } from "@/stores/settings";

export const fetchReservations = async (
  options: Partial<{
    from: string;
    to: string;
  }> = {}
) => {
  const settingsStore = useSettingsStore();

  return supabase
    .from("reservation")
    .select("*")
    .lt("arrival_time", options.to ?? settingsStore.currentWindow.to)
    .gte("arrival_time", options.from ?? settingsStore.currentWindow.from)
    .returns<Reservation[]>();
};

export const updateReservation = async <T>(
  id: string,
  field: string,
  value: T
) => {
  return supabase
    .from("reservation")
    .update({ [field]: value })
    .eq("id", id);
};
