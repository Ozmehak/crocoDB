let comment = document.querySelector(".comment");
let theButton = document.querySelector(".theButton2");
let infoMenu = document.querySelector(".infoMenu");
let comments = document.querySelector(".comments");
const url = "http://localhost:3000/comment-croc";

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function newComment(event) {
  // event.preventDefault();
  let theComment = comment.value;

  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
      console.log("Visa första i json-objektet: " + data[0]);
      let newComment = data.thiscomment;
      let id = data._id;
      return newComment.map(function (newComment) {
        let li = createNode("li");
        li.style.border = "1px solid black";
        li.style.padding = "5px";
        li.style.width = "20%";
        li.style.marginBottom = "10px";
        li.innerHTML += newComment.thiscomment;
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
      }),
    });
    return response.json();
  }

  postData("http://localhost:3000/comment-croc").then((data) => {
    console.log(data);
  });
}

theButton.addEventListener("click", newComment, false);
