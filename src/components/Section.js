export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }


  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  // Добавить карточку в конец списка
  addItem(element) {
    this._container.append(element);
  }

  // Добавить карточку в начало списка
  addItemHead(element) {
    this._container.prepend(element);
  }
}