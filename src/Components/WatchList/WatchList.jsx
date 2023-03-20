import React, { useEffect, useState } from "react";
import { useUser } from "../../Shared/js/user-context";
import Error from "../ErrorPage/ErrorPage";
import { Rings } from "react-loader-spinner";
import { postBackend } from "../../Utilities/apiCalls";
import MoviesWatched from "../Render/MoviesWatched";

function WatchList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState({});
  const [moviesWatched, setMoviesWatched] = useState([]);

  const {
    state: { user },
  } = useUser();
  const MoviesWatchedFunction = () => {
    return postBackend({
      url: "watchedList/watchedListSearch",
      data: {
        User_ID: user.User_ID,
      },
    })
      .then((res) => res.data)
      .then((res) => {
        setMoviesWatched(res);
      });
  };
  useEffect(() => {
    Promise.all([MoviesWatchedFunction()]).then(() => {
      setIsLoaded(true);
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
      <div className="container">
        <div className="row py-4 justify-content-center">
          <div className="col-12 col-md-5">
            <MoviesWatched movies={moviesWatched}></MoviesWatched>
          </div>
        </div>
      </div>
    );
}

export default WatchList;
