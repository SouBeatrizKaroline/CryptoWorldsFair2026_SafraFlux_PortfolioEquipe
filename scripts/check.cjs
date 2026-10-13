const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const locales = ["pt-br", "en", "es"];
let count = 0;
const expected = Object.keys(
  JSON.parse(
    fs.readFileSync(path.join(root, "src/locales/pt-br.json"), "utf8"),
  ),
);
for (const lang of locales) {
  const dictionary = JSON.parse(
    fs.readFileSync(path.join(root, "src/locales", lang + ".json"), "utf8"),
  );
  if (JSON.stringify(Object.keys(dictionary)) !== JSON.stringify(expected))
    throw Error("Incomplete dictionary " + lang);
  const html = fs.readFileSync(
    path.join(root, "dist", "index." + lang + ".html"),
    "utf8",
  );
  for (const [key, value] of Object.entries(dictionary)) {
    if (typeof value !== "string" || !value.trim())
      throw Error("Empty translation " + lang + "/" + key);
    if (key.startsWith("application")) {
      const escaped = value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
      if (!html.includes(escaped))
        throw Error("Missing application text " + lang + "/" + key);
    }
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  if (
    !html.includes('<html lang="' + (lang === "pt-br" ? "pt-BR" : lang) + '">')
  )
    throw Error("Wrong HTML language");
  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    count++;
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const [file, anchor] = url.split("#");
    if (file && !fs.existsSync(path.join(root, "dist", file.split("?")[0])))
      throw Error("Missing asset " + url);
    if (!file && anchor && !ids.has(anchor))
      throw Error("Missing anchor " + url);
  }
  if (!html.includes("product." + lang + ".png"))
    throw Error("Wrong screenshot language");
  if (/\ufffd|ZXQ\d+XZ/.test(html)) throw Error("Invalid text encoding");
  const reference = fs.readFileSync(
    path.join(root, "dist/index.pt-br.html"),
    "utf8",
  );
  if (
    JSON.stringify([...ids]) !==
    JSON.stringify([
      ...new Set([...reference.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])),
    ])
  )
    throw Error("Different section structure");
}
if (
  fs.readFileSync(path.join(root, "dist/index.html"), "utf8") !==
  fs.readFileSync(path.join(root, "dist/index.pt-br.html"), "utf8")
)
  throw Error("Default edition drift");
console.log(
  "Three full locale dictionaries, equivalent section structure and " +
    count +
    " links/assets passed.",
);
