let pokemonList = [
    {name: 'Pikachu', height: 0.4, types: ['Electric']},
    {name: 'Charmander', height: 0.6, types: ['Fire']},
    {name: 'Charizard', height: 1.7, types: ['Fire', 'Flying']},
    {name: 'Ninetales', height: 1.1, types: ['Fire']},
    {name: 'Rapidash', height: 1.7, types: ['Fire']}
];

for(let i = 0;i<pokemonList.length;i++) {
    if(pokemonList[i].height > 1) {
        document.write(
            pokemonList[i].name + " (height: " + pokemonList[i].height + ") Wow that's big<br>"
        );
    } else {
        document.write(
            pokemonList[i].name + " (height: " + pokemonList[i].height + ") <br>"
        );
    }
}


