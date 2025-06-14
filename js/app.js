// Main App Initialization
// This file starts the application and coordinates all modules

class TrawellApp {
    constructor() {
        // Initialize all modules
        this.navigation = new Navigation();
        this.destinations = new Destinations();
        this.services = new Services();
        this.cart = new Cart();
        this.booking = new Booking();
        
        // Make modules available globally for cross-module communication
        window.navigationManager = this.navigation;
        window.destinationManager = this.destinations;
        window.serviceManager = this.services;
        window.cartManager = this.cart;
        window.bookingManager = this.booking;
        
        this.init();
    }
    
    init() {
        // Initialize the app when page loads
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🚀 Trawell App Initialized Successfully!');
            console.log('📱 Navigation Manager Ready');
            console.log('🌍 Destination Manager Ready');
            console.log('🛍️ Service Manager Ready');
            console.log('🛒 Cart Manager Ready');
            console.log('💳 Booking Manager Ready');
            
            // Start on home page
            this.navigation.showPage('home');
            this.cart.updateCartCount();
            
            // Add global error handling
            this.setupErrorHandling();
        });
    }
    
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('🚨 Global Error:', event.error);
            // In production, you might want to send this to error tracking service
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            console.error('🚨 Unhandled Promise Rejection:', event.reason);
            event.preventDefault();
        });
    }
    
    // Method to get app status
    getStatus() {
        return {
            currentPage: this.navigation.getCurrentPage(),
            currentDestination: this.destinations.getCurrentDestination(),
            cartItems: this.cart.getItemCount(),
            cartTotal: this.cart.getTotal(),
            initialized: true
        };
    }
}

// Start the application
const app = new TrawellApp();

// Make app instance available globally for debugging
window.TrawellApp = app;
