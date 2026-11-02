# Srikrishnan TR — Portfolio

Personal portfolio site for **Srikrishnan TR**, Aspiring Data Analyst.
Live at: **https://srikrishnan-tr.github.io**

---

## Project Structure

```
/index.html          — Clean HTML markup (links CSS and JS below)
/assets/css/style.css — All styles (extracted from Canva export, no changes)
/assets/js/main.js   — All JavaScript: links, scroll effects, counters
/assets/img/         — Put your profile photo here as profile.jpg
/resume.pdf          — Your resume (linked from the Download Resume button)
/.nojekyll           — Tells GitHub Pages not to run Jekyll
/README.md           — This file
```

---

## How to Edit

### Update links or counter targets

Open **`assets/js/main.js`** and edit the `PORTFOLIO_DATA` object near the top:

```js
const PORTFOLIO_DATA = {
  links: {
    email:          "mailto:srikrishnan310@gmail.com",
    linkedin:       "https://www.linkedin.com/in/srikrishnan-tr/",
    github:         "https://github.com/SRIKRISHNAN-TR/",
    project1Github: "https://github.com/SRIKRISHNAN-TR/Pg_Recon",
    project2Github: "https://github.com/SRIKRISHNAN-TR/ai-interview-agent.git",
    project2Demo:   null,        // ← set to the live demo URL when ready
    project3Github: "https://github.com/SRIKRISHNAN-TR/MediAuth.git",
    project4Github: "https://github.com/SRIKRISHNAN-TR/BestShop.git",
    salesforceVerify: "https://sforce.co/verifycerts"
  },
  counters: {
    projects:       { value: 4,   decimals: 0, suffix: "+" },
    internships:    { value: 3,   decimals: 0, suffix: ""  },
    certifications: { value: 3,   decimals: 0, suffix: ""  },
    cgpa:           { value: 8,   decimals: 2, suffix: ""  }
  }
};
```

> **Adding the AI Interview Agent live demo**: set `project2Demo` to the URL (starting with `https://`). The "Live Demo" button appears automatically on next page load.

### Update text / copy

Open **`index.html`**. Every section is clearly commented. Edit the visible text directly — no build step needed.

### Update the resume

Replace **`resume.pdf`** with your new file (keep the same filename).

### Add / replace your profile photo

Drop your photo at **`assets/img/profile.jpg`**. The image is shown greyscale and scales slightly on hover. If the file is missing the slot stays empty without breaking the page.

### Update styles

Edit **`assets/css/style.css`**. The file is fully commented with a table of contents.  
**Design tokens** (colours, fonts) are in the `:root` block at the top. The palette is black and white only.

---

## Serve locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

No build step, no npm, no framework.

---

## Deploy to GitHub Pages

1. Create a new GitHub repository named exactly **`srikrishnan-tr.github.io`**  
   (must match your GitHub username).

2. Push this folder to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/SRIKRISHNAN-TR/srikrishnan-tr.github.io.git
   git push -u origin main
   ```

3. In the repo on GitHub: **Settings → Pages → Build and deployment**  
   → Source: **Deploy from a branch** → Branch: `main` / `/ (root)` → Save.

4. Wait ~60 seconds. Visit **https://srikrishnan-tr.github.io** — done.

> The `.nojekyll` file in the root tells GitHub Pages to serve the files as-is without running Jekyll, which is required when using folders that start with an underscore or when you just want straight static hosting.

---

## Design System Quick Reference

| Token | Value | Used for |
|---|---|---|
| `--black` | `#000000` | Page background, dark sections |
| `--white` | `#ffffff` | Text on dark, solid buttons |
| `--paper` | `#f0f0f0` | Light section background |
| `--muted` | `#a0a0a0` | Secondary text on dark |
| `--grey`  | `#505050` | Borders, secondary text on light |

Font: **Montserrat** (Google Fonts, 400–900). No other fonts.  
Palette: **black and white only**. No other hues.

