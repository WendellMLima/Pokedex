

const pokeApi = {}

function convertPokeApiDetail (pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

pokeApi.getDetailsPokemon  = (pokemon) => {
   return fetch(pokemon.url)
   .then((response) => response.json()) // pega a lista de url dos pokemons e transforma em json
    .then(convertPokeApiDetail)

}

pokeApi.getPokemons = (ofsset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${ofsset}&limit=${limit}`  
    // fazendo a requisição HTTP para buscar os pokemons 
    return fetch(url)
    // organizando o resultado dos pokemons 
    .then((response) => response.json()) // requisição para transformar o body em json
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getDetailsPokemon)) // transformou a lista 
    .then((detailRequests) => Promise.all(detailRequests)) // listou os detalhes dos pokemons 
    .then((pokemonDetails) => pokemonDetails)

    .catch((error) => console.log(error)) // tratamento de erro em cima da requisição
}

