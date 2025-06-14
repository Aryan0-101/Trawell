// Navigation System - Handles page switching and routing
class Navigation {
    constructor() {
        this.currentPage = 'home';
        this.setupGlobalFunctions();
    }
    
    // Make functions available globally for HTML onclick attributes
    setupGlobalFunctions() {
        window.showPage = (pageId) => this.showPage(pageId);
        window.goBackToDestination = () => this.goBackToDestination();
    }
    
    showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.add('hidden'));
        
        // Show selected page with animation
        const targetPage = document.getElementById(pageId + '-page');
        if (targetPage) {
            targetPage.classList.remove('hidden');
            this.currentPage = pageId;
            
            // Add smooth animation
            targetPage.style.opacity = '0';
            targetPage.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                targetPage.style.transition = 'all 0.5s ease';
                targetPage.style.opacity = '1';
                targetPage.style.transform = 'translateY(0)';
            }, 10);
        }
        
        // Update cart display if showing cart page
        if (pageId === 'cart') {
            window.cartManager.updateCartDisplay();
        }
        
        console.log(`📱 Navigated to: ${pageId}`);
    }
    
    goBackToDestination() {
        this.showPage('destination');
    }
    
    getCurrentPage() {
        return this.currentPage;
    }
}
