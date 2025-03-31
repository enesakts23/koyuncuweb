document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');
        
        try {
            const response = await fetch('php/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Başarılı giriş
                window.location.href = 'main.html';
            } else {
                // Hata mesajını göster
                errorMessage.textContent = data.message;
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            errorMessage.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
            errorMessage.style.display = 'block';
        }
    });

    // Add input focus effects
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}); 