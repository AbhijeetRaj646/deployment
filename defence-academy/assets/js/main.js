(function(){
  "use strict";

  function select(selector, parent){ return (parent || document).querySelector(selector); }
  function selectAll(selector, parent){ return Array.from((parent || document).querySelectorAll(selector)); }

  // Mobile nav toggle
  const menuToggle = select('#menuToggle');
  const primaryNav = select('#primaryNav');
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close nav when clicking a link (mobile)
    selectAll('#primaryNav a').forEach(link => link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Footer year
  const yearEl = select('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // Notice Board logic (homepage has elements)
  const noticeToggle = select('#noticeToggle');
  const noticePanel = select('#noticePanel');
  const noticeClose = select('#noticeClose');
  const noticeList = select('#noticeList');

  function openNotices(){ if (noticePanel) { noticePanel.hidden = false; document.body.style.overflow = 'hidden'; } }
  function closeNotices(){ if (noticePanel) { noticePanel.hidden = true; document.body.style.overflow = ''; localStorage.setItem('noticeDismissedAt', Date.now().toString()); } }

  if (noticeToggle && noticePanel) {
    noticeToggle.addEventListener('click', openNotices);
  }
  if (noticeClose && noticePanel) {
    noticeClose.addEventListener('click', closeNotices);
  }
  if (noticePanel) {
    noticePanel.addEventListener('click', (e) => { if (e.target === noticePanel) closeNotices(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !noticePanel.hidden) closeNotices(); });
  }

  async function loadAnnouncements(){
    if (!noticeList) return;
    try {
      const res = await fetch('data/announcements.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load announcements');
      const items = await res.json();
      if (!Array.isArray(items)) return;

      // Sort by date desc
      items.sort((a, b) => new Date(b.date) - new Date(a.date));

      const fragment = document.createDocumentFragment();
      let hasUrgent = false;
      const now = Date.now();
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

      for (const item of items) {
        const li = document.createElement('li');
        li.className = 'notice-item';
        const date = new Date(item.date);
        const isUrgent = Boolean(item.urgent);
        const isNew = now - date.getTime() < sevenDaysMs;
        if (isUrgent) hasUrgent = true;

        const title = document.createElement('div');
        title.innerHTML = `<strong>${escapeHtml(item.title || 'Announcement')}</strong>` +
          (isUrgent ? ' <span class="badge urgent">URGENT</span>' : isNew ? ' <span class="badge">NEW</span>' : '');

        const meta = document.createElement('time');
        meta.dateTime = date.toISOString();
        meta.textContent = date.toLocaleDateString();

        const desc = document.createElement('p');
        if (item.description) desc.textContent = item.description;

        li.appendChild(title);
        li.appendChild(meta);
        if (item.link) {
          const link = document.createElement('a');
          link.href = item.link; link.target = '_blank'; link.rel = 'noopener';
          link.className = 'btn btn-outline';
          link.style.marginTop = '.5rem';
          link.textContent = 'View Details';
          li.appendChild(desc);
          li.appendChild(link);
        } else {
          li.appendChild(desc);
        }

        fragment.appendChild(li);
      }

      noticeList.innerHTML = '';
      noticeList.appendChild(fragment);

      // Auto open for urgent or if not dismissed in this session
      const dismissedAt = Number(localStorage.getItem('noticeDismissedAt') || '0');
      const recentlyDismissed = now - dismissedAt < sevenDaysMs; // do not auto-open again within a week
      if ((hasUrgent || !recentlyDismissed) && items.length > 0) {
        openNotices();
      }
    } catch (err) {
      // Fallback: hide toggle if error
      if (noticeToggle) noticeToggle.style.display = 'none';
    }
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"]+/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
  }

  // Only run on pages where noticeList exists
  if (noticeList) {
    loadAnnouncements();
  }
})();