// Управление вкладками
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Убираем активный класс у всех вкладок и контента
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Добавляем активный класс к выбранной вкладке и соответствующему контенту
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Хранилище для ссылок
        let links = JSON.parse(localStorage.getItem('links')) || [];
        
        // Хранилище для тегов
        let tags = new Set();
        
        // Инициализация страницы ссылок
        function initLinksPage() {
            renderLinks();
            updateTagFilter();
        }
        
        // Рендер списка ссылок
        function renderLinks(filterTag = 'all') {
            const linksContainer = document.getElementById('links-list');
            linksContainer.innerHTML = '';
            
            const filteredLinks = filterTag === 'all' 
                ? links 
                : links.filter(link => link.tags.includes(filterTag));
            
            if (filteredLinks.length === 0) {
                linksContainer.innerHTML = '<p>Нет ссылок для отображения. Добавьте первую ссылку!</p>';
                return;
            }
            
            filteredLinks.forEach(link => {
                const linkCard = document.createElement('div');
                linkCard.className = 'link-card';
                linkCard.innerHTML = `
                    <a href="${link.url}" target="_blank">${link.title}</a>
                    <p>${link.description}</p>
                    <div class="link-tags">
                        ${link.tags.map(tag => `<span class="link-tag">${tag}</span>`).join('')}
                    </div>
                `;
                linksContainer.appendChild(linkCard);
            });
        }
        
        // Обновление фильтра по тегам
        function updateTagFilter() {
            const filterContainer = document.getElementById('tags-filter');
            
            // Очищаем все теги, кроме "Все"
            while (filterContainer.children.length > 1) {
                filterContainer.removeChild(filterContainer.lastChild);
            }
            
            // Добавляем теги
            tags.forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.className = 'filter-tag';
                tagElement.textContent = tag;
                tagElement.setAttribute('data-tag', tag);
                
                tagElement.addEventListener('click', () => {
                    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
                    tagElement.classList.add('active');
                    renderLinks(tag);
                });
                
                filterContainer.appendChild(tagElement);
            });
        }
        
        // Добавление новой ссылки
        document.getElementById('add-link-btn').addEventListener('click', () => {
            const title = document.getElementById('link-title').value.trim();
            const url = document.getElementById('link-url').value.trim();
            const description = document.getElementById('link-description').value.trim();
            const tagsInput = document.getElementById('link-tags').value.trim();
            
            if (!title || !url) {
                alert('Название и URL обязательны для заполнения');
                return;
            }
            
            const linkTags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
            
            const newLink = {
                id: Date.now(),
                title,
                url: !url.startsWith('http') ? `https://${url}` : url,
                description,
                tags: linkTags
            };
            
            links.push(newLink);
            linkTags.forEach(tag => tags.add(tag));
            
            // Сохраняем в localStorage
            localStorage.setItem('links', JSON.stringify(links));
            
            // Очищаем форму
            document.getElementById('link-title').value = '';
            document.getElementById('link-url').value = '';
            document.getElementById('link-description').value = '';
            document.getElementById('link-tags').value = '';
            
            // Обновляем отображение
            renderLinks();
            updateTagFilter();
        });
        
        // Инициализация фильтра по тегам
        document.querySelector('.filter-tag[data-tag="all"]').addEventListener('click', () => {
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            document.querySelector('.filter-tag[data-tag="all"]').classList.add('active');
            renderLinks('all');
        });
        
        // Загружаем теги из существующих ссылок
        links.forEach(link => {
            link.tags.forEach(tag => tags.add(tag));
        });
        
        // Инициализируем страницу ссылок при загрузке
        if (document.getElementById('links').classList.contains('active')) {
            initLinksPage();
        }
        
        // Переключение на вкладку ссылок инициализирует её
        document.querySelector('.tab[data-tab="links"]').addEventListener('click', initLinksPage);
        
        // Функция для добавления новой вкладки (пример)
        function addNewTab(tabName, tabContent) {
            const tabsContainer = document.querySelector('.tabs');
            
            // Создаем новую вкладку
            const newTab = document.createElement('div');
            newTab.className = 'tab';
            newTab.textContent = tabName;
            newTab.setAttribute('data-tab', tabName.toLowerCase().replace(/\s+/g, '-'));
            
            // Создаем контент для новой вкладки
            const newTabContent = document.createElement('div');
            newTabContent.className = 'tab-content';
            newTabContent.id = tabName.toLowerCase().replace(/\s+/g, '-');
            newTabContent.innerHTML = tabContent || `<h2>${tabName}</h2><p>Содержимое вкладки.</p>`;
            
            // Добавляем в DOM
            tabsContainer.appendChild(newTab);
            document.querySelector('.container').appendChild(newTabContent);
            
            // Добавляем обработчик события
            newTab.addEventListener('click', function() {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                newTabContent.classList.add('active');
            });
        }
        
        // Пример добавления новой вкладки (можно удалить)
        // addNewTab('Новая вкладка', '<h2>Моя новая вкладка</h2><p>Здесь может быть любой контент.</p>');