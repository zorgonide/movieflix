import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fget } from '../../Utilities/apiCalls';
import MoviesWatched from '../Render/MoviesWatched';

function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get('q');

        fget({
            url: `/3/search/movie?api_key=${process.env.REACT_APP_BASE_TOKEN}&query=${searchTerm}&include_adult=false&language=en-US&page=1`,
        })
            .then((response) => response.data)
            .then((data) => {
                let refined = data.results.map((ele) => {
                    return {
                        id: ele.id,
                        poster:
                            'https://image.tmdb.org/t/p/original' +
                            ele.poster_path,
                        imdbRating: Math.round(ele.vote_average * 10) / 10,
                        title: ele.title,
                        release_date: ele.release_date,
                        overview: ele.overview,
                        poster_path: ele.poster_path,
                        backdrop_path: ele.backdrop_path,
                    };
                });
                // remove movies with no poster or imdbRating 0
                refined = refined.filter(
                    (ele) =>
                        ele.poster !==
                            'https://image.tmdb.org/t/p/originalnull' &&
                        ele.imdbRating !== 0
                );

                setSearchResults(refined);
                window.adobeDataLayer.push({
                    event: 'search',
                    search: searchTerm,
                    results: refined.length,
                });
            })
            .catch((error) => console.error(error));
    }, [location.search, searchResults.length]);

    return (
        <div className='container centered1'>
            <div className='row py-4 justify-content-center'>
                <div className='col-12 col-md-5'>
                    <MoviesWatched
                        title='Search'
                        movies={searchResults}
                    ></MoviesWatched>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
