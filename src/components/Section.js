export default class Section {
  constructor({ renderer }, containerSelector) {
    //this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items, userData) {
    items.forEach(item => this._renderer(item, userData))
  }

  //renderItems(items, data) {
  //  items.forEach(item => this._renderer(item, data))
  //}

  // Добавить карточку в конец списка
  addItem(element) {
    this._container.append(element);
  }

  // Добавить карточку в начало списка
  addItemHead(element) {
    this._container.prepend(element);
  }
} 