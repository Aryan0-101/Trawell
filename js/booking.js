// Booking Process - Handles checkout and booking confirmation
class Booking {
    constructor() {
        this.setupGlobalFunctions();
    }
    
    setupGlobalFunctions() {
        window.proceedToCheckout = () => this.proceedToCheckout();
    }
    
    proceedToCheckout() {
        const cartData = window.cartManager.getCartData();
        
        if (cartData.items.length === 0) {
            alert('Your cart is empty! Please add some items first.');
            return;
        }
        
        const destinationNames = cartData.destinations.map(d => 
            d.charAt(0).toUpperCase() + d.slice(1)
        );
        
        const confirmation = confirm(
            `Ready to book your amazing journey?\n\n` +
            `Destinations: ${destinationNames.join(', ')}\n` +
            `Total Items: ${cartData.items.length}\n` +
            `Total Amount: ₹${cartData.total.toLocaleString()}\n\n` +
            `Click OK to proceed to booking!`
        );
        
        if (confirmation) {
            this.simulateBooking(cartData);
        }
    }
    
    simulateBooking(cartData) {
        const checkoutButton = document.querySelector('.checkout-button');
        if (!checkoutButton) return;
        
        const originalText = checkoutButton.textContent;
        
        // Step 1: Processing Payment
        checkoutButton.textContent = 'Processing Payment...';
        checkoutButton.style.background = '#ffc107';
        checkoutButton.disabled = true;
        
        console.log('💳 Processing payment...');
        
        setTimeout(() => {
            // Step 2: Booking Confirmed
            checkoutButton.textContent = '✅ Booking Confirmed!';
            checkoutButton.style.background = '#28a745';
            
            console.log('✅ Booking confirmed!');
            
            setTimeout(() => {
                // Step 3: Show success message and reset
                this.showBookingSuccess(cartData);
                
                // Reset everything
                window.cartManager.clearCart();
                checkoutButton.textContent = originalText;
                checkoutButton.style.background = '';
                checkoutButton.disabled = false;
                
                // Navigate back to home
                window.navigationManager.showPage('home');
                
            }, 2000);
        }, 2000);
    }
    
    showBookingSuccess(cartData) {
        const destinationNames = cartData.destinations.map(d => 
            d.charAt(0).toUpperCase() + d.slice(1)
        );
        
        const message = 
            `🎉 Congratulations! Your travel booking is confirmed.\n\n` +
            `Booking Details:\n` +
            `• Destinations: ${destinationNames.join(', ')}\n` +
            `• Total Items: ${cartData.items.length}\n` +
            `• Total Amount: ₹${cartData.total.toLocaleString()}\n\n` +
            `Booking confirmation has been sent to your email.\n` +
            `Have an amazing journey! 🌟`;
        
        alert(message);
        
        console.log('📧 Booking confirmation sent');
    }
    
    // Future: Add real payment integration
    processRealPayment(cartData) {
        // This would integrate with payment gateways like Razorpay, Stripe, etc.
        console.log('🔄 Real payment processing would happen here');
        return Promise.resolve({ success: true, transactionId: 'TXN' + Date.now() });
    }
    
    // Future: Add booking history
    saveBookingHistory(cartData) {
        // This would save to database or localStorage
        const booking = {
            id: 'BK' + Date.now(),
            date: new Date().toISOString(),
            items: cartData.items,
            total: cartData.total,
            destinations: cartData.destinations,
            status: 'confirmed'
        };
        
        console.log('💾 Booking saved to history:', booking);
        return booking;
    }
}
