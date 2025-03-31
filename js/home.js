document.addEventListener('DOMContentLoaded', function() {
    // Örnek veriler (gerçek uygulamada bu veriler API'den gelecektir)
    const mockData = {
        revenue: 125000.50,
        expenses: 45000.75,
        profit: 80000.25
    };

    // Para birimi formatı (USD)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    // Metrikleri güncelle
    document.getElementById('totalRevenue').textContent = formatter.format(mockData.revenue);
    document.getElementById('totalExpenses').textContent = formatter.format(mockData.expenses);
    document.getElementById('netProfit').textContent = formatter.format(mockData.profit);

    // Hızlı işlem butonlarına tıklama olayları
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            // Burada ilgili işlem sayfasına yönlendirme yapılabilir
            console.log(`${action} butonuna tıklandı`);
        });
    });

    // Metrik kartlarına hover efekti
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Tema değişikliğini dinle
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const currentTheme = document.body.getAttribute('data-theme');
                updateThemeStyles(currentTheme);
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // İlk yüklemede tema stillerini uygula
    const currentTheme = document.body.getAttribute('data-theme');
    updateThemeStyles(currentTheme);
});

// Tema değişikliğinde stilleri güncelle
function updateThemeStyles(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.style.setProperty('--card-shadow', '0 8px 16px rgba(0, 0, 0, 0.3)');
    } else {
        root.style.setProperty('--card-shadow', '0 8px 16px rgba(0, 0, 0, 0.1)');
    }
} 