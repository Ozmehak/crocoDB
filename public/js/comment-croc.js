let comment = document.querySelector(".comment");
let comments = document.querySelector(".comments");
let theButton = document.querySelector(".theButton2");
let infoMenu = document.querySelector(".infoMenu");
let array = [];

comment.addEventListener("input", () => {
  console.log(comment.value);
});

theButton.addEventListener("click", () => {
  array.push((comments.innerHTML = comment.value));
  console.log(array);
});
