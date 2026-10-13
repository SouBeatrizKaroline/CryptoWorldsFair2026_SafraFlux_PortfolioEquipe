# SheBuilds — Ideas that take root

[Português (Brasil)](README.pt-br.md) · [English](README.en.md) · [Español](README.es.md)

Portfolio of the SheBuilds team and SafraFlux, fully available in Brazilian Portuguese, English and Spanish. Structure, facts and profiles are equivalent across the three editions; buttons, accessible descriptions, metadata and screenshots follow the language.

## Structure

| Path | Description |
| --- | --- |
| src/index.template.pt-br.html | Shared page template. |
| src/locales/*.json | 263 texts per language; identical keys and order. |
| src/style.css, src/app.js | Shared styles and interactions. |
| scripts/ | Generation and validation without external dependencies. |
| dist/ | Generated static site, ready to publish. |

## Edit and validate

Edit the page template and all three translations together. Then generate the site and run verification. Do not edit generated pages directly. The default homepage is Brazilian Portuguese; other editions are index.en.html and index.es.html. Existing homepage paths continue working.

```sh
npm run build
npm run check
```

## Publish

The Vercel configuration uses npm run build and publishes dist. After merging into the main branch, Vercel may deploy automatically if the repository is connected. No API keys are needed.

## Sources and limits

The team works remotely in Brazil. Beatriz leads product and development; Sonia contributes product analysis and pitch; Olivia contributes strategy and market development. Profiles and previous experience were provided by the team. One external demo test is reported; no paying customers, revenue or commercial pilots are confirmed.

Meteora is a local lab, Panta awaits credentialed validation and Solami is a separate diagnostic. Zcash evidence is regtest, without monetary value. Track participation does not mean an award or confirmed eligibility. The main project is private; access requires authorization.

Monograms represent the creators without invented photos. Logos are shared; the product screenshot has a language-specific edition. Attribution of libraries and technical assistance is preserved.

## References

- [SafraFlux](https://safraflux.soubeatrizkaroline.workers.dev/)
- [Colosseum](https://colosseum.com/arena/projects/shebuilds)
- [SafraFlux repository](https://github.com/SouBeatrizKaroline/CryptoWorldsFair2026_SafraFlux)
- [Current documentation review](https://github.com/SouBeatrizKaroline/CryptoWorldsFair2026_SafraFlux/pull/31)
- [Solami diagnostics](https://github.com/SouBeatrizKaroline/CryptoWorldsFair2026_SafraFlux_Solami)
- [Beatriz](https://soubeatrizkaroline.vercel.app/)
- [Sonia](https://jhay.goskip.app/)
- [Olivia](https://sites.google.com/view/oliviaboretti/olivia-boretti)
