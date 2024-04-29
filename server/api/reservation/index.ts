import { z } from "zod";
import * as changeKeys from "change-case/keys";
import { serverSupabaseServiceRole } from "#supabase/server";

const reservationSchema = z.object({
  arrival_time: z.string(),
  restaurant_id: z.string().uuid(),
  party_size: z.number().max(99),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  notes: z.string().nullable(),
});

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<any>(event);
  const body = await readBody(event);

  const formattedBody = changeKeys.snakeCase(body);

  const parsed = reservationSchema.safeParse(formattedBody);

  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      message: parsed.error.message,
    });
  }

  const { error, data } = await client
    .from("reservation")
    .insert(parsed.data)
    .select("id")
    .single();

  if (error) {
    throw createError({ statusCode: 500 });
  }

  return data;
});
