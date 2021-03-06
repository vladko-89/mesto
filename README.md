# Проект 8: Место

### Обзор

* [Ссылка проекта](https://vladko-89.github.io/mesto/)
* [Автор](Уханов Владислав)

#### Стек технологий
Проект 4:

* Работа реализована по методологии БЭМ nested;
* Адаптивная резиновая верстка;
* Сетка выполнена с использованием Flexbox и Grid layout;
* Реализовано модальное окно, с помощью нативного JS оживлены некоторые элементы верстки и модальное окно

Проект 5:
* При помощи нативного JS расширен функционал страницы:
** Реализована генерация нового элемента из шаблона <template> ;
** Реализован механизм добавления/удаления карточек;
** Оживлен Лайк;
** Добавлены дополнительные формы попапов

Проект 6:
* Реализована верификация форм модальных окон (validate.js);
* Закрытие модальных окон по нажатию Esc и клику в не области тела модального окна

Проект 7:
* Функционал валидации форм и карточки мест переписаны под ООП;

Проект 8:
* Функционал полностью переведен на ООП;
* Настроена сборка проекта с помощью webpack


Проект 9:
* Страница подключена к серверу. 
Back-end предоставлен сторонним разработчиком. 
На стороне фронтенд, написан класс API для подключения и обмена информации с сервером. При загрузке страницы, клиент получает информацию о текущем пользователе (Аватар, имя и род деятельности) и карточки мест загруженных пользователями имеющими доступ к серверу. С карточками приходит информация о количестве лайков конкретной карточки и маркер - лайкнута ли карточка текущим пользователем. 
Реализован функционал - изменение данных пользоватея, Добавление новой карточки - (кнопка +). Удаление карточки - только для карточек добавленных текущим пользователем. При клике на картинку карточки, открывается модальное окно картинки. При изменении текущего состояния элементов, давнные изменяются и на сервере.