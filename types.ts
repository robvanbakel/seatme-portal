export type Reservation = {
  id: string;
  created_at: string;
  arrival_time: string;
  restaurant_id: string;
  party_size: number;
  name: string;
  notes: string | null;
  email: string | null;
  phone: string | null;
  checked_in_at: string | null;
};
