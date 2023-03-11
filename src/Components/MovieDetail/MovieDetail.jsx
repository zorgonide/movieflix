import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { useParams, useLocation } from "react-router-dom";
import { postBackend } from "../../Utilities/apiCalls";
import SingleCard from "../CardsRow/SingleCard";
import Error from "../ErrorPage/ErrorPage";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { useUser } from "../../Shared/js/user-context";

function MovieDetail() {
  let { movieId } = useParams();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCommentLoaded, setIsCommentLoaded] = useState(false);
  const [movie, setMovie] = useState(location.state.movie);
  const [comments, setComments] = useState(null);
  const [backendMovie, setBackendMovie] = useState(null);
  const {
    state: { user },
  } = useUser();

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
          setIsCommentLoaded(true);
          let newC = result.map((ele) => {
            return {
              userId: ele.User_ID,
              comId: ele.Comment_ID,
              fullName: "Test user" + Math.floor(Math.random() * 10),
              text: ele.Comment,
              avatarUrl:
                "https://ui-avatars.com/api/name=Test&background=random",
              replies: [],
            };
          });
          setComments(newC);
        },
        (error) => {
          setIsCommentLoaded(true);
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
            <div className="comments">
              <CommentSection
                currentUser={{
                  currentUserId: user.User_ID,
                  currentUserImg:
                    "https://ui-avatars.com/api/name=Test&background=random",
                  currentUserFullName: "You", // names
                }}
                commentData={comments}
                onSubmitAction={(data) => {
                  postBackend({
                    url: "comment/commentAdd",
                    data: {
                      User_ID: user.User_ID,
                      Movie_ID: movieId,
                      Comment: data.text,
                    },
                  });
                }}
                currentData={(data) => {
                  console.log("curent data", data);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
export default MovieDetail;
