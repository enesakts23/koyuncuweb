document.addEventListener('DOMContentLoaded', function() {
    // Örnek veriler (gerçek uygulamada bu veriler API'den gelecektir)
    const mockData = {
        orders: {
            total: 125,
            delivered: 98,
            inTransit: 15,
            cancelled: 12
        },
        finance: {
            monthlyRevenue: 42500,
            expenses: 15300,
            netProfit: 27200,
            lastMonthRevenue: 38000,
            lastMonthExpenses: 14500,
            lastMonthProfit: 23500,
            revenueGrowth: 12,
            expenseGrowth: 5,
            profitGrowth: 15
        }
    };

    // Para birimi formatı (USD)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    // Sipariş istatistiklerini güncelle
    document.getElementById('totalOrders').textContent = mockData.orders.total;
    document.getElementById('deliveredOrders').textContent = mockData.orders.delivered;
    document.getElementById('inTransitOrders').textContent = mockData.orders.inTransit;
    document.getElementById('cancelledOrders').textContent = mockData.orders.cancelled;

    // Finansal metrikleri güncelle
    document.getElementById('monthlyRevenue').textContent = formatter.format(mockData.finance.monthlyRevenue);
    document.getElementById('expenses').textContent = formatter.format(mockData.finance.expenses);
    document.getElementById('netProfit').textContent = formatter.format(mockData.finance.netProfit);

    // Hızlı işlem butonlarına tıklama olayları
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('h3').textContent;
            handleQuickAction(action);
        });
    });

    // Finansal özet modalını oluştur
    createFinancialSummaryModal();

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

// Hızlı işlem yönlendirmeleri
function handleQuickAction(action) {
    switch(action) {
        case 'Yeni Sipariş':
            // Ana içeriği create-order.html ile değiştir
            fetch('pages/create-order.html')
                .then(response => response.text())
                .then(content => {
                    document.querySelector('.main-content').innerHTML = content;
                    // URL'i güncelle
                    history.pushState(null, '', '#/create-order');
                    // Aktif menü öğesini güncelle
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                        if(item.getAttribute('data-page') === 'create-order') {
                            item.classList.add('active');
                        }
                    });
                })
                .catch(error => console.error('Error:', error));
            break;
        case 'Raporlar':
            showFinancialSummary();
            break;
        default:
            console.log(`${action} işlemi henüz tanımlanmamış`);
    }
}

// Finansal özet modalını oluştur
function createFinancialSummaryModal() {
    if (document.querySelector('.financial-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'financial-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Finansal Özet</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="summary-grid">
                    <div class="summary-card">
                        <h3>Sipariş İstatistikleri</h3>
                        <div class="stat-item">
                            <span>Toplam Sipariş:</span>
                            <span id="modalTotalOrders">125</span>
                        </div>
                        <div class="stat-item">
                            <span>Tamamlanan:</span>
                            <span id="modalCompletedOrders">98</span>
                        </div>
                        <div class="stat-item">
                            <span>İşlemde:</span>
                            <span id="modalInProcessOrders">15</span>
                        </div>
                    </div>
                    <div class="summary-card">
                        <h3>Finansal Durum</h3>
                        <div class="stat-item">
                            <span>Aylık Ciro:</span>
                            <span id="modalRevenue">$42,500</span>
                        </div>
                        <div class="stat-item">
                            <span>Giderler:</span>
                            <span id="modalExpenses">$15,300</span>
                        </div>
                        <div class="stat-item">
                            <span>Net Kar:</span>
                            <span id="modalProfit">$27,200</span>
                        </div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="revenueChart"></canvas>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Modal kapatma olayını ekle
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Modal dışına tıklanınca kapat
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Finansal özeti göster
function showFinancialSummary() {
    let modal = document.querySelector('.financial-modal');
    if (!modal) {
        createFinancialSummaryModal();
        modal = document.querySelector('.financial-modal');
    }
    modal.style.display = 'flex';

    // Grafik oluştur
    const ctx = document.getElementById('revenueChart').getContext('2d');
    if (window.revenueChart) {
        window.revenueChart.destroy();
    }
    window.revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
            datasets: [{
                label: 'Gelir',
                data: [30000, 35000, 38000, 40000, 42500, 45000],
                borderColor: '#3bd03c',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(59, 208, 60, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Aylık Gelir Grafiği'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Tema değişikliğinde stilleri güncelle
function updateThemeStyles(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.style.setProperty('--card-shadow', '0 8px 16px rgba(0, 0, 0, 0.3)');
    } else {
        root.style.setProperty('--card-shadow', '0 8px 16px rgba(0, 0, 0, 0.1)');
    }
} 