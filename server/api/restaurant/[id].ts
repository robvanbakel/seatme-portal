import { serverSupabaseServiceRole } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event);

  const restaurantId = event.context.params?.id;

  if (!restaurantId) {
    throw createError({
      statusCode: 400,
      message: "Restaurant ID not provided",
    });
  }

  const { data, error } = await client
    .from("restaurant")
    .select("id, name")
    .eq("id", restaurantId)
    .single<{ id: string; name: string }>();

  if (error) {
    throw createError({
      statusCode: 404,
      message: "Restaurant not not found",
    });
  }

  return data;
});
