const API_URL = "https://api.tvmaze.com/shows";
const SEARCH_API = "https://api.tvmaze.com/search/shows?q=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// movies that appear when website is opened
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  resData = await res.json();
  showMovies(resData);
}

//show movies when app opens
function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = ` <img src="${movie.image.medium}" alt="${
      movie.name
    }">  
  <div class="movie-info">
      <h3>${movie.name}</h3>
      <span class="${getClassByRate(movie.rating.average)}">
      ${movie.rating.average}</span>
  </div> 
  <div class="overview">  
    ${movie.summary}
  </div>
  `;
    main.appendChild(movieEl);
    console.log(movie)
  });
}

//search movies
function searchMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = ` 
    <img src="${movie.show.image.medium}" alt="${movie.show.name}">  
    <div class="movie-info">
        <h3>${movie.show.name}</h3>
        <span class="${getClassByRate(movie.show.rating.average)}">
        ${movie.show.rating.average}</span>
    </div> `;
    main.appendChild(movieEl);
    console.log(movies)
  });
}

function getClassByRate(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

async function getMoviesSearch(url) {
  const res = await fetch(url);
  resData = await res.json();
  searchMovies(resData);
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMoviesSearch(SEARCH_API + searchTerm);

    search.value = "";
  }
});
