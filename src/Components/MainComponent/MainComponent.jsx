import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import GenrePage from '../GenrePage/GenrePage';
import Header from "../HeaderComponent/HeaderComponent";
import MoviesPage from '../MoviesPage/MoviesPage';
import NotFound from "../NotFound/NotFound";
import RecommendedMovies from '../RecommendedMovies/RecommendedMovies';
import TopRatedMovies from '../TopRatedMovies/TopRatedMovies';

export const GenreContext = React.createContext()

function MainComponent(props) {
    const [genres, setGenres] = useState(null);
    return (
        <div>
            <Header />
                <Routes location={props.location}>
                    <Route path='/' element={<GenrePage setGenres={setGenres}/>} />
                    <Route exact path='/movies' element={<GenreContext.Provider value={genres}>
                        <MoviesPage/>
                        </GenreContext.Provider>} 
                    />
                    <Route exact path='/recommended' element={<GenreContext.Provider value={genres}>
                        <RecommendedMovies/>
                        </GenreContext.Provider>} 
                    />
                    <Route exact path='/top-rated' element={<TopRatedMovies/>}/>
                    <Route path="*" element={<NotFound/>} />
                </Routes>
        </div>
    );
}

export default MainComponent
