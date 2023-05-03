export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // добавляем карточки в контейнер
  addItem(element) {
    this._container.append(element);
  }

  rendererItems(elements) {
    elements.forEach(item => {
      this._renderer(item)
    })
  }
}



