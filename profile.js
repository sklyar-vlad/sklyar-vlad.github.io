/* Данные из резюме. Меняй тексты и ссылки здесь. HTML не поддерживается. */
window.PORTFOLIO = {
  name: 'Владислав Скляренко',
  about: 'Backend-разработчик с коммерческим опытом на Python и fullstack пет-проектами на Go — от архитектуры до production-деплоя. Интересны задачи на стыке backend, инфраструктуры и проектирования систем: микросервисы, высокие нагрузки, event-driven архитектура и работа с данными.',
  interests: 'Рассматриваю направления Python / Go / DevOps в зависимости от команды и задач.',
  education: 'ГУАП · Прикладная информатика в информационной сфере · Бакалавриат, 2024–2028',
  projects: [
    { name: 'SelfDev', period: 'июнь 2026 — настоящее время', description: 'Персональный трекер привычек с геймификацией. Полный цикл: от проектирования архитектуры до production-деплоя.', details: ['REST API на Go по Clean Architecture, dependency injection через интерфейсы.', 'Casdoor и OAuth2/OIDC, сессии в Redis. PostgreSQL, pgx/v5 и миграции Goose.', 'Multi-stage Docker builds, Traefik с автоматическим SSL, Taskfile и логирование через zap.'], stack: 'Go / PostgreSQL / Redis / Docker / Traefik', links: [{ label: 'исходный код', url: 'https://github.com/sklyar-vlad/selfdev' }, { label: 'self-dev.tech', url: 'https://self-dev.tech' }] },
    { name: 'StackBridge Subscription API', period: 'август 2026 · тестовое задание', description: 'REST API для агрегации подписок и расчёта их стоимости за выбранный период.', details: ['Go, Gin и Clean Architecture. Расчёт пересечения интервалов дат через CTE в PostgreSQL.', 'Unit-тесты: testify и minimock. Интеграционные тесты с изоляцией БД через testcontainers-go.', 'Docker Compose, Swagger/OpenAPI и автоматизация через Taskfile.'], stack: 'Go / Gin / PostgreSQL / testcontainers-go', links: [{ label: 'исходный код', url: 'https://github.com/sklyar-vlad/test-stackbridge' }] },
    { name: 'Meeting Room Booking Service', period: 'апрель 2026 · тестовое задание', description: 'Backend-сервис бронирования переговорных комнат с REST API и хранением данных в PostgreSQL.', details: ['Динамические временные слоты и защита от конфликтов бронирования.', 'JWT-аутентификация, ролевая модель доступа и SQL-миграции через Goose.', 'Unit/e2e тесты и нагрузочное тестирование.'], stack: 'Go / PostgreSQL / JWT / Goose', links: [] }
  ],
  experience: { company: 'ООО «Байты бизнесу»', role: 'Backend-разработчик', period: 'февраль — август 2025', details: ['Backend-сервисы и REST API для внутренних B2B-продуктов на Python: FastAPI и Django.', 'Бизнес-логика, структура БД, миграции Alembic и рефакторинг схем.', 'Docker и Docker Compose для воспроизводимых окружений.', 'Code review, ruff, pre-commit. Работа в команде по Kanban: декомпозиция, оценка сроков, демо.'] },
  skills: [
    ['Языки', 'Python (коммерческий опыт), Go, SQL, JavaScript/TypeScript (Vue.js)'],
    ['Backend', 'FastAPI, Django, Gin, REST API, Clean Architecture, OAuth2/OIDC, JWT, Swagger/OpenAPI'],
    ['Данные', 'PostgreSQL, pgx/v5, SQLAlchemy, Redis, Goose, Alembic'],
    ['DevOps', 'Docker, Docker Compose, Traefik, GitHub Actions, GHCR, Linux, Nginx'],
    ['Тестирование', 'pytest, testify, minimock, testcontainers-go, e2e, нагрузочные тесты'],
    ['Инструменты', 'Git, Taskfile, golangci-lint, ruff, black, mypy, zap'],
    ['Изучаю', 'Kafka, gRPC · интересны распределённые системы, Kubernetes и мониторинг']
  ],
  contacts: [
    { label: 'Telegram', value: '@sklyarvlad', url: 'https://t.me/sklyarvlad' },
    { label: 'Email', value: 'sklyarvladislavtl@gmail.com', url: 'mailto:sklyarvladislavtl@gmail.com' },
    { label: 'GitHub', value: 'sklyar-vlad', url: 'https://github.com/sklyar-vlad' }
  ]
};
