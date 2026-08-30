document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const nav = document.querySelector("#navmenu");
  const toggle = nav?.querySelector(".mobile-nav-toggle");
  const icon = toggle?.querySelector("i");

  if (!nav || !toggle || !icon) return;

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    body.classList.toggle("mobile-nav-active", open);
    icon.classList.toggle("bi-list", !open);
    icon.classList.toggle("bi-x", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
  };

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  nav.addEventListener("click", (event) => {
    if (event.target === nav) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1200) setOpen(false);
  });
});
