
import { useEffect, useState } from 'react';
import './App.css';
import SearchBox from './compomes/SearchBox';
import Movie from './compomes/Movie';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './compomes/Header';
import MovieList from './compomes/MovieList';
import AddFav from './compomes/AddFav';
import 'bootstrap/dist/css/bootstrap.min.css';
import RemoveFavourites from './compomes/RemoveFavourites';

function App() {
  const [search1, setsearch] = useState([]);
  const [movies, setMovie] = useState([]);
  const [favourites, setFavourites] = useState([]);
 
 const getFavouriteMovieRequest = async () => {
  fetch('http://127.0.0.1/getfavorites', {
    'method':'GET',
    headers: {
      'content-Type':'application/json'
    }
  })
  .then(res => res.json())
  .then(res => setFavourites(res))
  .catch(error => console.log(error));
};

const removeFavouriteMovie = (movie) => {
  const newFavouriteList = favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
  );

  setFavourites(newFavouriteList);
  const url = `http://127.0.0.1/delete/${movie.imdbID}`;
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

  let listmv = async() =>{
    try{
      const res = await fetch(`http://www.omdbapi.com/?s=${search1}&apikey=72b546aa`);
      const data = await res.json();
      if(data["Response"] == "True")
      setMovie(data.Search);
      }
      catch(e){ console.log("error"); }   
      }

    const addFavouriteMovie = (movie) => {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
        fetch('http://127.0.0.1/favorite', {
          'method': 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(movie)
      })
      .then(res => res.json())
      .then( res => setFavourites(res))
      .catch(error => console.log(error))
    };


  
    useEffect(()=>{ listmv(); }, [search1])

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'> 
          <Header heading='Movies' /> 
          
          <SearchBox text="type here" search={setsearch} id="searchBox"/> 
      </div>
      <div className='row'>
          <MovieList movies={movies}  handleFavouritesClick={addFavouriteMovie} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
			    <Header heading='Favourites' />
			</div>
      <div className='row'>
				<MovieList movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
    </div>
  );
}

export default App;
