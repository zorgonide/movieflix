import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { fget } from "../../Utilities/apiCalls";
import Error from "../ErrorPage/ErrorPage";
import "./RecommendedMovies.css";
import CardsRow from "../Render/CardsRow";
import Pagination from "../Pagination/Pagination";
import { useUser } from "../../Shared/js/user-context";

function RecommendedMovies() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  let navigate = useNavigate();
  const {
    state: { user },
  } = useUser();
  const genres = Array.isArray(user.genres)
    ? user.genres.join(",")
    : user.genres;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    getMovies(pageNumber);
  };

  const getMovies = (page = 1) => {
    fget({
      url: `/3/discover/movie?api_key=${process.env.REACT_APP_BASE_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genres}`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setRecommended(result.results.slice(0, -2));
          setTotalPages(result.total_pages);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    if (!genres) {
      navigate("/genres");
      return;
    }
    getMovies();
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
      <div className="container-home">
        <div className="row pt-2 justify-content-center">
          <div className="heading">
            <div className="ten">
              <h1>Recommended Movies</h1>
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
          <div className="col-12">
            <CardsRow movies={recommended}></CardsRow>
          </div>
        </div>
      </div>
    );
}

export default RecommendedMovies;
