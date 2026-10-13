const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const languages = ["pt-br", "en", "es"];
const template = fs.readFileSync(
  path.join(root, "src/index.template.pt-br.html"),
  "utf8",
);
const attributes = {
  "SheBuilds, início": [
    "SheBuilds, início",
    "SheBuilds, home",
    "SheBuilds, inicio",
  ],
  "Navegação principal": [
    "Navegação principal",
    "Main navigation",
    "Navegación principal",
  ],
  "Abrir menu": ["Abrir menu", "Open menu", "Abrir menú"],
  "Ilustração de curvas de cultivo conectadas, representando o campo e o fluxo da colaboração":
    [
      "Ilustração de curvas de cultivo conectadas, representando o campo e o fluxo da colaboração",
      "Illustration of connected cultivation curves representing agriculture and collaboration",
      "Ilustración de curvas de cultivo conectadas que representan el campo y la colaboración",
    ],
  "Conheça o SafraFlux": [
    "Conheça o SafraFlux",
    "Meet SafraFlux",
    "Conoce SafraFlux",
  ],
  "Captura do painel SafraFlux mostrando a operação de uma cooperativa com dados fictícios":
    [
      "Captura do painel SafraFlux mostrando a operação de uma cooperativa com dados fictícios",
      "SafraFlux dashboard showing a cooperative operation with fictional data",
      "Panel SafraFlux mostrando la operación de una cooperativa con datos ficticios",
    ],
  "Filtrar projetos": [
    "Filtrar projetos",
    "Filter projects",
    "Filtrar proyectos",
  ],
  "GitHub de Sonia": ["GitHub de Sonia", "Sonia’s GitHub", "GitHub de Sonia"],
  "LinkedIn de Sonia": [
    "LinkedIn de Sonia",
    "Sonia’s LinkedIn",
    "LinkedIn de Sonia",
  ],
  "GitHub de Olivia": [
    "GitHub de Olivia",
    "Olivia’s GitHub",
    "GitHub de Olivia",
  ],
  "LinkedIn de Olivia": [
    "LinkedIn de Olivia",
    "Olivia’s LinkedIn",
    "LinkedIn de Olivia",
  ],
};
const descriptions = [
  "Conheça Beatriz, Sonia e Olivia, a equipe SheBuilds, e o SafraFlux: do lote ao recebimento, do recebimento ao produtor.",
  "Meet Beatriz, Sonia and Olivia, the SheBuilds team, and SafraFlux: from lot to receipt, from receipt to producer.",
  "Conoce a Beatriz, Sonia y Olivia, el equipo SheBuilds, y SafraFlux: del lote al cobro, del cobro al productor.",
];
const integrationCopy = [
  [
    "EXPERIMENTOS E INFRAESTRUTURA",
    "Meteora DBC Lab",
    "Laboratório local com o SDK oficial para configurar curvas, taxas e instruções. Sem lançamento de token, pool, swap ou migração executados.",
    "Panta Signals",
    "Protótipo de consulta de mercados. Exemplos fictícios; a validação com chave de API ainda está pendente.",
    "RPC Fast e Solami",
    "RPC Fast Start atende consultas do servidor na Solana mainnet. Solami é um diagnóstico público separado, somente de leitura; não é o provedor do painel.",
    "Participação no hackathon",
    "SafraFlux foi inscrito no Crypto World’s Fair da Colosseum e em trilhas complementares. Inscrição não equivale a prêmio ou elegibilidade confirmada.",
  ],
  [
    "EXPERIMENTS AND INFRASTRUCTURE",
    "Meteora DBC Lab",
    "Local lab using the official SDK to configure curves, fees and instructions. No token launch, pool, swap or migration has been executed.",
    "Panta Signals",
    "Market-query prototype. Examples are fictional; API-key validation remains pending.",
    "RPC Fast and Solami",
    "RPC Fast Start serves server queries on Solana mainnet. Solami is a separate public, read-only diagnostic; it is not the dashboard provider.",
    "Hackathon participation",
    "SafraFlux was submitted to Colosseum’s Crypto World’s Fair and complementary tracks. Submission does not mean an award or confirmed eligibility.",
  ],
  [
    "EXPERIMENTOS E INFRAESTRUCTURA",
    "Meteora DBC Lab",
    "Laboratorio local con el SDK oficial para configurar curvas, tarifas e instrucciones. No se ha ejecutado lanzamiento de token, pool, swap ni migración.",
    "Panta Signals",
    "Prototipo de consulta de mercados. Los ejemplos son ficticios; la validación con clave de API sigue pendiente.",
    "RPC Fast y Solami",
    "RPC Fast Start atiende consultas del servidor en Solana mainnet. Solami es un diagnóstico público separado, de solo lectura; no es el proveedor del panel.",
    "Participación en el hackathon",
    "SafraFlux se inscribió en Crypto World’s Fair de Colosseum y en categorías complementarias. La inscripción no equivale a un premio ni a elegibilidad confirmada.",
  ],
];
const escape = (s) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
fs.mkdirSync(path.join(root, "dist/assets"), { recursive: true });
for (const asset of fs.readdirSync(path.join(root, "src/assets")))
  fs.copyFileSync(
    path.join(root, "src/assets", asset),
    path.join(root, "dist/assets", asset),
  );
for (let l = 0; l < languages.length; l++) {
  const lang = languages[l],
    dictionary = JSON.parse(
      fs.readFileSync(path.join(root, "src/locales", lang + ".json"), "utf8"),
    );
  let index = 0;
  let html = template
    .split(/(<[^>]*>)/g)
    .map((token) => {
      if (token.startsWith("<")) return token;
      return token
        .split(/(&(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);|&)/g)
        .map((text) => {
          if (text === "&") return "&amp;";
          if (text.startsWith("&") && text.endsWith(";")) return text;
          if (!text.trim() || !/[A-Za-zÀ-ÿ]/.test(text)) return text;
          const key = "t" + String(index++).padStart(3, "0");
          if (typeof dictionary[key] !== "string")
            throw Error("Missing " + lang + "/" + key);
          return escape(dictionary[key]);
        })
        .join("");
    })
    .join("");
  if (
    index !==
    Object.keys(dictionary).filter((key) => /^t\d{3}$/.test(key)).length
  )
    throw Error("Unmatched locale keys " + lang + ": " + index);
  for (const [original, variants] of Object.entries(attributes))
    html = html.replaceAll(
      '="' + original + '"',
      '="' + escape(variants[l]) + '"',
    );
  html = html.replace(
    '<html lang="pt-BR">',
    '<html lang="' + (lang === "pt-br" ? "pt-BR" : lang) + '">',
  );
  html = html.replace(
    /(<meta (?:name="description"|property="og:description") content=")[^"]*(">)/g,
    "$1" + escape(descriptions[l]) + "$2",
  );
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(">)/,
    "$1" + escape(dictionary.t000) + "$2",
  );
  const urls = languages.map(
    (x) => "https://shebuilds-safraflux.vercel.app/index." + x + ".html",
  );
  html = html.replace(
    "</head>",
    '<link rel="canonical" href="' +
      urls[l] +
      '">' +
      languages
        .map(
          (x, i) =>
            '<link rel="alternate" hreflang="' +
            (x === "pt-br" ? "pt-BR" : x) +
            '" href="' +
            urls[i] +
            '">',
        )
        .join("") +
      '<meta property="og:url" content="' +
      urls[l] +
      '"><meta property="og:image" content="https://shebuilds-safraflux.vercel.app/assets/product.' +
      lang +
      '.png"></head>',
  );
  const label = ["Idioma", "Language", "Idioma"][l];
  const switcher =
    '<div class="language-switch" role="group" aria-label="' +
    label +
    '">' +
    languages
      .map(
        (x, i) =>
          '<a href="index.' +
          x +
          '.html" lang="' +
          x +
          '"' +
          (x === lang ? ' aria-current="page"' : "") +
          ">" +
          ["PT-BR", "EN", "ES"][i] +
          "</a>",
      )
      .join("") +
    "</div>";
  html = html.replace(
    '<button class="menu"',
    switcher + '<button class="menu"',
  );
  const appLang = lang === "pt-br" ? "pt" : lang;
  html = html
    .replaceAll("?lang=pt", "?lang=" + appLang)
    .replaceAll("media.pt.html", "media." + appLang + ".html")
    .replaceAll("assets/product.png", "assets/product." + lang + ".png")
    .replace('height="960"', 'height="1040"');
  const c = integrationCopy[l];
  const block =
    '<section class="experiments section" id="integracoes"><p class="eyebrow">' +
    c[0] +
    '</p><div class="network-grid">' +
    [1, 3, 5]
      .map(
        (i) =>
          "<article><h3>" + c[i] + "</h3><p>" + c[i + 1] + "</p></article>",
      )
      .join("") +
    '</div><div class="collaboration-note"><h3>' +
    c[7] +
    "</h3><p>" +
    c[8] +
    "</p></div></section>";
  html = html.replace(
    '<section class="roadmap',
    block + '<section class="roadmap',
  );
  const text = (i) =>
    escape(dictionary["application" + String(i).padStart(2, "0")]);
  const businessCards = [4, 7, 10, 13]
    .map(
      (i) =>
        '<article><p class="eyebrow">' +
        text(i) +
        "</p><h3>" +
        text(i + 1) +
        "</h3><p>" +
        text(i + 2) +
        "</p></article>",
    )
    .join("");
  const business =
    '<section class="application-business section" id="negocio"><div class="section-heading"><div><p class="eyebrow">' +
    text(0) +
    "</p><h2>" +
    text(1) +
    '<br><span class="serif">' +
    text(2) +
    "</span></h2></div><p>" +
    text(3) +
    '</p></div><div class="application-grid">' +
    businessCards +
    "</div></section>";
  html = html.replace(
    '<section class="projects',
    business + '<section class="projects',
  );
  const backgroundCards = [20, 22, 24, 26]
    .map(
      (i) =>
        "<article><h3>" + text(i) + "</h3><p>" + text(i + 1) + "</p></article>",
    )
    .join("");
  const background =
    '<section class="application-background section" id="trajetoria"><div class="section-heading"><div><p class="eyebrow">' +
    text(16) +
    "</p><h2>" +
    text(17) +
    '<br><span class="serif">' +
    text(18) +
    "</span></h2></div><p>" +
    text(19) +
    '</p></div><div class="application-grid">' +
    backgroundCards +
    "</div></section>";
  const access =
    '<section class="application-access section" id="avaliacao"><p class="eyebrow">' +
    text(28) +
    '</p><div class="architecture-note"><div><h3>' +
    text(29) +
    "</h3><p>" +
    text(30) +
    "</p></div><div><h3>" +
    text(35) +
    "</h3><p>" +
    text(31) +
    '</p></div></div><div class="actions"><a class="button" href="assets/logo-horizontal.png" download="safraflux-logo.png">' +
    text(34) +
    '</a><a class="text-link" href="https://x.com/1aspiraqualquer" target="_blank" rel="noopener noreferrer">' +
    text(32) +
    '</a><a class="text-link" href="https://t.me/aspiraqualquer" target="_blank" rel="noopener noreferrer">' +
    text(33) +
    "</a></div><h3>" +
    text(36) +
    '</h3><p class="caption">' +
    text(37) +
    '</p><p class="source-note">' +
    text(38) +
    "</p></section>";
  html = html.replace(
    '<section class="links',
    background + access + '<section class="links',
  );
  fs.writeFileSync(path.join(root, "dist", "index." + lang + ".html"), html);
  if (lang === "pt-br")
    fs.writeFileSync(path.join(root, "dist/index.html"), html);
}
for (const file of ["app.js", "style.css"])
  fs.copyFileSync(path.join(root, "src", file), path.join(root, "dist", file));
console.log(
  "Built PT-BR, EN and ES from a shared template and complete locale dictionaries.",
);
