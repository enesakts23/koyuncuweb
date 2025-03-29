document.addEventListener('DOMContentLoaded', () => {
    // Profile image upload handling
    const profileImageInput = document.getElementById('profile-image-input');
    const profileImage = document.querySelector('.profile-image img');
    const changePhotoBtn = document.querySelector('.change-photo-btn');

    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', () => {
            profileImageInput.click();
        });
    }

    if (profileImageInput) {
        profileImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Form submission handling
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(settingsForm);
            const settings = Object.fromEntries(formData);
            
            // Add toggle states
            const darkMode = document.getElementById('dark-mode').checked;
            const emailNotifications = document.getElementById('email-notifications').checked;
            const smsNotifications = document.getElementById('sms-notifications').checked;
            
            Object.assign(settings, {
                darkMode,
                emailNotifications,
                smsNotifications
            });
            
            // Save settings (you would typically send this to a server)
            console.log('Saving settings:', settings);
            
            // Show success message
            showNotification('Ayarlar başarıyla kaydedildi!', 'success');
        });
    }

    // Cancel button handling
    const cancelBtn = document.querySelector('.btn-cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            // Reset form to initial values
            settingsForm.reset();
            
            // Show cancel message
            showNotification('Değişiklikler iptal edildi.', 'info');
        });
    }

    // Change password handling
    const changePasswordBtn = document.querySelector('.btn-change-password');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            // Here you would typically show a modal or navigate to password change page
            console.log('Change password clicked');
        });
    }

    // Two-factor authentication handling
    const twoFactorBtn = document.querySelector('.btn-two-factor');
    if (twoFactorBtn) {
        twoFactorBtn.addEventListener('click', () => {
            // Here you would typically show 2FA setup modal
            console.log('Two-factor authentication clicked');
        });
    }
});

// Notification helper function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    }
    
    .notification.success {
        background-color: #3bd03c;
    }
    
    .notification.info {
        background-color: #2196F3;
    }
    
    .notification.error {
        background-color: #f44336;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 