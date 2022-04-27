let comment = document.querySelector(".comment");
let comments = document.querySelector(".comments");
let theButton = document.querySelector(".theButton2");
let infoMenu = document.querySelector(".infoMenu");
const url = "http://localhost:3000/comment-croc";

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data);
    console.log("Visa första i json-objektet: " + data.newComment);
    let newComment = data;
    return newComment.map(function (data) {
      let li = createNode("li");
      li.innerHTML += `<a href="../html/comment-croc.html?speciesname=${data.newComment}">${data.speciesName}</a>`;
      append(ul, li);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

function newComment(event) {
  event.preventDefault();
  let theComment = comment.value;
  comments.innerHTML = theComment;

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
