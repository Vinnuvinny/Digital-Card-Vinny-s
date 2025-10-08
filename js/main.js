// Digital Visiting Card - Main JavaScript
class DigitalCard {
    constructor() {
        this.init();
        this.bindEvents();
        this.loadUserData();
        this.animateSkills();
    }

    init() {
        // Initialize theme
        this.theme = localStorage.getItem('theme') || 'light';
        this.setTheme(this.theme);
        
        // Initialize components
        this.setupToast();
        this.setupLoadingSpinner();
        this.setupIntersectionObserver();
    }

    bindEvents() {
        // Theme toggle
        document.getElementById('theme-btn').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const field = e.target.closest('[data-copy]').getAttribute('data-copy');
                this.copyToClipboard(field);
            });
        });

        // Action buttons
        document.getElementById('download-vcard').addEventListener('click', () => {
            this.downloadVCard();
        });

        document.getElementById('share-card').addEventListener('click', () => {
            this.shareCard();
        });

        document.getElementById('send-message').addEventListener('click', () => {
            this.toggleMessageForm();
        });

        document.getElementById('cancel-message').addEventListener('click', () => {
            this.toggleMessageForm();
        });

        // Contact form
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            this.handleContactForm(e);
        });

        // Admin login
        document.getElementById('admin-login-btn').addEventListener('click', () => {
            this.showAdminLogin();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Profile image click
        document.querySelector('.profile-image').addEventListener('click', () => {
            if (this.isAdminMode) {
                this.changeProfileImage();
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = document.querySelector('#theme-btn i');
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
        
        localStorage.setItem('theme', theme);
        this.theme = theme;
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        this.showToast('Theme changed successfully!', 'success');
    }

    copyToClipboard(field) {
        const element = document.getElementById(field);
        let text = '';
        
        if (element.tagName === 'A') {
            text = element.href;
        } else {
            text = element.textContent;
        }
        
        navigator.clipboard.writeText(text).then(() => {
            this.showToast(`${field.charAt(0).toUpperCase() + field.slice(1)} copied to clipboard!`, 'success');
            
            // Visual feedback
            const copyBtn = document.querySelector(`[data-copy="${field}"] .copy-btn`);
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.background = '#10b981';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.style.background = '';
            }, 1000);
        }).catch(() => {
            this.showToast('Failed to copy to clipboard', 'error');
        });
    }

    downloadVCard() {
        const userData = this.getUserData();
        const vCardData = this.generateVCard(userData);
        
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = `${userData.name.replace(/\s+/g, '_')}_contact.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(url);
        this.showToast('vCard downloaded successfully!', 'success');
    }

    generateVCard(data) {
        return `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
TITLE:${data.title}
EMAIL:${data.email}
TEL:${data.phone}
ADR:;;${data.location};;;
URL:${data.website}
NOTE:${data.bio}
END:VCARD`;
    }

    shareCard() {
        if (navigator.share) {
            navigator.share({
                title: `${document.getElementById('name').textContent}'s Digital Card`,
                text: document.getElementById('bio').textContent,
                url: window.location.href
            }).then(() => {
                this.showToast('Card shared successfully!', 'success');
            }).catch(() => {
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            this.showToast('Card URL copied to clipboard!', 'success');
        }).catch(() => {
            this.showToast('Unable to share card', 'error');
        });
    }

    toggleMessageForm() {
        const messageSection = document.getElementById('message-section');
        const isVisible = messageSection.style.display !== 'none';
        
        if (isVisible) {
            messageSection.style.display = 'none';
            this.resetContactForm();
        } else {
            messageSection.style.display = 'block';
            messageSection.scrollIntoView({ behavior: 'smooth' });
            document.getElementById('sender-name').focus();
        }
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateContactForm(data)) {
            return;
        }
        
        this.showLoadingSpinner(true);
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showLoadingSpinner(false);
            this.showToast('Message sent successfully!', 'success');
            this.resetContactForm();
            this.toggleMessageForm();
        }, 2000);
    }

    validateContactForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.senderName.trim()) {
            this.showToast('Please enter your name', 'error');
            return false;
        }
        
        if (!emailRegex.test(data.senderEmail)) {
            this.showToast('Please enter a valid email address', 'error');
            return false;
        }
        
        if (!data.message.trim()) {
            this.showToast('Please enter a message', 'error');
            return false;
        }
        
        return true;
    }

    resetContactForm() {
        document.getElementById('contact-form').reset();
    }

    animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = progress + '%';
                }
            });
        });
        
        skillBars.forEach(bar => observer.observe(bar));
    }

    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => observer.observe(section));
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const icon = toast.querySelector('.toast-icon');
        const messageEl = toast.querySelector('.toast-message');
        
        // Set icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };
        
        icon.className = `toast-icon ${icons[type]}`;
        messageEl.textContent = message;
        toast.className = `toast ${type} show`;
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    showLoadingSpinner(show) {
        const spinner = document.getElementById('loading-spinner');
        spinner.className = show ? 'loading-spinner show' : 'loading-spinner';
    }

    setupToast() {
        // Add click to dismiss
        document.getElementById('toast').addEventListener('click', () => {
            document.getElementById('toast').className = 'toast';
        });
    }

    setupLoadingSpinner() {
        // Setup loading spinner if needed
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + D: Download vCard
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            this.downloadVCard();
        }
        
        // Ctrl/Cmd + Shift + S: Share card
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            this.shareCard();
        }
        
        // Ctrl/Cmd + M: Toggle message form
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            this.toggleMessageForm();
        }
        
        // Ctrl/Cmd + T: Toggle theme
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            this.toggleTheme();
        }
        
        // Escape: Close forms/modals
        if (e.key === 'Escape') {
            const messageSection = document.getElementById('message-section');
            if (messageSection.style.display !== 'none') {
                this.toggleMessageForm();
            }
        }
    }

    loadUserData() {
        // Load user data from localStorage or API
        const savedData = localStorage.getItem('userCardData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.updateCardData(data);
        }
    }

    getUserData() {
        return {
            name: document.getElementById('name').textContent,
            title: document.getElementById('title').textContent,
            bio: document.getElementById('bio').textContent,
            email: document.getElementById('email').textContent,
            phone: document.getElementById('phone').textContent,
            location: document.getElementById('location').textContent,
            website: document.getElementById('website').textContent,
            linkedin: document.getElementById('linkedin-link').href,
            twitter: document.getElementById('twitter-link').href,
            github: document.getElementById('github-link').href,
            instagram: document.getElementById('instagram-link').href
        };
    }

    updateCardData(data) {
        // Update DOM elements with new data
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.tagName === 'A') {
                    element.href = data[key];
                } else if (element.tagName === 'IMG') {
                    element.src = data[key];
                } else {
                    element.textContent = data[key];
                }
            }
        });
        
        // Save to localStorage
        localStorage.setItem('userCardData', JSON.stringify(data));
    }

    showAdminLogin() {
        // This will be handled by admin.js
        window.dispatchEvent(new CustomEvent('showAdminLogin'));
    }

    changeProfileImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('profile-img').src = e.target.result;
                    this.showToast('Profile image updated!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
        
        input.click();
    }

    // Animation utilities
    animateElement(element, animation, duration = 1000) {
        return new Promise((resolve) => {
            element.style.animation = `${animation} ${duration}ms ease forwards`;
            setTimeout(resolve, duration);
        });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Service Worker Registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize the digital card when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.digitalCard = new DigitalCard();
});

// Handle online/offline status
window.addEventListener('online', () => {
    window.digitalCard?.showToast('You are back online!', 'success');
});

window.addEventListener('offline', () => {
    window.digitalCard?.showToast('You are offline. Some features may not work.', 'info');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh data when page becomes visible
        window.digitalCard?.loadUserData();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DigitalCard;
}