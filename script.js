const list = document.getElementById("list");
const description = document.getElementById("description");

const api = "https://pokeapi.co/api/v2/pokemon?limit=150";

/**
 * Try to parse a response as JSON data
 */
function transformToJson(response) {
  if (response.ok) {
    return response.json();
  }

  throw Error("Content not loaded");
}

/**
 * Clear the list of all its items
 */
function emptyList() {
  // ...
  list.innerHTML = "";

  // const empty = list.removeChild(description);
}

/**
 * Create an item, fetch its data and setup event listener
 */
function createItem(pokemon) {
  // Create a li tag
  const item = document.createElement("div");
  // ...

  const name = document.createElement("li");

  const image = document.createElement("img");
  list.appendChild(item);
  item.appendChild(image);
  item.appendChild(name);

  fetch(pokemon.url)
    .then(transformToJson)
    .then((data) => {
      // ...

      image.src = data.sprites.front_default;
      name.innerHTML = data.name;

      item.addEventListener("click", () => {
        showDescription(data);
      });
    });
}

/**
 * fill the item list with values
 */
function fillList(json) {
  emptyList();
  json.results.forEach(createItem);
}

/**
 * Fill and display the description
 */
function showDescription(data) {
  description.classList.add("show");

  const fields = description.querySelectorAll("dd");

  fields.forEach((dd) => {
    // ...
    // const image = document.createElement("img");

    // image.src = data.sprites.front_default;
    // description.innerHTML = data.image;

    dd.innerHTML = "";
    const info = dd.className;

    if (info == "types") {
      dd.innerHTML = "";
      data.types.forEach((type) => {
        dd.innerHTML += "<div class='type'>" + type.type.name + "</div>";
      });
    } else {
      dd.innerHTML = data[info];
    }
    console.log(dd);
  });
}
document.querySelector(".close").addEventListener("click", hideDescription);

/**
 * Hide the description
 */
function hideDescription() {
  description.classList.remove("show");
}

// Fetch the API end-point and fill the list
fetch(api).then(transformToJson).then(fillList);
