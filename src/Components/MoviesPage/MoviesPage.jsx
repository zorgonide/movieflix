import React, { useEffect, useState, useContext } from "react";
import { Rings } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { UncontrolledCarousel } from "reactstrap";
import { fget } from "../../Utilities/apiCalls";
import Error from "../ErrorPage/ErrorPage";
import "./MoviesPage.css";
import { GenreContext } from "../MainComponent/MainComponent";
import CardsRow from "../CardsRow/CardsRow";

function MoviesPage(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const genres = useContext(GenreContext);
  let navigate = useNavigate();

  const formatFunctionUpcoming = (movies) => {
    return movies.map((ele) => {
      return {
        key: ele.id,
        src: "https://image.tmdb.org/t/p/original" + ele.backdrop_path,
        caption: ele.original_title,
      };
    });
  };
  useEffect(() => {
    if (!genres) {
      navigate("/");
      return;
    }
    fget({
      url: `/3/movie/upcoming?api_key=${process.env.REACT_APP_BASE_TOKEN}&language=en-US&page=1`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setUpcoming(formatFunctionUpcoming(result.results.slice(0, 10)));
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    fget({
      url: `/3/movie/top_rated?api_key=${process.env.REACT_APP_BASE_TOKEN}&language=en-US&page=1`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setTopRated(result.results.slice(0, 6));
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    fget({
      url: `/3/discover/movie?api_key=${
        process.env.REACT_APP_BASE_TOKEN
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genres.join(
        ","
      )}`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setRecommended(result.results.slice(0, 6));
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
    return <Error error={error.status_message} />;
  } else if (!isLoaded) {
    return (
      <div
        style={{
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
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              {/* <h4 className='display-6 mt-4'>MovieFlix</h4> */}
            </div>
          </div>
          <div className="row pt-2 justify-content-center">
            <div className="ten">
              <h1>Upcoming Movies</h1>
            </div>
            <div className="col-12 col-sm-10 carouselSlider mt-2">
              <UncontrolledCarousel
                items={upcoming}
                indicators={false}
                autoPlay={true}
                controls={true}
              />
            </div>
          </div>
          <br></br>
          <div className="row justify-content-center mt-2">
            <div className="heading">
              <div className="ten">
                <h1>Top Rated Movies</h1>
              </div>
              <Link to={"/top-rated"} style={{ textDecoration: "none" }}>
                View more
              </Link>
            </div>
            <div className="col-12">
              <CardsRow movies={topRated}></CardsRow>
            </div>
          </div>
          <br></br>
          <div className="row justify-content-center">
            <div className="heading">
              <div className="ten">
                <h1>Recommended Movies</h1>
              </div>
              <Link to={"/recommended"} style={{ textDecoration: "none" }}>
                View more
              </Link>
            </div>
            <div className="col-12">
              <CardsRow movies={recommended}></CardsRow>
            </div>
          </div>
          <br></br>
        </div>
      </>
    );
}

export default MoviesPage;
