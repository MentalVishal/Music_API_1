// script.js
const apiURL = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=';
const headers = {
  'X-RapidAPI-Key': '79c9b84964mshbbfdccaa736ec5cp197f17jsn6f7c6e9bde37',
  'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
};

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
      const res = await fetch(`${apiURL}${query}`, { headers });
      const data = await res.json();
      displaySongs(data.data);
    } catch (err) {
      songList.innerHTML = '<p>Error fetching songs.</p>';
      console.error(err);
    }
  }
});

function displaySongs(songs) {
  songList.innerHTML = '';
  if (!songs.length) {
    songList.innerHTML = '<p>No songs found.</p>';
    return;
  }
  songs.forEach(song => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${song.album.cover_medium}" alt="cover">
      <h3>${song.title}</h3>
      <p>${song.artist.name}</p>
      <button>Play</button>
    `;
    card.querySelector('button').addEventListener('click', () => {
      playSong(song);
    });
    songList.appendChild(card);
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
