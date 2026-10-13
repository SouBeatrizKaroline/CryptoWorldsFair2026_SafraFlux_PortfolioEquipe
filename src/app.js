const language = document.documentElement.lang.toLowerCase();
const labels =
  language === "en"
    ? ["Open menu", "Close menu"]
    : language === "es"
      ? ["Abrir menú", "Cerrar menú"]
      : ["Abrir menu", "Fechar menu"];
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
menu.addEventListener("click", () => {
  const expanded = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(expanded));
  menu.setAttribute("aria-label", expanded ? labels[1] : labels[0]);
  menu.textContent = expanded ? "×" : "☰";
  nav.classList.toggle("open", expanded);
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", labels[0]);
    menu.textContent = "☰";
  }),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    menu.click();
    menu.focus();
  }
});
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        card.dataset.category !== button.dataset.filter;
    });
  }),
);
