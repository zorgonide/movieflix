import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { fget } from "../../Utilities/apiCalls";
import Error from "../ErrorPage/ErrorPage";
import "./TopRatedMovies.css";
import CardsRow from "../Render/CardsRow";
import Pagination from "../Pagination/Pagination";

function TopRatedMovies() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topRated, setTopRated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    getMovies(pageNumber);
  };
  const getMovies = (page = 1) => {
    fget({
      url: `/3/movie/top_rated?api_key=${process.env.REACT_APP_BASE_TOKEN}&language=en-US&page=${page}`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setTopRated(result.results.slice(0, -2));
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
              <h1>Top Rated Movies</h1>
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
          <div className="col-12">
            <CardsRow movies={topRated}></CardsRow>
          </div>
        </div>
      </div>
    );
}

export default TopRatedMovies;
