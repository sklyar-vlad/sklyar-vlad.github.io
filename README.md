# terminal portfolio

Портфолио Владислава Скляренко в виде интерактивного терминала. HTML, CSS, JavaScript без зависимостей, сборки, внешних шрифтов и запросов к API.

## Посмотреть

Открой `index.html` в браузере или запусти из этой папки:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Открой http://localhost:8080.

## Команды

`about`, `projects`, `experience`, `skills`, `contact`, `all`, `help`, `clear`, `theme`.

Алиасы: `whoami`, `ls`, `stack`, `contacts`, `cls`, `?`. Стрелки ↑/↓ переключают историю, Tab дополняет команду, Escape очищает ввод, Ctrl+L очищает ответы, когда фокус находится в поле ввода. Команды доступны кнопками на телефоне. Есть светлая тема и текстовая версия без JavaScript. История команд хранится только до перезагрузки страницы.

## Изменить данные

`profile.js` — тексты, проекты, навыки и контакты. Данные выводятся как текст, HTML не исполняется.

Имя, краткое представление и ссылки на первом экране также находятся в `index.html`. После изменения основных данных обнови текстовую версию внутри `<noscript>`. Палитра и размеры — CSS-переменные в `style.css`.

Контент взят из предоставленного резюме. Оригинальный PDF и номер телефона не включены. Ссылки на репозитории SelfDev и StackBridge подтверждены локальными git remote; ссылка на репозиторий Booking не добавлена, потому что не подтверждена.

## GitHub Pages

Для адреса `https://sklyar-vlad.github.io` создай на GitHub публичный репозиторий `sklyar-vlad.github.io`. Если он уже существует, сначала проверь его содержимое, чтобы не заменить другой сайт.

Загрузи в корень репозитория `index.html`, `style.css`, `profile.js`, `app.js`, `favicon.svg` и `.nojekyll`.

В репозитории выбери **Settings → Pages → Build and deployment → Source: Deploy from a branch → main → / (root) → Save**.

Для публикации из локального Git, после создания пустого репозитория:

```sh
git init -b main
git add index.html style.css profile.js app.js favicon.svg .nojekyll README.md .gitignore
git commit -m "Build terminal portfolio"
git remote add origin git@github.com:sklyar-vlad/sklyar-vlad.github.io.git
git push -u origin main
```

Относительные пути также позволяют разместить страницу в репозитории с другим названием по адресу `https://sklyar-vlad.github.io/имя-репозитория/`.

Документация: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
