const cards = document.querySelectorAll(".gameCard");

cards.forEach((card) => {
  const popupWindow = card.querySelector(".popupWindow");
  const popupForm = popupWindow.querySelector("form");
  const deleteForm = card.querySelector(".deleteForm");

  card.addEventListener("click", (e) => {
    if (popupWindow.contains(e.target)) {
      return;
    }
    popupWindow.style.display = "flex";
  });
  deleteForm.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  popupWindow.addEventListener("click", (e) => {
    popupWindow.style.display = "none";
  });

  popupForm.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
