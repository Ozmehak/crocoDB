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
const speciesTitle = document.querySelector('.species-title')
const info = document.querySelector('.info')
const div = document.querySelector('.infoMenu')
const url = `http://localhost:3000/species/${species}`
//const url = 'data/data.json';
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data)
    console.log('Visa första i json-objektet: ' + data[0].speciesName)
    let species = data
    return species.map(function (data) {
      let li = createNode('p')
      let img = document.createElement('img')
      let h1 = createNode('h1')

      h1.innerHTML += `${data[0].speciesName}`
      img.setAttribute('src', `${data[0].speciesImg}`)
      append(speciesTitle, h1)
      info.append(img)
      li.innerHTML += `<ul class="list-info">
      <li>Food:${data[0].speciesFood}</li>
      <li>Length: ${data[0].speciesLength}</li>
      <li>Weight: ${data[0].speciesWeight}</li>
      <li>Habitat type: ${data[0].gh.replaceAll(',', ', ')}</li>
      <li>Water type: ${data[0].gw.replaceAll(',', ', ')}</li>
      </ul>`

      append(info, li)
    })
  })
  .catch(function (error) {
    console.log(error)
  })
