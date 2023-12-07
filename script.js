const API_URL = "https://api.tvmaze.com/shows";

const main = document.querySelector("main");

async function getMovies() {
    try {
  const res = await fetch(API_URL);
  const resData = await res.json();

  console.log(resData);

  resData.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = ` <img src="${movie.image.medium}" alt="${
      movie.name
    }">  
    <div class="movie-info">
        <h3>${movie.name}</h3>
        <span class="${getClassByRate(movie.rating.average)}">
        ${movie.rating.average}</span>
    </div> `;

    main.appendChild(movieEl);
  });

  return resData;
} catch {
    throw new Error("Oh no! There seems to be an error:")
}
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

getMovies();
