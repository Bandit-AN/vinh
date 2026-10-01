/**
 * VFS Private Training — 1-on-1 coaching applications → "Vinfinity Systems" sheet
 *
 * The website's coaching application posts here. Each submission is written to the
 * "1-1 Coaching Applications" tab (newest on top) and announced in a Telegram group
 * so the team can call the lead right away.
 *
 * Setup: see apps-script/README.md in the website repo.
 */

// ===== Settings =====
const SPREADSHEET_ID = '18k8U9lYlD-oFgBpwSZdQ3QBR3Q7fV9NproPX_3qbhX8';
const TAB_NAME = '1-1 Coaching Applications';
const TIMEZONE = 'Asia/Ho_Chi_Minh';

// Optional: also email these addresses for every application (comma-separated). Leave '' for Telegram only.
const NOTIFY_EMAILS = '';

// Telegram credentials live in Project Settings → Script properties (not in code):
//   TELEGRAM_BOT_TOKEN  — from @BotFather
//   TELEGRAM_CHAT_ID    — run getTelegramChatId() after adding the bot to your group

const STATUSES = ['New', 'Contacted', 'No answer', 'Call booked', 'Not a fit', 'Closed won', 'Closed lost'];

// Column order in the tab. `key` = field sent by the website.
const COLUMNS = [
  { key: 'timestamp',        width: 140 },
  { key: 'status',           width: 110 },
  { key: 'contacted_by',     width: 120 },
  { key: 'first_contact_at', width: 140 },
  { key: 'notes',            width: 220 },
  { key: 'full_name',        width: 160 },
  { key: 'phone',            width: 140 },
  { key: 'email',            width: 200 },
  { key: 'country',          width: 110 },
  { key: 'investment_ready', width: 230 },
  { key: 'start_timeline',   width: 140 },
  { key: 'goal',             width: 190 },
  { key: 'experience',       width: 120 },
  { key: 'days_per_week',    width: 100 },
  { key: 'struggle',         width: 260 },
  { key: 'routine',          width: 260 },
  { key: 'why_vinh',         width: 260 },
  { key: 'goal_6_12_months', width: 260 },
  { key: 'acknowledged',     width: 100 },
  { key: 'lang',             width: 60 },
  { key: 'utm_source',       width: 110 },
  { key: 'utm_medium',       width: 110 },
  { key: 'utm_campaign',     width: 130 },
  { key: 'utm_content',      width: 130 },
  { key: 'landing_page',     width: 220 },
  { key: 'referrer',         width: 160 },
  { key: 'raw_payload',      width: 200 }
];

// ===== Web app =====

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad json' });
  }
  if (data.website) return json_({ ok: true });                   // honeypot filled → bot, ignore
  if (data.lead_type && data.lead_type !== 'application') return json_({ ok: true, skipped: true });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let row;
  try {
    row = writeApplication_(data);
  } finally {
    lock.releaseLock();
  }

  // Alerts run after the row is saved; a failed alert never loses the application.
  try { notifyTelegram_(data, row); } catch (err) { console.error('telegram failed', err); }
  try { notifyEmail_(data); } catch (err) { console.error('email failed', err); }
  return json_({ ok: true });
}

function doGet() {
  return json_({ ok: true, service: 'VFS coaching applications' });
}

// ===== Sheet =====

/** Run once from the editor: creates and formats the tab. */
function setup() {
  const sheet = getSheet_();
  SpreadsheetApp.flush();
  Logger.log('Ready: tab "%s" in "%s"', TAB_NAME, sheet.getParent().getName());
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(TAB_NAME);
  if (sheet) return sheet;

  sheet = ss.insertSheet(TAB_NAME);
  const n = COLUMNS.length;
  sheet.getRange(1, 1, 1, n)
    .setValues([COLUMNS.map((c) => c.key)])
    .setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);
  COLUMNS.forEach((c, i) => sheet.setColumnWidth(i + 1, c.width));
  if (sheet.getMaxColumns() > n) sheet.deleteColumns(n + 1, sheet.getMaxColumns() - n);
  formatRows_(sheet, 2, sheet.getMaxRows() - 1);
  return sheet;
}

const col_ = (key) => COLUMNS.findIndex((c) => c.key === key) + 1;

/** Plain styling, text phone numbers, date formats and the status dropdown for rows [start, start+count). */
function formatRows_(sheet, start, count) {
  const n = COLUMNS.length;
  sheet.getRange(start, 1, count, n)
    .setFontWeight('normal').setBackground(null).setFontColor('#000000')
    .setVerticalAlignment('top').setWrap(false);
  // Phone as text so "+84…" / "+1 …" never turns into a formula (#ERROR!)
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

/** Inserts the application as row 2 (newest on top). Returns the sheet row number. */
function writeApplication_(d) {
  const sheet = getSheet_();
  const values = {
    ...d,
    status: 'New',
    contacted_by: '',
    first_contact_at: '',
    notes: '',
    raw_payload: JSON.stringify(d)
  };
  sheet.insertRowBefore(2);
  formatRows_(sheet, 2, 1);
  sheet.getRange(2, 1, 1, COLUMNS.length).setValues([
    COLUMNS.map((c) => {
      if (c.key === 'timestamp') return new Date();
      const v = values[c.key];
      return v === undefined || v === null ? '' : String(v).slice(0, 45000);
    })
  ]);
  return 2;
}

// ===== Notifications =====

function notifyTelegram_(d) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('TELEGRAM_BOT_TOKEN');
  const chatId = props.getProperty('TELEGRAM_CHAT_ID');
  if (!token || !chatId) return;

  const notReady = /not in a good financial/i.test(d.investment_ready || '');
  const phone = d.phone || '';
  const digits = phone.replace(/[^\d+]/g, '');
  const waDigits = digits.replace(/^\+/, '').replace(/^0/, '84');
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`;
  const when = Utilities.formatDate(new Date(), TIMEZONE, 'HH:mm, dd/MM');
  const source = d.utm_source ? `${d.utm_source}${d.utm_campaign ? ' / ' + d.utm_campaign : ''}` : '';

  const line = (label, v) => (v ? `<b>${label}:</b> ${esc_(v)}\n` : '');
  const text =
    `🔥 <b>New 1-on-1 coaching application</b>${notReady ? ' ⚠️ not ready to invest' : ''}\n` +
    `<i>${when}: call ASAP</i>\n\n` +
    line('Name', d.full_name) +
    line('Phone', phone) +
    line('Email', d.email) +
    line('Country', d.country) +
    line('Invest', d.investment_ready) +
    line('Start', d.start_timeline) +
    line('Goal', d.goal) +
    line('Experience', d.experience) +
    line('Training', d.days_per_week ? `${d.days_per_week} days/week` : '') +
    line('Source', source) +
    (d.struggle ? `\n<b>Struggle:</b> ${esc_(trim_(d.struggle, 300))}\n` : '');

  const buttons = [[
    { text: '💬 Zalo', url: `https://zalo.me/${digits.replace(/^\+84/, '0')}` },
    { text: '🟢 WhatsApp', url: `https://wa.me/${waDigits}` }
  ], [
    { text: '📋 Open sheet', url: sheetUrl }
  ]];

  const res = UrlFetchApp.fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: { inline_keyboard: buttons }
    }),
    muteHttpExceptions: true
  });
  if (res.getResponseCode() !== 200) console.error('Telegram error', res.getContentText());
}

function notifyEmail_(d) {
  if (!NOTIFY_EMAILS) return;
  const fields = ['full_name', 'phone', 'email', 'country', 'investment_ready', 'start_timeline', 'goal', 'experience',
    'days_per_week', 'struggle', 'routine', 'why_vinh', 'goal_6_12_months'];
  MailApp.sendEmail({
    to: NOTIFY_EMAILS,
    subject: `🔥 New coaching application: ${d.full_name || ''} (${d.phone || ''})`,
    htmlBody: `<table cellpadding="4">${fields.filter((k) => d[k]).map((k) =>
      `<tr><td style="color:#666">${k}</td><td><b>${esc_(d[k])}</b></td></tr>`).join('')}</table>` +
      `<p><a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}">Open sheet</a></p>`,
    replyTo: d.email || undefined,
    name: 'VFS Website'
  });
}

// ===== Setup helpers =====

/**
 * After adding your bot to the Telegram group and sending any message there,
 * run this: it finds the group's chat ID and saves it to Script properties.
 */
function getTelegramChatId() {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('TELEGRAM_BOT_TOKEN');
  if (!token) throw new Error('Add TELEGRAM_BOT_TOKEN in Project Settings → Script properties first.');
  const res = JSON.parse(UrlFetchApp.fetch(`https://api.telegram.org/bot${token}/getUpdates`).getContentText());
  const chats = {};
  (res.result || []).forEach((u) => {
    const m = u.message || u.my_chat_member || u.channel_post;
    if (m && m.chat) chats[m.chat.id] = m.chat.title || m.chat.username || m.chat.first_name;
  });
  const groups = Object.keys(chats).filter((id) => Number(id) < 0);
  if (!groups.length) {
    Logger.log('No group found yet. Add the bot to your group, send a message in the group, then run this again.');
    return;
  }
  groups.forEach((id) => Logger.log('Group "%s" → chat ID %s', chats[id], id));
  props.setProperty('TELEGRAM_CHAT_ID', groups[0]);
  Logger.log('Saved TELEGRAM_CHAT_ID = %s (%s)', groups[0], chats[groups[0]]);
}

/** Adds a test application and sends the Telegram alert. Delete the test row afterwards. */
function sendTestApplication() {
  doPost({ postData: { contents: JSON.stringify({
    lead_type: 'application',
    full_name: 'Test Applicant',
    first_name: 'Test', last_name: 'Applicant',
    phone: '+84 898 462 618',
    email: 'test@example.com',
    country: 'Vietnam',
    experience: '1–3 years',
    goal: 'Build muscle',
    days_per_week: '4–5',
    struggle: 'Test submission from Apps Script.',
    start_timeline: 'Immediately',
    investment_ready: "Yes, I'm ready to invest in my health",
    acknowledged: 'Yes',
    lang: 'en',
    landing_page: 'apps-script test'
  }) } });
}

// ===== Helpers =====

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function esc_(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function trim_(s, n) {
  s = String(s);
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}
