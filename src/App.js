import './css/App.css';
import { Routes, Route, Link } from "react-router-dom";


import Pokedex from './componants/Pokedex'
import FavPokemon from './componants/FavPokemon';



export default function App() {
  return (
    <div className='App-header'>
     <Routes>
        <Route path="/" exact element={<Pokedex/>}/>
        <Route path="/fav" exact element={<FavPokemon/>} />
      </Routes>
    </div>
  )
}
