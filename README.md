# Berlin's Portfolio

Personal portfolio built with plain HTML, CSS and JavaScript. No build step.

## Structure

```
Portfolio/
├── index.html          Main portfolio page
├── journey.html        My Journey page (opens at /journey)
├── vercel.json         Vercel settings (clean URLs)
├── README.md
├── .gitignore
└── assets/
    ├── favicon.svg
    ├── css/
    │   ├── style.css   Shared styles for both pages
    │   └── journey.css Styles only for the Journey page
    ├── js/
    │   ├── main.js     Portfolio page scripts
    │   └── journey.js  Journey page scripts
    └── images/
        ├── hero-portrait.webp
        ├── about-photo.webp
        ├── inmba.webp        (not used yet)
        ├── tajmahal.webp     (not used yet)
        └── pic.webp          (not used yet)
```

## Run locally

Open `index.html` in a browser, or run `python -m http.server 8000` and visit http://localhost:8000.

## Deploy

Push to GitHub, then import the repo in Vercel. Framework preset: Other. Leave Build Command and Output Directory empty.
