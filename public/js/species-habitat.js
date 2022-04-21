function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('species');
const url = 'http://localhost:3000/species/habitat';
//const url = 'data/data.json';
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data);
        console.log("Visa första i json-objektet: " + data[0].speciesHabitat);
        let bok = data;
        return bok.map(function(data) {
            let li = createNode('li');
            li.innerHTML = data.speciesHabitat + ' ' + data.speciesHabitat + ' ' + data.speciesName;
            append(ul, li);
        })
    })
    .catch(function(error) {
        console.log(error);
    });
