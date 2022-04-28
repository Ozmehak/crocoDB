function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
const croc = document.getElementById('croc');
const alli = document.getElementById('alli');
const ghari = document.getElementById('ghari');
const url = `http://localhost:3000/familyname`;
//const url = 'data/data.json';
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data);

    let species = data;
    let p = createNode('p');
    let pp = createNode('p');
    let ppp = createNode('p');
    p.innerHTML += `${data[0].familyName}`;
    pp.innerHTML += `${data[1].familyName}`;
    ppp.innerHTML += `${data[2].familyName}`;
    return species.map(function (data) {
      append(croc, p);
      append(alli, pp);
      append(ghari, ppp);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
