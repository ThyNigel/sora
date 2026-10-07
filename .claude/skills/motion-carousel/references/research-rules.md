# Research and verification rules

1. Candidates: 25 or more. Score: uncommon (1 to 5), under 10 minutes (Y/N), risk, US/MD fit, primary source found. Keep 6 to 8.
2. Fail on sight: "make a budget", "high-yield savings", "check your credit score", investment picks, guaranteed returns, credit card churning, anything gray or easy to hurt yourself with, rules that were vacated or expired (FTC click-to-cancel 2025, federal CFPB medical-debt rule 2025, ACP, IRS Direct File).
3. Primary sources only for claims: IRS, CFPB, FTC, FCC, SSA, CMS, state agencies, the company's own help page, official tool docs. Record URL, date checked, method (fetched page or search restricted to the primary domain), and the exact quote.
4. Claims Ledger: every fact or number allowed on a slide or in the caption gets an ID (C1...). `claimIds` on each slide point at it. `qa.mjs` fails any number on a slide that does not appear in RESEARCH.md or a real AI output file.
5. Search-snippet quotes may be trimmed by the search tool. Before posting, open each URL and confirm wording, or run `capture_sources.mjs`.
6. AI tips: run the exact prompt for real. Fictional sample document, labeled SAMPLE. Save prompt, output (unedited), run record. Slide excerpts must be verbatim cells or sentences (QA checks). If the AI finds something you did not plant, say so honestly (see 2026-10-07 AI-1).
7. Every AI tip includes the privacy step: black out names and account numbers, use incognito or temporary chat. Cite the provider's own privacy page.
8. State-specific tips say the state on the slide (kicker or title).
