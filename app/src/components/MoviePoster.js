import React from 'react';

const MoviePoster = (props) => { 
    const {movie} = props

    return(
        <>
            <img src={movie.Poster} alt='movie'></img>
        </>
    );
}

export default MoviePoster;