function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}
const croc = document.getElementById('croc')
const alli = document.getElementById('alli')
const ghari = document.getElementById('ghari')
const url = `http://localhost:3000/familyname`
//const url = 'data/data.json';
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data)

    let species = data
    let p = createNode('p')
    let pp = createNode('p')
    let ppp = createNode('p')
    p.innerHTML += `<a href="../html/family.html?familynames=${data[0].familyName}">${data[0].familyName}</a>`
    pp.innerHTML += `<a href="../html/family.html?familynames=${data[1].familyName}">${data[1].familyName}</a>`
    ppp.innerHTML += `<a href="../html/family.html?familynames=${data[2].familyName}">${data[2].familyName}</a>`
    // <3
    return species.map(function (data) {
      append(croc, p)
      append(alli, pp)
      append(ghari, ppp)
    })
  })
  .catch(function (error) {
    console.log(error)
  })

/*  Search Stuff                                                               */

let searchResult = document.querySelector('#searchResult')
document.addEventListener('click', (event) => {
    if (event.composedPath().includes(searchResult)) return
    const wrapper = document.querySelector('#searchResultWrapper')
    if (wrapper) {
        wrapper.remove()
    }
})



let searchInput = document.querySelector('#searchInput')
searchInput.addEventListener('input', searchCrocs)

function searchCrocs(){
    console.log(searchInput.value)
    fetch('http://localhost:3000/search')
        .then(res => res.json())
        .then( function (data) {
            /*console.log(data[0])*/
            let wrapper = document.querySelector('#searchResultWrapper')
            if (wrapper) {
                wrapper.remove()
            }
            wrapper = document.createElement('div')
            wrapper.setAttribute('id', 'searchResultWrapper')
            wrapper.append(...data.map(searchresult => {
            /*wrapper.append(data.filter((searchresult) => { searchresult === `${searchInput.value}`*/
                let pElement = document.createElement('p')
                let imgElement = document.createElement('img')
                let divElement = document.createElement('div')
                pElement.textContent = `${searchresult.speciesName}`
                imgElement.classList.add('search-pics')
                imgElement.setAttribute('src', `${searchresult.speciesImg}`)
                divElement.append(imgElement)
                divElement.append(pElement)
                return divElement
            }))

            searchResult.append(wrapper)
        })


    }
