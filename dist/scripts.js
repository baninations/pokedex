let pokemonRepository = (function () {
  let t = [];
  function e(t) {
    n(t).then(function () {
      var e;
      let n, o, a, i, r, l, s, d;
      (e = t),
        (n = $(".modal-body")),
        (o = $(".modal-title")).empty(),
        n.empty(),
        (a = $("<h1>" + e.name + "</h1>")),
        (i = $(
          '<img class=modal-img alt="pokemon image" style="width:100%">'
        )).attr("src", e.imageUrlFront),
        (r = $("<div class='img-container'></div>")),
        (l = $("<div class='text-container'></div>")),
        (s = $("<p class='height-element'>Height: " + e.height + "</p>")),
        (d = $("<p class='weight-element'>Weight: " + e.weight + "</p>")),
        o.append(a),
        n.append(r),
        n.append(l),
        r.append(i),
        l.append(s),
        l.append(d);
    });
  }
  function n(t) {
    return fetch(t.detailsUrl)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrlFront = e.sprites.front_default),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = e.types);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  return {
    add: function (e) {
      t.push(e);
    },
    getAll: function () {
      return t;
    },
    addListItem: function (n) {
      var o;
      let a, i, r, l;
      return (
        (o = n),
        (a = document.querySelector(".list-group")),
        (i = document.createElement("li")),
        (r = document.createElement("button")),
        (l = document.querySelector("#button-random")),
        void (i.classList.add("list-group-item"),
        r.classList.add("btn"),
        r.classList.add("btn-primary"),
        r.setAttribute("data-toggle", "modal"),
        r.setAttribute("data-target", "#exampleModal"),
        (r.style.backgroundColor = "black"),
        l.classList.add("btn"),
        l.classList.add("btn-primary"),
        l.setAttribute("data-toggle", "modal"),
        l.setAttribute("data-target", "#exampleModal"),
        (l.style.backgroundColor = "black"),
        r.addEventListener("click", (t) => {
          e(o);
        }),
        l.addEventListener("click", (n) => {
          let o = Math.floor(149 * Math.random());
          console.log(o), e(t[o]);
        }),
        (r.innerText = o.name),
        i.appendChild(r),
        a.appendChild(i))
      );
    },
    loadList: function e() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (t) {
          return t.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            var n;
            "object" == typeof (n = { name: e.name, detailsUrl: e.url }) &&
            "name" in n
              ? t.push(n)
              : console.log("pokemon is not correct"),
              console.log(n.name);
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: n,
    showDetails: e,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
