import React, { useState , useEffect } from 'react'
import { Link } from "react-router-dom";

import { getLocalStorage , saveLocalStorage } from '../services/localStorage'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function FavPokemon(){

    const [currentFav , setCurrentFav ] = useState([])


    useEffect(() => {
        setCurrentFav(getLocalStorage())
    } , [])


    const removeFav = (id) => {
        let newCurrentFav = currentFav.filter((element) => element.id !== id )
        setCurrentFav(newCurrentFav)
        saveLocalStorage(newCurrentFav)
    }


    //Mise en Form
    return(
        <>
            <div className='grid md:grid-cols-6 grid-cols-1 w-50 text-center mb-5'>
                {currentFav.map( (pokemon) => 
                    <div key={pokemon.id} className="bg-gray-500 rounded overflow-hidden shadow-lg m-5">
                        <img className="w-[250px]" src={pokemon.backgroundImage} alt={`image of ${pokemon.name}`}></img>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xxl mb-2 text-black">{capitalizeFirstLetter(pokemon.name)}</div>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                            <button className='text-black' onClick={() => removeFav(pokemon.id)}>Remove to fav</button>
                        </div>
                    </div>
                )}
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'><Link to="/">Go to like !</Link></button>
        </>
    )
}