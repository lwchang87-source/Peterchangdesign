# Peter — Design Portfolio 2026

A clean, minimal portfolio site for Peter, Design Director at Match Group.

## Tech stack

- Pure HTML, CSS, and vanilla JavaScript — no build tools required
- Hosted on [GitHub Pages](https://pages.github.com/)
- Google Fonts: Inter + DM Serif Display

## File structure

```
/
├── index.html          ← Main portfolio page
├── style.css           ← All styles (CSS custom properties, responsive)
├── script.js           ← Scroll reveals, nav behavior, mobile menu
├── case-study-1.html   ← Matching UX redesign
├── case-study-2.html   ← Design system
├── case-study-3.html   ← Org scaling
└── images/             ← Add your images here (see below)
```

## How to customize

### Personal info
Search for `[ ... ]` placeholders throughout the HTML files — every one is something to fill in with your real content.

Key places:
- `index.html` — hero stats, bio, company names, LinkedIn/GitHub handles
- `case-study-*.html` — timelines, metrics, images, written narrative

### Adding images
Create an `images/` folder and drop in your screenshots, mockups, and photos. Then replace the placeholder `<div>` elements in HTML with `<img>` tags:

```html
<!-- Replace this: -->
<div class="cs-img-placeholder">Caption</div>

<!-- With this: -->
<img src="images/your-image.png" alt="Descriptive alt text" />
```

For the hero thumbnail in each case study, replace the `<div class="case-thumb-inner ...">` contents similarly.

### Colors
All colors are CSS custom properties in `style.css` under `:root`. Change `--accent` to match your personal brand.

### Sections
To add more case studies, duplicate any `case-study-*.html` file and add a new card to the `.work-grid` in `index.html`.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g., `portfolio-2026`)
2. Push all files to the `main` branch
3. Go to **Settings → Pages**
4. Set Source to **Deploy from a branch → main → / (root)**
5. Your site will be live at `https://[your-github-username].github.io/portfolio-2026/`

For a custom domain (e.g., `peter.design`), add a `CNAME` file with your domain, then configure DNS with your registrar.

## Local development

No build step needed — just open `index.html` in a browser. For live reload, use VS Code's Live Server extension or:

```bash
npx serve .
```

---

Built with HTML, CSS, and care.
