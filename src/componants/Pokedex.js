import React, { useState , useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import { getPokemonInfo } from '../services/pokemon'
import { saveLocalStorage , getLocalStorage } from '../services/localStorage';

import '../css/Pokedex.css'


function getRandomInt(max) {
  return Math.floor(Math.random() * max) === 0 ? 1 : Math.floor(Math.random() * max)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Pokedex () {
  const [pokemonList , setPokemonList ] = useState([])
  const [currentFav , setCurrentFav] = useState([])

  useEffect( () => {
    for( let i = 0 ; i < 10 ; i++ ){
      getPokemonInfo(getRandomInt(898)).then( (pokemon) => {
        setPokemonList( p => [...p,{
          id : pokemon.id,
          name: pokemon.name,
          backgroundImage: pokemon.sprites.other["official-artwork"]["front_default"]
        }] )
      })
    }
    let localStorage = getLocalStorage()
    if(localStorage === null){
      setCurrentFav([])
      saveLocalStorage([])
    }else{
      setCurrentFav(localStorage)
    }
  } , [])

  const swiped = async (direction, pokemon) => {

    if(direction === "left"){
      let newCurrentFav = currentFav
      newCurrentFav.push(pokemon)
      saveLocalStorage(newCurrentFav)
      setCurrentFav(newCurrentFav)
    }

    if(pokemonList[0].id === pokemon.id ){
      let pokemon = {}
      let newPokemonList = []
      for( let i = 0 ; i < 10 ; i++ ){
        pokemon = await getPokemonInfo(getRandomInt(898))
        newPokemonList.push({
          id : pokemon.id,
          name: pokemon.name,
          backgroundImage: pokemon.sprites.other["official-artwork"]["front_default"]
        })
      }
      setPokemonList(newPokemonList)
    }
   
  }

  const loading = () => {
    if(pokemonList.length !== 10 ){
      return <ClipLoader color='blue'/>
    }else{
      return pokemonList.map((pokemon) =>
        <TinderCard className='swipe ' key={pokemon.id} onSwipe={(dir) => swiped(dir, pokemon)}>
          <div style={{ backgroundImage: 'url(' + pokemon.backgroundImage + ')' }} className='card'>
            <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
          </div>
        </TinderCard>
      )
    }
  }


  return (
    <div className='text-center'>
      <h1 className='p-5'>PokeTinder</h1>
      <div className='cardContainer mb-5'>
        {loading()}
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'><Link to="/fav">Go to fav</Link></button>
    </div>
  )
}

export default Pokedex