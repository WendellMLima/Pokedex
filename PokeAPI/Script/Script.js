
// pegando o botão html
const loadMore = document.getElementById('button')
// pegando a lista HTML de pokekons 
const pokemonList = document.getElementById('pokemonList')
const limitRequest = 100
const limit = 10
let offset = 0

function convertPokemonHtml(pokemon){
    return `<li class="pokemon ${pokemon.type}">
                
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.image}" alt="${pokemon.name}">
                </div>
            </li>`
}

pokeApi.getPokemons().then((pokemons = []) => {
    const newHtml =  pokemons.map(convertPokemonHtml).join('')
    pokemonList.innerHTML = newHtml


})

function loadPokemonItens(ofsset, limit){
    pokeApi.getPokemons(ofsset, limit).then((pokemons = []) => {
        const newHtml =  pokemons.map(convertPokemonHtml).join('')
        pokemonList.innerHTML += newHtml
})
} 

loadMore.addEventListener('click', () => {
    offset += limit

    // para limitar a quantidade de pagina
    const qdtRequest = offset + limit

    if(qdtRequest >= limitRequest){
        const newlimit = limitRequest - offset 
        loadPokemonItens(offset, newlimit)

        loadMore.parentElement.removeChild(loadMore)
    }else{
        loadPokemonItens(offset, limit)
    }
})



