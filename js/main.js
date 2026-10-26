/* TPSK — shared behaviour. Plain JS, no dependencies. */
(function () {
  "use strict";
  var D = window.TPSK;
  var C = D.config;
  var PAGE = document.body.getAttribute("data-page") || "home";

  var NAV = [
    ["index.html", "Home", "home"],
    ["origin.html", "Origin", "origin"],
    ["branches.html", "Branches", "branches"],
    ["gallery.html", "Gallery & Media", "gallery"],
    ["training.html", "Training", "training"],
    ["contact.html", "Contact", "contact"]
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function digits(n) { return String(n).replace(/\D/g, ""); }
  function telHref(n) { return "tel:+91" + digits(n); }
  function telText(n) { var d = digits(n); return "+91 " + d.slice(0, 5) + " " + d.slice(5); }
  function waHref(n, text) { return "https://wa.me/91" + digits(n) + "?text=" + encodeURIComponent(text); }
  function waEnquiry(n, branchName) {
    return waHref(n, "Hello, I would like to enquire about Silambam training" + (branchName ? " at " + branchName : "") + ".");
  }
  function igHref(h) { return "https://www.instagram.com/" + h + "/"; }
  function branchById(id) { return D.branches.filter(function (b) { return b.id === id; })[0]; }
  function mastersOf(id) { return D.masters.filter(function (m) { return m.branch === id; }); }
  function branchHref(id) { return "branches.html#" + id; }

  /* ---------- Header ---------- */
  function renderHeader() {
    var links = NAV.map(function (n) {
      return '<a class="nl" href="' + n[0] + '"' + (n[2] === PAGE ? ' aria-current="page"' : "") + ">" + esc(n[1]) + "</a>";
    }).join("");
    var html =
      '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="site-header"><div class="container header-in">' +
      '<a class="brand" href="index.html" aria-label="' + esc(C.name) + ' — home">' +
      '<img src="' + C.logo + '" alt="TPSK logo" width="52" height="52">' +
      '<span class="brand-t"><span class="brand-en">' + esc(C.name) + '</span>' +
      '<span class="brand-ta tamil">' + esc(C.tamilName) + "</span></span></a>" +
      '<button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav">☰</button>' +
      '<nav class="nav" id="nav" aria-label="Main">' + links +
      '<a class="btn btn-gold" href="branches.html">Our Branches</a></nav>' +
      "</div></header>";
    var host = $("#site-header");
    if (host) host.innerHTML = html;
    var burger = $(".burger"), nav = $("#nav");
    if (burger) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.textContent = open ? "✕" : "☰";
      });
      $$("a", nav).forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("open");
          burger.setAttribute("aria-expanded", "false");
          burger.textContent = "☰";
        });
      });
    }
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var pages = NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + esc(n[1]) + "</a></li>"; }).join("");
    var brs = D.branches.map(function (b) {
      return '<li><a href="' + branchHref(b.id) + '">' + esc(b.name) + "</a></li>";
    }).join("");
    var contacts = D.branches.map(function (b) {
      var p = b.phones.map(function (n) {
        return '<a href="' + waEnquiry(n, b.name) + '" target="_blank" rel="noopener" title="Chat on WhatsApp">' + telText(n) + "</a>";
      }).join(" · ");
      return '<li><strong style="color:var(--cream)">' + esc(b.name.replace(" Branch", "")) + "</strong><br>" + p +
        '<br><a href="' + igHref(b.instagram) + '" target="_blank" rel="noopener">@' + esc(b.instagram) + "</a></li>";
    }).join("");
    var html =
      '<footer class="site-footer"><div class="container"><div class="f-grid">' +
      '<div><div class="f-brand"><img src="' + C.logo + '" alt="TPSK logo" width="68" height="68" loading="lazy">' +
      "<div><b>" + esc(C.name) + '</b><small class="tamil">' + esc(C.tamilName) + "</small></div></div>" +
      '<p class="f-slogan">' + esc(C.slogan) + "</p>" +
      '<p class="f-assoc">' + esc(C.association) + "</p>" +
      '<p style="margin-top:1rem;color:var(--muted);font-size:.88rem">' + esc(C.heritage) + "</p></div>" +
      '<div><h4>Explore</h4><ul>' + pages + "</ul></div>" +
      '<div><h4>Our Branches</h4><ul>' + brs + "</ul></div>" +
      '<div><h4>Contact</h4><ul>' + contacts + "</ul></div>" +
      '</div><div class="f-bottom">© ' + new Date().getFullYear() + " " + esc(C.name) + " · " + esc(C.tagline) + "</div></div></footer>";
    var host = $("#site-footer");
    if (host) host.innerHTML = html;
  }

  /* ---------- Grand Masters (home page) ---------- */
  function renderGrandMasters() {
    var host = $("#gm-grid");
    if (!host) return;
    host.innerHTML = D.grandMasters.map(function (g) {
      var late = /LATE/.test(g.title);
      return '<article class="gm reveal"><div class="pframe gold' + (g.id === "madhar" ? " bw" : "") + '">' +
        '<img src="' + g.photo + '" alt="Portrait of ' + esc(g.name) + '" loading="lazy" width="720" height="930"></div>' +
        '<h3 class="gm-name">' + esc(g.name) + '</h3><span class="gm-title' + (late ? " late" : "") + '">' + esc(g.title) + "</span></article>";
    }).join("");
  }

  /* ---------- Branch cards ----------
     withPhotos=true  -> home page: Master portraits (clickable)
     withPhotos=false -> Branches page: branches only */
  function renderBranchCards(host, withPhotos) {
    if (!host) return;
    host.innerHTML = D.branches.map(function (b, i) {
      var ms = mastersOf(b.id);
      var names = ms.map(function (m) { return "<b>" + esc(m.name) + "</b>"; }).join(" &amp; ");
      var top;
      if (withPhotos) {
        top = '<div class="bc-photos' + (ms.length === 1 ? " one" : "") + '">' + ms.map(function (m) {
          return '<a href="' + branchHref(b.id) + '" aria-label="' + esc(m.name) + " — open " + esc(b.name) + '">' +
            '<div class="pframe master"><img src="' + m.photo + '" alt="Portrait of ' + esc(m.name) + '" loading="lazy" width="520" height="668"></div></a>';
        }).join("") + "</div>";
      } else {
        top = '<div class="icon" style="width:64px;height:64px;font-size:1.5rem;margin:0">' + (i + 1) + "</div>";
      }
      return '<article class="card branch-card reveal">' + top +
        "<div><h3>" + esc(b.name) + '</h3><p class="bc-names">' + (ms.length > 1 ? "Masters: " : "Master: ") + names + "</p>" +
        (b.location ? '<p class="loc">📍 ' + esc(b.location) + "</p>" : "") + "</div>" +
        '<a class="btn btn-ghost" href="' + branchHref(b.id) + '">Enter Branch</a></article>';
    }).join("");
  }

  /* ---------- Branch detail (Branches page): branch info + Masters only ---------- */
  function renderBranchDetail(id) {
    var b = branchById(id);
    var host = $("#branch-detail");
    if (!b || !host) return false;
    var ms = mastersOf(id);
    var photos = ms.map(function (m) {
      return '<div class="pm"><div class="pframe master"><img src="' + m.photo + '" alt="Portrait of ' + esc(m.name) + '" width="520" height="668"></div><span>' + esc(m.name) + "</span></div>";
    }).join("");
    var phones = b.phones.map(function (n) {
      return '<a href="' + waEnquiry(n, b.name) + '" target="_blank" rel="noopener" title="Chat on WhatsApp">💬 ' + telText(n) + "</a>";
    }).join(" &nbsp;·&nbsp; ");
    var others = D.branches.filter(function (x) { return x.id !== id; }).map(function (x) {
      return '<a class="btn btn-ghost" href="' + branchHref(x.id) + '">' + esc(x.name) + "</a>";
    }).join("");
    host.innerHTML =
      '<section><div class="container"><a class="crumb" href="branches.html">← All Branches</a>' +
      '<div class="bd-hero"><div class="bd-photos">' + photos + "</div><div>" +
      '<span class="eyebrow">' + (ms.length > 1 ? "Our Masters" : "Our Master") + "</span><h1>" + esc(b.name) + "</h1>" +
      '<ul class="info-list">' +
      "<li><b>" + (ms.length > 1 ? "Masters" : "Master") + "</b><span>" + ms.map(function (m) { return esc(m.name); }).join(" &amp; ") + "</span></li>" +
      "<li><b>Phone</b><span>" + phones + "</span></li>" +
      '<li><b>Instagram</b><a href="' + igHref(b.instagram) + '" target="_blank" rel="noopener">@' + esc(b.instagram) + "</a></li>" +
      "<li><b>Location</b>" + (b.location ? "<span>" + esc(b.location) + "</span>" : '<span class="tbc">To be confirmed</span>') + "</li>" +
      "<li><b>Training</b>" + (b.training ? "<span>" + esc(b.training) + "</span>" : '<span class="tbc">Timings and fees to be confirmed — please contact the branch.</span>') + "</li>" +
      "</ul>" +
      '<div class="btn-row" style="justify-content:inherit"><a class="btn btn-gold" href="contact.html?branch=' + id + '">Enquire at this branch</a>' +
      '<a class="btn btn-ghost" href="' + telHref(b.phones[0]) + '">Call ' + telText(b.phones[0]) + "</a></div></div></div></div></section>" +
      '<section class="alt"><div class="container center"><h3 style="margin-bottom:1.2rem">Other branches</h3><div class="btn-row center">' + others + "</div></div></section>";
    document.title = b.name + " — " + C.name;
    return true;
  }
  function routeBranches() {
    var id = (location.hash || "").replace("#", "");
    var over = $("#branch-overview-wrap"), det = $("#branch-detail");
    if (!over || !det) return;
    if (id && branchById(id) && renderBranchDetail(id)) {
      over.classList.add("hidden"); det.classList.remove("hidden");
      window.scrollTo(0, 0);
    } else {
      det.classList.add("hidden"); det.innerHTML = ""; over.classList.remove("hidden");
      document.title = "Branches — " + C.name;
    }
  }

  /* ---------- Lightbox ---------- */
  var lb, lbItems = [], lbIdx = 0;
  function ensureLb() {
    if (lb) return;
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML = '<button class="lb-btn lb-close" aria-label="Close">✕</button><button class="lb-btn lb-prev" aria-label="Previous photo">‹</button>' +
      '<figure><img alt=""></figure><button class="lb-btn lb-next" aria-label="Next photo">›</button>';
    document.body.appendChild(lb);
    $(".lb-close", lb).onclick = closeLb;
    $(".lb-prev", lb).onclick = function () { stepLb(-1); };
    $(".lb-next", lb).onclick = function () { stepLb(1); };
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") stepLb(-1);
      if (e.key === "ArrowRight") stepLb(1);
    });
    var sx = 0;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) stepLb(dx < 0 ? 1 : -1);
    });
  }
  function showLb() {
    var img = $("img", lb);
    img.src = lbItems[lbIdx]; img.alt = "TPSK gallery photo";
    var multi = lbItems.length > 1;
    $(".lb-prev", lb).style.display = multi ? "" : "none";
    $(".lb-next", lb).style.display = multi ? "" : "none";
  }
  function openLb(items, i) { ensureLb(); lbItems = items; lbIdx = i; showLb(); lb.classList.add("open"); document.body.style.overflow = "hidden"; $(".lb-close", lb).focus(); }
  function closeLb() { lb.classList.remove("open"); document.body.style.overflow = ""; }
  function stepLb(d) { lbIdx = (lbIdx + d + lbItems.length) % lbItems.length; showLb(); }

  /* ---------- Gallery (photos only) ---------- */
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function placeholder(msg, h) {
    return '<div class="gi ph" style="min-height:' + h + 'px;cursor:default"><div>' + msg + "</div></div>";
  }
  function renderGallery() {
    var pinnedHost = $("#pinned"), mHost = $("#masonry");
    if (!pinnedHost || !mHost) return;
    var dir = "assets/images/gallery/";
    var all = (D.gallery || []).map(function (f) {
      return { src: dir + encodeURIComponent(f), pinned: /^pin[-_]/i.test(f) };
    });
    var pinned = all.filter(function (p) { return p.pinned; });
    var rest = shuffle(all.filter(function (p) { return !p.pinned; }));

    if (pinned.length) {
      pinnedHost.innerHTML = '<div class="pinned-grid">' + pinned.map(function (p) {
        return '<a class="pin" href="' + p.src + '" data-lb><span class="star">★ FEATURED</span><img src="' + p.src + '" alt="Featured TPSK photo" loading="lazy"></a>';
      }).join("") + "</div>";
    } else if (!all.length) {
      pinnedHost.innerHTML = '<div class="pinned-grid"><div class="pin ph" style="cursor:default;min-height:240px"><div>Featured photo<small>Name a photo file starting with pin- to feature it here</small></div></div></div>';
    } else {
      $("#featured").classList.add("hidden");
    }

    if (rest.length) {
      mHost.innerHTML = rest.map(function (p) {
        return '<a class="gi" href="' + p.src + '" data-lb><img src="' + p.src + '" alt="TPSK gallery photo" loading="lazy"></a>';
      }).join("");
    } else if (!all.length) {
      mHost.innerHTML = placeholder("Your photos will appear here<small>Add photo file names in data/site-data.js</small>", 200);
    } else {
      $("#all-photos").classList.add("hidden");
    }

    var els = $$("[data-lb]", $("#gallery-area"));
    var items = els.map(function (a) { return a.getAttribute("href"); });
    els.forEach(function (a, i) { a.addEventListener("click", function (e) { e.preventDefault(); openLb(items, i); }); });
  }

  /* ---------- Downloads ---------- */
  function renderDownloads() {
    var host = $("#downloads");
    if (!host) return;
    var list = D.downloads || [];
    if (list.length) {
      host.innerHTML = '<div class="grid g2">' + list.map(function (d) {
        var ext = (String(d[1]).split(".").pop() || "").toUpperCase();
        return '<div class="card dl"><div><h3 style="margin:0">' + esc(d[0]) + "</h3><small>" + esc(ext) + ' file</small></div>' +
          '<a class="btn btn-gold" href="assets/downloads/' + encodeURIComponent(d[1]) + '" download>Download</a></div>';
      }).join("") + "</div>";
    } else {
      host.innerHTML = '<div class="ph"><div>Rules &amp; regulations, entry form, brochures and certificates<small>Downloads will appear here once files are added.</small></div></div>';
    }
  }

  /* ---------- Contact ---------- */
  function renderDirectory() {
    var host = $("#directory");
    if (!host) return;
    host.innerHTML = D.branches.map(function (b) {
      var ms = mastersOf(b.id);
      var dp = ms.map(function (m) {
        return '<a href="' + branchHref(b.id) + '" aria-label="' + esc(m.name) + '"><div class="pframe master"><img src="' + m.photo + '" alt="Portrait of ' + esc(m.name) + '" loading="lazy" width="520" height="668"></div></a>';
      }).join("");
      var phones = b.phones.map(function (n) {
        return '<a href="' + waEnquiry(n, b.name) + '" target="_blank" rel="noopener" title="Chat on WhatsApp">💬 ' + telText(n) + "</a>";
      }).join("");
      return '<article class="card dir-card reveal"><div class="dp' + (ms.length === 1 ? " one" : "") + '">' + dp + "</div><div>" +
        '<h3><a href="' + branchHref(b.id) + '">' + esc(b.name) + "</a></h3>" +
        '<p class="bc-names">' + ms.map(function (m) { return "<b>" + esc(m.name) + "</b>"; }).join(" &amp; ") + "</p>" +
        (b.location ? '<p class="loc">📍 ' + esc(b.location) + "</p>" : "") +
        '<div class="links">' + phones + '<a href="' + igHref(b.instagram) + '" target="_blank" rel="noopener">📷 @' + esc(b.instagram) + "</a></div></div></article>";
    }).join("");
    var wa = $("#wa-slot");
    if (wa && C.whatsapp) wa.innerHTML = '<a class="btn btn-gold" href="https://wa.me/' + esc(C.whatsapp) + '" target="_blank" rel="noopener">WhatsApp us</a>';
  }

  /* Enquiry form: opens WhatsApp to the chosen branch with the details filled in.
     If config.formEndpoint is set, it posts to that service instead. */
  function initForm() {
    var f = $("#enquiry");
    if (!f) return;
    var sel = $("#branch-select");
    sel.innerHTML = '<option value="">Select a branch</option>' + D.branches.map(function (b) { return '<option value="' + b.id + '">' + esc(b.name) + "</option>"; }).join("");
    var q = new URLSearchParams(location.search).get("branch");
    if (q && branchById(q)) sel.value = q;
    var st = $("#form-status");
    function say(cls, msg) { st.className = "form-status show " + cls; st.textContent = msg; }
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var d = new FormData(f);
      if (C.formEndpoint) {
        var btn = $("button[type=submit]", f); btn.disabled = true;
        fetch(C.formEndpoint, { method: "POST", body: d, headers: { Accept: "application/json" } })
          .then(function (r) { if (!r.ok) throw new Error("bad"); say("ok", "Thank you — your enquiry has been sent. The academy will get in touch."); f.reset(); })
          .catch(function () { say("err", "Sorry, your enquiry could not be sent. Please contact a branch directly."); })
          .then(function () { btn.disabled = false; });
        return;
      }
      var b = branchById(d.get("branch"));
      var lines = ["Hello, I would like to enquire about joining " + C.name + ".",
        "Name: " + d.get("name"),
        d.get("age") ? "Age: " + d.get("age") : "",
        d.get("guardian") ? "Parent/Guardian: " + d.get("guardian") : "",
        "Phone: " + d.get("phone"),
        "Preferred branch: " + b.name,
        d.get("message") ? "Message: " + d.get("message") : ""].filter(Boolean);
      var url = waHref(b.phones[0], lines.join("\n"));
      window.open(url, "_blank", "noopener");
      st.className = "form-status show ok";
      st.textContent = "Your enquiry is ready in WhatsApp — press Send there to deliver it to the branch. ";
      var a = document.createElement("a");
      a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "WhatsApp did not open? Tap here.";
      st.appendChild(a);
    });
  }

  /* ---------- Effects ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }
  function initCount() {
    $$("[data-count]").forEach(function (el) {
      var end = parseInt(el.getAttribute("data-count"), 10), n = 0;
      var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) { el.textContent = end; return; }
      var t = setInterval(function () { n++; el.textContent = n; if (n >= end) clearInterval(t); }, 220);
    });
  }

  /* ---------- Boot ---------- */
  renderHeader();
  renderFooter();
  renderGrandMasters();
  renderBranchCards($("#branch-preview"), true);
  renderBranchCards($("#branch-overview"), false);
  renderGallery();
  renderDownloads();
  renderDirectory();
  initForm();
  if (PAGE === "branches") { routeBranches(); window.addEventListener("hashchange", function () { routeBranches(); setTimeout(initReveal, 0); }); }
  initReveal();
  initCount();
})();
