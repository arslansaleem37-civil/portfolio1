# Arslan Saleem — Portfolio

A clean, self-contained portfolio site. No build step, no framework,
no server required — just HTML, CSS and vanilla JS. You can open
`index.html` directly in a browser, and publish the whole folder as-is.

```
portfolio/
├── index.html              → page structure & copy (about, contact, hero)
├── css/
│   └── styles.css          → all styling & the colour/type system
├── js/
│   ├── services-data.js    → EDIT ME to change "What I Do"
│   ├── projects-data.js    → EDIT ME to add/remove/change work samples
│   └── main.js             → site behaviour (filters, modal, nav) — no edits needed
└── assets/
    └── images/             → project photos & your headshot
```

---

## Editing your projects (the part you'll use most)

Open `js/projects-data.js`. It's a plain list — no code knowledge needed
beyond following the pattern. To add a new project:

1. Save your image into `assets/images/` (JPG or PNG, landscape works best,
   ideally under ~500KB — resize/export at around 1200–1600px wide).
2. Copy one of the existing `{ ... }` blocks in the file.
3. Change the fields:
   - `id` — a unique short slug, no spaces (e.g. `"site-audit-2026"`)
   - `title` — shown on the card and in the detail popup
   - `category` — used for the filter chips (reuse an existing one, like
     `"Estimation"` or `"Drafting"`, unless this is genuinely a new kind
     of work)
   - `summary` — one short line for the card
   - `description` — the longer write-up shown when someone clicks the
     card. Use `\n\n` for a paragraph break.
   - `tools` — a short list of software/standards used, shown as tags
   - `image` — the path to your image, e.g. `"assets/images/my-file.jpg"`
4. Save the file and refresh the page — the card, its filter chip and
   its detail popup all update automatically. Nothing else to touch.

To remove a project, delete its whole `{ ... }` block. To reorder them,
move the blocks up or down in the list — they display in the same order.

## Editing your services list

Same idea, in `js/services-data.js` — just `title` and `description` per
row. The numbering updates itself.

## Editing your bio, contact details or hero text

These live directly in `index.html` since they change less often:
- Hero headline & tagline: near the top, inside `<section class="hero">`
- About text: inside `<section class="about">`
- Email / phone: inside `<section class="contact">` — update both the
  visible text and the `href="mailto:..."` / `href="tel:..."` values
- Social links: same section — WhatsApp and LinkedIn are already wired
  up. Add more icons the same way if you want Instagram or anything
  else back in later (copy the LinkedIn `<a class="social-icon">` block
  as a template).

## Changing colours or fonts

Everything is controlled from one place: the `:root { ... }` block at the
top of `css/styles.css`. Change a value there (e.g. `--coral`) and it
updates everywhere that colour is used.

---

## Publishing it

This is a static site, so any of these work with zero configuration:

**Netlify (easiest)**
Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the
whole `portfolio` folder in. You'll get a live URL immediately, and can
connect a custom domain from the site settings afterwards.

**GitHub Pages**
1. Create a new GitHub repository and upload the contents of this folder.
2. In the repo, go to Settings → Pages → set the source to your main
   branch, root folder.
3. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

**Vercel**
Run `npx vercel` from inside this folder (or drag the folder into
vercel.com's dashboard) and follow the prompts.

Any of these also let you push updates later — edit the files, redeploy
the folder (or `git push`, for GitHub/Vercel), and the live site updates.

---

## Notes

- The site is fully responsive (phone, tablet, desktop) and works with
  keyboard navigation and screen readers (skip link, focus outlines,
  accessible labels on icon buttons, reduced-motion support).
- Fonts (Poppins, Inter, JetBrains Mono) load from Google Fonts, so an
  internet connection is needed for them to display — this is standard
  for static sites and won't affect anything else.
- Images have been compressed for fast loading. If you add new images,
  try to keep them under ~500KB each so the site stays quick to load on
  mobile.
