const main = document.querySelector("main");
import { createHTMLElement, getData } from "../script.js";
// Переменная для сортировки. true - по возрастанию, false - по убыванию
let sortDirection = false;

// Функция сортировки значений таблицы
const sortTable = (colIndex) => {
  const tbody = document.querySelector("tbody");
  const rowsArr = Array.from(tbody.rows);

  rowsArr.sort((rowOne, rowTwo) => {
    const cellOne = rowOne.cells[colIndex].innerText;
    const cellTwo = rowTwo.cells[colIndex].innerText;

    // Сортировка для строк
    if (isNaN(cellOne) && isNaN(cellOne)) {
      return  sortDirection ? (cellOne > cellTwo ? 1 : -1) : cellTwo > cellOne ? 1 : -1;
    }
    // Сортировка для чисел
    return sortDirection ? cellOne - cellTwo : cellTwo - cellOne;
  });

  rowsArr.forEach((row) => tbody.appendChild(row));
  // Меняем переменную сортировки
  sortDirection = !sortDirection;
};

// Функция фильтра значений таблицы
const filterTable = (searchSubstring) => {
  const tbody = document.querySelector("tbody");
  const rows = Array.from(tbody.rows);

  //Фильтр ищет совпадения с подстрокой во всей каждой строке таблицы
  rows.forEach((row) => {
    const cellsArr = Array.from(row.cells);
    const rowText = cellsArr
      .map((cell) => cell.innerText)
      .join(" ")
      .toLowerCase();
    row.style.display = rowText.includes(searchSubstring) ? "" : "none";
  });
};
// Функция рендера таблицы
const renderTable = async () => {
  //Берем данные с "сервера"
  const tableData = await getData("https://jsonplaceholder.typicode.com/posts");

  const tableEl = createHTMLElement("table", null, "table", null);
  const tableHead = createHTMLElement("thead", null, "table__head", null);
  const tableFirstRow = createHTMLElement("tr", null, "table__row", null);

  // Первый цикл для рендера заголовков таблицы
  Object.keys(tableData[0]).forEach((tableKey, colIndex) => {
    const tableTh = createHTMLElement("th", null, "table__heading", null);
    const tableSortBtn = createHTMLElement(
      "button",
      `${tableKey}-sort-btn`,
      "table__sort-btn",
      tableKey
    );

    // Добавляем обработчик события для кнопки сортировки
    tableSortBtn.addEventListener("click", () => sortTable(colIndex));
    tableTh.appendChild(tableSortBtn);
    tableFirstRow.appendChild(tableTh);
  });
  tableHead.appendChild(tableFirstRow);
  tableEl.appendChild(tableHead);

  const tableBody = createHTMLElement("tbody", null, "table__body", null);
  //Далее рендерим данные самой таблицы. Первый цикл для создания строки
  tableData.forEach((data) => {
    const tableRow = createHTMLElement("tr", null, "table__row", null);

    //Второй цикл для создания каждой ячейки в строке
    for (const [tableKey, tableValue] of Object.entries(data)) {
      const tableTh = createHTMLElement("td", null, "table__cell", tableValue);
      tableRow.appendChild(tableTh);
    }
    tableBody.appendChild(tableRow);
  });

  tableEl.appendChild(tableBody);
  main.appendChild(tableEl);
};

export { filterTable };
export default renderTable;
