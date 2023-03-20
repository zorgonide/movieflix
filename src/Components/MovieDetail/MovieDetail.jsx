import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { useParams, useLocation } from "react-router-dom";
import { postBackend } from "../../Utilities/apiCalls";
import SingleCard from "../Render/SingleCard";
import Error from "../ErrorPage/ErrorPage";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { useUser } from "../../Shared/js/user-context";
import Swal from "sweetalert2";
import StarRating from "../Render/Stars";

function MovieDetail() {
  let { movieId } = useParams();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCommentLoaded, setIsCommentLoaded] = useState(false);
  const [isMovieWatched, setIsMovieWatched] = useState(false);
  const [movie, setMovie] = useState(location.state.movie);
  const [comments, setComments] = useState(null);
  const [backendMovie, setBackendMovie] = useState(null);
  const [userRating, setUserRating] = useState(3);
  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };
  const {
    state: { user },
  } = useUser();

  const addToWatchlist = () => {
    postBackend({
      url: "watchedList/watchedListAdd",
      data: {
        Movie_ID: movie.id,
        User_ID: user.User_ID,
      },
    }).then(() => isMovieWatchedFunction());
  };
  const getMovie = () => {
    return postBackend({
      url: "movie/movieGet",
      data: {
        Movie_ID: movie.id,
        Title: movie.title,
        Description: movie.overview,
        IMDB_Rating: movie.vote_average,
        Poster: movie.poster_path,
      },
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setBackendMovie(result);
          // setUserRating(Math.floor(movie.vote_average / 2));
        },
        (error) => {
          setError(error);
        }
      );
  };
  const getComments = () => {
    return postBackend({
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
              fullName: ele.First_Name + " " + ele.Last_Name,
              text: ele.Comment,
              avatarUrl: `https://ui-avatars.com/api/name=${
                ele.First_Name + "+" + ele.Last_Name
              }&background=random`,
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
  };
  const getMovieRating = () => {
    return postBackend({
      url: "movie/movieSearch",
      data: {
        Movie_ID: movieId,
      },
    })
      .then((res) => res.data)
      .then((res) => {
        setUserRating(Math.floor(res[0].Average_Rating));
      });
  };
  const isMovieWatchedFunction = () => {
    return postBackend({
      url: "watchedList/watchedListSearch",
      data: {
        User_ID: user.User_ID,
      },
    })
      .then((res) => res.data)
      .then((res) => {
        if (Object.keys(res).includes(movieId)) {
          setIsMovieWatched(true);
        }
      });
  };
  useEffect(() => {
    Promise.all([getMovie(), getComments(), isMovieWatchedFunction()])
      .then(() => {
        getMovieRating();
      })
      .then(() => {
        setIsLoaded(true);
      });
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
      <div className="container py-4">
        <div className="row mt-4 py-4 d-flex justify-content-around">
          <div className="col-12 col-sm-2">
            <SingleCard movie={backendMovie}></SingleCard>
            <div className="d-grid gap-2 my-3">
              {!isMovieWatched ? (
                <button
                  type="button"
                  className="button button1 mb-3"
                  onClick={addToWatchlist}
                >
                  <i className="fa fa-plus"></i> Watchlist
                </button>
              ) : (
                <button type="button" className="button buttonSelected mb-3">
                  <i className="fa fa-check"></i> Watched
                </button>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-8">
            <div className="heading">
              <div className="ten">
                <h1>{backendMovie.Title}</h1>
              </div>
            </div>
            <div className="my-4">
              <div className="row">
                <div className="col">
                  <div className="user-rating">
                    <h4>User Rating</h4>
                  </div>
                  <StarRating
                    User_ID={user.User_ID}
                    Movie_ID={movieId}
                    userRating={userRating}
                    onChange={handleRatingChange}
                  />
                </div>
                <div className="col">
                  <div className="user-rating">
                    <h4>IMDB Rating</h4>
                    <h4> {movie.vote_average}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="description my-4">{backendMovie.Description}</div>
            <div className="comments">
              <CommentSection
                currentUser={{
                  currentUserId: user.User_ID,
                  currentUserImg: `https://ui-avatars.com/api/name=${
                    user.First_Name + "+" + user.Last_Name
                  }&background=random`,
                  currentUserFullName: user.First_Name + " " + user.Last_Name, // names
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
                  // console.log("current data", data);
                }}
                onDeleteAction={(data) => {
                  postBackend({
                    url: "comment/commentDel",
                    data: {
                      Comment_ID: data.comIdToDelete,
                    },
                  }).then(() => {
                    Swal.fire({
                      confirmButtonColor: "#4fbfa8",
                      title: "Success",
                      text: `Deleted comment`,
                      icon: "success",
                      confirmButtonText: "Dismiss",
                    });
                  });
                  getComments();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
export default MovieDetail;
