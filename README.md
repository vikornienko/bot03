# BOT03

Репозиторий для самостоятельного обучения по написанияю telegram ботов на node.js.

Бот собирает данные по стоимости криптовалют и показывает эти данные пользователю вместе с изменениями цены.

Версия node.js 20.18.0.
Для создания бота в этом репозитории использовались: 
- telegraf библиотека node.js;
- dotenv библиотека для хранения переменных в файле .env.;
- axios для запроса api;
- node-schedule для настройки расписания запросов.

Инициализация проекта: `npm init`.

Установка зависимостей: `npm i telegraf dotenv`.
Для использования модулей в package.json добавить строку `"type": "module",`.

Для старта файла bot.js использовать команду `node bot.js`. 
В данном проекте для учета изменений в файле используется библиотека nodemon.
Установка зависимости для разработки командой `npm i -D nodemon`.
Для старта добавлен скрипт в файл package.json.: `npm start`.
Также добавлен скрипт для дебага.


В репозиторий добавлен пример файла .env.