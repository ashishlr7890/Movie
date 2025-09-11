import React, { useEffect, useState } from 'react'
import Search from './component/search';
const API_BASE_URL = "17f807688b79c5400c483757b5674b35";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTION = {
  method: 'GET',
header: {
  accept: 'application/json',
  Authorization: `bearer ${API_KEY}`
}
}
const App = () => {
  const [searchTerm, setSearchTerm]= useState('');
  const [errorMessage, SetErrorMessage] = useState('');
  const fechMovies = async () =>{
    try{
      const endpoint = `${API_BASE_URL}/discover/movies?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTION);
alert(response);
    }
  catch(error) {
console.error(error);
SetErrorMessage('Error fetching movies. please try again later.');
  }
}
useEffect(() =>{

},[]);

  
  return (
    <main>
    <div classroom="pattern" />

    <div className="wrapper">
      <img src="./hero.png" alt="hero Banner"/>
     <header>
      <h1>Find<span className="text-gradient"> Movies</span>  you'll Enjoy without the hassel</h1>
     </header>

     <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     <h1 className="text white" >{searchTerm}</h1>
    </div>
    </main>
  )
}

export default App
