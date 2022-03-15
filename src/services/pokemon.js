const URL = "https://pokeapi.co/api/v2/"



export async function getPokemonInfo(id){
    const resp = await fetch(URL + `pokemon/${id}` , {
        method: "GET",
    })

    return await resp.json()
}