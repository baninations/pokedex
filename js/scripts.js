let pokemonRepository = (function(){
    let pokemonList = [
        {name: 'Pikachu', height: 0.4, types: ['Electric']},
        {name: 'Charmander', height: 0.6, types: ['Fire']},
        {name: 'Charizard', height: 1.7, types: ['Fire', 'Flying']},
        {name: 'Ninetales', height: 1.1, types: ['Fire']},
        {name: 'Rapidash', height: 1.7, types: ['Fire']}
    ];
    return {
        add: function(pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function() {
            return pokemonList;
        }
    };
})();

pokemonRepository.getAll().forEach(function(pokemon){
    if(pokemon.height > 1) {
        displayBigPokemon(pokemon)
    } else {
        displayPokemon(pokemon)
    }
})

function displayBigPokemon(pokemon) {
    document.write(
        pokemon.name + " (height: " + pokemon.height + ") Wow that's big <br>"
    );
}

function displayPokemon(pokemon) {
    document.write(
        pokemon.name + " (height: " + pokemon.height + ") <br>"
    );
}