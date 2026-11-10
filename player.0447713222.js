// The showcase's films. The page switches films with its radio buttons alone;
// this keeps one film playing at a time: the desktop and phone cuts of a film
// play together, and switching films or starting another pauses the rest.
const videos = [...document.querySelectorAll('.film video')];
const pauseAllBut = keep => videos.forEach(v => { if (!keep.includes(v) && !v.paused) v.pause(); });

for (const figure of document.querySelectorAll('.film')) {
  const pair = [...figure.querySelectorAll('video')];
  for (const video of pair) {
    video.addEventListener('play', () => {
      pauseAllBut(pair);
      // The other cut follows from the same moment, scaled to its own length.
      for (const other of pair) {
        // On a phone the desktop cut is hidden and is never loaded.
        if (other === video || !other.paused || !other.offsetParent) continue;
        if (other.duration && video.duration) other.currentTime = video.currentTime * other.duration / video.duration;
        other.play().catch(() => {});
      }
    });
    video.addEventListener('pause', () => pair.forEach(o => { if (o !== video && !o.paused) o.pause(); }));
  }
}
for (const pick of document.querySelectorAll('.pick')) pick.addEventListener('change', () => pauseAllBut([]));
