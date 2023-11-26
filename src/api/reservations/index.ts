import supabase from "@/lib/supabase";
import dayjs from "dayjs";
import type { Reservation } from "@/types/reservations";

export const fetchReservations = () => {
  return supabase
    .from("reservation")
    .select(`*`)
    .lt(
      "arrival_time",
      dayjs().add(1, "day").startOf("day").format("YYYY-MM-DD")
    )
    .gte("arrival_time", dayjs().startOf("day").format("YYYY-MM-DD"))
    .throwOnError()
    .returns<Reservation[]>();
};
