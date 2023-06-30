let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function addListItem(pokemon) {
    let ul = document.querySelector(".list-group");
    let li = document.createElement("li");
    let button = document.createElement("button");

    li.classList.add("list-group-item");

    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");

    button.addEventListener("click", (e) => {
      showDetails(pokemon);
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

  //
  var searchItem = () => {
    let searchInput = document.querySelector("#input").value.toLowerCase();
    let listArray = document.querySelectorAll(".list-group-item");

    console.log(searchInput);
    console.log(listArray);

    listArray.forEach((pokemon) => {
      let listBtn = pokemon
        .querySelector(".btn-secondary")
        .innerText.toLowerCase();
      if (listBtn.includes(searchInput)) {
        pokemon.style.display = "inline-block";
      } else {
        pokemon.style.display = "none";
      }
    });
  };

  let searchInput = document.querySelector("#input");
  searchInput.addEventListener("input", () => searchItem());
  //

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
