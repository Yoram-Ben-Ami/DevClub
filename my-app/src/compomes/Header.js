function Header(props){
    return(
      <div className='col d-flex justify-content-center'>
     <h1 class="display-1"><b>{props.heading}</b></h1>
      </div>
  )
}
export default Header;