export default class FormValidator {

  constructor(objectElements, formElement) {
    this._objectElements = objectElements;
    this._formElement = formElement;
    this._formList = Array.from(document.querySelectorAll(objectElements.formSelector));
    this._buttonElement = formElement.querySelector(objectElements.submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(objectElements.inputSelector));
  }

  // показ ошибок
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._objectElements.errorClass);
    errorElement.textContent = errorMessage;
  }

  // удаление ошибок
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._objectElements.errorClass);
    errorElement.textContent = '';
  }

  // удаление ошибок при открытии попап
  clearInputError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._disableButton();
    })
  }

  // валидация форм
  _checkValidityForm(inputElement) {
    if (inputElement.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
      inputElement.setCustomValidity('Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
    } else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
      inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Для этого создадим функцию hasInvalidInput.
  // Она принимает массив полей формы и возвращает true,
  //  если в нём хотя бы одно поле не валидно,
  //  и false, если все валидны.
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState(inputElement) {
    if (this._hasInvalidInput(inputElement)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  // кнопка не активна
  _disableButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._objectElements.inactiveButtonClass);
  }

  // кнопка активна
  _enableButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._objectElements.inactiveButtonClass);
  }

  // проверка формы в момент нажатия на клавишу
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidityForm(inputElement);
        this._toggleButtonState(inputElement);
      });
    });
  }


  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

