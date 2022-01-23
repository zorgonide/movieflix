import React from 'react';
import { HideUntilLoaded } from 'react-animation'
import {Rings} from 'react-loader-spinner';

const CardsRow = ({movies}) => {
    return (
        <div class="row row-cols-2 row-cols-md-6 g-3 my-1">
            {movies.map((ele) => {
                return (
                    <div className="col">
                        <div className="card">
                            <HideUntilLoaded
                                animationIn="popIn"
                                imageToLoad={"https://image.tmdb.org/t/p/original" + ele.poster_path}
                                Spinner={() => <Rings color="#0d6efd" height={100} width={100}/>}
                                >
                                    <img src={"https://image.tmdb.org/t/p/original" + ele.poster_path} className="card-img-top " alt={ele.title}/><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary  ">{ele.vote_average}</span>

                            </HideUntilLoaded>
                        </div>
                        <div className="">
                            <p className='mt-1 mb-0 text-muted'>{ele.release_date}</p>
                            <p class="fw-bold text-break">{ele.title.length < 30 ? ele.title : ele.title.slice(0, 30) + "..."}</p>
                        </div>
                    </div>
                )
            })} 
        </div>
    )
}

export default CardsRow;