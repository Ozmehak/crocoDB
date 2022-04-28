function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const family = urlParams.get('familynames')
console.log(family)
console.log(queryString)

const familyName = document.getElementById('family-name')
const heading = document.getElementById('heading')
const count = document.getElementById('count')
const url = `http://localhost:3000/home/${family}`

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data)
    console.log('Visa första i json-objektet: ' + data[0].speciesName)
    let species = data
    let h1 = createNode('h1')
    h1.innerHTML += `${data[0].familyName}`
    return species.map(function (data) {
      let li = createNode('li')
      // li.innerHTML += `<a href='http://localhost:3000/species/${data.speciesName}'>${data.speciesName}</a>`
      li.innerHTML += `<a href="../html/species.html?speciesname=${data.speciesName}">${data.speciesName}</a>`
      append(heading, h1)
      append(familyName, li)
      let img = document.createElement('img')
      img.setAttribute('src', `${data.speciesImg}`)

      li.append(img)
    })
  })
  .catch(function (error) {
    console.log(error)
  })

const url2 = `http://localhost:3000/count/${family}`
//const url = 'data/data.json';
fetch(url2)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data)
    console.log(data[0].amountOfAllis)
    console.log('Visa första i json-objektet: ' + data[0].speciesName)
    let species = data

    let p = createNode('p')
    p.innerHTML += `Showing ${data[0].amountOfAllis} species`

    return species.map(function (data) {
      append(count, p)
    })
  })
  .catch(function (error) {
    console.log(error)
  })
