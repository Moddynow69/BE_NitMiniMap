export async function GET(request) {
  return new Response(JSON.stringify({ apiURL: process.env.GOOGLE_MAPS_API_URL }));
}
