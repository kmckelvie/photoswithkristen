# Kristen McKelvie Photography

Static website for Kristen McKelvie Photography — documentary family photography in Georgetown, TX.
Built to be hosted on GitHub Pages.

## Structure

```
/
├── index.html          Home
├── about.html          About Kristen
├── gallery.html        Portfolio
├── services.html       Services & pricing
├── booking.html        Booking (Dubsado embed)
├── contact.html        Contact form
├── css/style.css       All styles
├── js/main.js          Nav, scroll animation, FAQ
├── fonts/              Roselyn font files
├── images/             Photos (currently placeholders)
└── .nojekyll           Tells GitHub Pages to skip Jekyll processing
```

## Before going live — checklist

1. **Images** — replace every file in `/images/` with real photos.
   Keep the same filenames, or update the paths in the HTML.
   Recommended: hero/banners ~1600px wide, portfolio tiles ~600x800px,
   compressed JPGs (use tinypng.com or squoosh.app).

2. **CloudSpot scheduler** — the booking page embeds your CloudSpot
   scheduler in an iframe, with an automatic fallback: if CloudSpot
   blocks embedding, a "Book Your Session" button appears instead.
   The URL is already set to
   `kristenmckelvie.studio.cloudspot.io/scheduling/services`. To
   change it, update BOTH the iframe `src` and the fallback link
   `href` inside `<div id="booking-embed">` in `booking.html`.
   After deploying, open the booking page once to confirm the
   scheduler displays — if you only see the button, CloudSpot has
   blocked embedding and the fallback is doing its job.

3. **Contact form** — in `contact.html`, create a free form at
   formspree.io and replace `YOUR_FORM_ID` in the form action URL.

4. **Roselyn font license** — confirm you hold a WEBFONT license for
   Roselyn Script (Calamar Studio). A desktop license alone does not
   cover @font-face embedding. Webfont license: myfonts.com or
   creativemarket.com.

5. **Social links** — update Instagram/Facebook URLs in the footer
   and nav of every page.

6. **Email address** — replace mrs@kristenmckelvie.com with your
   real contact email (booking.html and contact.html).

7. **Testimonials** — replace placeholder quotes in index.html with
   real client testimonials.

## Deploying to GitHub Pages

1. Create a new repository (e.g. `photoswithkristen`).
2. Upload all these files to the repository root.
3. Repo Settings > Pages > Source: deploy from `main` branch, `/root`.
4. To use the custom domain photoswithkristen.com, add a `CNAME` file
   containing just `photoswithkristen.com`, and point your domain's
   DNS to GitHub Pages per GitHub's documentation.
