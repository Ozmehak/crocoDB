let comment = document.querySelector(".comment");
let theButton = document.querySelector(".theButton2");
let infoMenu = document.querySelector(".infoMenu");
let comments = document.querySelector(".comments");
let username = document.querySelector(".username");
const url = `http://localhost:3000/species/test`;

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function newComment(event) {
  event.preventDefault();
  let theComment = comment.value;
  let theUsername = username.value;

  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
      console.log("Visa första i json-objektet: " + data[0]);
      let newComment = data.thiscomment;
      // let id = newComment.ObjectId;
      return newComment.map(function (newComment) {
        let li = createNode("li");
        li.setAttribute("class", "listComments");
        li.innerHTML += ` ${newComment.thisusername}: ${newComment.thiscomment} ${newComment.thisStamp}`;
        // console.log(id);
        append(comments, li);
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        theComment: theComment,
        theUsername: theUsername,
      }),
    });
    return response.json();
  }

  postData(`http://localhost:3000/species/${species}`).then((data) => {
    console.log(data);
  });
}

theButton.addEventListener("click", newComment, false);
