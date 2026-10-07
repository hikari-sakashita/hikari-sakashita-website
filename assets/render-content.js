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

  function renderSchedule() {
    const el = document.querySelector("[data-content='schedule']");
    if (!el) return;
    const rows = (data.schedule || [])
      .filter(x => x.enabled !== false)
      .sort((a, b) => {
        const toTime = (value) => {
          const parts = String(value || "").split(".").map(Number);
          if (parts.length !== 3 || parts.some(Number.isNaN)) return 0;
          return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
        };
        return toTime(b.date) - toTime(a.date);
      });

    if (!rows.length) {
      el.innerHTML = `<div class="empty-state">INFORMATION WILL BE UPDATED.</div>`;
      return;
    }

    el.innerHTML = rows.map(x => `
      <article class="schedule-item">
        <div class="schedule-media">
          ${x.image ? `<img src="${esc(x.image)}" alt="${esc(x.title || "")}" loading="lazy">` : ""}
        </div>
        <div class="schedule-copy">
          ${x.title ? `<div class="schedule-title">${esc(x.title)}</div>` : ""}
          ${x.date ? `<div class="schedule-date">${esc(x.date)}</div>` : ""}
          ${x.venue ? (x.url
            ? `<div class="schedule-venue"><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.venue)} ↗</a></div>`
            : `<div class="schedule-venue">${esc(x.venue)}</div>`) : ""}
          ${x.type ? `<div class="schedule-type">(${esc(x.type)})</div>` : ""}
        </div>
      </article>
    `).join("");
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
  renderSchedule();
  ["discography","video","activities"].forEach(renderList);
})();