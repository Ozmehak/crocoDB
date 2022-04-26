let comment = document.querySelector(".comment");
let comments = document.querySelector(".comments");
let theButton = document.querySelector(".theButton");
let infoMenu = document.querySelector(".infoMenu");

comment.addEventListener("input", () => {
  console.log(comment.value);
});

theButton.addEventListener("click", () => {
  comments.innerHTML = comment.value;
});
