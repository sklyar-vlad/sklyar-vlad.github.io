(() => {
  'use strict';
  const profile = window.PORTFOLIO;
  const output = document.querySelector('#output');
  const form = document.querySelector('#command-form');
  const input = document.querySelector('#command-input');
  const terminalBody = document.querySelector('#terminal-body');
  const history = [];
  let historyIndex = 0;
  let draft = '';
  const help = [ ['about', 'обо мне и образовании'], ['clear', 'очистить терминал'], ['echo', 'напечатать текст: echo привет'], ['email', 'написать мне письмо'], ['experience', 'коммерческий опыт'], ['help', 'список доступных команд'], ['history', 'история команд'], ['projects', 'проекты, которые я написал'], ['pwd', 'текущая директория'], ['skills', 'технологии и инструменты'], ['socials', 'контакты и социальные сети'], ['themes', 'доступные темы оформления'], ['welcome', 'показать приветствие'], ['whoami', 'текущий пользователь'], ['all', 'показать портфолио целиком'] ];
  const aliases = { ls: 'projects', stack: 'skills', contacts: 'contact', socials: 'contact', cls: 'clear', '?': 'help', gui: 'all' };
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
    welcome() { return document.querySelector('#welcome-template').content.cloneNode(true); },
    help() { const s = node('div'); const dl = node('dl', undefined, 'help-list'); help.forEach(([command, description]) => { const dt = node('dt'); const button = node('button', command, 'inline-command'); button.type = 'button'; button.dataset.command = command; dt.append(button); dl.append(dt, node('dd', description)); }); s.append(dl); return s; }
  };
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#121a27' : '#f3f7fb';
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Storage can be disabled. */ }
  }
  function switchTheme() { setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); }
  function commandLine(text) {
    const p = node('p', undefined, 'command-line');
    const token = text.trimStart().split(/\s+/)[0];
    p.append(node('span', 'visitor', 'prompt-user'), node('span', '@'), node('span', 'sklyarvlad', 'prompt-host'), node('span', ' ~/portfolio', 'prompt-path'), node('span', '> ', 'prompt-sign'), node('span', text, [...commands, ...Object.keys(aliases), 'theme'].includes(token) ? 'valid-command' : 'error'));
    return p;
  }
  function trimOutput() { while (output.children.length > 50) output.firstElementChild.remove(); }
  function updateInput() {
    const token = input.value.trim().split(/\s+/)[0];
    input.dataset.valid = token ? String([...commands, ...Object.keys(aliases), 'theme'].includes(token)) : '';
  }
  // Shell-style words: preserve case, quoted whitespace, escapes and comments.
  function shellWords(line) {
    const words = [];
    let word = '', quote = '', started = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === "'" && quote !== '"') { quote = quote ? '' : "'"; started = true; continue; }
      if (c === '"' && quote !== "'") { quote = quote ? '' : '"'; started = true; continue; }
      if (c === '\\' && quote !== "'") {
        if (i + 1 === line.length) throw new Error('fish: Unexpected end of command after escape');
        const next = line[i + 1];
        if (quote === '"' && !['"', '\\', '$', '\n'].includes(next)) word += c;
        else { word += next; i++; }
        started = true; continue;
      }
      if (!quote && c === '#' && !started) break;
      if (!quote && /\s/.test(c)) { if (started) { words.push(word); word = ''; started = false; } continue; }
      if (!quote && ['|', ';', '&', '<', '>'].includes(c)) throw new Error(`fish: Unsupported operator in portfolio shell: ${c}`);
      word += c; started = true;
    }
    if (quote) throw new Error('fish: Unexpected end of string, quotes are not balanced');
    if (started) words.push(word);
    return words;
  }
  function run(raw, boot = false) {
    const value = raw;
    if (!value.trim()) return;
    if (!boot) history.push(value);
    historyIndex = history.length; draft = ''; input.value = '';
    updateInput();
    let token, args, parseError;
    try { [token, ...args] = shellWords(value); } catch (error) { parseError = error.message; }
    if (!token && !parseError) return;
    const command = Object.hasOwn(aliases, token) ? aliases[token] : token;
    if (!parseError && command === 'clear') { output.replaceChildren(); return; }
    const entry = node('section', undefined, 'entry');
    entry.append(commandLine(value));
    const response = node('div', undefined, 'response');
    if (parseError) response.append(node('p', parseError, 'error'));
    else if (command === 'all') ['about', 'projects', 'experience', 'skills', 'contact'].forEach(key => response.append(render[key]()));
    else if (command === 'echo') response.append(node('p', args.join(' ')));
    else if (command === 'history') response.append(node('pre', history.map((item, index) => `${String(index + 1).padStart(3)}  ${item}`).join('\n'), 'history-output'));
    else if (command === 'pwd') response.append(node('p', '/home/visitor/portfolio'));
    else if (command === 'whoami') response.append(node('p', 'visitor'));
    else if (command === 'email') { const email = profile.contacts.find(c => c.label === 'Email'); response.append(link(email.value, email.url)); }
    else if (command === 'themes') { const p = node('p', 'Доступные темы: '); ['dark', 'light'].forEach(theme => { const b = node('button', `theme ${theme}`, 'inline-command'); b.type = 'button'; b.dataset.command = `theme ${theme}`; p.append(b, document.createTextNode('  ')); }); response.append(p); }
    else if (command === 'theme') {
      if (!args.length) { switchTheme(); response.append(node('p', 'Тема изменена.')); }
      else if (args.length === 1 && ['dark', 'light'].includes(args[0])) { setTheme(args[0]); response.append(node('p', `Тема: ${args[0]}`)); }
      else response.append(node('p', `theme: unknown theme: ${args.join(' ')}`, 'error'));
    }
    else if (Object.hasOwn(render, command)) response.append(render[command]());
    else response.append(node('p', `fish: Unknown command: ${token}`, 'error'));
    entry.append(response); output.append(entry);
    // Bound the DOM while preserving full keyboard history for this visit.
    trimOutput();
    if (!boot) requestAnimationFrame(() => { terminalBody.scrollTop = terminalBody.scrollHeight; });
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-command]');
    if (!button) return;
    run(button.dataset.command);
    // Do not summon the mobile keyboard when using the touch shortcuts.
    if (matchMedia('(pointer: fine)').matches) input.focus({ preventScroll: true });
  });
  form.addEventListener('submit', event => { event.preventDefault(); run(input.value); input.focus({ preventScroll: true }); });
  input.addEventListener('input', updateInput);
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === history.length) draft = input.value;
      historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
      input.value = historyIndex === history.length ? draft : history[historyIndex];
      input.setSelectionRange(input.value.length, input.value.length);
      updateInput();
    }
    if (((event.key === 'Tab' && !event.shiftKey) || (event.ctrlKey && event.key.toLowerCase() === 'i')) && input.value.trim()) {
      const choices = input.value.trim().startsWith('theme ') ? ['theme dark', 'theme light'] : [...commands, ...Object.keys(aliases), 'theme'];
      const matches = choices.filter(command => command.startsWith(input.value.trim()));
      if (!matches.length) return; // Normal Tab navigation remains available.
      event.preventDefault();
      if (matches.length === 1) input.value = matches[0];
      else { let prefix = matches[0]; while (!matches.every(match => match.startsWith(prefix))) prefix = prefix.slice(0, -1); input.value = prefix; }
      updateInput();
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    if (event.key === 'Escape') { input.value = ''; updateInput(); }
  });
  document.addEventListener('keydown', event => { if (event.ctrlKey && event.key.toLowerCase() === 'l' && document.activeElement === input) { event.preventDefault(); output.replaceChildren(); } });
  try { setTheme(localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'); } catch { setTheme('dark'); }
  form.hidden = false;
  run('welcome', true);
  if (matchMedia('(pointer: fine)').matches) input.focus({ preventScroll: true });
  document.querySelector('.terminal').addEventListener('click', event => {
    if (event.target.closest('a, button, input') || window.getSelection()?.toString()) return;
    input.focus({ preventScroll: true });
  });
})();
