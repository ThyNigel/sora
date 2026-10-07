# Manual QA, 2026-10-07 (second pass)

Spelling: all rendered text pulled from every slide with Playwright and read line by line. No misspellings found.

Accuracy fixes (slide said more than the source backs up):
1. Hook: removed "All free." (ChexSystems reserves state fees, and AI tool pricing isn't in the ledger).
2. Slide 2: "Credit files" changed to "Files on you" (ChexSystems and NCTUE are consumer reporting companies, not credit files in the usual sense).
3. Slide 2: "tracks every checking account you open" changed to "tracks your checking accounts, even why one got closed" (matches the CFPB wording, C4a).
4. Slide 2: the "Not Equifax" and "$0" lines only appeared in the animated version, so they never showed on the PNG. Merged into one line that shows on the still.
5. Slide 4: "Anyone with an SSN" changed to "Anyone with an SSN or ITIN" (C5a).
6. Slide 5: "sends your bank texts" changed to "can send your bank texts" (C11 says can intercept).
7. Slides 7 to 9: "MY PROMPT" relabeled "WHAT I ASKED (SHORT VERSION)", because the card shows a summary, not the exact prompt (the exact prompts are in assets/ai-runs).
8. Caption: removed "All free", fixed "90-day", reworded the Maryland line, "Sources on every tip slide", removed the TikTok section.

Visual fixes:
9. Slide 2: "$0" had a yellow browser-default highlight. Now bold.
10. Slide 2: a sliver of the digit below peeked under the big "4". Fixed.
11. Slide 9: "Oct 1, 2026" broke across two lines. Dates now never split.

Automated QA after fixes: 0 FAIL, 0 WARN (qa/QA_REPORT.md).

Still on Nigel: open the source links in RESEARCH.md and confirm the quoted wording on slides 3 to 6 matches the live pages (this environment could not load them).
