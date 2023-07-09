import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Shared/js/user-context";
import { fget, patchBackend } from "../../Utilities/apiCalls";
import Error from "../ErrorPage/ErrorPage";
import Genre from "../../Shared/images/Register.svg";
import "./GenrePage.css";
import Swal from "sweetalert2";

function GenrePage(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [genres, setGenres] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  let [highlightedButtons, setHighlightedButtons] = useState([]);
  const { dispatch } = useUser();
  const {
    state: { user },
  } = useUser();
  let navigate = useNavigate();
  useEffect(() => {
    fget({
      url: `/3/genre/movie/list?api_key=${process.env.REACT_APP_BASE_TOKEN}&language=en-US`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          result.genres.forEach((ele) => {
            ele.isSelected = false;
          });
          setGenres(result.genres);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const highlightButton = (ele, index) => {
    let newSet = [...genres];
    newSet[index].isSelected = !newSet[index].isSelected;
    setGenres(() => [...newSet]);
    if (highlightedButtons.indexOf(ele.id) === -1)
      setHighlightedButtons(() => [...highlightedButtons, ele.id]);
    // highlightedButtons.push(ele.id);
    else {
      // highlightedButtons.splice(highlightedButtons.indexOf(ele.id), 1);
      setHighlightedButtons(() => [
        ...highlightedButtons.splice(highlightedButtons.indexOf(ele.id), 1),
      ]);
    }
  };
  const GenreList = () => {
    let buttonClass = "btn rounded-pill btn-sm btn-outline-danger m-1";
    let buttonSelectedClass = "btn rounded-pill btn-sm btn-danger m-1";
    return (
      <>
        {genres.map((ele, index) => {
          if (index < 9)
            return (
              <button
                onClick={() => highlightButton(ele, index)}
                type="button"
                className={
                  !genres[index].isSelected ? buttonClass : buttonSelectedClass
                }
                key={ele.id}
              >
                {ele.name}
              </button>
            );
          else
            return (
              <button
                onClick={() => highlightButton(ele, index)}
                type="button"
                className={
                  seeMore
                    ? !genres[index].isSelected
                      ? buttonClass
                      : buttonSelectedClass
                    : "d-none"
                }
                key={ele.id}
              >
                {ele.name}
              </button>
            );
        })}
      </>
    );
  };
  const goToMoviesPage = () => {
    if (highlightedButtons.length) {
      patchBackend({
        url: "user/",
        data: {
          genres: highlightedButtons.join(","),
        },
      })
        .then((res) => res.data)
        .then((res) => {
          dispatch({ type: "genres", Genres: res.user.genres });
          dispatch({ type: "login", user: res.user });
          navigate("/");
        });
    } else {
      Swal.fire({
        title: "Error",
        text: `Select a genre to continue`,
        icon: "error",
        confirmButtonText: "Dismiss",
      });
    }
  };
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
      <div className="container centered">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <div className="card">
              <div className="card-body">
                <div className="img mx-auto my-2">
                  <img src={Genre} alt="login" />
                </div>
                <p className="card-text">
                  Select the genres you're interested in...
                </p>
                <div className="genreList">
                  <GenreList></GenreList>
                  <p
                    className="text-secondary text-end seeMore"
                    onClick={() => setSeeMore(!seeMore)}
                  >
                    {seeMore ? "See Less" : "See More"}
                  </p>
                </div>
              </div>
              <div className="card-footer text-center">
                <button
                  onClick={goToMoviesPage}
                  className={
                    highlightedButtons.length
                      ? "button button1"
                      : "button button1 disabled"
                  }
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default GenrePage;
