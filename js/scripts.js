let pokemonRepository = (function(){
    let pokemonList = [
        {name: "Pikachu", height: 0.4, types: ["Electric"]},
        {name: "Charmander", height: 0.6, types: ["Fire"]},
        {name: "Charizard", height: 1.7, types: ["Fire", "Flying"]},
        {name: "Ninetales", height: 1.1, types: ["Fire"]},
        {name: "Rapidash", height: 1.7, types: ["Fire"]}
    ];

    let pokemonListTitle = document.querySelector(".pokemon-list")
    pokemonListTitle.append("Pokedex")

    function addListItem(pokemon) {
        let ul = document.querySelector(".pokemon-list")
        let li = document.createElement("li")
        let button = document.createElement("button")
        button.innerText = pokemon.name
        button.classList.add("btn")
        li.append(button)
        ul.append(li)
        button.addEventListener("click", e => {
            showDetails(pokemon)
        })
    }
    
    function showDetails(pokemon){
        console.log(pokemon)
    }
    showDetails()

    return {
        add: function(pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function() {
            return pokemonList;
        },
        addListItem: function(pokemon) {
            return addListItem(pokemon)
        }
    };
})();

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon)
})
