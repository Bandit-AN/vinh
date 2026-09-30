/**
 * VFS Private Training — website leads → "Vinfinity Systems" sheet
 *
 * Receives both website forms (coaching application + contact form),
 * writes each one to the "Website Leads" tab (newest on top),
 * and alerts the team by email (and optionally Telegram / SMS).
 *
 * Setup: see apps-script/README.md in the website repo.
 */

// ===== Settings =====
const SPREADSHEET_ID = '18k8U9lYlD-oFgBpwSZdQ3QBR3Q7fV9NproPX_3qbhX8';
const TAB_NAME = 'Website Leads';
const TIMEZONE = 'Asia/Ho_Chi_Minh';

// Who gets an email for every new lead (comma-separated).
const NOTIFY_EMAILS = 'vophucvinh582@gmail.com';

// Optional, set in Project Settings → Script properties (keeps secrets out of code):
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID          → instant push to a Telegram group
//   TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM, SMS_TO → SMS (SMS_TO comma-separated, +E.164 format)

const STATUSES = ['New', 'Contacted', 'No answer', 'Call booked', 'Not a fit', 'Closed won', 'Closed lost'];

// Column order in the tab. `key` = field sent by the website.
const COLUMNS = [
  { key: 'timestamp',        title: 'timestamp',         width: 140 },
  { key: 'status',           title: 'status',            width: 110 },
  { key: 'contacted_by',     title: 'contacted_by',      width: 120 },
  { key: 'first_contact_at', title: 'first_contact_at',  width: 140 },
  { key: 'notes',            title: 'notes',             width: 220 },
  { key: 'lead_type',        title: 'lead_type',         width: 100 },
  { key: 'full_name',        title: 'full_name',         width: 160 },
  { key: 'phone',            title: 'phone',             width: 130 },
  { key: 'email',            title: 'email',             width: 200 },
  { key: 'country',          title: 'country',           width: 110 },
  { key: 'service',          title: 'service',           width: 170 },
  { key: 'investment_ready', title: 'investment_ready',  width: 220 },
  { key: 'start_timeline',   title: 'start_timeline',    width: 140 },
  { key: 'goal',             title: 'goal',              width: 170 },
  { key: 'experience',       title: 'experience',        width: 120 },
  { key: 'days_per_week',    title: 'days_per_week',     width: 100 },
  { key: 'struggle',         title: 'struggle',          width: 260 },
  { key: 'routine',          title: 'routine',           width: 260 },
  { key: 'why_vinh',         title: 'why_vinh',          width: 260 },
  { key: 'goal_6_12_months', title: 'goal_6_12_months',  width: 260 },
  { key: 'acknowledged',     title: 'acknowledged',      width: 100 },
  { key: 'lang',             title: 'lang',              width: 60 },
  { key: 'utm_source',       title: 'utm_source',        width: 110 },
  { key: 'utm_medium',       title: 'utm_medium',        width: 110 },
  { key: 'utm_campaign',     title: 'utm_campaign',      width: 130 },
  { key: 'utm_content',      title: 'utm_content',       width: 130 },
  { key: 'landing_page',     title: 'landing_page',      width: 220 },
  { key: 'referrer',         title: 'referrer',          width: 160 },
  { key: 'raw_payload',      title: 'raw_payload',       width: 200 }
];

// ===== Web app =====

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad json' });
  }
  if (data.website) return json_({ ok: true }); // honeypot filled → bot, ignore quietly

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    writeLead_(data);
  } finally {
    lock.releaseLock();
  }

  // Notifications run after the row is saved; a failed alert never loses the lead.
  try { notify_(data); } catch (err) { console.error('notify failed', err); }
  return json_({ ok: true });
}

function doGet() {
  return json_({ ok: true, service: 'VFS website leads' });
}

// ===== Sheet =====

/** Run once from the editor: creates and formats the "Website Leads" tab. */
function setup() {
  const sheet = getSheet_();
  SpreadsheetApp.flush();
  Logger.log('Ready: tab "%s" in %s', TAB_NAME, sheet.getParent().getName());
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(TAB_NAME);
  if (sheet) return sheet;

  sheet = ss.insertSheet(TAB_NAME);
  const n = COLUMNS.length;
  sheet.getRange(1, 1, 1, n)
    .setValues([COLUMNS.map((c) => c.title)])
    .setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);
  COLUMNS.forEach((c, i) => sheet.setColumnWidth(i + 1, c.width));
  if (sheet.getMaxColumns() > n) sheet.deleteColumns(n + 1, sheet.getMaxColumns() - n);

  formatRows_(sheet, 2, sheet.getMaxRows() - 1);
  return sheet;
}

const col_ = (key) => COLUMNS.findIndex((c) => c.key === key) + 1;

/** Plain row styling, text phone numbers, date formats and the status dropdown for rows [start, start+count). */
function formatRows_(sheet, start, count) {
  const n = COLUMNS.length;
  sheet.getRange(start, 1, count, n)
    .setFontWeight('normal').setBackground(null).setFontColor('#000000')
    .setVerticalAlignment('top').setWrap(false);
  // Phone stored as text so "+84…" / "+1 …" never turns into a formula (#ERROR!)
  sheet.getRange(start, col_('phone'), count, 1).setNumberFormat('@');
  sheet.getRange(start, col_('timestamp'), count, 1).setNumberFormat('yyyy-mm-dd hh:mm');
  sheet.getRange(start, col_('first_contact_at'), count, 1).setNumberFormat('yyyy-mm-dd hh:mm');
  sheet.getRange(start, col_('status'), count, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build()
  );
  statusColors_(sheet);
}

/** Status colors over the whole column ("New" stays red until someone calls). */
function statusColors_(sheet) {
  const range = sheet.getRange(2, col_('status'), sheet.getMaxRows() - 1, 1);
  const rule = (text, bg) => SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo(text).setBackground(bg).setRanges([range]).build();
  sheet.setConditionalFormatRules([
    rule('New', '#f4c7c3'),
    rule('Contacted', '#fce8b2'),
    rule('No answer', '#fce8b2'),
    rule('Call booked', '#b7e1cd'),
    rule('Closed won', '#57bb8a'),
    rule('Not a fit', '#e0e0e0'),
    rule('Closed lost', '#e0e0e0')
  ]);
}

function writeLead_(d) {
  const sheet = getSheet_();
  const values = {
    ...d,
    timestamp: new Date(),
    status: 'New',
    contacted_by: '',
    first_contact_at: '',
    notes: '',
    raw_payload: JSON.stringify(d).slice(0, 45000)
  };
  sheet.insertRowBefore(2); // newest lead on top
  formatRows_(sheet, 2, 1);
  sheet.getRange(2, 1, 1, COLUMNS.length).setValues([
    COLUMNS.map((c) => (values[c.key] === undefined || values[c.key] === null ? '' : String(values[c.key]).slice(0, 45000)))
  ]);
  sheet.getRange(2, 1).setValue(values.timestamp); // keep as a real date
}

// ===== Notifications =====

function notify_(d) {
  const isApp = d.lead_type === 'application';
  const name = d.full_name || 'Unknown';
  const phone = d.phone || '';
  const digits = phone.replace(/[^\d+]/g, '');
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID;
  const when = Utilities.formatDate(new Date(), TIMEZONE, 'HH:mm dd/MM');
  const label = isApp ? 'Coaching application' : 'Website enquiry';
  const flag = isApp && /not in a good financial/i.test(d.investment_ready || '') ? ' (not ready to invest)' : '';

  const lines = [
    ['Name', name],
    ['Phone', phone],
    ['Email', d.email],
    ['Country', d.country],
    ['Service', d.service],
    ['Ready to invest', d.investment_ready],
    ['Start', d.start_timeline],
    ['Goal', d.goal],
    ['Source', d.utm_source ? `${d.utm_source} / ${d.utm_campaign || ''}` : '']
  ].filter((l) => l[1]);

  // 1) Email — built in, no setup
  if (NOTIFY_EMAILS) {
    const html =
      `<p style="font-size:16px"><b>🔥 New ${label}${flag}</b> — ${when}<br>Call now for speed to lead.</p>` +
      `<table cellpadding="4" style="font-size:14px">${lines.map((l) => `<tr><td style="color:#666">${l[0]}</td><td><b>${esc_(l[1])}</b></td></tr>`).join('')}</table>` +
      `<p><a href="tel:${digits}">📞 Call ${esc_(phone)}</a> &nbsp;·&nbsp; <a href="https://zalo.me/${digits.replace(/^\+84/, '0')}">💬 Zalo</a>` +
      ` &nbsp;·&nbsp; <a href="https://wa.me/${digits.replace(/^\+/, '')}">WhatsApp</a> &nbsp;·&nbsp; <a href="${sheetUrl}">Open sheet</a></p>`;
    MailApp.sendEmail({
      to: NOTIFY_EMAILS,
      subject: `🔥 New lead: ${name} — ${phone}${flag}`,
      htmlBody: html,
      replyTo: d.email || undefined,
      name: 'VFS Website'
    });
  }

  const props = PropertiesService.getScriptProperties();
  const text = `🔥 New ${label}${flag}\n` + lines.map((l) => `${l[0]}: ${l[1]}`).join('\n') + `\n\nCall now: ${phone}\n${sheetUrl}`;

  // 2) Telegram — free, instant push to everyone in a team group
  const tgToken = props.getProperty('TELEGRAM_BOT_TOKEN');
  const tgChat = props.getProperty('TELEGRAM_CHAT_ID');
  if (tgToken && tgChat) {
    UrlFetchApp.fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: tgChat, text: text, disable_web_page_preview: true }),
      muteHttpExceptions: true
    });
  }

  // 3) SMS via Twilio — paid, works best for US numbers
  const sid = props.getProperty('TWILIO_SID');
  const token = props.getProperty('TWILIO_TOKEN');
  const from = props.getProperty('TWILIO_FROM');
  const to = props.getProperty('SMS_TO');
  if (sid && token && from && to) {
    const sms = `New ${isApp ? 'coaching app' : 'lead'}${flag}: ${name} ${phone}. Call ASAP.`;
    to.split(',').map((s) => s.trim()).filter(String).forEach((num) => {
      UrlFetchApp.fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
        method: 'post',
        payload: { To: num, From: from, Body: sms },
        headers: { Authorization: 'Basic ' + Utilities.base64Encode(`${sid}:${token}`) },
        muteHttpExceptions: true
      });
    });
  }
}

// ===== Helpers =====

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function esc_(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/** Run from the editor to check everything end to end (adds a test row + sends alerts). */
function sendTestLead() {
  doPost({ postData: { contents: JSON.stringify({
    lead_type: 'application',
    full_name: 'Test Lead',
    first_name: 'Test', last_name: 'Lead',
    phone: '+84 898 462 618',
    email: 'test@example.com',
    country: 'Vietnam',
    service: '1-on-1 Online Coaching',
    investment_ready: "Yes, I'm ready to invest in my health",
    start_timeline: 'Immediately',
    goal: 'Build muscle',
    lang: 'en',
    landing_page: 'apps-script test'
  }) } });
}
