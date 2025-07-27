const apiURL = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=';
const defaultQuery = 'top hits'; // For trending songs

const searchInput = document.getElementById('searchInput');
const songList = document.getElementById('songList');
const player = document.getElementById('player');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// Replace with your valid RapidAPI key
const rapidApiKey = '79c9b84964mshbbfdccaa736ec5cp197f17jsn6f7c6e9bde37';
const rapidApiHost = 'deezerdevs-deezer.p.rapidapi.com';

async function fetchSongs(query) {
  songList.innerHTML = '<p style="text-align:center;">Loading...</p>';
  try {
    const res = await fetch(`https://${rapidApiHost}/search?q=${query}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': rapidApiHost
      }
    });
    const data = await res.json();
    displaySongs(data.data);
  } catch (err) {
    songList.innerHTML = `<p style="color:red;text-align:center;">Error loading songs</p>`;
    console.error(err);
  }
}

function displaySongs(songs) {
  songList.innerHTML = '';
  if (!songs || songs.length === 0) {
    songList.innerHTML = '<p>No songs found.</p>';
    return;
  }

  songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${song.album.cover_medium}" alt="${song.title}">
      <h3>${song.title}</h3>
      <p>${song.artist.name}</p>
      <button onclick="playSong('${song.preview}', '${song.title}', '${song.artist.name}', '${song.album.cover_medium}')">Play</button>
    `;
    songList.appendChild(card);
  });
}

function playSong(previewUrl, titleText, artistText, coverUrl) {
  audio.src = previewUrl;
  title.textContent = titleText;
  artist.textContent = artistText;
  cover.src = coverUrl;
  player.classList.remove('hidden');
  audio.play();
}

// Handle search input
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchSongs(searchInput.value);
  }
});

// Load trending songs on page load
window.addEventListener('DOMContentLoaded', () => {
  fetchSongs(defaultQuery);
});
