// Financial Firm Register Search API — quick start (Node 18+, built-in fetch).
// Set RAPIDAPI_KEY to the key shown on financial-firm-register-search at rapidapi.com after subscribing to the free plan.
const HOST = "financial-firm-register-search.p.rapidapi.com";
const KEY = process.env.RAPIDAPI_KEY;

async function call(path) {
  const res = await fetch(`https://${HOST}${path}`, {
    headers: { "X-RapidAPI-Key": KEY, "X-RapidAPI-Host": HOST },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

// Fuzzy name check in one country
call("/v1/check?name=HSBC%20Bank%20Australia&country=AU").then((d) => console.log(JSON.stringify(d, null, 2).slice(0, 2000)));
