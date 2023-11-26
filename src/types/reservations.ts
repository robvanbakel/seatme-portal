export type Reservation = {
  id: string;
  created_at: string;
  arrival_time: string;
  restaurant_id: string;
  party_size: number;
  name: string;
  email: string | null;
  phone: string | null;
  preferred_contact_method: "email" | "phone";
  checked_in_at: string | null;
};
