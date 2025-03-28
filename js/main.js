document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const logoutBtn = document.getElementById('logout-btn');
    let isSidebarCollapsed = false;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Sidebar toggle
    sidebarToggle.addEventListener('click', function() {
        isSidebarCollapsed = !isSidebarCollapsed;
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        
        // Rotate icon when sidebar is collapsed
        sidebarToggle.style.transform = isSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0)';
    });

    // Theme toggle
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

    // Logout handling
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Burada çıkış işlemleri yapılabilir (örn: localStorage temizleme)
        localStorage.removeItem('theme');
        window.location.href = 'login.html';
    });
}); 