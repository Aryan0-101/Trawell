// Utility Functions - Shared helper functions across the app
class Utils {
    // Format currency in Indian Rupees
    static formatCurrency(amount) {
        return `₹${amount.toLocaleString('en-IN')}`;
    }
    
    // Capitalize first letter of a string
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    // Generate unique ID
    static generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }
    
    // Debounce function to limit function calls
    static debounce(func, wait) {
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
    
    // Show toast notification (future enhancement)
    static showToast(message, type = 'info') {
        console.log(`🔔 ${type.toUpperCase()}: ${message}`);
        // Future: Implement actual toast notifications
    }
    
    // Validate email format
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Get URL parameters (for future use with routing)
    static getUrlParams() {
        const params = {};
        const urlParams = new URLSearchParams(window.location.search);
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    }
    
    // Local storage helpers
    static saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }
    
    static getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }
    
    // Animation helpers
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const fadeEffect = setInterval(() => {
            if (!element.style.opacity) {
                element.style.opacity = '0';
            }
            if (parseFloat(element.style.opacity) < 1) {
                element.style.opacity = (parseFloat(element.style.opacity) + 0.1).toString();
            } else {
                clearInterval(fadeEffect);
            }
        }, duration / 10);
    }
    
    static fadeOut(element, duration = 300) {
        const fadeEffect = setInterval(() => {
            if (!element.style.opacity) {
                element.style.opacity = '1';
            }
            if (parseFloat(element.style.opacity) > 0) {
                element.style.opacity = (parseFloat(element.style.opacity) - 0.1).toString();
            } else {
                clearInterval(fadeEffect);
                element.style.display = 'none';
            }
        }, duration / 10);
    }
    
    // Device detection
    static isMobile() {
        return window.innerWidth <= 768;
    }
    
    static isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    }
    
    static isDesktop() {
        return window.innerWidth > 1024;
    }
}

// Make Utils available globally
window.Utils = Utils;
