document.addEventListener('DOMContentLoaded', () => {
    const tpl = document.getElementById('page-template');
    const content = document.getElementById('content');
    const nav = document.querySelector("nav");

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

    nav.innerHTML = Object.keys(pages)
      .map((key) => `<a href="#" data-page="${key}">${pages[key].title}</a>`)
      .join("");


    function render(key) {
        const p = pages[key];
        if(!p) return;

        content.innerHTML = '';

        const node = tpl.content.cloneNode(true);

        node.querySelector(".page-title").textContent = p.title;
        node.querySelector(".page-body").innerHTML = p.html;
        content.appendChild(node)
    }
    render('home')

    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a || !nav.contains(a)) return;
      e.preventDefault();
      render(a.dataset.page);
    });
});
