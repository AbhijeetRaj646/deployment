# Defence Academy Website

Modern, responsive website for a Defence Academy coaching institute (NDA, CDS, AFCAT, SSB).

## Quick start
- Open `index.html` in a browser (or serve the folder with any static server).
- Edit contact/social links in the footer and contact sections.
- Update the Notice Board by editing `data/announcements.json`.

## Update social/contact links
- Replace placeholders in all pages:
  - LinkedIn: `https://www.linkedin.com/company/your-academy`
  - Instagram: `https://instagram.com/youracademy`
  - WhatsApp: `https://wa.me/911234567890`
  - Phone: `tel:+911234567890`
  - Email: `mailto:info@defenceacademy.com`

## Announcements (Notice Board)
- Edit `data/announcements.json` (array of objects: `title`, `date` in `YYYY-MM-DD`, `urgent` boolean, optional `description`, optional `link`).
- Urgent announcements display a red flashing badge and auto-open the Notice Board on the homepage.
- Non-urgent announcements will auto-open if the user has not dismissed the board in the last 7 days.

## SEO
- `sitemap.xml` and `robots.txt` are included. Replace `https://defence-academy.example` with your domain.
- Open Graph tags and JSON-LD structured data are added on the homepage.

## Theming
- Colors are defined in `assets/css/styles.css` using CSS variables: Navy, White, Gold.

## Build/Deploy
- Static site; can be deployed to GitHub Pages, Netlify, Vercel, or any static host.