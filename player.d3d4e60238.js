// The showcase's films. The page switches films with its radio buttons alone;
// this keeps one film playing at a time: starting a film or switching to
// another pauses the rest.
const videos = [...document.querySelectorAll('.film video')];
const pauseAllBut = keep => videos.forEach(v => { if (v !== keep && !v.paused) v.pause(); });

for (const video of videos) video.addEventListener('play', () => pauseAllBut(video));
for (const pick of document.querySelectorAll('.pick')) {
  pick.addEventListener('change', () => {
    pauseAllBut(null);
    // The picked film can sit above or below the window when its name is far
    // down a long list, so bring it into view, moving no further than needed.
    const film = pick.closest('.feature').querySelector(`.film[data-i="${pick.dataset.i}"]`);
    const box = film.getBoundingClientRect();
    if (box.top < 0 || box.bottom > innerHeight) film.scrollIntoView({ block: box.height > innerHeight ? 'start' : 'nearest', behavior: 'smooth' });
  });
}
