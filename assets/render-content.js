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
    el.innerHTML = `${p.lead ? `<p class="profile-lead">${esc(p.lead)}</p>` : ""}` +
      (p.paragraphs || []).map(t => `<p>${esc(t)}</p>`).join("");
  }

  function renderList(key) {
    const el = document.querySelector(`[data-content='${key}']`);
    if (!el) return;
    const rows = (data[key] || []).filter(x => x.enabled !== false);
    if (!rows.length) {
      el.innerHTML = `<p class="empty-state">INFORMATION WILL BE UPDATED.</p>`;
      return;
    }
    el.innerHTML = rows.map(x => {
      const meta = [x.date || x.year || "", x.type || "", x.venue || ""].filter(Boolean).join(" / ");
      const sub = [x.credit || "", x.note || ""].filter(Boolean).join(" — ");
      return `<article class="archive-item">
        <div class="archive-meta">${esc(meta)}</div>
        <div class="archive-title">${link(x.title || "", x.url)}</div>
        ${sub ? `<div class="archive-sub">${esc(sub)}</div>` : ""}
      </article>`;
    }).join("");
  }

  renderNews();
  renderProfile();
  ["schedule","discography","video","activities"].forEach(renderList);
})();