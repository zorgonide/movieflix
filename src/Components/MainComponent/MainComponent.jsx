import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../Shared/js/ProtectedRoute";
import GenrePage from "../GenrePage/GenrePage";
import LoginComponent from "../LoginComponent/LoginComponent";
import ManageUsers from "../ManageUsers/ManageUsers";
import MovieDetail from "../MovieDetail/MovieDetail";
import MoviesPage from "../MoviesPage/MoviesPage";
import NotFound from "../NotFound/NotFound";
import ProfilePage from "../ProfilePage/ProfilePage";
import RecommendedMovies from "../RecommendedMovies/RecommendedMovies";
import RegisterComponent from "../RegisterComponent/RegisterComponent";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import WatchList from "../WatchList/WatchList";

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
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route exact path="/top-rated" element={<TopRatedMovies />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/watchlist" element={<WatchList />} />
          <Route exact path="/manage" element={<ManageUsers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainComponent;
