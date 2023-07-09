import React, { useEffect, useState } from "react";
import Error from "../ErrorPage/ErrorPage";
import { Rings } from "react-loader-spinner";
import { getBackend, postBackend } from "../../Utilities/apiCalls";
import MoviesWatched from "../Render/MoviesWatched";

function WatchList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [moviesWatched, setMoviesWatched] = useState([]);
  const MoviesWatchedFunction = () => {
    return getBackend({
      url: "api/watchlist",
    })
      .then((res) => res.data)
      .then((res) => {
        setMoviesWatched(res.data.map((movie) => movie.movie));
      });
  };
  useEffect(() => {
    Promise.all([MoviesWatchedFunction()])
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  if (error) {
    return <Error error={error.status_message} />;
  } else if (!isLoaded) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Rings color="#0d6efd" height={100} width={100} />
      </div>
    );
  } else
    return (
      <div className="container centered1">
        <div className="row py-4 justify-content-center">
          <div className="col-12 col-md-5">
            <MoviesWatched movies={moviesWatched}></MoviesWatched>
          </div>
        </div>
      </div>
    );
}

export default WatchList;
