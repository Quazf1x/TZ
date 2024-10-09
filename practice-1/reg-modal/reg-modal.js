const regForm = document.querySelector(".reg-modal__fields-wrapper");
import { createHTMLElement } from "../script.js";
import inputData from "../InputData.js";

//Функция рендера блоков с input'ами
const initReg = () => {
  inputData.forEach((input) => {
    const inputWrapper = createHTMLElement("div", null, "reg-modal__input-wrapper", null, null);
    const label = createHTMLElement("label", null, "reg-modal__label", input.labelText, {
      "for": input.id
    });
    const inputField = createHTMLElement( "input", input.id, "reg-modal__input", null, {
      "type": input.type,
      "name": input.name,
      "placeholder":input.placeholder,
      "required": true
    });

    if (input.icon) {
      const icon = createHTMLElement( "img", null, "reg-modal__input-icon", null, {
        "src": input.icon,
        "alt":input.alt
      });

      inputWrapper.appendChild(icon);
    }

    if (input.isRequired) {
      const star = createHTMLElement("span", null, "red-text", "*", {});
      label.prepend(star);
    }
    if (input.labelText == "")
      inputField.classList.add("reg-modal__input_no-label");
    if (input.isFullLength)
      inputWrapper.classList.add("reg-modal__input-wrapper_fullsize");

    inputWrapper.appendChild(label);
    inputWrapper.appendChild(inputField);

    input.isFullLength
      ? regForm.appendChild(inputWrapper)
      : regForm.prepend(inputWrapper);
  });
};

export default initReg;
