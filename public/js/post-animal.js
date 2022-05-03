const elformCrocodile = document.querySelector('#formCrocodile')
// const elspeciesUUID = document.querySelector('#speciesUUID')
const elspeciesName = document.querySelector('#speciesName')
const elspeciesFood = document.querySelector('#speciesFood')
// const elspeciesDevourHuman = document.querySelector('#speciesDevourHuman')
const elspeciesLength = document.querySelector('#speciesLength')
const elspeciesWeight = document.querySelector('#speciesWeight')
const elspeciesFamilyId = document.querySelector('#speciesFamilyId')
const elOutput = document.querySelector('#output')

const elhabitatId = document.querySelector('#habitatId')
const elwaterId = document.querySelector('#waterId')

function newCrocodilia(event) {
  event.preventDefault()
  //   let speciesUUID = elspeciesUUID.value
  let speciesName = elspeciesName.value
  let speciesFood = elspeciesFood.value
  // let speciesDevourHuman = elspeciesDevourHuman.value;
  let speciesLength = elspeciesLength.value
  let speciesWeight = elspeciesWeight.value
  let speciesFamilyId = elspeciesFamilyId.value

  let habitatId = elhabitatId.value
  let waterId = elwaterId.value

  alert('Test')
  console.log(newCrocodilia)

  // Example POST method implementation:
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({
        speciesName: speciesName,
        speciesFood: speciesFood,
        speciesLength: speciesLength,
        speciesWeight: speciesWeight,
        speciesFamilyId: speciesFamilyId,
        habitatId: habitatId,
        waterId: waterId
      }) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }

  postData('http://localhost:3000/species').then((data) => {
    console.log(data) // JSON data parsed by `response.json()` call
  })
}

elformCrocodile.addEventListener('submit', newCrocodilia, false)

/*
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
https://dev.to/devamaz/using-fetch-api-to-get-and-post--1g7d
 */
