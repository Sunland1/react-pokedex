export function saveLocalStorage(data){
    localStorage.setItem('pokemonFav', JSON.stringify(data));
}



export function getLocalStorage(){
    return JSON.parse(localStorage.getItem('pokemonFav'))
}