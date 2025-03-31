document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Phone number formatting
    const telefonInput = document.getElementById('telefon');
    telefonInput.addEventListener('input', function(e) {
        let number = e.target.value.replace(/[^\d]/g, '');
        if (number.length > 11) number = number.slice(0, 11);
        
        if (number.length > 0) {
            if (number.length <= 3) {
                number = number;
            } else if (number.length <= 6) {
                number = number.slice(0, 3) + ' ' + number.slice(3);
            } else if (number.length <= 8) {
                number = number.slice(0, 3) + ' ' + number.slice(3, 6) + ' ' + number.slice(6);
            } else {
                number = number.slice(0, 3) + ' ' + number.slice(3, 6) + ' ' + 
                        number.slice(6, 8) + ' ' + number.slice(8);
            }
        }
        e.target.value = number;
    });

    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset messages
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';

        // Get form data
        const formData = {
            adSoyad: document.getElementById('adSoyad').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefon: document.getElementById('telefon').value.trim(),
            sifre: document.getElementById('sifre').value,
            sifreTekrar: document.getElementById('sifreTekrar').value
        };

        // Basic validations
        if (!formData.adSoyad || !formData.email || !formData.telefon || !formData.sifre || !formData.sifreTekrar) {
            errorMessage.textContent = 'Lütfen tüm alanları doldurunuz.';
            errorMessage.style.display = 'block';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errorMessage.textContent = 'Geçerli bir email adresi giriniz.';
            errorMessage.style.display = 'block';
            return;
        }

        // Password match validation
        if (formData.sifre !== formData.sifreTekrar) {
            errorMessage.textContent = 'Şifreler eşleşmiyor.';
            errorMessage.style.display = 'block';
            return;
        }

        try {
            const response = await fetch('php/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                successMessage.textContent = data.message;
                successMessage.style.display = 'block';
                registerForm.reset();
                
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
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