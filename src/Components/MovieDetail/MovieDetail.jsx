import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { useParams, useLocation } from "react-router-dom";
import { postBackend } from "../../Utilities/apiCalls";
import SingleCard from "../CardsRow/SingleCard";
import Error from "../ErrorPage/ErrorPage";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

function MovieDetail() {
  let { movieId } = useParams();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movie, setMovie] = useState(location.state.movie);
  const [comment, setComments] = useState(null);
  const [backendMovie, setBackendMovie] = useState(null);
  useEffect(() => {
    postBackend({
      url: "movie/movieGet",
      data: {
        Movie_ID: movie.id,
        Title: movie.original_title,
        Description: movie.overview,
        // IMDB_Rating: movie.vote_average,
        IMDB_Rating: 5,
        Poster: movie.poster_path,
      },
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setBackendMovie(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    postBackend({
      url: "comment/commentGet",
      data: {
        Movie_ID: movieId,
      },
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setComments(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [movie]);
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
        <div className="row my-4">
          <div className="col-2">
            <SingleCard movie={backendMovie}></SingleCard>
          </div>
          <div className="col-3"></div>
          <div className="col">
            <div className="heading">
              <div className="ten">
                <h1>{backendMovie.Title}</h1>
              </div>
            </div>
            <div className="description my-4">{backendMovie.Description}</div>
          </div>
        </div>
      </div>
    );
}
export default MovieDetail;
