# Financial Firm Register Search API

Is this bank, insurer or broker on a regulator's register? US, CA, AU, JP, TW, KR, EU in one call.

**Try it (free tier for evaluation):** [https://rapidapi.com/193market/api/financial-firm-register-search](https://rapidapi.com/193market/api/financial-firm-register-search) · also on [api.market](https://api.market/store/193market/financial-firm-register-search)

Search a bank, insurer, securities firm or payment firm on regulators' public registers in selected jurisdictions (US, Canada, Australia, Japan, Taiwan, Korea, EU): fuzzy and native-script name search, identifier lookup (LEI, RSSD, FDIC certificate, ABN, AFS licence, Korean corporate number and more), status, dates and a link to the register. Firms only.

## Who uses it

KYB and onboarding teams at payment companies, marketplaces and crypto firms; treasury and trade-finance teams checking a counterparty bank; fraud teams checking 'we are a licensed bank' claims.

## Quick start

Subscribe to the free BASIC plan on RapidAPI, copy your `X-RapidAPI-Key`, then:

```bash
curl "https://financial-firm-register-search.p.rapidapi.com/v1/check?name=HSBC%20Bank%20Australia&country=AU" \
  -H "X-RapidAPI-Key: $RAPIDAPI_KEY" \
  -H "X-RapidAPI-Host: financial-firm-register-search.p.rapidapi.com"
```

Python and Node examples are in [`examples/`](examples/). Both read the key from the `RAPIDAPI_KEY` environment variable.

Other calls worth trying:
- Look up by identifier (FDIC certificate): `GET /v1/lookup?id_type=fdic_cert&value=3511`
- Which registers are covered and how fresh: `GET /v1/registers`

## Example response

`GET /v1/check?name=HSBC%20Bank%20Australia&country=AU` — Fuzzy name check in one country:

```json
{
  "query": {
    "name": "HSBC Bank Australia",
    "normalised": "HSBC BANK AUSTRALIA",
    "country": "AU",
    "include_inactive": false,
    "threshold": 0.8,
    "max_register_age_days": null
  },
  "found": true,
  "best_score": 1.0,
  "score_version": "2026-09-17",
  "coverage": {
    "country": "AU",
    "registers_searched": 3,
    "covered": true,
    "registers": [
      "AU · Australian Prudential Regulation Authority · Register of authorised deposit-taking institutions",
      "AU · Australian Securities and Investments Commission · Australian financial services licensees",
      "..."
    ]
  },
  "results": [
    {
      "match_score": 1.0,
      "match_type": "full_name",
      "matched_name": "HSBC Bank Australia Limited",
      "matched_on": "name",
      "shared_distinctive_words": [
        "HSBC",
        "BANK",
        "..."
      ],
      "id": "au_apra_adi:hsbc-bank-australia-limited",
      "name": "HSBC Bank Australia Limited",
      "name_local": null,
      "other_names": [],
      "country": "AU",
      "city": null,
      "institution_type": "Foreign subsidiary banks",
      "status": "active",
      "status_detail": "Listed on APRA's register of authorised deposit-taking institutions",
      "authorised_since": null,
      "status_changed": null,
      "identifiers": {},
      "website": null,
      "register": {
        "id": "au_apra_adi",
        "country": "AU",
        "regulator": "Australian Prudential Regulation Authority",
        "register": "Register of authorised deposit-taking institutions",
        "meaning": "Authorised by APRA as a deposit-taking institution under the Banking Act 1959 at the page's update date",
        "register_url": "https://www.apra.gov.au/registers/list-registered-authorised-deposit-taking-institutions",
        "licence": "Creative Commons Attribution 4.0 International (apra.gov.au copyright page)"
      },
      "register_as_of": "2026-08-10",
      "register_stale": false
    },
    {
      "match_score": 1.0,
      "match_type": "full_name",
      "matched_name": "HSBC BANK AUSTRALIA LIMITED",
      "matched_on": "name",
      "shared_distinctive_words": [
        "HSBC",
  ...
}
```

## Endpoints

| Method | Path | What it does | Parameters (* required) |
|---|---|---|---|
| GET | `/health` | Health check |  |
| GET | `/v1/check` | Is this financial firm on a regulator's register? | `name`*, `country`, `include_inactive`, `threshold`, `limit`, `max_register_age_days` |
| GET | `/v1/lookup` | Find registrations by an identifier such as an LEI | `id_type`*, `value`*, `max_register_age_days` |
| GET | `/v1/institutions/{institution_id}` | One registration by its id | `institution_id`* |
| GET | `/v1/registers` | Which registers are covered, how fresh, what they mean |  |

The full OpenAPI 3 specification is in [`openapi.json`](openapi.json).

## Plans

| Plan | Price | Included per month |
|---|---|---|
| BASIC | free | a small monthly quota for evaluation |
| PRO / ULTRA / MEGA | from $49 / month | larger monthly quotas, per-request overage, higher rate limits |

Current prices are always on the [RapidAPI pricing page](https://rapidapi.com/193market/api/financial-firm-register-search/pricing). Error responses (4xx/5xx) are not charged on api.market.

## Data source and licence

FDIC BankFind (public domain); Japan FSA (Public Data License 1.0); ASIC (CC BY 3.0 AU) and APRA (CC BY 4.0); ECB list of MFIs (freely available at ecb.europa.eu); Korea FSC and KDIC via data.go.kr; Taiwan CDIC and TWSE (Open Government Data License 1.0); Canada OSFI (Open Government Licence - Canada). Firms only.

Every response carries an `attribution` object naming the source and the changes made (translation, normalisation, filtering, aggregation). This API is an independent product and is not affiliated with or endorsed by any government agency or regulator.

## Support

Questions, missing fields, or a use case the current plans do not fit: open an issue in this repository or use the Discussions tab on the RapidAPI listing.
