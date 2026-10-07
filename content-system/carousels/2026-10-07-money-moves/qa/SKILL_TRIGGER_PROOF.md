# Skill auto-trigger proof

Date: 2026-10-07. The skill was installed at `~/.claude/skills/motion-carousel/` in the cloud session, then each request below was sent to a fresh headless Claude Code session (`claude -p ... --output-format stream-json --max-turns 2 --allowed-tools Skill`). The request text never names the skill. The table records whether the session's first tool call was the Skill tool loading `motion-carousel`.

| Test | Request | Should trigger | Triggered | Result | First tool call |
|---|---|---|---|---|---|
| t1 | Make me an Instagram carousel about 5 ways to cut my grocery bill | yes | yes | PASS | `{"tool": "Skill", "input": {"skill": "motion-carousel", "args": "5 ways to cut my grocery bill \u2014 Instagram carousel"}}` |
| t2 | I need a swipe post for TikTok on budgeting apps, can you do it? | yes | yes | PASS | `{"tool": "Skill", "input": {"skill": "motion-carousel", "args": "TikTok swipe post (carousel) on budgeting apps"}}` |
| t3 | Turn these 6 credit tips into slides for my IG | yes | yes | PASS | `{"tool": "Skill", "input": {"skill": "motion-carousel"}}` |
| t4 | Build me a slide deck for my quarterly board meeting next week | no | no | PASS | `none` |

t4 is the negative control: a meeting deck is not a social carousel, and the description says so.
