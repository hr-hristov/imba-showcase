const videos = [...document.querySelectorAll('.film video')];
const pauseAllBut = keep => videos.forEach(v => { if (v !== keep && !v.paused) v.pause(); });
for (const video of videos) video.addEventListener('play', () => pauseAllBut(video));
for (const pick of document.querySelectorAll('.pick')) {
  pick.addEventListener('change', () => {
    pauseAllBut(null);
    // The picked film can sit below the window when its name is far down a
    // long list, so bring it into view, moving no further than needed.
    const film = pick.closest('.feature').querySelector(`.film[data-i="${pick.dataset.i}"]`);
    const box = film.getBoundingClientRect();
    if (box.top < 0 || box.bottom > innerHeight) film.scrollIntoView({ block: box.height > innerHeight ? 'start' : 'nearest', behavior: 'smooth' });
  });
}

// The contents rail marks the feature being read: the one crossing a line a
// third of the way down the window.
const railLinks = new Map([...document.querySelectorAll('.rail a[data-id]')].map(a => [a.dataset.id, a]));
if (railLinks.size) {
  const mark = id => railLinks.forEach((a, key) => a.classList.toggle('on', key === id));
  const watch = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) mark(entry.target.id);
  }, { rootMargin: '-33% 0px -66% 0px' });
  document.querySelectorAll('.feature').forEach(feature => watch.observe(feature));
}
