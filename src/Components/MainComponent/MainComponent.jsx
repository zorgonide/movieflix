import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from '../../Shared/js/ProtectedRoute';
import GenrePage from '../GenrePage/GenrePage';
import LoginComponent from '../LoginComponent/LoginComponent';
import ManageUsers from '../ManageUsers/ManageUsers';
import MovieDetail from '../MovieDetail/MovieDetail';
import MoviesPage from '../MoviesPage/MoviesPage';
import NotFound from '../NotFound/NotFound';
import ProfilePage from '../ProfilePage/ProfilePage';
import RecommendedMovies from '../RecommendedMovies/RecommendedMovies';
import RegisterComponent from '../RegisterComponent/RegisterComponent';
import TopRatedMovies from '../TopRatedMovies/TopRatedMovies';
import WatchList from '../WatchList/WatchList';
import { trackEvent } from '../../Shared/js/r42';
import SearchPage from '../SearchComponent/SearchPage';

export const GenreContext = React.createContext();

function MainComponent(props) {
    const [genres, setGenres] = useState(null);
    const location = useLocation();

    // Function to push data to Adobe Data Layer
    const pushToAdobeDataLayer = (pageName) => {
        window.adobeDataLayer = window.adobeDataLayer || [];
        window.adobeDataLayer.push({
            event: 'page-view',
            page: pageName,
        });
    };
    const pushToRelay42 = (pageName) => {
        // let page = pageName.slice(1);
        // if (/^\/movie\/\d+$/.test(pageName)) {
        //     page = 'movie';
        // }
        // if (page === '') {
        //     page = 'main';
        // }
        // window._st('resetTags');
        // window._st('setPageStructure', page);
        // trackEvent();
    };

    // Call pushToAdobeDataLayer whenever the route changes
    React.useEffect(() => {
        pushToAdobeDataLayer(location.pathname);
        pushToRelay42(location.pathname);
    }, [location.pathname]);
    return (
        <>
            <Routes location={props.location}>
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/register' element={<RegisterComponent />} />
                <Route path='/' element={<ProtectedRoute />}>
                    <Route
                        path='/genres'
                        element={<GenrePage setGenres={setGenres} />}
                    />
                    <Route
                        exact
                        path='/'
                        element={
                            <GenreContext.Provider value={genres}>
                                <MoviesPage />
                            </GenreContext.Provider>
                        }
                    />
                    <Route
                        exact
                        path='/recommended'
                        element={
                            <GenreContext.Provider value={genres}>
                                <RecommendedMovies />
                            </GenreContext.Provider>
                        }
                    />
                    <Route path='/movie/:movieId' element={<MovieDetail />} />
                    <Route
                        exact
                        path='/top-rated'
                        element={<TopRatedMovies />}
                    />
                    <Route exact path='/profile' element={<ProfilePage />} />
                    <Route exact path='/watchlist' element={<WatchList />} />
                    <Route exact path='/manage' element={<ManageUsers />} />
                    <Route exact path='/search' element={<SearchPage />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default MainComponent;
