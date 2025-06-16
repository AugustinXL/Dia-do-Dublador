document.addEventListener('DOMContentLoaded', () => {
  // Código para destacar menu (já passamos antes)
  const links = document.querySelectorAll('nav ul li a');
  const current = window.location.pathname.split('/').pop();

  links.forEach(link => {
    if (link.getAttribute('href') === current || (link.getAttribute('href') === 'index.html' && current === '')) {
      link.classList.add('active');
    }
  });

  // Código para o player customizado
  const players = document.querySelectorAll('.custom-audio-player');

  players.forEach(player => {
    const audio = player.querySelector('audio');
    const playBtn = player.querySelector('.play-pause');
    const progress = player.querySelector('.progress');
    const time = player.querySelector('.time');

    // Atualiza a duração quando o áudio carrega metadata
    audio.addEventListener('loadedmetadata', () => {
      progress.max = audio.duration;
      updateTimeDisplay(0, audio.duration, time);
    });

    // Atualiza barra e tempo durante o áudio
    audio.addEventListener('timeupdate', () => {
      progress.value = audio.currentTime;
      updateTimeDisplay(audio.currentTime, audio.duration, time);
    });

    // Controla play/pause
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸️';
      } else {
        audio.pause();
        playBtn.textContent = '▶️';
      }
    });

    // Permite buscar no áudio
    progress.addEventListener('input', () => {
      audio.currentTime = progress.value;
    });
  });

  function updateTimeDisplay(current, duration, display) {
    display.textContent = formatTime(current) + ' / ' + formatTime(duration);
  }

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60) || 0;
    const sec = Math.floor(seconds % 60) || 0;
    return `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  }
});