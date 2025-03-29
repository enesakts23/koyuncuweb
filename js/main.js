document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const logoutBtn = document.getElementById('logout-btn');
    const navItems = document.querySelectorAll('.nav-item');
    let isSidebarCollapsed = false;
    let currentPageScript = null;
    let currentPageStyle = null;

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    function loadPageResources(pageName) {
        if (currentPageStyle) {
            document.head.removeChild(currentPageStyle);
        }
        if (currentPageScript) {
            document.body.removeChild(currentPageScript);
        }

        currentPageStyle = document.createElement('link');
        currentPageStyle.rel = 'stylesheet';
        currentPageStyle.href = `css/${pageName}.css`;
        document.head.appendChild(currentPageStyle);

        currentPageScript = document.createElement('script');
        currentPageScript.src = `js/${pageName}.js`;
        document.body.appendChild(currentPageScript);
    }

    async function loadPage(pageName) {
        try {
            const response = await fetch(`pages/${pageName}.html`);
            const content = await response.text();
            mainContent.innerHTML = content;
            loadPageResources(pageName);
        } catch (error) {
            console.error('Error loading page:', error);
            mainContent.innerHTML = '<div class="page-content"><h1>Sayfa yüklenemedi</h1></div>';
        }
    }

    loadPage('home');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });

    sidebarToggle.addEventListener('click', function() {
        isSidebarCollapsed = !isSidebarCollapsed;
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        sidebarToggle.style.transform = isSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0)';
    });

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.classList.toggle('dark');
        if (newTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('theme');
        window.location.href = './login.html';
    });
}); 