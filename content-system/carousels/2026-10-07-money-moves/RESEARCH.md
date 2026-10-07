# RESEARCH: Money Moves (The Peace Stack)

Date: 2026-10-07
Audience: regular US people, 22 to 35, want more freedom, curious about AI, not developers. Creator is in Maryland.
Deliverable: 7 tips (4 finance + 3 AI-for-money), each verified from a primary source.

## How verification was done (read this first)

- Direct fetching of .gov, carrier, bureau, and AI-provider pages is blocked by the network proxy in this environment. Tested and confirmed blocked: irs.gov, consumerfinance.gov, verizon.com, att.com, t-mobile.com, nctue.com, innovis.com, consumer.risk.lexisnexis.com, chexsystems.com, privacy.claude.com.
- Every claim below was verified with WebSearch restricted by `allowed_domains` to the primary domain. Method label used below: **SEARCH-PRIMARY (domain)**.
- The "quoted text" is the text the search tool returned from that primary-domain page. The search tool condenses page text, so a quote can differ slightly in wording from the live page. **Before any slide shows a screenshot or a word-for-word quote, a human should open the URL and confirm the exact wording.** No claim in this file comes from a blog, news site, or aggregator.
- All sources checked 2026-10-07.

---

## 1. Candidate scoring table (33 candidates)

Uncommon: 5 = almost nobody in the audience has heard of it, 1 = everyone knows it.

| # | Tip | Type | Uncommon (1-5) | <10 min | Risk | US/MD applicability | Primary source found | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | Freeze the "hidden" files: ChexSystems, NCTUE, Innovis, LexisNexis | finance | 5 | Y (start 1 or 2) | low | US | Y | **KEEP**. Very uncommon, free, protects bank and phone/utility accounts |
| 2 | IRS Identity Protection PIN opt-in for anyone | finance | 4 | Y (if ID.me already set up) | low | US | Y | **KEEP**. Online tool closes mid-November, so it is timely now |
| 3 | Lock your phone number (Number Lock, SIM Protection, Port Out Protection, Wireless Account Lock) | finance | 4 | Y | low | US | Y (carrier pages) | **KEEP**. Free, 2 minutes in the carrier app |
| 4 | Maryland: medical debt cannot be on your credit report since Oct 1, 2025. Check and dispute | finance | 5 | Y | low | MD | Y | **KEEP**. New law, MD-specific, real money impact |
| 5 | AI audit of an itemized medical bill | AI | 4 | Y | low | US (MD itemized bill right) | Y for facts | **KEEP** |
| 6 | AI finds every recurring charge in a 90-day bank CSV, with yearly cost | AI | 3 | Y | low | US | Y for facts | **KEEP** |
| 7 | AI scan of a Maryland lease for fees, deadlines, deposit terms | AI | 4 | Y | low | MD | Y for facts | **KEEP**. MD Tenants' Bill of Rights effective Oct 1, 2026 makes it timely |
| 8 | OptOutPrescreen.com to stop prescreened credit offers | finance | 3 | Y | low | US | Y | CUT. Good, but slot used by stronger fraud tips. Strong backup |
| 9 | Revoke overdraft opt-in for debit and ATM (Reg E) | finance | 3 | Y | low | US | Y | CUT. Backup. Some banks no longer charge overdraft so impact varies |
| 10 | Request free specialty consumer reports (CFPB list) | finance | 4 | Y | low | US | Y | CUT. Merged into tip 1 as an optional step |
| 11 | Maryland Renters' Tax Credit | finance | 4 | N | low | MD | Y | CUT. 2026 filing deadline was October 1, 2026 (already passed) |
| 12 | Maryland hospital free care under 200% of poverty level | finance | 4 | Y | low | MD | Y | CUT as standalone. Used as context in tip 5 |
| 13 | Ask for an itemized hospital bill | finance | 2 | Y | low | US/MD | Y | CUT as standalone. Used as the input step for tip 5 |
| 14 | No Surprises Act Good Faith Estimate and $400 dispute | finance | 4 | Y | low | US (uninsured/self-pay only) | Y | CUT. Narrow audience (only uninsured or self-pay). Backup |
| 15 | Create my Social Security account to block fraud and check earnings | finance | 3 | N (Login.gov setup) | low | US | Y | CUT. Setup often over 10 min. Backup |
| 16 | IRS Tax Withholding Estimator | finance | 2 | N | low | US | Y | CUT. IRS says it takes about 25 minutes on average |
| 17 | Saver's Credit (up to $2,000 / $4,000 joint) | finance | 3 | N | low | US | Y | CUT. First real step is contributing, not a 10-minute task |
| 18 | Saver's Match (starts tax year 2027) | finance | 4 | N | low | US | Y | CUT. Not actionable until 2027 tax year |
| 19 | Maryland unclaimed property search | finance | 2 | Y | low | MD | Y | CUT. Fairly well known |
| 20 | Issuer virtual card numbers for free trials (Capital One) | finance | 3 | Y | low | US (one issuer) | Y | CUT. Issuer-specific. Eno extension ended Sept 30, 2026, so steps changed |
| 21 | Maryland 529 subtraction up to $2,500 per beneficiary | finance | 3 | N | med | MD | Y | CUT. Leans toward investing, not 10 minutes |
| 22 | HSA: reimburse yourself later, keep receipts | finance | 3 | Y | med | US | Partial | CUT. Search result did not give a clear quotable "no time limit" sentence |
| 23 | Dependent care FSA limit now $7,500 for 2026 (open enrollment) | finance | 4 | Y | low | US | Y | CUT. Only parents with daycare costs. Backup for an open-enrollment post |
| 24 | Health FSA carryover $680 / limit $3,400 for 2026 | finance | 2 | Y | low | US | Y | CUT. Narrow and fairly known |
| 25 | IRS online account: see balance, transcripts, payment history | finance | 3 | N (ID.me) | low | US | Y | CUT. Overlaps tip 2 setup |
| 26 | Gift cards must be good for at least 5 years (federal) | finance | 3 | Y | low | US | Y | CUT. Low dollar impact |
| 27 | DOT automatic airline refunds | finance | 3 | Y | low | US | Y | CUT. DOT has a 2026 enforcement pause on one part, so messaging is messy |
| 28 | Maryland security deposit: 45 days, itemized list, up to 3x damages | finance | 3 | Y | low | MD | Y | CUT as standalone. Used in tip 7 |
| 29 | Maryland: check your utility bill for a third-party energy supplier | finance | 4 | Y | med | MD | Y | CUT. 2024 SB 1 price caps (contracts from Jan 1, 2025) reduce the payoff |
| 30 | USPS Informed Delivery | finance | 2 | Y | low | US | Y | CUT. Already widely used (74.8 million enrolled) |
| 31 | Debt collector 30-day written dispute | finance | 3 | Y | low | US | Y | CUT. Only useful if contacted by a collector |
| 32 | IRS First Time Abate penalty relief | finance | 4 | Y | low | US | Y | CUT. Only useful with a penalty. IRS is moving to automatic relief |
| 33 | AI explains every pay stub deduction / AI drafts a fee-waiver request | AI | 3 | Y | low | US | N (no factual claim needing a source, but nothing to anchor a "why") | CUT. Weaker than tips 5 to 7. Backup AI tips |

Rule check: ACP (ended), IRS Direct File (ended), FTC click-to-cancel rule (vacated 2025), and the CFPB medical-debt credit-report rule (vacated 2025) are NOT used anywhere. Tip 4 relies only on Maryland state law (HB1020), not on the vacated federal rule.

---

## 2. Final 7

### Tip 1. Freeze the 4 "hidden" files most people miss

**Plain explanation:** Freezing Equifax, Experian, and TransUnion does not cover the companies that track your checking accounts (ChexSystems), your phone and utility accounts (NCTUE), and other reports (Innovis, LexisNexis). Each one has its own free freeze.

**Action steps (start one in under 10 minutes, finish the rest later):**
1. ChexSystems: go to chexsystems.com, Security Freeze, Place a Freeze (or call 800-887-7652). Save the PIN it gives you.
2. NCTUE: go to nctueconsumerportal.com (or call 1-866-349-5355) and place a freeze.
3. Innovis: go to innovis.com, Personal, Security Freeze. Keep the 10-digit PIN from the confirmation letter.
4. LexisNexis Risk: go to consumer.risk.lexisnexis.com/freeze (or call 1-800-456-1244).
5. Store all PINs in a password manager. Before opening a new bank account or phone/utility account, temporarily lift the matching freeze.

**Sources (checked 2026-10-07, method SEARCH-PRIMARY):**
- https://www.chexsystems.com/security-freeze/information (chexsystems.com). Quote: "ChexSystems does not charge a fee for placing or lifting a security freeze, though they reserve the right to apply fees as allowed by each state." Phone quote: "Representatives are available to assist during normal business hours 7:00am - 11:00pm Central Time, Monday through Friday at 800.887.7652."
- https://nctue.com/consumer/ (nctue.com). Quote: "A free security freeze can prevent access to your NCTUE credit report, with some exceptions. You can place, request a temporary lift, or remove a security freeze by utilizing the NCTUE consumer portal (nctueconsumerportal.com) or call 1-866-349-5355." Also: "It's the one central place where telco, pay TV, security, internet, and utility companies exchange their customer account data."
- https://www.innovis.com/personal/securityFreeze (innovis.com). Quote: "There is no charge for the addition, temporary lift, or removal of a Security Freeze." Also: "You will receive a confirmation letter by mail that contains a 10-digit Security Freeze PIN."
- https://consumer.risk.lexisnexis.com/freeze (consumer.risk.lexisnexis.com). Quote: "LexisNexis Risk Solutions does not charge a fee to apply, lift or remove a security freeze from your file." Also: "the security freeze will not be in place at TransUnion, Equifax, Experian, Innovis or others."
- https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/consumer-reporting-companies/companies-list/chex-systems/ (consumerfinance.gov). Quote: "ChexSystems collects and reports data on checking account applications, openings, and closures, including reasons for account closure."

**Why it's uncommon:** Freeze advice almost always stops at the big 3. Most people have never heard of NCTUE or Innovis.

**Numbers allowed on a slide:** 4 extra files (count of companies listed, C1 to C4). $0 to freeze at each (C1 to C4). Innovis PIN is 10 digits (C3).

**Proof asset needed:** Source card with the 4 company names plus each "no fee" quote. Optional settings-path screenshot of one freeze page (creator's own, with personal info blurred).

**Risk for a careless follower:** If you freeze ChexSystems or NCTUE, a new bank or phone company may deny you until you lift the freeze, so keep the PINs.

---

### Tip 2. Get an IRS Identity Protection PIN before mid-November

**Plain explanation:** A 6-digit PIN from the IRS that stops anyone else from filing a tax return with your Social Security number. Anyone with an SSN or ITIN can opt in now.

**Action steps:**
1. Go to IRS.gov/IPPIN and choose Get an IP PIN.
2. Sign in with ID.me (or create an ID.me account and verify your identity).
3. Open the IP PIN section of your profile and request the PIN.
4. Save it. Give it only to your tax preparer at filing time. A new one is issued each year in your account.

**Sources (checked 2026-10-07, method SEARCH-PRIMARY):**
- https://www.irs.gov/identity-theft-fraud-scams/get-an-identity-protection-pin (irs.gov). Quote: "An identity protection PIN (IP PIN) is a six-digit number that prevents someone else from filing a tax return using your Social Security number (SSN) or individual taxpayer identification number (ITIN). The IP PIN is known only to you and the IRS." Also: "You may get an IP PIN as a proactive step to protect yourself from tax-related identity theft, even if you are not required to file a tax return."
- Same irs.gov page / IRS FAQ https://www.irs.gov/identity-theft-fraud-scams/frequently-asked-questions-about-the-identity-protection-personal-identification-number-ip-pin. Quote: "The easiest and fastest way to get an IP PIN is with Get my IP PIN, which is available from mid-January through mid-November." Also: "The IRS is using ID.me, a trusted technology provider, to provide verification services."
- https://www.taxpayeradvocate.irs.gov/news/tax-tips/tas-tax-tip-get-an-ippin-to-protect-yourself-from-tax-related-identity-theft-updates-for-2024/2026/01/ (taxpayeradvocate.irs.gov, dated 2026). Quote: "Anyone who has an SSN or individual taxpayer identification number (ITIN) and is able to verify his/her identity is eligible to enroll into the IP PIN program."
- Scam warning (irs.gov newsroom): "The IRS will never ask for your IP PIN. Phone calls, emails or texts asking for your IP PIN are scams."

**Why it's uncommon:** Most people think the IP PIN is only for identity theft victims. Since opt-in opened to everyone, few people know they can just ask for one.

**Numbers allowed on a slide:** 6-digit PIN (C5). Online tool open mid-January through mid-November (C6). Valid one calendar year, new one each year (C7).

**Proof asset needed:** Source card quoting the irs.gov "six-digit number" sentence and the "mid-January through mid-November" sentence.

**Risk for a careless follower:** If you get one, you must enter it on every federal return that year or the e-file will be rejected, and you should never give it to anyone who calls or texts.

---

### Tip 3. Lock your phone number in your carrier app

**Plain explanation:** Scammers can move your number to their phone (SIM swap) or to another carrier (port-out) and then receive your bank texts. All 3 big carriers now have a free lock switch.

**Action steps (about 2 minutes):**
1. Verizon: My Verizon app, Account (or Me) tab, Edit profile and settings, Security, turn on **Number Lock** and **SIM Protection** for each line.
2. T-Mobile: T-Life app, Manage tab, gear icon, Security, **SIM Protection** toggle. Then Manage tab, See Plans, Manage add-ons, check **Port Out Protection**, Continue.
3. AT&T: AT&T app, person icon, **Wireless account lock**, swipe to lock.
4. Before you upgrade your phone or switch carriers, turn the lock off first.

**Sources (checked 2026-10-07, method SEARCH-PRIMARY):**
- https://www.verizon.com/support/knowledge-base-309293/ (verizon.com). Quote: "You can set up Number Lock for free to protect your mobile number from an unauthorized move." Also: "At no cost to you, SIM Protection offers you the ability to lock the lines on your account to prohibit changes to the SIM cards associated with those lines."
- https://www.verizon.com/about/account-security/unauthorized-port-outs (verizon.com). Quote: "a Locked line cannot process a Port Out until Number Lock is disabled."
- https://www.t-mobile.com/support/plans-features/sim-protection/ and https://www.t-mobile.com/support/plans-features/help-with-t-mobile-account-fraud (t-mobile.com). Quote: "SIM Protection is a free feature offered to all T-Mobile Postpaid customers. It prevents bad actors from moving your number to another device and using it for fraud." Also: "Port Out Protection is a free feature offered to all T-Mobile Postpaid, T-Mobile for Business, T-Mobile Prepaid, and Metro by T-Mobile customers."
- https://www.att.com/support/article/wireless/000102016/ and https://about.att.com/story/2025/wireless-account-lock.html (att.com). Quote: "AT&T has introduced a free feature for extra protection from unauthorized changes to your AT&T wireless account." Steps quote: "Open the AT&T app and sign in, if asked. Tap the person icon. Scroll to and select Wireless account lock. Swipe to lock or tap Unlock the account."
- Context, https://consumer.ftc.gov/consumer-alerts/2019/10/sim-swap-scams-how-protect-yourself and https://www.fcc.gov/sites/default/files/sim_swap_tip_card.pdf (ftc.gov / fcc.gov). FCC order text: "the bad actor can now intercept text messages and phone calls used to authenticate a customer's financial, social media, and other accounts" (https://docs.fcc.gov/public/attachments/FCC-23-95A1.pdf).

**Why it's uncommon:** People set a carrier PIN at most. Few know there is a separate on/off lock in the app.

**Numbers allowed on a slide:** $0 (C8 to C10). 3 carriers (count). Do NOT cite FCC rule compliance dates. The FCC compliance timeline was waived and synchronized, and the current status could not be confirmed. Cite the carrier pages only.

**Proof asset needed:** Settings-path screenshot from the creator's own carrier app (number blurred), plus a source card quoting the carrier "free" sentence.

**Risk for a careless follower:** A locked line will block your own upgrade or carrier switch until you unlock it.

---

### Tip 4. Maryland: medical debt is not allowed on your credit report anymore. Check yours.

**Plain explanation:** Since October 1, 2025, Maryland law bans medical providers and debt collectors from reporting medical debt, and bans credit bureaus from keeping it on your report. If you see one, you can get it removed.

**Action steps:**
1. Go to AnnualCreditReport.com (free, weekly) and pull Equifax, Experian, and TransUnion.
2. Search each report for collections or accounts from hospitals, doctors, labs, ambulance companies, or medical billing collectors.
3. If you find one, file a dispute with that bureau saying it is medical debt that Maryland law bars from credit reports.
4. If it is not fixed, file a complaint with the Maryland Office of Financial Regulation, 410-230-6077.
5. Got a hospital bill you can't pay? Maryland gives you 240 days from the first bill to apply for the hospital's financial assistance.

**Sources (checked 2026-10-07, method SEARCH-PRIMARY):**
- https://labor.maryland.gov/finance/advisories/advisory-ind-collectionmedicaldebt.shtml (labor.maryland.gov, MD Office of Financial Regulation). Quote: "The Maryland Office of Financial Regulation (OFR) issued formal guidance on three bills effective October 1, 2025, related to the collection of medical debt passed by the Maryland General Assembly in 2025: HB428, HB1020, and HB268." Also: "HB1020 prohibits providers of medical services, devices, or products from disclosing any medical debt information to a consumer reporting agency." Also: "Consumer reporting agencies may not create, furnish, or maintain a report that contains any adverse information an agency knows, or should know, relates to medical debt." Also: "HB1020 also prohibits using medical debt information to determine a consumer's creditworthiness."
- https://www.labor.maryland.gov/finance/advisories/advisory-guidancecollectionmedicaldebt.pdf (consumer advisory). Quote: "Neither a debt collector, nor anyone who provides medical services, may report medical debt to a consumer reporting agency." Also: "Review a copy of your credit report by visiting AnnualCreditReport.com." Also: "Contact the consumer reporting agency if any information prohibited under the new laws is on the report to determine if it may be removed." Also: "Patients have 240 days from receiving their first bill to submit an application for financial assistance, and during that period, a hospital may not file an action to collect on the debt." Also: "A hospital cannot file a lawsuit to collect a debt against a patient for a medical debt that is less than $500.00." Contact: "Contact the Maryland Office of Financial Regulation at 410-230-6077."
- https://consumer.ftc.gov/consumer-alerts/2023/10/you-now-have-permanent-access-free-weekly-credit-reports (consumer.ftc.gov). Quote: "All three nationwide credit bureaus have permanently extended a program that lets you check your credit report from each once a week for free at AnnualCreditReport.com."

**Why it's uncommon:** It is a new state law (Oct 2025), and the federal version was struck down in 2025, so most people assume medical debt still counts.

**Numbers allowed on a slide:** October 1, 2025 effective date (C12). 240 days to apply for hospital financial assistance (C14). Hospitals cannot sue over medical debt under $500 (C15). Weekly free reports (C16). OFR phone 410-230-6077 (C17).

**Proof asset needed:** Source card quoting the labor.maryland.gov advisory sentence on consumer reporting agencies.

**Risk for a careless follower:** Removing it from your credit report does not erase the bill. You may still owe it, and this is Maryland-only.

---

### Tip 5 (AI). Have AI audit your itemized medical bill before you pay

**Plain explanation:** Ask the provider for the itemized bill (not the summary), redact your personal info, and have a chatbot table every line, flag duplicates and vague items, and write questions for the billing office.

**Input document:** An itemized hospital or provider bill (line items with dates, codes, descriptions, quantities, charges). For the carousel demo, the main agent should use a clearly fictional sample bill and label it "sample".

**Action steps:**
1. Call or message the billing office: "Please send me a detailed itemized bill." (In Maryland you can ask at any time.)
2. Black out or delete your name, account number, member ID, date of birth, and address.
3. Open an AI chatbot. Use a private mode (Claude incognito chat or ChatGPT Temporary Chat) or turn off model training.
4. Paste the prompt below plus the bill text (or upload the redacted PDF).
5. Call the billing office with the questions it writes. Check anything flagged against your EOB and records.

**Exact prompt:**
```
First: I have deleted my name, account number, member ID, and birth date from this bill. Do not ask me for them.

Below is my itemized medical bill. Please:
1. Make a table of every line: date, code, description, quantity, charge.
2. Flag any line that appears more than once with the same date and code.
3. Flag any quantity that looks unusual and any vague item like "supplies" or "misc."
4. Add up the lines and tell me if your total matches the bill total.
5. Write 5 short, polite questions I can ask the billing office about the flagged lines.
If you are not sure what a code means, say "check this code" instead of guessing.

[paste bill here]
```

**Sources (checked 2026-10-07, method SEARCH-PRIMARY):**
- https://www.cms.gov/medical-bill-rights/help/guides/bill-errors (cms.gov). Quote: "Make sure you weren't billed twice for the same service. Double billing is especially common if you got care from more than one provider." Also: "Ask your provider for a copy of your medical records. Compare them to your bill. You shouldn't get a bill for anything that isn't documented in your records."
- https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights/get-help/find-action-plan-your-medical-bill/action-plan-received-bill-not-using-health-insurance (cms.gov). Quote: "If something doesn't look right, ask for an itemized list of charges."
- https://hscrc.maryland.gov/Documents/public-interest/PatientInfo/MD_HospPatientInfoFAQs.pdf and COMAR 10.37.10.26 materials on hscrc.maryland.gov. Quote: "At any time, patients may request a copy of their detailed itemized bill." (Maryland hospitals)
- https://support.claude.com/en/articles/12260368-use-incognito-chats (support.claude.com). Quote: "Incognito chats are not used for training." Also: "they are retained for either 30 days (default)".
- https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt (help.openai.com). Quote: "Temporary chats do not appear in your chat history, do not create or update memories, are not used to improve OpenAI models, and may be retained for up to 30 days for safety purposes."

**Why it's uncommon:** Most people pay the summary bill. Few ask for the itemized version, and fewer know a chatbot can line-check it in a minute.

**Numbers allowed on a slide:** None needed beyond the real AI output. Optional: "30 days" retention for private chats (C22, C23).

**Proof asset needed:** Real AI output from running this exact prompt on the fictional sample itemized bill (screenshot or transcript), labeled "sample bill". Do not fabricate output.

**Risk for a careless follower:** AI can misread codes, so treat its flags as questions to ask, not proof of an error, and never paste unredacted IDs.

---

### Tip 6 (AI). Have AI find every subscription hiding in your last 90 days

**Plain explanation:** Download a CSV of your bank or card transactions and let a chatbot list every repeating charge with its yearly cost.

**Input document:** A 90-day transaction CSV export from a checking account or credit card. For the demo, use a fictional sample CSV.

**Action steps:**
1. On a computer, log in to your bank. Chase: download transactions as a spreadsheet (CSV). Ally: open the account, Transactions History, download icon, CSV. Other banks have a similar "Download" button on the activity page.
2. Open the file and delete any column with account or card numbers.
3. Open a chatbot in private mode, upload the CSV, paste the prompt.
4. Cancel or downgrade anything you don't use. Do it directly with the merchant.

**Exact prompt:**
```
First: I deleted all account and card numbers from this file.

This CSV is my last 90 days of bank transactions. Please:
1. Find every charge that repeats (same merchant, similar amount, weekly, monthly, or yearly).
2. Make a table: merchant, amount, how often, dates seen, estimated yearly cost (weekly x 52, monthly x 12).
3. Sort by yearly cost, highest first, and show the total yearly cost at the bottom.
4. List any merchant names that don't look like a well-known company so I can check them.
Only use transactions that are in the file. Do not guess.
```

**Sources (checked 2026-10-07, method SEARCH-PRIMARY):**
- https://www.chase.com/personal/banking/education/budgeting-saving/what-is-chase-spending-planner (chase.com). Quote: "If you access Chase Spending Planner via your desktop computer, you'll be able to download transactions in a spreadsheet (CSV), Quicken Web Connect (QFX), Quicken or Microsoft Money (QIF), or QuickBooks Web Connect (QBO) format for the last two years."
- https://www.ally.com/help/bank/account-information/ (ally.com). Quote: "To download Ally Bank activity, log in, select the account, then scroll to the Transactions History and select the download icon. You can download and save your account activity in a Comma Separated Value (CSV) file or a Quicken (QFX) file."
- Privacy sources same as Tip 5 (support.claude.com incognito, help.openai.com data controls). Model-training toggle: https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings. Quote: "under 'Help Improve our AI models,' toggle the button off/on." OpenAI: "When 'Improve the model for everyone' is off, your new conversations won't be used to train OpenAI models."

**Why it's uncommon:** People scroll their app looking for subscriptions. Few know the bank lets you download a CSV, or that a chatbot can annualize every repeat charge at once.

**Numbers allowed on a slide:** Chase CSV covers up to 2 years (C19). Any dollar figures must come only from the real AI output on the sample file and be labeled "sample".

**Proof asset needed:** Real AI output from running this prompt on the fictional 90-day sample CSV. Settings-path note "Download > CSV" (cite C19, C20).

**Risk for a careless follower:** Never upload a file with full account or card numbers, and confirm each "subscription" before canceling something you actually need.

---

### Tip 7 (AI). Maryland renters: have AI pull every fee and deadline out of your lease

**Plain explanation:** Maryland's new Tenants' Bill of Rights took effect October 1, 2026. Have a chatbot turn your lease into a one-page list of every fee, deadline, and deposit rule, with the exact lease sentence for each.

**Input document:** A residential lease (PDF or text). For the demo, use a fictional sample Maryland lease.

**Action steps:**
1. Find your lease PDF. Delete your name, unit address, and any payment account numbers.
2. Open a chatbot in private mode, upload the lease, paste the prompt.
3. Put the deadlines it finds in your calendar (rent due date, renewal notice, move-out notice).
4. Moving out? Send your landlord a certified letter at least 15 days before you leave if you want to be at the move-out inspection.

**Exact prompt:**
```
First: I removed my name, address, and any account numbers from this lease.

This is my Maryland apartment lease. In plain English, list:
1. Every fee or charge besides rent, with the amount.
2. Every deadline or notice period (rent due date, late fee timing, renewal, move-out notice).
3. What happens if I end the lease early.
4. Who pays which utilities and who handles repairs.
5. The security deposit amount and any rules about getting it back.
For each item, quote the exact lease sentence and give the section number.
Then list anything you could not find. Do not give legal advice. Mark items I should double-check against the Maryland Tenants' Bill of Rights.
```

**Sources (checked 2026-10-07, method SEARCH-PRIMARY):**
- https://dhcd.maryland.gov/media/490 and https://dhcd.maryland.gov/Tenant-Landlord-Affairs/Documents/Tenant-Bill-of-Rights-V2.pdf (dhcd.maryland.gov). Title: "MARYLAND TENANTS' BILL OF RIGHTS (Effective October 1, 2026)". Quote: "If you plan to move out and want the right to be present during the inspection, you must send your landlord a certified letter at least 15 days before leaving." Also: "Your landlord must return the rest of your deposit with interest within 45 days." Also: "landlords may not require tenants to pay more than the sum of the first month's rent and the security deposit before moving in."
- https://dhcd.maryland.gov/TurningTheKey/Documents/HB693-Handout-for-Renters.pdf (dhcd.maryland.gov). Quote: "In most cases, a landlord may not require you to pay a security deposit higher than one month's rent." Also: "you may sue the landlord for up to three times the amount the landlord did not return."
- Privacy sources same as Tip 5.

**Why it's uncommon:** Almost nobody rereads a lease after signing. The Bill of Rights is days old.

**Numbers allowed on a slide:** October 1, 2026 effective date (C24). 15 days certified letter (C25). 45 days deposit return (C26). Deposit usually capped at 1 month's rent (C27). Up to 3x damages (C28).

**Proof asset needed:** Real AI output from running this prompt on the fictional sample lease. Source card quoting the DHCD 15-day and 45-day sentences.

**Risk for a careless follower:** The AI summary is not legal advice and can miss clauses, so check the quoted lease sentences yourself and call DHCD or legal aid for disputes.

---

## 3. Verification gaps and notes for the main agent

1. Word-for-word quotes: all quotes come from WebSearch restricted to the primary domain because direct page fetch was blocked. Confirm exact wording on the live page before showing a quote as a screenshot.
2. FCC SIM-swap rules: the FCC compliance date for the 2023 rules was waived and synchronized pending OMB review, and an FCC 2026 document (DA 26-43) exists but its content could not be read. So Tip 3 cites carrier pages only. Do not say "the FCC requires carriers to..." on slides.
3. Tip 2 timing: "10 minutes" holds only if the person already has ID.me. New ID.me verification can take longer. The online tool closes mid-November, which is the urgency hook.
4. Tip 1 timing: one freeze fits in 10 minutes. All four may take longer. Slide copy should say "start with one".
5. AI tips: no outputs were generated here. The main agent must create fictional sample documents (bill, CSV, lease), label them "sample", run the exact prompts, and capture the real output.
6. Maryland Renters' Tax Credit was cut because the 2026 deadline (October 1, 2026) already passed.

---

## 4. Claims Ledger (slides and caption may use ONLY these)

All checked 2026-10-07. Method for all: SEARCH-PRIMARY (WebSearch restricted to the listed primary domain).

| ID | Claim | URL | Quote |
|---|---|---|---|
| C1 | ChexSystems does not charge to place or lift a freeze (state fees may apply) | https://www.chexsystems.com/security-freeze/information | "ChexSystems does not charge a fee for placing or lifting a security freeze, though they reserve the right to apply fees as allowed by each state." |
| C2 | NCTUE freeze is free and placed via nctueconsumerportal.com or 1-866-349-5355. NCTUE holds telecom, pay TV, internet, and utility account data | https://nctue.com/consumer/ | "A free security freeze can prevent access to your NCTUE credit report, with some exceptions. You can place, request a temporary lift, or remove a security freeze by utilizing the NCTUE consumer portal (nctueconsumerportal.com) or call 1-866-349-5355." |
| C3 | Innovis freeze is free and comes with a 10-digit PIN | https://www.innovis.com/personal/securityFreeze | "There is no charge for the addition, temporary lift, or removal of a Security Freeze." / "a confirmation letter by mail that contains a 10-digit Security Freeze PIN." |
| C4 | LexisNexis Risk freeze is free and does not carry over to the big 3 | https://consumer.risk.lexisnexis.com/freeze | "LexisNexis Risk Solutions does not charge a fee to apply, lift or remove a security freeze from your file." / "the security freeze will not be in place at TransUnion, Equifax, Experian, Innovis or others." |
| C4a | ChexSystems tracks checking account openings and closures | https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/consumer-reporting-companies/companies-list/chex-systems/ | "ChexSystems collects and reports data on checking account applications, openings, and closures, including reasons for account closure." |
| C5 | IRS IP PIN is a 6-digit number that blocks others from filing a return with your SSN or ITIN | https://www.irs.gov/identity-theft-fraud-scams/get-an-identity-protection-pin | "An identity protection PIN (IP PIN) is a six-digit number that prevents someone else from filing a tax return using your Social Security number (SSN) or individual taxpayer identification number (ITIN)." |
| C5a | Anyone with an SSN or ITIN who can verify identity can get one | https://www.taxpayeradvocate.irs.gov/news/tax-tips/tas-tax-tip-get-an-ippin-to-protect-yourself-from-tax-related-identity-theft-updates-for-2024/2026/01/ | "Anyone who has an SSN or individual taxpayer identification number (ITIN) and is able to verify his/her identity is eligible to enroll into the IP PIN program." |
| C6 | The online Get an IP PIN tool is available mid-January through mid-November | https://www.irs.gov/identity-theft-fraud-scams/frequently-asked-questions-about-the-identity-protection-personal-identification-number-ip-pin | "The easiest and fastest way to get an IP PIN is with Get my IP PIN, which is available from mid-January through mid-November." |
| C7 | IP PIN is valid one calendar year and the IRS never asks for it | https://www.irs.gov/newsroom/identity-protection-pins-help-taxpayers-guard-against-tax-related-identity-theft | "An IP PIN is valid for one calendar year, and a new IP PIN is generated each year for your account." / "The IRS will never ask for your IP PIN." |
| C8 | Verizon Number Lock and SIM Protection are free | https://www.verizon.com/support/knowledge-base-309293/ | "You can set up Number Lock for free to protect your mobile number from an unauthorized move." / "At no cost to you, SIM Protection offers you the ability to lock the lines on your account to prohibit changes to the SIM cards associated with those lines." |
| C9 | T-Mobile SIM Protection and Port Out Protection are free | https://www.t-mobile.com/support/plans-features/sim-protection/ | "SIM Protection is a free feature offered to all T-Mobile Postpaid customers." / "Port Out Protection is a free feature offered to all T-Mobile Postpaid, T-Mobile for Business, T-Mobile Prepaid, and Metro by T-Mobile customers." |
| C10 | AT&T Wireless Account Lock is free and stops SIM swaps and number transfers | https://about.att.com/story/2025/wireless-account-lock.html | "AT&T has introduced a free feature for extra protection from unauthorized changes to your AT&T wireless account." / "it prevents anyone from buying a device on the account, or conducting a SIM swap" |
| C11 | A SIM swap lets a scammer receive the texts and calls used to log in to your bank and other accounts | https://docs.fcc.gov/public/attachments/FCC-23-95A1.pdf | "the bad actor can now intercept text messages and phone calls used to authenticate a customer's financial, social media, and other accounts" |
| C12 | Maryland medical debt laws took effect October 1, 2025 | https://labor.maryland.gov/finance/advisories/advisory-ind-collectionmedicaldebt.shtml | "three bills effective October 1, 2025, related to the collection of medical debt" |
| C13 | In Maryland, medical providers and debt collectors cannot report medical debt, and credit bureaus cannot keep adverse medical debt info on reports | https://www.labor.maryland.gov/finance/advisories/advisory-guidancecollectionmedicaldebt.pdf | "Neither a debt collector, nor anyone who provides medical services, may report medical debt to a consumer reporting agency." / "A consumer reporting agency cannot create a report that includes any adverse information about a medical debt, including any collection activity" |
| C13a | Lenders cannot use medical debt to judge creditworthiness (MD) | https://labor.maryland.gov/finance/advisories/advisory-ind-collectionmedicaldebt.shtml | "HB1020 also prohibits using medical debt information to determine a consumer's creditworthiness." |
| C14 | Maryland patients get 240 days from the first bill to apply for hospital financial assistance | https://www.labor.maryland.gov/finance/advisories/advisory-guidancecollectionmedicaldebt.pdf | "Patients have 240 days from receiving their first bill to submit an application for financial assistance" |
| C15 | Maryland hospitals cannot sue over medical debt under $500 | https://www.labor.maryland.gov/finance/advisories/advisory-guidancecollectionmedicaldebt.pdf | "A hospital cannot file a lawsuit to collect a debt against a patient for a medical debt that is less than $500.00" |
| C16 | Free weekly credit reports at AnnualCreditReport.com are permanent | https://consumer.ftc.gov/consumer-alerts/2023/10/you-now-have-permanent-access-free-weekly-credit-reports | "All three nationwide credit bureaus have permanently extended a program that lets you check your credit report from each once a week for free at AnnualCreditReport.com." |
| C17 | MD Office of Financial Regulation takes complaints at 410-230-6077 | https://www.labor.maryland.gov/finance/advisories/advisory-guidancecollectionmedicaldebt.pdf | "Contact the Maryland Office of Financial Regulation at 410-230-6077" |
| C18 | Maryland hospital patients can request a detailed itemized bill at any time | https://hscrc.maryland.gov/Documents/public-interest/PatientInfo/MD_HospPatientInfoFAQs.pdf | "At any time, patients may request a copy of their detailed itemized bill." |
| C18a | Double billing is especially common when you saw more than one provider | https://www.cms.gov/medical-bill-rights/help/guides/bill-errors | "Make sure you weren't billed twice for the same service. Double billing is especially common if you got care from more than one provider." |
| C18b | You shouldn't be billed for anything not in your records | https://www.cms.gov/medical-bill-rights/help/guides/bill-errors | "You shouldn't get a bill for anything that isn't documented in your records." |
| C19 | Chase lets you download up to 2 years of transactions as CSV on desktop | https://www.chase.com/personal/banking/education/budgeting-saving/what-is-chase-spending-planner | "you'll be able to download transactions in a spreadsheet (CSV) ... format for the last two years." |
| C20 | Ally lets you download account activity as CSV | https://www.ally.com/help/bank/account-information/ | "You can download and save your account activity in a Comma Separated Value (CSV) file or a Quicken (QFX) file." |
| C21 | Claude has a setting to stop chats being used to train models | https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings | "under 'Help Improve our AI models,' toggle the button off/on." |
| C22 | Claude incognito chats are not used for training and are kept 30 days by default | https://support.claude.com/en/articles/12260368-use-incognito-chats | "Incognito chats are not used for training." / "they are retained for either 30 days (default)" |
| C23 | ChatGPT Temporary Chats are not used to improve models and may be kept up to 30 days | https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt | "Temporary chats do not appear in your chat history, do not create or update memories, are not used to improve OpenAI models, and may be retained for up to 30 days for safety purposes." |
| C24 | The Maryland Tenants' Bill of Rights is effective October 1, 2026 | https://dhcd.maryland.gov/media/490 | "MARYLAND TENANTS' BILL OF RIGHTS (Effective October 1, 2026)" |
| C25 | To be present at the move-out inspection, send a certified letter at least 15 days before leaving | https://dhcd.maryland.gov/Tenant-Landlord-Affairs/Documents/Tenant-Bill-of-Rights-V2.pdf | "If you plan to move out and want the right to be present during the inspection, you must send your landlord a certified letter at least 15 days before leaving." |
| C26 | Landlord must return the rest of the deposit with interest within 45 days | https://dhcd.maryland.gov/Tenant-Landlord-Affairs/Documents/Tenant-Bill-of-Rights-V2.pdf | "Your landlord must return the rest of your deposit with interest within 45 days." |
| C27 | In most cases a Maryland security deposit cannot exceed one month's rent | https://dhcd.maryland.gov/TurningTheKey/Documents/HB693-Handout-for-Renters.pdf | "In most cases, a landlord may not require you to pay a security deposit higher than one month's rent." |
| C28 | A tenant may sue for up to 3 times the deposit amount not returned | https://dhcd.maryland.gov/TurningTheKey/Documents/HB693-Handout-for-Renters.pdf | "you may sue the landlord for up to three times the amount the landlord did not return." |

Backup claims (only if a backup tip is swapped in):

| ID | Claim | URL | Quote |
|---|---|---|---|
| B1 | OptOutPrescreen stops prescreened offers for 5 years, or permanently by signed form | https://consumer.ftc.gov/articles/what-know-about-prescreened-offers-credit-and-insurance | "you can opt out for five years by going to optoutprescreen.com or calling 1-888-5-OPT-OUT (1-888-567-8688)." |
| B2 | Banks can charge overdraft fees on one-time debit and ATM only if you opted in, and you can revoke anytime | https://www.consumerfinance.gov/rules-policy/regulations/1005/17/ | "A consumer may revoke consent at any time in the manner made available to the consumer for providing consent" |
| B3 | Uninsured or self-pay: bill $400+ over the Good Faith Estimate can be disputed within 120 days | https://www.cms.gov/medical-bill-rights/know-your-rights/no-insurance | "a bill from a provider that's at least $400 more than the expected charges on the good faith estimate" / "You have to start a dispute within 120 days" |
| B4 | Dependent care FSA limit is $7,500 for 2026 | https://www.irs.gov/publications/p15b | "the annual dependent care FSA limit was raised from $5,000 to $7,500" |
| B5 | Maryland hospitals must give free medically necessary care at or below 200% of the federal poverty level | https://hscrc.maryland.gov/ (COMAR 10.37.10.26 documents) | "free medically necessary care to patients with family income at or below 200 percent of the federal poverty level" |

## 5. AI run ledger (added by the main agent, 2026-10-07)

Every AI tip was actually run. Prompts are the exact prompts from Tips 5 to 7 above, sent with a fictional sample document attached. Runs used Claude through the Claude Code CLI in print mode with tools turned off and a plain assistant system prompt. Outputs are saved unedited. Slides quote them verbatim (QA checks every excerpt cell against the output file).

| ID | Claim | Evidence file | Quote |
|---|---|---|---|
| AI-1 | On the sample bill, the AI flagged both repeated codes and caught that the bill total was $100 higher than the lines | assets/ai-runs/output-medical-bill.md | "The total does not match. The bill's total is $100.00 more than the lines add up to." |
| AI-2 | On the sample 90-day CSV, the AI listed 8 recurring charges with a yearly total | assets/ai-runs/output-subscriptions.md | "Total ... $2,337.28" |
| AI-3 | On the sample lease, the AI listed every fee with the section number and exact sentence | assets/ai-runs/output-lease.md | "Recurring monthly total, before optional items: $1,850 + $35 + $25 = $1,910" |

Honesty note on AI-1: the sample bill's $2,753.00 total was a genuine arithmetic slip made while writing the sample, not a planted error. The 10 lines add to $2,653.00 (checked with python). The AI found it without being told. The two repeated codes (85025 and 96374) were planted on purpose. Slides only say what the output says.

Platform limits checked 2026-10-07 for the caption (secondary sources, platform help pages blocked by the proxy): Instagram caps hashtags at 5 per post since December 2025 (later.com, lilachbullock.com). TikTok is rolling out the same 5 cap (recurpost.com). Instagram caption max 2,200 characters. TikTok description max 4,000 characters in app.
