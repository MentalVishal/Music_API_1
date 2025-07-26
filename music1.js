const searchInput = document.getElementById('searchInput');
const songList = document.getElementById('songList');
const player = document.getElementById('player');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

searchInput.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (!query) return;

    songList.innerHTML = '<p>Loading...</p>';

    try {
      const res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, {
        headers: {
          'X-RapidAPI-Key': '79c9b84964mshbbfdccaa736ec5cp197f17jsn6f7c6e9bde37',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      });

      const data = await res.json();
      displaySongs(data.data);
    } catch (error) {
      songList.innerHTML = '<p>Failed to fetch songs. Please try again later.</p>';
      console.error('Error fetching songs:', error);
    }
  }
});

function displaySongs(songs) {
  songList.innerHTML = '';
  songs.forEach(song => {
    const div = document.createElement('div');
    div.classList.add('song');
    div.innerHTML = `
      <strong>${song.title}</strong><br>
      ${song.artist.name}
    `;
    div.onclick = () => playSong(song);
    songList.appendChild(div);
  });
}

function playSong(song) {
  cover.src = song.album.cover_big;
  title.textContent = song.title;
  artist.textContent = song.artist.name;
  audio.src = song.preview;
  player.classList.remove('hidden');
  audio.play();
}