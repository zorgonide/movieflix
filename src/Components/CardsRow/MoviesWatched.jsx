import React from "react";

function MoviesWatched({ movies }) {
  let moviesArray = Object.keys(movies);
  moviesArray.pop();
  return (
    <div className="card my-2">
      <div className="card-body">
        <p className="card-title display-6 gray text-center">Movies Watched</p>
        <ul className="list-group">
          {moviesArray.map((ele) => {
            return <li className="list-group-item">{movies[ele].Title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default MoviesWatched;
