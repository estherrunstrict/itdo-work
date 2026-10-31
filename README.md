# ITDO public website

Public project showcase for `itdo.work`. All examples are fictional. This directory
contains only the public website; private accounts, records, agent configuration,
and runtime code belong in a separate environment.

The homepage uses the selected family illustration, `family-portrait-v1.png`.
Its source photograph and private generation notes are excluded from this directory.
The header and footer use the supplied brand image, `itdo-brand-v1.png`; CSS frames
the central wordmark while preserving the original image file.

## Preview

Run `python3 -m http.server 9130 --bind 127.0.0.1 --directory public-site` from the
parent workspace, then visit `http://127.0.0.1:9130/`. Inside this repository, omit
`--directory public-site`.

No build step, package installation, external assets, analytics, forms, or API is
needed. JavaScript switches between fictional examples without sending requests.
The learning example remains readable when JavaScript is disabled.

## Publishing

Use the dedicated `estherrunstrict/itdo-work` repository with GitHub Pages publishing
from `main` at `/ (root)`. Upload only the reviewed files in this directory.
Never upload the enclosing workspace. Set the repository's custom domain to
`itdo.work`, verify DNS, and enable **Enforce HTTPS** when the certificate is ready.

The private application is planned for `app.itdo.work`, with a separate authenticated
backend on the home Mac mini. Its deployment is not established by this static site.
Keep the public access notice accurate until the private deployment is verified.

GitHub Pages is used only for this project showcase. It does not run agents, accept
sign-ins, or serve private records. See the [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
