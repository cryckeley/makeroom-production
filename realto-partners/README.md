# ReAlto Partners website (static)

Plain HTML, CSS and a little JavaScript. No WordPress, no database, no build step.
Upload the contents of this folder to GoDaddy and it works.

```
index.html      Home (Dan, podcast feature, eXp model, team life, videos)
about.html      Dan & Allison Gomer, mission and values
join.html       Why ReAlto, the eXp advantage, FAQ, agent inquiry form
podcast.html    The Dan & Allison Gomer podcast, alerts signup, guest form
contact.html    General contact form
404.html        Not found page
.htaccess       404 page, compression and caching for GoDaddy (Apache)
assets/css/styles.css
assets/js/main.js   <- the one file with settings you edit
assets/favicon.svg
images/             <- drop the photos here (see list below)
```

## 1. Add the photos

The pages already point at these filenames. Until a photo is in place the page shows a
styled placeholder, so nothing looks broken while you work. Copy each Dropbox file into
`images/` and rename it to the name on the left.

| Save as `images/...` | Dropbox source |
|---|---|
| `dan-hero.jpg` | `/_CW Steal/Dan Gomer Public Speaking/DG-Website/Images/Dan-chair-den.jpg` |
| `dan-speaking.jpg` | `/_CW Steal/Dan Gomer Public Speaking/DG-Website/Images/Dan-speaking-wh.jpg` |
| `dan-about.jpg` | `/_CW Steal/Dan Gomer Public Speaking/DG-Public Persona/DG-Projects/website assets/Dan-about.jpg` |
| `allison.jpg` | `/Allison Gomer/about-allison.jpg` |
| `allison-2.jpg` | `/Allison Gomer/allisong-18.jpg` (any shot from the Megan Sawaya business shoot works) |
| `team-capitol.png` | `/Realto Partners/team-capitoil.png` |
| `team-a.jpg` | `/Realto Partners/Team-A.jpg` |
| `team-j.jpg` | `/Realto Partners/Team-J.jpg` |
| `welcome.jpg` | `/Realto Partners/welcome.jpg` |
| `why.jpg` | `/Realto Partners/whyhole.jpg` |
| `onboarding.jpg` | `/Realto Partners/onbording-plus.jpg` |
| `favicon.png` | `/Realto Partners/Marketing Info/favicon2.png` |

Tip: export large photos at about 2000px on the long side (JPG, quality ~80) so pages load fast.
The Megan Sawaya originals are 10 to 20 MB each and should not be uploaded as is.

## 2. Turn on the forms

All four forms (join, podcast alerts, podcast guest, contact) send through
[FormSubmit](https://formsubmit.co), which is free and needs no account or server code.

1. Open `assets/js/main.js`.
2. Replace `REPLACE_WITH_YOUR_EMAIL@example.com` with the inbox that should get leads.
3. Upload, submit any form once, then click the activation link FormSubmit emails you.

Until step 2 is done the forms run in demo mode: they show the thank-you message but
nothing is sent. Do not launch without setting the email.

## 3. Update links

Also in `assets/js/main.js`, under `links`: YouTube channel, podcast on YouTube / Spotify /
Apple, Instagram, Facebook and LinkedIn. Every button on the site picks these up
automatically. The YouTube and podcast links currently point at a YouTube search for
"Dan Gomer" and the Spotify/Apple home pages until the show is live.

## 4. Things to confirm with Dan before launch

- Podcast name. The site calls it "the Dan & Allison Gomer podcast" until there's a title.
- The four "Coming soon" episode topics on `podcast.html` are suggestions. Edit or remove.
- Allison's bio on `about.html` and `podcast.html` is written from her brand notes. She should approve it.
- Phone number 303.261.5278 is from Dan's earlier website copy.
- eXp program wording (revenue share, stock, splits/cap) is kept general with a disclaimer on purpose.
  Check it against eXp's current marketing guidelines.

## Upload to GoDaddy

cPanel > File Manager > `public_html` > Upload. Upload everything in this folder
(including the hidden `.htaccess`), keeping the folder structure. Or use any FTP client.

## Fonts and colors

- Cinzel: the ReAlto brand font (logo, labels)
- Fraunces: headlines
- Manrope: body text
- Colors are CSS variables at the top of `assets/css/styles.css` (ink, ivory, brass, ember).
