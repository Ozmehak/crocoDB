function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById("alligator");
const url = "http://localhost:3000/alligator";
//const url = 'data/data.json';
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data);
    console.log("Visa första i json-objektet: " + data[0].speciesName);
    let species = data;
    return species.map(function (data) {
      let li = createNode("li");
      // li.innerHTML += `<a href='http://localhost:3000/species/${data.speciesName}'>${data.speciesName}</a>`
      li.innerHTML += `<a href="../html/species.html?speciesname=${data.speciesName}">${data.speciesName}</a>`;
      append(ul, li);

      let img = document.createElement("img");
      img.setAttribute("src", `${data.speciesImg}`);

      li.append(img);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
