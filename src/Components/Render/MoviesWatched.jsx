import React from "react";
import { useNavigate } from "react-router-dom";
function MoviesWatched({ movies }) {
  let navigate = useNavigate();
  let moviesArray = Object.keys(movies);
  moviesArray.pop();
  return (
    <div className="card my-2">
      <div className="card-body">
        <p className="card-title display-6 gray text-center">Watchlist</p>
        <hr />
        <ul className="movie-list">
          {moviesArray ? (
            moviesArray.map((ele) => {
              return (
                <li key={ele}>
                  {/* <div class="movie" onClick={() => navigate(`/movie/${ele}`)}> */}
                  <div class="movie">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        movies[ele].Poster
                      }
                      alt="Movie"
                    />
                    <div class="movie-details">
                      <h2 class="movie-title">{movies[ele].Title}</h2>
                      <p class="movie-rating">
                        IMDB Rating: {movies[ele].IMDB_Rating}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p>No movies added to watchlist</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MoviesWatched;
