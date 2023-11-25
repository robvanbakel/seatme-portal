import supabase from "@/lib/supabase";
import dayjs from "dayjs";
import type { ReservationIndex } from "@/types/reservations";

export const fetchReservations = async () => {
  const { data, error } = await supabase
    .from("reservation")
    .select(`id, name, party_size, arrival_time, checked_in_at`)
    .lt(
      "arrival_time",
      dayjs().add(1, "day").startOf("day").format("YYYY-MM-DD")
    )
    .gte("arrival_time", dayjs().startOf("day").format("YYYY-MM-DD"))
    .order("arrival_time", { ascending: false })
    .returns<ReservationIndex[]>();

  if (error) throw new Error("Could not fetch data");

  return data;
};
