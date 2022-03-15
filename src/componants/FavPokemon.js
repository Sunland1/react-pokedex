import React, { useState , useEffect } from 'react'
import { getLocalStorage } from '../services/localStorage'



export default function FavPokemon(){

    const [currentFav , setCurrentFav ] = useState([])


    useEffect(() => {
        setCurrentFav(getLocalStorage())
    } , [])



    return(
        <p>HELLO</p>
    )
}