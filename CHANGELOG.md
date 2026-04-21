# Changelog

## [1.1.0] - 2026-04-21

### Changed
- Replaced deprecated `request` package with `axios` (^1.7.9) in all HTTP methods (`get`, `post`, `put`)
- `get()`, `post()`, `put()` now use `axios` promise chain instead of callback-style `request`

### Removed
- `request` dependency (was abandoned in 2020, carried critical/moderate CVEs: GHSA-fjxv-7rqg-78g4, GHSA-72xf-g2v4-qvf3, GHSA-6rw7-vpxm-498p)

### Security
- `npm audit` now reports **0 vulnerabilities** (down from 4 high/critical via the `request` chain)

### Notes
- The `.headers` property (used for manual header injection into axios/fetch calls) is **unchanged** — fully backward compatible
- `get()` / `post()` / `put()` return a Promise resolving to `response.data` — same contract as before

## [1.0.0] - Initial release
