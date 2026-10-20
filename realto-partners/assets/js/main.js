/* ==========================================================================
   ReAlto Partners · site script
   Everything you may need to edit lives in SITE below.
   ========================================================================== */

const SITE = {
  // Every form on the site posts here. Uses FormSubmit (free, no backend):
  // put the inbox that should receive leads after /ajax/. The very first
  // submission sends a one-time "activate this form" email to that inbox.
  formEndpoint: "https://formsubmit.co/ajax/REPLACE_WITH_YOUR_EMAIL@example.com",

  // Links used by every button with a matching data-link attribute.
  links: {
    youtube: "https://www.youtube.com/results?search_query=Dan+Gomer",
    podcastYouTube: "https://www.youtube.com/results?search_query=Dan+Gomer",
    podcastApple: "https://podcasts.apple.com/",
    podcastSpotify: "https://open.spotify.com/",
    instagram: "https://www.instagram.com/danshometeam/",
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    expJoin: "https://www.exprealty.com/",
  },
};

(function () {
  const doc = document;

  /* ---------- Wire up config links ---------- */
  doc.querySelectorAll("[data-link]").forEach((a) => {
    const url = SITE.links[a.dataset.link];
    if (url) {
      a.href = url;
      if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    }
  });

  /* ---------- Year ---------- */
  doc.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Header state + mobile nav ---------- */
  const header = doc.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = doc.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = doc.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });
    doc.querySelectorAll(".nav a").forEach((a) =>
      a.addEventListener("click", () => {
        doc.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Photo fallback: show a styled frame until the real image is in /images ---------- */
  doc.querySelectorAll(".photo img").forEach((img) => {
    const mark = () => img.closest(".photo").classList.add("missing");
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener("error", mark);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Lightweight YouTube embeds (load the player only on click) ---------- */
  doc.querySelectorAll(".yt[data-id]").forEach((btn) => {
    const id = btn.dataset.id;
    const thumb = btn.querySelector("img");
    if (thumb && !thumb.getAttribute("src")) thumb.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    btn.addEventListener("click", () => {
      const iframe = doc.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = btn.getAttribute("aria-label") || "YouTube video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      btn.replaceChildren(iframe);
    }, { once: true });
  });

  /* ---------- Forms ---------- */
  const configured = !/REPLACE_WITH_YOUR_EMAIL/.test(SITE.formEndpoint);
  if (!configured) {
    console.warn("[ReAlto] Forms are in demo mode. Set SITE.formEndpoint in assets/js/main.js to start receiving submissions.");
  }

  doc.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (form.querySelector('[name="_honey"]')?.value) return;

      const btn = form.querySelector('[type="submit"]');
      const err = form.querySelector(".form-error");
      if (btn) btn.disabled = true;
      if (err) err.classList.remove("show");

      const data = new FormData(form);
      // Collapse multi-select chip groups into one readable line
      const merged = {};
      for (const [k, v] of data.entries()) merged[k] = merged[k] ? `${merged[k]}, ${v}` : v;
      merged._subject = merged._subject || `ReAlto Partners website: ${form.dataset.form}`;
      merged._template = "table";
      merged._captcha = "false";
      merged["Form"] = form.dataset.form;
      merged["Page"] = location.pathname;

      try {
        if (configured) {
          const res = await fetch(SITE.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(merged),
          });
          if (!res.ok) throw new Error(res.status);
        } else {
          await new Promise((r) => setTimeout(r, 600));
        }
        form.classList.add("sent");
        const success = form.nextElementSibling;
        if (success) success.setAttribute("tabindex", "-1"), success.focus?.();
      } catch (ex) {
        if (err) err.classList.add("show");
        if (btn) btn.disabled = false;
      }
    });
  });
})();
