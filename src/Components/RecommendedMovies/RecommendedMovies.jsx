import React, {useEffect, useState, useContext} from 'react';
import {Rings} from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { fget } from '../../Utilities/apiCalls';
import Error from "../ErrorPage/ErrorPage"
import "./RecommendedMovies.css"
import {GenreContext} from "../MainComponent/MainComponent"
import CardsRow from '../CardsRow/CardsRow';
import Pagination from '../Pagination/Pagination';

function RecommendedMovies() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [recommended, setRecommended] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const genres = useContext(GenreContext)
    let navigate = useNavigate();
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        getMovies(pageNumber);
    };

    const getMovies = (page=1) => {
        fget({url: `/3/discover/movie?api_key=${process.env.REACT_APP_BASE_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genres.join(',')}`})
		.then((res) => res.data)
		.then(
            (result) => {
                setRecommended(result.results);
                setTotalPages(result.total_pages)
                setIsLoaded(true);
        },
            (error) => {
                setIsLoaded(true);
                setError(error);
        });
    }

    useEffect(() => {
        if (!genres) {
            navigate("/")
            return
        }
	  	getMovies()
	}, []);
    if (error) {
        return <Error error={error.status_message}/>;
    } 
    else if (!isLoaded) {
        return (
            <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <Rings color="#0d6efd" height={100} width={100}/>
            </div>
        )
    }
    else return( 
        
        <div className="container">
			<div className="row mt-2 justify-content-center">
				<div className="heading">
                    <div class="ten">
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
    )
}

export default RecommendedMovies;
