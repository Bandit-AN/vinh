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

## Still to fill in (placeholders)

Placeholders show on the page as gold dashed boxes. To find them all, search for `[` in `js/i18n.js` and `js/content.js`, and for `PLACEHOLDER` / `class="ph"` in `index.html`.

1. **Lead form backend.** Set `FORM_ENDPOINT` in `js/main.js` (e.g. Formspree or a Google Apps Script webhook). Until then, submitting the form opens a pre-filled email to `vophucvinh582@gmail.com`.
2. **Opening hours.** The current site doesn't list them (`visit.hoursPh`).
3. **Case studies.** Goals and before/after weights come from the site's transformation photos. Member names, duration, coach and quote are placeholders, so get members' consent before adding names.
4. **Coach bios.** The current site lists names and roles only.
5. **Retail block.** Describe it and add a photo, or delete the block in `index.html` (marked `Retail: PLACEHOLDER`).
6. **Online coaching** price/format, and the **trial & cancellation policy** (FAQ 5 and 6).
7. **Instagram handle.** The current site links to instagram.com with no account.
8. **Form reply time** (`form.note`: "within [__ hours]").

## Notes

- The current site shows two emails: `vinfinitycoachingsystem@gmail.com` in the header and `vophucvinh582@gmail.com` in the footer. This site uses the second one. Swap it if needed.
- The logo is the lime-green VINFINITY mark. The site's accent is warm gold, as the brief asked. To match the logo instead, change `--gold` / `--gold-2` in `css/styles.css` to the brand lime (e.g. `#b5cc3a`).
