import React from "react";
import { HideUntilLoaded } from "react-animation";
import { Rings } from "react-loader-spinner";
import * as dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const CardsRow = ({ movies }) => {
  let navigate = useNavigate();

  return (
    <div className="row row-cols-2 row-cols-md-6 g-3 my-1">
      {movies.map((ele) => {
        return (
          <div
            className="col"
            key={ele.id}
            onClick={() =>
              navigate(`/movie/${ele.id}`, { state: { movie: ele } })
            }
          >
            <div className="card">
              <HideUntilLoaded
                animationIn="popIn"
                imageToLoad={
                  "https://image.tmdb.org/t/p/original" + ele.poster_path
                }
                Spinner={() => (
                  <Rings color="#0d6efd" height={100} width={100} />
                )}
              >
                <img
                  src={"https://image.tmdb.org/t/p/original" + ele.poster_path}
                  className="card-img-top "
                  alt={ele.title}
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary  ">
                  {ele.vote_average}
                </span>
              </HideUntilLoaded>
            </div>
            <div className="text-center">
              <p className="mb-0 mt-2 movie-title text-break" title={ele.title}>
                {ele.title.length < 30
                  ? ele.title
                  : ele.title.slice(0, 30) + "..."}
              </p>
              <p className="mt-0 sub-title">
                {dayjs(ele.release_date).format("YYYY")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardsRow;
