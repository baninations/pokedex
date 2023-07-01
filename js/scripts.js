let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
    console.log(pokemon.name);
  }
  function addListItem(pokemon) {
    let ul = document.querySelector(".list-group");
    let li = document.createElement("li");
    let button = document.createElement("button");
    let randomButton = document.querySelector("#button-random");

    li.classList.add("list-group-item");

    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.style.backgroundColor = "black";

    randomButton.classList.add("btn");
    randomButton.classList.add("btn-primary");
    randomButton.setAttribute("data-toggle", "modal");
    randomButton.setAttribute("data-target", "#exampleModal");
    randomButton.style.backgroundColor = "black";

    button.addEventListener("click", (e) => {
      showDetails(pokemon);
    });

    randomButton.addEventListener("click", (e) => {
      let randomNumber = Math.floor(Math.random() * 149);
      console.log(randomNumber);
      showDetails(pokemonList[randomNumber]);
    });

    button.innerText = pokemon.name;
    li.appendChild(button);
    ul.appendChild(li);
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");

    let imageElementFront = $('<img class=modal-img style="width:100%">');
    imageElementFront.attr("src", item.imageUrlFront);

    let imgContainer = $("<div class='img-container'></div>");
    let textContainer = $("<div class='text-container'></div>");

    let heightElement = $(
      "<p class='height-element'>" + "Height: " + item.height + "</p>"
    );
    let weightElement = $(
      "<p class='weight-element'>" + "Weight: " + item.weight + "</p>"
    );

    modalTitle.append(nameElement);
    modalBody.append(imgContainer);
    modalBody.append(textContainer);
    imgContainer.append(imageElementFront);
    textContainer.append(heightElement);
    textContainer.append(weightElement);
  }

  // this function shows the details of the pokemon in a modal dynamically.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function () {
      return pokemonList;
    },
    addListItem: function (pokemon) {
      return addListItem(pokemon);
    },
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
