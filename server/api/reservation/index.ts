import { z } from "zod";
import * as changeKeys from "change-case/keys";
import { serverSupabaseServiceRole } from "#supabase/server";

const reservationSchema = z.object({
  restaurant_id: z.string().uuid(),
  arrival_time: z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/, "Invalid date"),
  party_size: z.number().min(1).max(99),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<any>(event);
  const body = await readBody(event);

  const formattedBody = changeKeys.snakeCase(body);

  const parsedBody = reservationSchema.safeParse(formattedBody);

  if (!parsedBody.success) {
    throw createError({
      statusCode: 422,
      message: parsedBody.error.message,
    });
  }

  const { error, data } = await client
    .from("reservation")
    .insert(parsedBody.data)
    .select("id")
    .single();

  if (error) {
    throw createError({ statusCode: 500 });
  }

  return data;
});
