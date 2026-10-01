# 1-on-1 coaching applications → Google Sheet + Telegram

Every coaching application submitted on the website:

1. lands in a new **1-1 Coaching Applications** tab in the *Vinfinity Systems* sheet, newest on top, with a red **New** status;
2. posts to your team's **Telegram group** right away, with the lead's details and **Zalo / WhatsApp / Open sheet** buttons, so someone can call within minutes.

## Setup (about 10 minutes)

### 1. Add the script to the sheet

1. Open the *Vinfinity Systems* sheet and click **Extensions → Apps Script**.
2. Delete the sample code, paste in all of [`Code.gs`](Code.gs), and click **Save** (💾).
3. In the function dropdown at the top, pick **setup** and click **Run**. Approve the permissions: Google shows an "unverified app" screen for your own scripts; click **Advanced → Go to project**. This creates and formats the **1-1 Coaching Applications** tab.

### 2. Create the Telegram bot

1. In Telegram, open **@BotFather**, send `/newbot`, and follow the prompts (e.g. name `VFS Leads`, username `vfs_leads_bot`). Copy the **token** it gives you.
2. Create a Telegram group (e.g. **VFS Leads**), add the team members who call leads, and add your new bot.
3. Send any message in the group (e.g. `hi`), so the bot can see the group.
4. Back in Apps Script, open **Project Settings** (⚙️) → **Script properties** → **Add script property**:
   - Property: `TELEGRAM_BOT_TOKEN`, Value: the token from BotFather → **Save**.
5. Go back to the editor, pick **getTelegramChatId** and click **Run**. It finds your group and saves its ID automatically. The log shows `Saved TELEGRAM_CHAT_ID = -100…`.
6. Pick **sendTestApplication** and click **Run**. You should see a test row in the tab and a message in the Telegram group. Delete the test row.

### 3. Connect the website

1. Click **Deploy → New deployment**, then the ⚙️ next to "Select type" → **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
2. Put that URL in `LEADS_ENDPOINT` in [`../js/leads.js`](../js/leads.js), then commit and push. Or send it to Claude to do it.

> Changing `Code.gs` later? Use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. That keeps the same URL, so the website doesn't need updating.

## The tab

| Columns | For |
|---|---|
| `timestamp`, `status`, `contacted_by`, `first_contact_at`, `notes` | The sales team. Status is a dropdown: New (red) → Contacted / No answer → Call booked → Closed won / lost, or Not a fit |
| `full_name` … `goal_6_12_months`, `acknowledged` | The applicant's details and every answer |
| `lang`, `utm_*`, `landing_page`, `referrer`, `raw_payload` | Which ad/page they came from, plus the full original submission |

Phone numbers are stored as text, so `+84…` / `+1 …` never turn into `#ERROR!`.

## Options

- **Email alerts too:** set `NOTIFY_EMAILS` at the top of `Code.gs` (comma-separated), save, and deploy a new version.
- **Applicants who say they can't invest** still get logged, but the Telegram alert is marked ⚠️ *not ready to invest* so the team can prioritize.
