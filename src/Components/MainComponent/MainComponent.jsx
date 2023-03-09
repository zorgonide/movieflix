import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../Shared/js/ProtectedRoute";
import GenrePage from "../GenrePage/GenrePage";
import Header from "../HeaderComponent/HeaderComponent";
import LoginComponent from "../LoginComponent/LoginComponent";
import MoviesPage from "../MoviesPage/MoviesPage";
import NotFound from "../NotFound/NotFound";
import RecommendedMovies from "../RecommendedMovies/RecommendedMovies";
import RegisterComponent from "../RegisterComponent/RegisterComponent";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";

export const GenreContext = React.createContext();

function MainComponent(props) {
  const [genres, setGenres] = useState(null);
  return (
    <>
      <Routes location={props.location}>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/genres" element={<GenrePage setGenres={setGenres} />} />
          <Route
            exact
            path="/"
            element={
              <GenreContext.Provider value={genres}>
                <MoviesPage />
              </GenreContext.Provider>
            }
          />
          <Route
            exact
            path="/recommended"
            element={
              <GenreContext.Provider value={genres}>
                <RecommendedMovies />
              </GenreContext.Provider>
            }
          />
          <Route exact path="/top-rated" element={<TopRatedMovies />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainComponent;
