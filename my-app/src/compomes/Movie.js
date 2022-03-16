import MovieList from "./MovieList";
function Movie(props){
    const {movie} = props;
    const FavouriteComponent = props.favouriteComponent;

    return(<div className='image-container d-flex justify-content-start m-2 '>
         <img alt="movie" src={movie.Poster} width="200px" className="rounded " ></img> 
         <div onClick={() => props.clicktoadd(movie)} className='overlay d-flex align-items-center justify-content-center' >
         <FavouriteComponent/> 
         </div>
    </div>
    )}
    export default Movie;
