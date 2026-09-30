# Website leads → Google Sheet (+ instant alerts)

Every coaching application and contact-form enquiry from the website:

1. lands in a new **Website Leads** tab in the *Vinfinity Systems* sheet, newest on top, with a red **New** status;
2. emails the team immediately, with one-tap **Call / Zalo / WhatsApp** links;
3. optionally pings a **Telegram** group and/or sends an **SMS**.

## One-time setup (about 5 minutes)

Use a **separate** Apps Script project. The sheet already has automations (Events, Booked Calls), and a second `doPost` in the same project would break them.

1. Go to **script.google.com**, click **New project**, and name it `VFS Website Leads`.
2. Delete the sample code, then paste in all of [`Code.gs`](Code.gs).
3. At the top, set `NOTIFY_EMAILS` to everyone who should get lead alerts (comma-separated).
4. Pick **setup** in the function dropdown and click **Run**. Approve the permissions: sheets, send email, external requests. This creates and formats the **Website Leads** tab.
5. Pick **sendTestLead** and click **Run**. Check that a test row appears in the tab and the alert email arrives. Then delete the test row.
6. Click **Deploy → New deployment**, then the gear icon → **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
7. Paste that URL into `LEADS_ENDPOINT` in [`../js/leads.js`](../js/leads.js), then commit and push.

> Changing `Code.gs` later? Use **Deploy → Manage deployments → Edit → New version**. That keeps the same URL.

## What's in the tab

`timestamp · status · contacted_by · first_contact_at · notes` come first for the sales team. Then come the lead's details, their application answers, and ad attribution (`utm_*`, `landing_page`). Phone numbers are stored as text, so `+84…` / `+1 …` never turn into `#ERROR!`.

Status options: New, Contacted, No answer, Call booked, Not a fit, Closed won, Closed lost.

## Instant alerts: options

| Option | Cost | Setup | Best for |
|---|---|---|---|
| **Email** (built in) | Free | Just `NOTIFY_EMAILS` | Always on as a backup |
| **Telegram group bot** | Free | ~3 min | Instant phone push to the whole team, works in VN + US |
| **SMS via Twilio** | ~$0.01–0.08 / text + number | ~15 min | Texting US numbers |

### Telegram (recommended)

1. In Telegram, message **@BotFather**, send `/newbot`, and copy the **token**.
2. Create a group (e.g. "VFS Leads"), add your team and the new bot.
3. Send any message in the group, then open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy the `chat.id` (a negative number).
4. In Apps Script, open **Project Settings → Script properties** and add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.

### SMS (Twilio)

Add the script properties `TWILIO_SID`, `TWILIO_TOKEN`, `TWILIO_FROM` (your Twilio number) and `SMS_TO` (comma-separated, e.g. `+17145550100,+84901234567`). Texting Vietnamese numbers from a foreign sender ID is often filtered by carriers, so for the VN team, Telegram (or Zalo) is more reliable.
