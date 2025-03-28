document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const phone = registerForm.querySelector('input[type="tel"]').value;
        const password = registerForm.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = registerForm.querySelectorAll('input[type="password"]')[1].value;
        
        // Basic validation
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }
        
        // Password match validation
        if (password !== confirmPassword) {
            alert('Şifreler eşleşmiyor!');
            return;
        }
        
        // Phone number validation (Turkish format)
        const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            alert('Geçerli bir telefon numarası giriniz!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Geçerli bir email adresi giriniz!');
            return;
        }
        
        // If all validations pass
        console.log('Registration attempt:', {
            fullName,
            email,
            phone,
            password
        });
        
        alert('Kayıt işlemi başarılı!');
        // Here you can add your registration logic
        // After successful registration, redirect to login page
        // window.location.href = 'login.html';
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