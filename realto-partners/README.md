# ReAlto Partners website (static)

Plain HTML, CSS and a little JavaScript. No WordPress, no database, no build step.
Upload the contents of this folder to GoDaddy and it works.

```
index.html                  Home: hero, podcast feature, eXp model, team rhythm, latest episodes, FAQ
dan-gomer.html              Dan Gomer biography, speaking, FAQ
allison-gomer.html          Allison Gomer: Realtor and partner, podcast co-host, what she believes, FAQ, inquiry form
join-exp-realty-team.html   Why ReAlto, the 4 R's, how eXp Realty works, local roots, agent FAQ, agent inquiry form
podcast.html                The Resilient Real Estate Agent: auto-updating latest-episodes player, hosts, guest form
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

## 1. Photos

All photos are already in `images/`, cropped and sized for the web from the originals in Dropbox. Each large photo also has `-480.jpg` and `-960.jpg` versions; the pages list them in `srcset` so phones download the smaller files. Each animation has a lighter `-turn-sm.webp` version for phones (about 200 to 600 KB). On a phone, a full scroll of the homepage downloads about 5.5 MB of images.

| File | Source in Dropbox | Used for |
|---|---|---|
| `team-j.jpg` (2200px) | `/Realto Partners/Team-J.jpg` | Homepage hero (slide 1), photo strip |
| `team-a.jpg` (1800px) | `/Realto Partners/Team-A.jpg` | Hero slide 2, gallery |
| `team-capitol.jpg` | `/Realto Partners/team-capitoil.png` (designer frame cropped off) | Hero slide 3, "At a glance" on Home, gallery, default share image |
| `why.jpg` | Portrait crop of `Team-A.jpg` | Why ReAlto page hero |
| `dan-about.jpg` | `/_CW Steal/Dan Gomer Public Speaking/DG-Website/Images/Dan-sideshot-closeup.png`, background removed and placed in the same Kling foothills backdrop as `allison-2.jpg` (1600x2000) | Dan portrait, founder chip, host avatar, photo strip |
| `dan-speaking.jpg` | `.../DG-Website/Images/Dan-chair-den.jpg`, background removed and placed in the same Kling backdrop as `allison.jpg` (1600x2000). His face is unedited. | Meet Dan, podcast art, host card, photo strip |
| `dan-wide.jpg` | `.../DG-Website/Images/Dan-chair-den.jpg` | Gallery |
| `dan-candid.jpg` | `/Acendant Title/Pen Bag/Dan Pic.jpg` | Gallery, photo strip |
| `allison.jpg`, `allison-2.jpg` (1600x2000) | Built from `/Allison Gomer/Megan Sawaya Photography/.../allisong-32.jpg`: background removed with a local AI model, braces removed with Kling (mouth area only, blended back), and placed into Colorado foothills backdrops generated with Kling (no people in the backdrops). Her face is otherwise unedited. | Allison portraits, host cards, podcast art, photo strip |
| `podcast-allison.jpg` | Same Allison cutout and backdrop as `allison.jpg`, composed in a tall 1:2 frame so she matches Dan's size and eye line in the podcast art | Podcast art (Home and Podcast pages) |
| `latest-episodes.jpg`, `video-burnout-purpose.jpg`, `video-sphere-marketing.jpg` | Designed posters built from the Dan and Allison cutouts, the Kling foothills backdrop and the site fonts | Video players on Home and Podcast (shown instead of YouTube's own thumbnails) |
| `latest-episodes-turn.webp` | Animated from `latest-episodes.jpg` with Kling (image to video, same first and last frame) and saved as an animated WebP. Plays once on hover (desktop) or when scrolled into view (phones); visitors with reduced motion see the still. Dan and Allison should approve it before launch. | Latest episodes banner |
| `video-burnout-purpose-turn.webp`, `video-sphere-marketing-turn.webp`, `podcast-dan-turn.webp`, `podcast-allison-turn.webp`, `meet-dan-turn.webp`, `meet-allison-turn.webp`, `dan-about-anim-turn.webp`, `allison-2-anim-turn.webp` (with matching `.jpg` stills) | Same Kling hover/scroll animation (see `.claude/skills/realto-portrait-animation`). On the podcast art Dan and Allison turn toward each other. | Video cards, podcast art, and every appearance of Dan's and Allison's portraits on Home, Dan, Allison and Podcast (page photos, host cards, carousel). The lightbox still opens the original photos. |
| `logo-white.png`, `logo.png` | `/Realto Partners/Marketing Info/ReAlto Partners Final Logo_White Transparent.png` and `...Final Logo Transparent.png` | Header and footer logo, schema logo |
| `exp-logo-white.png` | `/Realto Partners/Marketing Info/exp-inverted-logo.png` (official white eXp Realty logo) | Beside the eXp sections on Home and Why ReAlto |
| `favicon.png` | `/Realto Partners/Marketing Info/favicon2.png` | Browser tab icon |
| `resilient-logo.png`, `podcast-cover.jpg` | The Resilient Real Estate Agent YouTube channel logo and banner | Podcast badge and share image |

Not used on purpose: `Dan-speaking-wh.jpg` (has Shutterstock watermarks), `whyhole.jpg` and
`onbording-plus.jpg` (old graphics with text), `welcome.jpg` (video still).

Nothing from Allison's former, separate business is shown: the original room, props and styling are gone. Dan and Allison are presented as individual co-founders, each with their own
portraits (no couple composites). A new
professional Realtor headshot can replace these anytime; keep the same file names.

Every photo gets the same ReAlto color grade and green edge automatically (in `styles.css`, "One consistent
ReAlto photo grade"), so shots from different shoots look like one set. For the closest match, crop portraits
to 4:5 and use photos with soft, warm light.

## Animations

The hover/scroll head-turn animations are switched off (client feedback, Oct 2026). The files stay in
`images/`; to bring one back, add its file name to `ANIMATIONS_ON` in the generator and rebuild.

## 2. Turn on the forms

All five forms (join, Allison inquiry, podcast alerts, podcast guest, contact) send through
[FormSubmit](https://formsubmit.co), which is free and needs no account or server code.

1. Open `assets/js/main.js`.
2. Replace `REPLACE_WITH_YOUR_EMAIL@example.com` with the inbox that should get leads.
3. Upload, submit any form once, then click the activation link FormSubmit emails you.

Until step 2 is done the forms run in demo mode: they show the thank-you message but
nothing is sent. Do not launch without setting the email.

## 3. Update links

Also in `assets/js/main.js`, under `links` (YouTube, Instagram, Facebook https://www.facebook.com/ReAltoPartners, LinkedIn, Calendly https://calendly.com/dangomer for "Book a call" buttons, Eventbrite https://www.eventbrite.com/o/dan-gomer-50128640253 for "See upcoming events"). Every YouTube, "Watch" and podcast button goes to
The Resilient Real Estate Agent channel: https://www.youtube.com/@theresilientrealestateagent
(the Subscribe buttons add `?sub_confirmation=1` so YouTube opens the subscribe prompt).
The "Latest episodes" player embeds the channel's uploads playlist (`UUsfOEfe5zPbju0cti-AUzNQ`),
so new episodes appear on the site automatically with no updates needed.

## 4. SEO and AI search: what's built in

- One H1 per page that carries the main keyword, plus question-style H2s ("What is ReAlto Partners?",
  "How does an eXp Realty team create recurring income?") that match how people search and how AI assistants answer.
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

1. **Domain (confirmed).** The site lives on the naked domain `https://realtopartners.com/` (no www). All canonical URLs,
   the sitemap and the schema use it. DNS already forwards www to the naked domain, and `.htaccess` also
   301-redirects www to `https://realtopartners.com` as a backup. Turn on HTTPS for the naked domain in GoDaddy.
2. **Google Search Console and Bing Webmaster Tools.** Verify the site and submit `sitemap.xml`.
3. **Google Business Profile.** Create or claim one for ReAlto Partners as a service-area business
   (hide the street address, set service areas to Denver metro, Highlands Ranch, Douglas County and
   Colorado Springs). Use exactly the same name and phone as the site.
4. **Consistent listings.** Match name, city and phone on eXp agent pages, LinkedIn, Instagram, Facebook,
   Yelp and Zillow. Link back to the site from Dan's and Allison's profiles.
5. **Validate.** Run each page through Google's Rich Results Test and the Schema.org validator.

## 6. Confirm with Dan and Allison before launch

- The podcast copy uses the channel's own description (3R Framework: resiliency, resourcefulness,
  responsibility). The one-line definitions of each R on `podcast.html` are written for the site; Dan
  should check they match how he teaches it.
- Allison's page presents her only as a Realtor and partner at ReAlto Partners and podcast co-host. Her
  separate business is intentionally not referenced anywhere on the site or in the structured data. The
  "What Allison believes" section is written from her values; she should approve the wording.
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
- Colors follow the ReAlto logo pack: brand green `#1ba32e` (the contrast color) and charcoal `#262626`,
  enriched into a charcoal/cool-gray system with a deeper green for text on light backgrounds. They are
  CSS variables at the top of `assets/css/styles.css`.
