const regForm = document.querySelector(".reg-modal__fields-wrapper");
import { createHTMLElement } from "../script.js";
import inputData from "../InputData.js";

// Функция дополнительной настройки инпута для номера телефона
const initPhoneInput = () => {
  const phoneInput = document.querySelector('#phone-input');

  phoneInput.addEventListener('input', (e) => {
    // Предотвращение ввода любых символов кроме чисел
    let inputVal = e.target.value.replace(/\D/g, ''); 

    // Добавляем код страны
    inputVal.length > 1 ? 
    inputVal = '+7 ' + inputVal.substring(1)
    : inputVal = '+7 ';

    // Массив с данными для форматирования номера по маске
    const maskBreakpoints = [
      { len: 6, separator: ' ' },
      { len: 10, separator: '-' },
      { len: 13, separator: '-' },
    ];

    maskBreakpoints.forEach(({len, separator}) => {
      if(inputVal.length > len)
        inputVal = inputVal.substring(0, len) + separator + inputVal.substring(len)
    });

    e.target.value = inputVal;
  });
};

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
      "placeholder": input.placeholder,
      "value": input.value,
      "minlength":input.minlength,
      "maxlength":input.maxlength
    },input.isRequired);

    if (input.icon) {
      const icon = createHTMLElement( "img", null, "reg-modal__input-icon", null, {
        "src": input.icon,
        "alt":input.alt
      });

      inputWrapper.appendChild(icon);
    }

    if(input.pattern) {
      inputField.setAttribute("pattern", input.pattern);
    }

    if (input.isRequired) {
      const star = createHTMLElement("span", null, "red-text", "*", {});
      label.prepend(star);
      inputField.required = true;
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

  initPhoneInput();
};

export default initReg;
