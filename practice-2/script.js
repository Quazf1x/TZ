import renderTable from "./table/table.js";

//Общая функция для создания HTML элементов
const createHTMLElement = (type, id, classes, textContent) => {
  const element = document.createElement(type);
  if (id) element.setAttribute("id", id);
  element.classList.add(classes);
  element.textContent = textContent;
  return element;
};

// Асинхронная функция для запроса данных
const getData = async (url) => {
  let data = "";
  try {
    const response = await fetch(url, {
      mode: "cors",
    });
    if (!response.ok) throw new Error("Unexpected error!");
    data = await response.json();
  } catch (err) {
    console.error(err);
  }
  return data;
};

renderTable();

export { createHTMLElement, getData };
