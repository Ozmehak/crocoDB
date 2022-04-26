function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
console.log("test");
const queryString = window.location.search;
console.log(queryString);
console.log("test", queryString);
const urlParams = new URLSearchParams(queryString);

const species = urlParams.get("speciesname");
console.log(species);

const ul = document.getElementById("test");
const url = `http://localhost:3000/species/${species}`;
//const url = 'data/data.json';
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data);
    console.log("Visa första i json-objektet: " + data[0].speciesName);
    let species = data;
    return species.map(function (data) {
      let li = createNode("li");
      li.innerHTML += `<a href='http://localhost:3000/species/${data.speciesName}'>${data.speciesName}</a>`;
      append(ul, li);

      let img = document.createElement("img");
      img.setAttribute("src", `${data.speciesImg}`);

      li.append(img);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
