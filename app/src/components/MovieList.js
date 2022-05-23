import React from 'react';
import MoviePoster from './MoviePoster';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<div className='overlay-top d-flex align-items-center justify-content-center'>
						{movie.Title}
					</div>
					<MoviePoster movie={movie}/>
					<div onClick={() => props.handleFavouritesClick(movie)}
						 className='overlay d-flex align-items-center justify-content-center'>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
