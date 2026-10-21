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
    // The Resilient Real Estate Agent: every YouTube and podcast button goes here
    youtube: "https://www.youtube.com/@theresilientrealestateagent",
    podcastYouTube: "https://www.youtube.com/@theresilientrealestateagent",
    youtubeSubscribe: "https://www.youtube.com/@theresilientrealestateagent?sub_confirmation=1",
    instagram: "https://www.instagram.com/danshometeam/",
    facebook: "https://www.facebook.com/ReAltoPartners",
    linkedin: "https://www.linkedin.com/in/dan-gomer/",
    calendly: "https://calendly.com/dangomer", // Book a call with Dan
    eventbrite: "https://www.eventbrite.com/o/dan-gomer-50128640253", // Dan's upcoming events
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
    const closeNav = () => {
      doc.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    doc.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", closeNav));
    // Tapping the dimmed page (the header's backdrop) or pressing Escape closes the menu
    header.addEventListener("click", (e) => { if (e.target === header && doc.body.classList.contains("nav-open")) closeNav(); });
    doc.addEventListener("keydown", (e) => { if (e.key === "Escape" && doc.body.classList.contains("nav-open")) { closeNav(); toggle.focus(); } });
  }

  /* ---------- Photo fallback: show a styled frame until the real image is in /images ---------- */
  doc.querySelectorAll(".photo img").forEach((img) => {
    const mark = () => img.closest(".photo").classList.add("missing");
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener("error", mark);
  });

  /* ---------- Optional images (e.g. the channel logo) disappear quietly if not uploaded yet ---------- */
  doc.querySelectorAll("img[data-optional]").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) img.remove();
    img.addEventListener("error", () => img.remove());
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

  /* ---------- Portrait head turns: play on hover (desktop) or when scrolled into view (touch) ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;
  // Phones and small screens get the lighter animation files (data-anim-sm)
  const small = !canHover || window.matchMedia("(max-width: 760px)").matches;
  const animCache = new Map(); // one download per file, shared by every image that uses it
  const fetchAnim = (src) => {
    if (!animCache.has(src)) {
      animCache.set(src, fetch(src).then((r) => (r.ok ? r.blob() : null)).catch(() => null));
    }
    return animCache.get(src);
  };
  doc.querySelectorAll("img[data-anim]").forEach((img) => {
    if (reduceMotion) return;
    const still = img.getAttribute("src");
    const stillSet = img.getAttribute("srcset");
    const src = (small && img.dataset.animSm) || img.dataset.anim;
    const duration = Number(img.dataset.animMs) || 5000;
    let playing = false, timer = 0, url = "";
    const stop = () => {
      if (stillSet) img.setAttribute("srcset", stillSet);
      img.src = still;
      if (url) URL.revokeObjectURL(url);
      url = ""; playing = false;
    };
    const play = () => {
      if (playing || !img.isConnected) return;
      playing = true;
      fetchAnim(src).then((b) => {
        if (!playing) return;
        if (!b) { playing = false; return; } // animation unavailable: keep the still
        url = URL.createObjectURL(b); // a fresh URL restarts the animation from frame one
        img.removeAttribute("srcset");
        img.src = url;
        clearTimeout(timer);
        timer = setTimeout(stop, duration);
      });
    };
    const host = img.closest("[data-anim-host], .yt") || img;
    if (!("IntersectionObserver" in window)) {
      if (canHover) { host.addEventListener("mouseenter", play); host.addEventListener("focus", play); }
      return;
    }
    if (canHover) {
      host.addEventListener("mouseenter", play);
      host.addEventListener("focus", play);
      // Fetch the animation only when it is about to be seen
      const pre = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { fetchAnim(src); pre.disconnect(); }
      }, { rootMargin: "300px" });
      pre.observe(host);
    } else {
      let seen = false;
      new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting && !seen) { seen = true; play(); }
        if (!e.isIntersecting) seen = false;
      }), { threshold: 0.6 }).observe(host);
    }
  });

  /* ---------- Channel player: always shows the latest uploads ---------- */
  doc.querySelectorAll(".yt[data-list]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const iframe = doc.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/videoseries?list=${btn.dataset.list}&autoplay=1&rel=0`;
      iframe.title = btn.getAttribute("aria-label") || "YouTube playlist";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      btn.replaceChildren(iframe);
    }, { once: true });
  });

  /* ---------- Lightbox for the photo carousel ---------- */
  const lbTriggers = [...doc.querySelectorAll("[data-lb-group]:not([aria-hidden])")];
  if (lbTriggers.length) {
    const items = lbTriggers.map((b) => ({ src: b.dataset.lbSrc, caption: b.dataset.lbCaption }));
    const icon = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="${d}"/></svg>`;
    const box = doc.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Team photos");
    box.innerHTML = `
      <figure class="lb-figure"><img alt=""><figcaption class="lb-caption"><span class="lb-text"></span><span class="lb-count"></span></figcaption></figure>
      <button type="button" class="lb-btn lb-prev" aria-label="Previous photo">${icon("M15 5l-7 7 7 7")}</button>
      <button type="button" class="lb-btn lb-next" aria-label="Next photo">${icon("M9 5l7 7-7 7")}</button>
      <button type="button" class="lb-btn lb-close" aria-label="Close">${icon("M6 6l12 12M18 6L6 18")}</button>`;
    doc.body.appendChild(box);
    const img = box.querySelector("img");
    const text = box.querySelector(".lb-text");
    const count = box.querySelector(".lb-count");
    const strip = doc.querySelector(".pack-strip");
    let index = 0;
    let lastFocus = null;

    const render = () => {
      const it = items[index];
      img.classList.add("loading");
      img.onload = () => img.classList.remove("loading");
      img.src = it.src;
      img.alt = it.caption;
      text.textContent = it.caption;
      count.textContent = `${index + 1} of ${items.length}`;
      // warm the neighbours so back/forward feels instant
      [index + 1, index - 1].forEach((n) => { const p = new Image(); p.src = items[(n + items.length) % items.length].src; });
    };
    const go = (step) => { index = (index + step + items.length) % items.length; render(); };
    const open = (i) => {
      index = i;
      lastFocus = doc.activeElement;
      render();
      box.hidden = false;
      requestAnimationFrame(() => box.classList.add("open"));
      doc.body.classList.add("lb-open");
      if (strip) strip.classList.add("paused");
      box.querySelector(".lb-next").focus();
    };
    const close = () => {
      box.classList.remove("open");
      doc.body.classList.remove("lb-open");
      if (strip) strip.classList.remove("paused");
      setTimeout(() => { box.hidden = true; }, 200);
      if (lastFocus) lastFocus.focus();
    };

    doc.querySelectorAll("[data-lb-group]").forEach((b) =>
      b.addEventListener("click", () => open(Number(b.dataset.lbIndex) || 0)));
    box.querySelector(".lb-prev").addEventListener("click", () => go(-1));
    box.querySelector(".lb-next").addEventListener("click", () => go(1));
    box.querySelector(".lb-close").addEventListener("click", close);
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
    doc.addEventListener("keydown", (e) => {
      if (box.hidden) return;
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Escape") close();
      else if (e.key === "Tab") {
        // keep keyboard focus inside the lightbox
        const f = [...box.querySelectorAll("button")];
        const i = f.indexOf(doc.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    let touchX = null;
    box.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      touchX = null;
    });
  }

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
