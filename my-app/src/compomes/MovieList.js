import Movie from "./Movie";
import AddFav from "./AddFav";

function MovieList(props){
    const {searchText} = props;
    const k = props.movies;
    return(<div className='image-container1 d-flex justify-content-start m-3'>   
      {k.length > 0 && k.map(movie =>(<Movie movie={movie} favouriteComponent={AddFav} clicktoadd={props.handleFavouritesClick} />))}    
        </div>       
  
    )
    }
    export default MovieList;
