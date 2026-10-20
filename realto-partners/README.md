# ReAlto Partners website (static)

Plain HTML, CSS and a little JavaScript. No WordPress, no database, no build step.
Upload the contents of this folder to GoDaddy and it works.

```
index.html                  Home: ReAlto overview, podcast feature, eXp model, team life, Allison, FAQ
dan-gomer.html              Dan Gomer biography, book, speaking, values, FAQ
allison-gomer.html          Allison Gomer: cacao ceremonies, meditation, Sacred Psychotherapy & Ceremony, FAQ, inquiry form
join-exp-realty-team.html   Why ReAlto, how eXp Realty works, local roots, agent FAQ, agent inquiry form
podcast.html                The Dan & Allison Gomer Podcast, alerts signup, guest form
contact.html                General contact form
404.html                    Not found page (noindex)
sitemap.xml                 For Google Search Console and Bing Webmaster Tools
robots.txt                  Allows search engines and AI assistants, points to the sitemap
llms.txt / llms-full.txt    Plain-text summary and FAQ for AI assistants (llmstxt.org format)
.htaccess                   404 page, redirects, compression and caching for GoDaddy (Apache)
assets/css/styles.css
assets/js/main.js           <- the one file with settings you edit
assets/favicon.svg
images/                     <- drop the photos here (see list below)
```

## 1. Add the photos

Pages already point at these filenames. Until a photo is in place the page shows a styled
placeholder. Copy each Dropbox file into `images/` and rename it to the name on the left.
Export large photos at about 2000px on the long side (JPG, quality ~80). The Megan Sawaya
originals are 10 to 20 MB each and should not be uploaded as is.

| Save as `images/...` | Dropbox source |
|---|---|
| `dan-hero.jpg` | `/_CW Steal/Dan Gomer Public Speaking/DG-Website/Images/Dan-chair-den.jpg` |
| `dan-speaking.jpg` | `/_CW Steal/Dan Gomer Public Speaking/DG-Website/Images/Dan-speaking-wh.jpg` |
| `dan-about.jpg` | `/_CW Steal/Dan Gomer Public Speaking/DG-Public Persona/DG-Projects/website assets/Dan-about.jpg` |
| `allison.jpg` | `/Allison Gomer/about-allison.jpg` |
| `allison-2.jpg` | `/Allison Gomer/allisong-18.jpg` (any shot from the Megan Sawaya business shoot works) |
| `allison-cacao.jpg` | `/Allison Gomer/cerimonial-cacao-16x9.jpg` |
| `allison-ceremony-group.jpg` | `/Allison Gomer/group-cacao.jpg` |
| `allison-launch.jpg` | `/Allison Gomer/ana and allison cacao and cards launch ceremony.jpg` |
| `team-capitol.png` | `/Realto Partners/team-capitoil.png` (also the default social share image) |
| `team-a.jpg` | `/Realto Partners/Team-A.jpg` |
| `team-j.jpg` | `/Realto Partners/Team-J.jpg` |
| `welcome.jpg` | `/Realto Partners/welcome.jpg` |
| `why.jpg` | `/Realto Partners/whyhole.jpg` |
| `onboarding.jpg` | `/Realto Partners/onbording-plus.jpg` |
| `logo.png` | `/Realto Partners/Marketing Info/ReAlto Partners Final Logo Transparent.png` |
| `favicon.png` | `/Realto Partners/Marketing Info/favicon2.png` |
| `podcast-cover.jpg` | Podcast cover art, 1400 to 3000px square, once it exists |

## 2. Turn on the forms

All five forms (join, Allison inquiry, podcast alerts, podcast guest, contact) send through
[FormSubmit](https://formsubmit.co), which is free and needs no account or server code.

1. Open `assets/js/main.js`.
2. Replace `REPLACE_WITH_YOUR_EMAIL@example.com` with the inbox that should get leads.
3. Upload, submit any form once, then click the activation link FormSubmit emails you.

Until step 2 is done the forms run in demo mode: they show the thank-you message but
nothing is sent. Do not launch without setting the email.

## 3. Update links

Also in `assets/js/main.js`, under `links`: YouTube channel, podcast on YouTube / Spotify /
Apple, Instagram, Facebook and LinkedIn. Every button picks these up automatically.

## 4. SEO and AI search: what's built in

- One H1 per page that carries the main keyword, plus question-style H2s ("What is ReAlto Partners?",
  "What happens in a cacao ceremony?") that match how people search and how AI assistants answer.
- Unique title (under 60 characters) and meta description (under 160) on every page, plus canonical URLs,
  Open Graph and Twitter cards.
- JSON-LD structured data as one linked `@graph`: WebSite, RealEstateAgent (ReAlto Partners, with eXp Realty
  as parent organization), Person (Dan and Allison, linked as spouses), ProfessionalService with an offer
  catalog (Allison's practice), PodcastSeries, Book, ProfilePage, ContactPage, BreadcrumbList and FAQPage.
  Every FAQ in the schema is also visible on the page.
- Entity disambiguation: `alternateName`, `disambiguatingDescription` and `sameAs` links help search
  engines and AI tell ReAlto Partners apart from unrelated firms called "Alto Partners".
- Answer-first summaries, "at a glance" fact tables and FAQs: short, quotable facts that AI assistants
  like ChatGPT, Claude, Perplexity and Google AI Overviews can cite.
- Local SEO: consistent name, area and phone in the footer and schema, `areaServed` (Denver, Highlands Ranch,
  Douglas County, Colorado Springs, Colorado), geo meta tags and a local-roots section.
- `llms.txt` and `llms-full.txt`, a sitemap, and a robots.txt that explicitly allows AI crawlers.
- Visible "Last updated" dates with matching `dateModified` for freshness.

When you edit content, update the date in both places (search for `2026-10-20`).

## 5. After launch (do these once)

1. **Domain.** All canonical URLs, the sitemap and the schema assume `https://www.realtopartners.com/`.
   If the live domain is different, search and replace it across every file.
2. **Google Search Console and Bing Webmaster Tools.** Verify the site and submit `sitemap.xml`.
3. **Google Business Profile.** Create or claim one for ReAlto Partners as a service-area business
   (hide the street address, set service areas to Denver metro, Highlands Ranch, Douglas County and
   Colorado Springs). Use exactly the same name and phone as the site.
4. **Consistent listings.** Match name, city and phone on eXp agent pages, LinkedIn, Instagram, Facebook,
   Yelp and Zillow. Link back to the site from Dan's and Allison's profiles and from allisongomer.com.
5. **Validate.** Run each page through Google's Rich Results Test and the Schema.org validator.

## 6. Confirm with Dan and Allison before launch

- Podcast name. The site calls it "The Dan & Allison Gomer Podcast" until there's a title.
- The four "Coming soon" episode topics on `podcast.html` are suggestions.
- Allison's page is built from her own site copy and 2023 offering notes: her psychotherapist title and
  license status, the ceremony formats and the nine-session program. She should approve it. Prices are
  left off on purpose and live on allisongomer.com.
- Dan's timeline (real estate since 2012, Your Castle Real Estate, eXp since 2022) comes from his LinkedIn.
- Location is listed as Highlands Ranch with service areas around it. Phone 303.261.5278 is from Dan's
  earlier website copy.
- eXp program wording is kept general with a disclaimer. Check it against eXp's current marketing guidelines.

## Upload to GoDaddy

cPanel > File Manager > `public_html` > Upload. Upload everything in this folder (including the hidden
`.htaccess`), keeping the folder structure. Or use any FTP client.

## Fonts and colors

- Cinzel: the ReAlto brand font (logo, labels)
- Fraunces: headlines
- Manrope: body text
- Colors are CSS variables at the top of `assets/css/styles.css` (ink, ivory, brass, ember, plus the
  warmer cacao and clay tones on Allison's page).
