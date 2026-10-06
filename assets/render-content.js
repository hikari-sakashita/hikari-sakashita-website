(() => {
  const data = window.SITE_CONTENT || {};
  const esc = (s="") => String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
  const link = (text, url) => url
    ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(text)}</a>`
    : esc(text);

  function renderNews() {
    const el = document.querySelector("[data-content='news']");
    if (!el) return;
    const rows = (data.news || []).filter(x => x.enabled !== false);
    el.innerHTML = rows.length ? rows.map(x =>
      `<div class="content-row"><span>${esc(x.date)}</span><span>${link(x.title,x.url)}</span></div>`
    ).join("") : "";
  }

  function renderProfile() {
    const el = document.querySelector("[data-content='profile']");
    if (!el || !data.profile) return;

    const p = data.profile;
    const blocks = [];

    if (p.lead) {
      blocks.push(`<p class="profile-section-heading">${esc(p.lead)}</p>`);
    }

    (p.paragraphs || []).forEach(t => {
      const text = String(t).trim();
      if (text === "PROFILE" || text === "BIOGRAPHY") {
        blocks.push(`<p class="profile-section-heading">${esc(text)}</p>`);
      } else {
        blocks.push(`<p class="profile-paragraph">${esc(text)}</p>`);
      }
    });

    el.innerHTML = blocks.join("");
  }

  function renderList(key) {
    const el = document.querySelector(`[data-content='${key}']`);
    if (!el) return;
    const rows = (data[key] || []).filter(x => x.enabled !== false);

    if (!rows.length) {
      el.innerHTML = `<div class="empty-state">INFORMATION WILL BE UPDATED.</div>`;
      return;
    }

    el.innerHTML = rows.map(x => {
      const left = esc(x.date || x.year || "");
      const title = link(x.title || "", x.url);
      const meta = esc(x.venue || x.credit || x.type || "");
      const note = esc(x.note || "");
      return `<div class="content-row">
        <span>${left}</span>
        <span>${title}${meta ? `<small>${meta}</small>` : ""}${note ? `<small>${note}</small>` : ""}</span>
      </div>`;
    }).join("");
  }

  renderNews();
  renderProfile();
  ["schedule","discography","video","activities"].forEach(renderList);
})();
