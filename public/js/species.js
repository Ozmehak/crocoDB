function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}
console.log('test')
const queryString = window.location.search
console.log(queryString)
console.log('test', queryString)
const urlParams = new URLSearchParams(queryString)

const species = urlParams.get('speciesname')
console.log(species)

const div = document.getElementById('test')
const url = `http://localhost:3000/species/${species}`
//const url = 'data/data.json';
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data)
    console.log('Visa första i json-objektet: ' + data[0].speciesName)
    let species = data
    return species.map(function (data) {
      let h1 = createNode('h1')
      let li = createNode('p')
      h1.innerHTML += `${data[0].speciesName}`
      append(div, h1)
      li.innerHTML += `<ul>
      <li>Food: ${data[0].speciesFood}</li>
      <li>Length: ${data[0].speciesLength}</li>
      <li>Weight: ${data[0].speciesWeight}</li>
      <li>Habitat type: ${data[0].gh}</li>
      <li>Water type: ${data[0].gw}</li>
      </ul>`
      append(div, li)
      let img = document.createElement('img')
      img.setAttribute('src', `${data[0].speciesImg}`)

      h1.append(img)
    })
  })
  .catch(function (error) {
    console.log(error)
  })
