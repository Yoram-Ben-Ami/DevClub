import React from "react";
function SearchBox(props){
   // const lol = props.search;
    const {search,ssearch} = props;

    return(
        <div>
           <div className=" d-flex justify-content-center"><b>Find your favorite movie</b></div> 
             <div className=" d-flex justify-content-center" > <input type="text" placeholder="type here"  onChange={(e)=> search(e.target.value)} />
    </div>
    
    </div>
)

}
export default SearchBox;