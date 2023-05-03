import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popup, popupSubmit) {
    super(popup)
    this._form = this._popup.querySelector('.form');
    this._formInput = Array.from(this._form.querySelectorAll('.form__item'));
    this._formButton = this._form.querySelector('.form__button');
    this._popupSubmit = popupSubmit;
  }

  _getInputValues() {
    const formlist = {};
    this._formInput.forEach((inputElement) => {
      formlist[inputElement.name] = inputElement.value;
    })
    return formlist;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._popupSubmit(this._getInputValues())
    })
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
      this._formButton.textContent = loadingText
    } else {
      this._formButton.textContent = buttonText
    }
  }

}



