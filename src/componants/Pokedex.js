import React, { useState , useEffect } from 'react'
import TinderCard from 'react-tinder-card'

import { getPokemonInfo } from '../services/pokemon'
import '../css/Pokedex.css'


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Pokedex () {
  const [pokemonList , setPokemonList ] = useState([])
  const [currentFav , setCurrentFav] = useState([])

  useEffect( async () => {
    let pokemon = {}
    let pokemonList = []
    for( let i = 0 ; i < 10 ; i++ ){
      pokemon = await getPokemonInfo(getRandomInt(898))
      pokemonList.push({
        id : pokemon.id,
        name: pokemon.name,
        backgroundImage: pokemon.sprites.other["official-artwork"]["front_default"]
      })
    }
    setPokemonList(pokemonList)
  } , [])

  const swiped = async (direction, pokemon) => {

    if(direction === "left"){
      let newCurrentFav = currentFav
      newCurrentFav.push(pokemon)
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

  return (
    <div>
      <h1>PokeTinder</h1>
      <div className='cardContainer'>
        {pokemonList.map((pokemon) =>
          <TinderCard className='swipe ' key={pokemon.id} onSwipe={(dir) => swiped(dir, pokemon)}>
            <div style={{ backgroundImage: 'url(' + pokemon.backgroundImage + ')' }} className='card'>
              <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      <button onClick={() => console.log(currentFav)}>Go to fav</button>
    </div>
  )
}

export default Pokedex