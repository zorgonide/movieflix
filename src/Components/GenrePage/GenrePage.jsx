import React, {useEffect, useState} from 'react';
import {Rings} from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { fget } from '../../Utilities/apiCalls';
import Error from "../ErrorPage/ErrorPage"
import "./GenrePage.css"

function GenrePage(props) {
	const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [genres, setGenres] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [highlightedButtons, setHighlightedButtons] = useState([]);
	let navigate = useNavigate()
	useEffect(() => {
	  	fget({url: `/3/genre/movie/list?api_key=${process.env.REACT_APP_BASE_TOKEN}&language=en-US`})
		.then((res) => res.data)
		.then(
            (result) => {
				result.genres.forEach(ele => {
					ele.isSelected =false
				})
                setGenres(result.genres);
                setIsLoaded(true);
        },
            (error) => {
                setIsLoaded(true);
                setError(error);
        });
	}, []);
	const highlightButton = (ele ,index) => {
		let newSet =  [...genres]
		newSet[index].isSelected = !newSet[index].isSelected
		setGenres(() => [...newSet])
		if (highlightedButtons.indexOf(ele.id) === -1)
			highlightedButtons.push(ele.id)
		else {
			highlightedButtons.splice(highlightedButtons.indexOf(ele.id),1)
		}
	}
	const GenreList = () => {
		let buttonClass = "btn rounded-pill btn-sm btn-outline-primary m-1"
		let buttonSelectedClass = "btn rounded-pill btn-sm btn-primary m-1"
		return(
			<>
				{genres.map((ele, index)=> {
					if (index < 9)
					return (
						<button onClick={() => highlightButton(ele, index)} type="button" className={!genres[index].isSelected ? buttonClass : buttonSelectedClass} key={ele.id}>{ele.name}</button>
					)
					else return (
						<button onClick={() => highlightButton(ele, index)} type="button" className={seeMore ? !genres[index].isSelected ? buttonClass : buttonSelectedClass: "d-none"} key={ele.id}>{ele.name}</button>
					)
				})}
			</>
		)
	}
	const goToMoviesPage = () => {
		props.setGenres(highlightedButtons);
		navigate("/movies")
	}
    if (error) {
        return <Error error={error.status_message}/>;
    } 
    else if (!isLoaded) {
        return (
            <div
                style={{
                width: "100%",
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <Rings color="#0d6efd" height={100} width={100}/>
            </div>
        )
    }
    else return (
        <div className='container-fluid genrePage'>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body" >
							<div className="twelve card-title">
								<h1>MovieFlix</h1>
							</div>
                            <p className="card-text">Select the genres you're interested in...</p>
							<div className="genreList">
								<GenreList></GenreList>
								<p className='text-secondary text-end seeMore' onClick={()=>setSeeMore(!seeMore)}>{seeMore ? "See Less" :  "See More"}</p>
							</div>
                        </div>
						<div className="card-footer text-center">
							<button onClick={goToMoviesPage} className={ highlightedButtons.length ? "btn btn-primary" : "btn btn-primary disabled"}>Continue</button>
						</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GenrePage;