// Finds the Google Place ID for the business and prints a summary of what the
// Places API (New) returns, so we design against real data.
//
//   node --env-file=.env.local scripts/find-place.mjs ["search text"]
//
// Never prints the API key. Uses one Text Search call and one Place Details call.

const key = process.env.GOOGLE_PLACES_API_KEY;
if (!key) {
  console.error(
    'GOOGLE_PLACES_API_KEY is not set (run with --env-file=.env.local).'
  );
  process.exit(1);
}

const query =
  process.argv[2] ?? 'Grand Format vegan vinyl wedding DJ Hudson Valley NY';

async function call(url, init, mask) {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': mask,
    },
  });
  const body = await res.json();
  if (!res.ok) {
    console.error(
      `HTTP ${res.status}:`,
      JSON.stringify(body.error ?? body, null, 2)
    );
    process.exit(1);
  }
  return body;
}

const search = await call(
  'https://places.googleapis.com/v1/places:searchText',
  {
    method: 'POST',
    body: JSON.stringify({
      textQuery: query,
      includePureServiceAreaBusinesses: true,
    }),
  },
  'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount'
);

console.log(`Search: "${query}"\n`);
for (const p of search.places ?? []) {
  console.log(
    `${p.id}  ${p.displayName?.text}  |  ${p.formattedAddress ?? 'no address'}  |  ${p.rating ?? '-'} (${p.userRatingCount ?? 0})`
  );
}
if (!search.places?.length) process.exit(0);

const id = search.places[0].id;
const details = await call(
  `https://places.googleapis.com/v1/places/${id}`,
  { method: 'GET' },
  'id,displayName,rating,userRatingCount,googleMapsUri,googleMapsLinks,reviews'
);

console.log(`\nDetails for first result (${id}):`);
console.log(JSON.stringify(details, null, 2));
