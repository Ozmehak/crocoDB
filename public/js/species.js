function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const species = urlParams.get('speciesname')
const speciesTitle = document.querySelector('.species-title')
const info = document.querySelector('.info')
const div = document.querySelector('.infoMenu')
const url2 = `http://localhost:3000/species/${species}`

fetch(url2)
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
      <li>Food: ${data[0].speciesFood}</li>
      <li>Length: ${data[0].speciesLength} m</li>
      <li>Weight: ${data[0].speciesWeight} kg</li>
      <li>Habitat type: ${data[0].gh.replaceAll(',', ', ')}</li>
      <li>Water type: ${data[0].gw.replaceAll(',', ', ')}</li>
      </ul>`

      append(info, li)
    })
  })
  .catch(function (error) {
    console.log(error)
  })
