# VFS Private Training — website

A single-page, bilingual (Tiếng Việt / English) website for VFS Private Training. Plain HTML/CSS/JS with no build step.

Content, prices, coaches, photos and contact details come from the current site, [vfsprivatetraining.com](https://vfsprivatetraining.com). Anything that site doesn't list is a clearly marked placeholder.

## Run locally

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173. To deploy, upload the folder to any static host (GitHub Pages, Netlify, Vercel).

## Where things live

| File | What to edit |
|---|---|
| `js/i18n.js` | **All page text**, in `en` and `vi`. Each key matches a `data-i18n` attribute in `index.html`. |
| `js/content.js` | Coaches, case studies, transformation photos, membership plans and perks. |
| `css/styles.css` | Colors and fonts are in `:root` at the top (`--gold`, `--bg`, `--font`…). |
| `js/main.js` | Behavior. `DEFAULT_LANG` is at the top. |
| `js/leads.js` | Where form submissions go (`LEADS_ENDPOINT`). |
| `js/apply.js` | Coaching application popup: questions and copy. |
| `apps-script/` | Google Sheet script: coaching applications → sheet tab + Telegram alert. |
| `assets/img/` | Photos, grouped by `brand/`, `coaches/`, `results/`, `gallery/`, `meals/`. |

## Language

- On a first visit, a popup asks the visitor to pick Tiếng Việt or English. The choice is saved in `localStorage` (`vfs-lang`).
- The VI / EN toggle in the top-right corner switches language at any time.
- Clear site data to see the popup again.

## Leads → Google Sheet + Telegram

**Coaching applications** go to a Google Apps Script attached to the *Vinfinity Systems* sheet. It writes each one to the **1-1 Coaching Applications** tab and posts an alert to the team's Telegram group. Setup is in [`apps-script/README.md`](apps-script/README.md). Once deployed, paste the web-app URL into `LEADS_ENDPOINT` in `js/leads.js`.

The **contact form** ("Claim your member offer") still opens a pre-filled email to `vophucvinh582@gmail.com`. To log it too, add `"contact"` to `SHEET_TYPES` in `js/leads.js` and remove the `lead_type` check in `doPost` in `Code.gs`.

Each submission also carries ad attribution: the `utm_*` tags and landing page from the visitor's first page view.

## Content sources

- **VHS Meal menu:** all 44 dishes and photos from vfsprivatetraining.com/vhs-meal, grouped into categories in `js/content.js` → `meals`. The site lists no prices ("Liên hệ"), so the menu sends people to Zalo.
- **Hours:** Mon–Fri 6:00–22:00, Sat 6:00–21:00, Sun closed.
- **Transformations:** the 3 featured members (Hữu Tình, Anh Minh, Khương Nguyễn) plus 20 more photos in the scrolling strip.

## 1-on-1 online coaching application

A popup application form with one question at a time (the same questions as the Tally form), in both languages:

- Opens from any element with `data-apply` (the Online Coaching card and the out-of-town FAQ) or from a link ending in `#apply`, e.g. `https://bandit-an.github.io/vinh/#apply`. Use that link in ads or a future VSL page.
- Single-choice answers advance automatically. Keys A–F pick an option, and Ctrl/⌘+Enter continues from a text answer.
- Progress is saved in the browser, so closing and reopening resumes where the visitor left off.
- Edit questions and copy in `APPLY_STEPS` / `UI` at the top of `js/apply.js`. Submissions go to the sheet (see above).

## Sharing a specific language

Add `?lang=en` or `?lang=vi` to the URL to open the site in that language and skip the popup.

## Notes

- The current site shows two emails: `vinfinitycoachingsystem@gmail.com` in the header and `vophucvinh582@gmail.com` in the footer. This site uses the second one. Swap it if needed.
- The logo is the lime-green VINFINITY mark. The site's accent is warm gold, as the brief asked. To match the logo instead, change `--gold` / `--gold-2` in `css/styles.css` to the brand lime (e.g. `#b5cc3a`).
