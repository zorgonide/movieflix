import React from "react";
import { useNavigate } from "react-router-dom";
function MoviesWatched({ movies }) {
  let navigate = useNavigate();
  let moviesArray = movies;
  return (
    <div className="card my-2">
      <div className="card-body">
        <p className="card-title display-6 gray text-center">Watchlist</p>
        <hr />
        <ul className="movie-list">
          {moviesArray.length ? (
            moviesArray.map((ele) => {
              return (
                <li key={ele.id}>
                  <div
                    onClick={() =>
                      navigate(`/movie/${ele.id}`, { state: { movie: ele } })
                    }
                  >
                    <div className="movie">
                      <img
                        src={"https://image.tmdb.org/t/p/original" + ele.poster}
                        alt="Movie"
                      />
                      <div className="movie-details">
                        <h2 className="movie-title">{ele.title}</h2>
                        <p className="movie-rating">
                          IMDB Rating: {ele.imdbRating}
                        </p>
                      </div>
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
