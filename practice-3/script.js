import { filterTable } from "./table/table.js";
import renderTable from "./table/table.js";

const filterInput = document.querySelector("#table-input-filter");

filterInput.addEventListener("input", () => {
  const searchSubstring = filterInput.value.toLowerCase();

  if (searchSubstring.length >= 3) {
    filterTable(searchSubstring);
  } else {
    const tbody = document.querySelector("tbody");
    Array.from(tbody.rows).forEach((row) => (row.style.display = ""));
  }
});

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
