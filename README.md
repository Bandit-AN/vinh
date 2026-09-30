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
| `js/main.js` | Behavior. `FORM_ENDPOINT` and `DEFAULT_LANG` are at the top. |
| `assets/img/` | Photos, grouped by `brand/`, `coaches/`, `results/`, `gallery/`, `meals/`. |

## Language

- On a first visit, a popup asks the visitor to pick Tiếng Việt or English. The choice is saved in `localStorage` (`vfs-lang`).
- The VI / EN toggle in the top-right corner switches language at any time.
- Clear site data to see the popup again.

## Still to fill in

1. **Lead form backend.** Set `FORM_ENDPOINT` in `js/main.js` (e.g. Formspree or a Google Apps Script webhook). Until then, submitting the form opens a pre-filled email to `vophucvinh582@gmail.com`. Every field is required, and the country list shows United States and Vietnam first.
2. **FAQ 5 and 6.** Online coaching price/format and the trial & cancellation policy are still placeholders (gold dashed boxes). Search `PLACEHOLDER` in `js/i18n.js`.
3. **Case studies (optional).** The featured cards show name + photo. Add `goal`, `before`, `after` and `change` to an entry in `js/content.js` to show the stats row.

## Content sources

- **VHS Meal menu:** all 44 dishes and photos from vfsprivatetraining.com/vhs-meal, grouped into categories in `js/content.js` → `meals`. The site lists no prices ("Liên hệ"), so the menu sends people to Zalo.
- **Hours:** Mon–Fri 6:00–22:00, Sat 6:00–21:00, Sun closed.
- **Transformations:** the 3 featured members (Hữu Tình, Anh Minh, Khương Nguyễn) plus 20 more photos in the scrolling strip.

## Sharing a specific language

Add `?lang=en` or `?lang=vi` to the URL to open the site in that language and skip the popup.

## Notes

- The current site shows two emails: `vinfinitycoachingsystem@gmail.com` in the header and `vophucvinh582@gmail.com` in the footer. This site uses the second one. Swap it if needed.
- The logo is the lime-green VINFINITY mark. The site's accent is warm gold, as the brief asked. To match the logo instead, change `--gold` / `--gold-2` in `css/styles.css` to the brand lime (e.g. `#b5cc3a`).
