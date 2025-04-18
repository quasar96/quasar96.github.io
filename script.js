document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const cards = document.querySelectorAll('.link-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Удаляем активный класс у всех вкладок
            tabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс текущей вкладке
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            
            // Фильтрация карточек
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Открытие ссылки при клике на карточку
    // Открытие ссылок при клике    
    cards.forEach(card => {
        card.style.cursor = 'pointer'; // Меняем курсор
        card.addEventListener('click', () => {
            const url = card.getAttribute('data_URL');
            if (url) {
                window.open(url, '_blank'); 
                // Или для текущей вкладки: window.location.href = url;
            }
        });
    });
});

