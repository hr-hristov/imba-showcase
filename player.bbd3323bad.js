// The showcase's films. The page switches films with its radio buttons alone;
// this keeps one film playing at a time: starting a film or switching to
// another pauses the rest.
const videos = [...document.querySelectorAll('.film video')];
const pauseAllBut = keep => videos.forEach(v => { if (v !== keep && !v.paused) v.pause(); });

for (const video of videos) video.addEventListener('play', () => pauseAllBut(video));
for (const pick of document.querySelectorAll('.pick')) pick.addEventListener('change', () => pauseAllBut(null));
