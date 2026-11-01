# ITDO public website

The public `itdo.work` showcase introduces everyday care, faith and routines,
four businesses, and family learning through short animated walkthroughs.
Examples use sample content. Live AI and personal records belong in the private
workspace at `https://itdo.work/control/`, behind Cloudflare Access and the
application's personal sign-in.

## Experience

- A 27-second phone, tablet and speaker sequence introduces life, business and
  learning. Visitors can select a scene or pause all decorative animation.
- Care, Faith and Routines show sample reminders. Audio starts only after a click,
  uses browser speech synthesis, includes a transcript and stop control, and stops
  when the page is hidden. It does not operate a household speaker or microphone.
- RunStrict, TosBurger and TAP Work show Jae's business processes. OpenEdu shows
  Esther's. Each example moves from input to an AI draft and human review, with a
  link to the real business website.
- Simon and Sia have separate sample homework lists and mistake notebooks. The
  first answer remains visible beside a tutor hint and a separate example retry.
  Switching students resets the sample; nothing is saved or sent.
- Education consulting illustrates official-source research, comparison and a
  learning plan. This is an animated process preview, without a live search or
  current admissions recommendations.

The layout adapts to phones and desktops. Reduced-motion preferences disable
animation and start the walkthrough paused. Content stays readable without
JavaScript; interactive controls require JavaScript.

## Customize

- Edit the headline, section introductions and navigation in `index.html`.
- Edit `sceneData`, `routines`, `businesses` and `students` in `site.js` for sample
  messages, business owners and links, homework and tutor examples. Keep the
  default HTML examples in sync for visitors without JavaScript.
- Edit the color variables at the start of `styles.css` for the theme. The same
  file contains the responsive layouts, device artwork and motion.
- Keep the public examples separate from private records and credentials. This
  directory is the complete publication boundary.

## Preview

From the parent workspace:

```sh
python3 -m http.server 9130 --bind 127.0.0.1 --directory public-site
```

Open `http://127.0.0.1:9130/`. From inside this directory, omit
`--directory public-site`. The relative `/control/` link reaches the private
workspace on the production domain; a local static preview does not host it.

No build step, package installation, third-party JavaScript, analytics, forms or
API connection is required. The page does not execute agents or search jobs.

## Publishing

Publish only this directory to `estherrunstrict/itdo-work`, with GitHub Pages
serving `main` at `/ (root)`. Keep `.nojekyll` and `CNAME` (`itdo.work`). Preserve
the existing Cloudflare DNS and protected `/control/` route. The public homepage
continues to use GitHub Pages; no hosting migration is needed.

Include the `assets` directory when publishing: both WebP files are required for
the agent illustrations. Never upload the enclosing workspace or review files.
When changing CSS or JavaScript, update its `v` query in `index.html` to refresh
cached files. Verify the live HTML, CSS, JavaScript and image assets after deployment.

## Artwork

The supplied transparent logo is `itdo-logo-transparent-v2.png`; CSS frames its
transparent margins. The family illustration is `family-portrait-v1.png`, loaded
on demand near the bottom of the page. Original public artwork is preserved.

The character lineup uses `assets/agents_persona.webp` and
`assets/leaderAgent_persona.webp`. The personal sheet maps blue to jaedo, green
to hado, yellow to wondo and pink to siado. The crowned leader is itdo. Device
illustrations and animation are HTML, CSS and SVG; no reference-site assets are
copied. Source photographs and private generation notes are excluded.
