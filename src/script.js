document.addEventListener('DOMContentLoaded', () => {
  const tpl = document.getElementById("page-template");
  const content = document.getElementById("content");
  const nav = document.querySelector("nav");
  const button = document.getElementById("print");

  button?.addEventListener("click", () => {
    window.print();

  });

  // content.append(tpl.content.cloneNode(true));

  const pages = {
    home: {
      title: "Главная",
      html: "<p>Привет!</p> <p>Главная страница.</p>",
    },
    sheet: {
      title: "Лист персонажа",
      html: "<p>Информация о персонаже.</p>",
    },
    // можно добавлять новые: key: { title: 'Название', file: 'src/pages/new.html' }
  };

  // === Генерация навигации ===
  nav.innerHTML = Object.keys(pages)
    .map((key) => `<a href="#" data-page="${key}">${pages[key].title}</a>`)
    .join("");

  // === Функция рендеринга страницы ===
  function render(key) {
    const p = pages[key];
    if (!p) return;

    // Очищаем контент
    content.innerHTML = "";

    // Клонируем шаблон
    const node = tpl.content.cloneNode(true);

    // Заполняем данные
    node.querySelector(".page-title").textContent = p.title;
    node.querySelector(".page-body").innerHTML = p.html;

    // Вставляем в DOM
    content.appendChild(node);
  }

  render("home");

  nav.addEventListener("click", (e) => {
    console.log(e.type, e);
    const a = e.target.closest("a");
    if (!a || !nav.contains(a)) return;
    e.preventDefault();
    render(a.dataset.page);
  });
});
