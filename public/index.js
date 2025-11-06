const popupWindow = document.querySelector(".popupWindow");

const form = document.querySelector(".popupWindow > form");

const cards = document.querySelectorAll(".gameCard");

form.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("formCicked");
});

popupWindow.addEventListener("click", (e) => {
  popupWindow.style.display = "none";
});

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    popupWindow.style.display = "flex";
  });
});
