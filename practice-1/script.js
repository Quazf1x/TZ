const openModalBtn = document.querySelector(".accent-button_main");
const closeModalBtn = document.querySelector(".secondary-button_modal");
const modal = document.querySelector(".modal-wrapper");

const userImg = document.querySelector(".reg-modal__user-avatar");
const imgUploader = document.querySelector("#image-input");
const removeImgBtn = document.querySelector(
  ".reg-modal__remove-image-button img"
);

import initReg from "./reg-modal/reg-modal.js";

// Загрузка аватарки пользователя
imgUploader.addEventListener("change", function () {
  const newImg = this.files[0];
  if (newImg) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      userImg.setAttribute("src", reader.result);
    });

    reader.readAsDataURL(newImg);
  }
});

//Слушатель события для удаления аватарки
removeImgBtn.addEventListener("click", () => {
  imgUploader.value = "";
  userImg.setAttribute("src", "./img/avi_placeholder.png");
});

//Слушатель события для открытия модального окна
openModalBtn.addEventListener("click", () => {
  modal.classList.remove("modal-wrapper_hidden");
  modal.scrollTo(0, 0);
});

//Слушатель события для закрытия модального окна
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("modal-wrapper_hidden");
});

// Общая функция для создания HTML элементов
const createHTMLElement = (type, id, classes, textContent, attributeObj) => {
  const element = document.createElement(type);
  if (id) element.setAttribute("id", id);
  element.classList.add(classes);
  element.textContent = textContent;

  if (attributeObj)
    for (const [attrName, attrValue] of Object.entries(attributeObj)) {
      element.setAttribute(attrName, attrValue);
    }
  return element;
};

initReg();

export { createHTMLElement };
