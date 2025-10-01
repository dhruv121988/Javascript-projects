const API_KEY = "f6a88bde"; 
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const movieContainer = document.getElementById("movie-container");

searchBtn.addEventListener("click", () => {
  let query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    movieContainer.innerHTML = "<p> Please enter a movie name!</p>";
    alert('please enter a movie name');
  }
});

async function fetchMovies(query) {
  movieContainer.innerHTML = "<p>Loading...</p>";
  
  try {
    let res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    let data = await res.json();

    console.log(data);

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      movieContainer.innerHTML = `<p> ERROR! ${data.Error}</p>`;
    }
  } catch (error) {
    movieContainer.innerHTML = "<p> Error fetching data</p>";
    console.error(error);
  }
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";
  movies.forEach(movie => {
    let movieCard = `
      <div class="movie-card">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/180x270?text=No+Image"}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>YEAR ${movie.Year}</p>
      </div>
    `;
    movieContainer.innerHTML += movieCard;
  });
}
