(() => {
  'use strict';
  const profile = window.PORTFOLIO;
  const output = document.querySelector('#output');
  const form = document.querySelector('#command-form');
  const input = document.querySelector('#command-input');
  const toggle = document.querySelector('#theme-toggle');
  const history = [];
  let historyIndex = 0;
  let draft = '';
  const help = [ ['about', 'Обо мне и образовании'], ['projects', 'Проекты, архитектура и исходники'], ['experience', 'Коммерческий опыт'], ['skills', 'Технологии и инструменты'], ['contact', 'Способы связаться'], ['all', 'Портфолио целиком'], ['clear', 'Очистить ответы терминала'], ['theme', 'Сменить светлую / тёмную тему'], ['help', 'Список команд'] ];
  const aliases = { whoami: 'about', ls: 'projects', stack: 'skills', contacts: 'contact', cls: 'clear', '?': 'help' };
  const commands = help.map(([command]) => command);
  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function link(label, url) {
    const a = node('a', label);
    // Profile is text-only; reject script URLs even after future data edits.
    if (/^(https:\/\/|mailto:)/i.test(url)) a.href = url;
    if (url.startsWith('https://')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  }
  function list(items) { const ul = node('ul'); items.forEach(text => ul.append(node('li', text))); return ul; }
  function section(title) { const el = node('section', undefined, 'response-section'); el.append(node('h2', title)); return el; }
  const render = {
    about() { const s = section('Обо мне'); s.append(node('p', profile.about), node('p', profile.interests), node('h3', 'Образование'), node('p', profile.education, 'detail')); return s; },
    projects() {
      const s = section('Проекты');
      profile.projects.forEach(project => {
        const article = node('article', undefined, 'project');
        article.append(node('h3', project.name), node('p', project.period, 'detail'), node('p', project.description), list(project.details), node('p', project.stack, 'stack-line'));
        if (project.links.length) { const links = node('div', undefined, 'project-links'); project.links.forEach(item => links.append(link(`${item.label} ↗`, item.url))); article.append(links); }
        s.append(article);
      });
      return s;
    },
    experience() { const s = section('Коммерческий опыт'); const e = profile.experience; s.append(node('h3', `${e.role} · ${e.company}`), node('p', e.period, 'detail'), list(e.details)); return s; },
    skills() { const s = section('Стек'); profile.skills.forEach(([name, value]) => { s.append(node('h3', name), node('p', value)); }); return s; },
    contact() { const s = section('На связи'); const links = node('div', undefined, 'contact-list'); profile.contacts.forEach(c => links.append(link(`${c.label} → ${c.value}`, c.url))); s.append(links); return s; },
    help() { const s = section('Доступные команды'); const dl = node('dl', undefined, 'help-list'); help.forEach(([command, description]) => { const dt = node('dt'); const button = node('button', command, 'inline-command'); button.type = 'button'; button.dataset.command = command; dt.append(button); dl.append(dt, node('dd', description)); }); s.append(dl, node('p', 'Можно также: whoami, ls, stack. Tab — дополнение, ↑/↓ — история.', 'detail')); return s; }
  };
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    toggle.textContent = theme === 'dark' ? 'светлая тема' : 'тёмная тема';
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#141715' : '#e7eae2';
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Storage can be disabled. */ }
  }
  function switchTheme() { setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); }
  function commandLine(text) {
    const p = node('p', undefined, 'command-line');
    p.append(node('span', 'guest', 'prompt-user'), node('span', '@', 'muted'), node('span', 'vlad'), node('span', ':~', 'muted'), node('span', '$', 'prompt-sign'), node('span', text));
    return p;
  }
  function trimOutput() { while (output.children.length > 50) output.firstElementChild.remove(); }
  function run(raw) {
    const value = raw.trim();
    if (!value) return;
    history.push(value); historyIndex = history.length; draft = ''; input.value = '';
    const token = value.toLowerCase();
    const command = aliases[token] || token;
    if (command === 'clear') { output.replaceChildren(); return; }
    const entry = node('section', undefined, 'entry');
    entry.append(commandLine(value));
    const response = node('div', undefined, 'response');
    if (command === 'all') ['about', 'projects', 'experience', 'skills', 'contact'].forEach(key => response.append(render[key]()));
    else if (command === 'theme') { switchTheme(); response.append(node('p', 'Тема изменена.')); }
    else if (Object.hasOwn(render, command)) response.append(render[command]());
    else {
      const p = node('p', `Команда «${value}» не найдена. `, 'error');
      const suggestion = commands.find(c => c.startsWith(token));
      p.append(document.createTextNode(suggestion ? `Попробуй ${suggestion} или help.` : 'Введи help, чтобы посмотреть команды.')); response.append(p);
    }
    entry.append(response); output.append(entry);
    // Bound the DOM while preserving full keyboard history for this visit.
    trimOutput();
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => entry.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' }));
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-command]');
    if (!button) return;
    run(button.dataset.command);
    // Do not summon the mobile keyboard when using the touch shortcuts.
    if (matchMedia('(pointer: fine)').matches) input.focus({ preventScroll: true });
  });
  form.addEventListener('submit', event => { event.preventDefault(); run(input.value); input.focus({ preventScroll: true }); });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === history.length) draft = input.value;
      historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
      input.value = historyIndex === history.length ? draft : history[historyIndex];
      input.setSelectionRange(input.value.length, input.value.length);
    }
    if (event.key === 'Tab' && !event.shiftKey && input.value.trim()) {
      const matches = commands.filter(command => command.startsWith(input.value.trim().toLowerCase()));
      if (!matches.length) return; // Normal Tab navigation remains available.
      event.preventDefault();
      if (matches.length === 1) input.value = matches[0];
      else { let prefix = matches[0]; while (!matches.every(match => match.startsWith(prefix))) prefix = prefix.slice(0, -1); input.value = prefix; const p = node('p', matches.join('   '), 'completion'); output.append(p); trimOutput(); }
    }
    if (event.key === 'Escape') input.value = '';
  });
  document.addEventListener('keydown', event => { if (event.ctrlKey && event.key.toLowerCase() === 'l' && document.activeElement === input) { event.preventDefault(); output.replaceChildren(); } });
  toggle.addEventListener('click', switchTheme);
  try { setTheme(localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'); } catch { setTheme('dark'); }
  const clock = document.querySelector('#clock');
  function tick() { clock.textContent = `${new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date())} MSK`; }
  tick(); setInterval(tick, 60000);
  form.hidden = false;
})();
