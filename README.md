Проект "Messenger".

Реализация задания 3 спринта:
деплой: https://67364a484a4be40008a47815--my-messendger.netlify.app/
Доступны страницы: "/" - страница входа, "/messenger" - страница чата, "/sign-up" - cтраница регистрации, "/settings" - настройка профиля
При разработке использовался фреймворк Handelbars и препоцессор SCSS.
Роутинг осуществляется на стороне клиента.
К проекту подключены eslint и stylelint

Доступны следующие возможности: регистрация, вход уже зарегистрированного пользователя, редактирование профиля и пароля, создание чата, поиск и добавление другого пользователя по логину. Владелец чата может его удалить.
Любой пользователь может добавить в чат другого пользователя.

Любой пользователь может удалить себя или другого пользователя не являющегося админом чата из текущего чата. Админ чата может удалить любого пользователя кроме себя из чата , для удаления себя из чата ему нужно воспользоваться опцией удалить чат.

Возможен поиск чата по названию.

Добавлено эканирование символов от XCC атак при вводе сообщений.

команда для сборки: npm run build

команда для дев.разработки: npm run start

запуск преттиера: npm run prettier

запустить линтер: npm run lint

dev-сервер стартует на 3000 порту
