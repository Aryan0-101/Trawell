// Cart Management - Handles cart operations and display
class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.setupGlobalFunctions();
    }
    
    setupGlobalFunctions() {
        window.removeFromCart = (itemId) => this.removeItem(itemId);
    }
    
    addItem(item) {
        this.items.push(item);
        this.total += item.price;
        this.updateCartCount();
        
        console.log(`🛒 Item added to cart: ${item.name} - ₹${item.price}`);
    }
    
    removeItem(itemId) {
        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            const removedItem = this.items[itemIndex];
            this.total -= removedItem.price;
            this.items.splice(itemIndex, 1);
            this.updateCartCount();
            this.updateCartDisplay();
            
            console.log(`🗑️ Item removed from cart: ${removedItem.name}`);
        }
    }
    
    updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.items.length;
        }
    }
    
    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        
        if (!cartItems || !cartSummary) return;
        
        if (this.items.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your personalized travel experience will appear here</p>';
            cartSummary.classList.add('hidden');
            return;
        }
        
        // Group items by destination
        const groupedItems = this.groupItemsByDestination();
        
        let cartHTML = '';
        Object.keys(groupedItems).forEach(destination => {
            cartHTML += this.generateDestinationGroup(destination, groupedItems[destination]);
        });
        
        cartItems.innerHTML = cartHTML;
        this.updateCartSummary();
        cartSummary.classList.remove('hidden');
    }
    
    groupItemsByDestination() {
        const grouped = {};
        this.items.forEach(item => {
            if (!grouped[item.destination]) {
                grouped[item.destination] = [];
            }
            grouped[item.destination].push(item);
        });
        return grouped;
    }
    
    generateDestinationGroup(destination, items) {
        const destinationName = destination.charAt(0).toUpperCase() + destination.slice(1);
        
        let itemsHTML = '';
        items.forEach(item => {
            itemsHTML += `
                <div class="cart-item">
                    <div class="item-info">
                        <span class="item-type">${item.type}</span>
                        <h4>${item.name}</h4>
                    </div>
                    <div class="item-price">₹${item.price.toLocaleString()}</div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
        });
        
        return `
            <div class="destination-group">
                <h3>${destinationName} Trip</h3>
                <div class="destination-items">
                    ${itemsHTML}
                </div>
            </div>
        `;
    }
    
    updateCartSummary() {
        const destinations = [...new Set(this.items.map(item => item.destination))];
        const destinationNames = destinations.map(d => d.charAt(0).toUpperCase() + d.slice(1));
        
        const cartDestination = document.getElementById('cart-destination');
        const totalItems = document.getElementById('total-items');
        const totalAmount = document.getElementById('total-amount');
        
        if (cartDestination) cartDestination.textContent = destinationNames.join(', ');
        if (totalItems) totalItems.textContent = this.items.length;
        if (totalAmount) totalAmount.textContent = this.total.toLocaleString();
    }
    
    getCartData() {
        return {
            items: this.items,
            total: this.total,
            destinations: [...new Set(this.items.map(item => item.destination))]
        };
    }
    
    clearCart() {
        this.items = [];
        this.total = 0;
        this.updateCartCount();
        this.updateCartDisplay();
        
        console.log('🧹 Cart cleared');
    }
    
    getItemCount() {
        return this.items.length;
    }
    
    getTotal() {
        return this.total;
    }
}
