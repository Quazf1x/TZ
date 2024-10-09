const main = document.querySelector("main");
import { createHTMLElement, getData } from "../script.js";

// Функция рендера таблицы
const renderTable = async () => {
  //Берем данные с "сервера"
  const tableData = await getData("https://jsonplaceholder.typicode.com/posts");

  const tableEl = createHTMLElement("table", null, "table", null);
  const tableHead = createHTMLElement("thead", null, "table__head", null);
  const tableFirstRow = createHTMLElement("tr", null, "table__row", null);

  // Первый цикл для рендера заголовков таблицы
  for (const [tableKey, tableValue] of Object.entries(tableData[0])) {
    const tableTh = createHTMLElement("th", null, "table__heading", tableKey);
    tableFirstRow.appendChild(tableTh);
  }
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

export default renderTable;
