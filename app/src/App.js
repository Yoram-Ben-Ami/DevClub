import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=921e1619`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			const filterMovies = responseJson.Search;
			const uniqueMovies = [...new Map(filterMovies.map((movie) => [movie.imdbID, movie])).values()];
			setMovies(uniqueMovies);	
		}
	};

	const getFavouriteMovieRequest = async () => {
		fetch('http://127.0.0.1:5000/allFav', {
			'method':'GET',
			headers: {
				'content-Type':'application/json'
			}
		})
		.then(res => res.json())
		.then(res => setFavourites(res))
		.catch(error => console.log(error));
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);


	useEffect(() => {
		getFavouriteMovieRequest()
	}, [])

	const addFavouriteMovie = (movie) => {
		fetch('http://127.0.0.1:5000/addFav', {
			'method':'POST',
			headers: {
				'content-Type':'application/json'
			},
			body: JSON.stringify(movie)
		})
		.then(res => res.json())
		.then(res => setFavourites(res))
		.catch(error => console.log(error))
	};

	const removeFavouriteMovie = (movie) => {
		const url = `http://127.0.0.1:5000/delete/${movie.imdbID}`;
		fetch(url, {
			'method':'DELETE',
			headers: {
				'content-Type':'application/json'
			}
		})
		.then(res => res.json())
		.then(res => setFavourites(res))
		.catch(error => console.log(error));
	};

	const sendFavouriteMovies = (email) => {
		fetch('http://127.0.0.1:5000/sendFavMail', {
			'method':'POST',
			headers: {
				'content-Type':'application/json'
			},
			body: JSON.stringify({"Email":email})
		})
		.then(res => res.json())
		.then(res => console.log(res.status))
		.catch(error => console.log(error))
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
