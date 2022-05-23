import React from 'react';

const MovieListHeading = (props) => {
	return (
		<div id='header' className='col'>
			<h1>{props.heading}</h1>
		</div>
	);
};

export default MovieListHeading;
