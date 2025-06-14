// Services Management - Handles service selection and booking options
class Services {
    constructor() {
        this.currentService = '';
        this.setupGlobalFunctions();
    }
    
    setupGlobalFunctions() {
        window.selectService = (service) => this.selectService(service);
        window.addFlightToCart = (type) => this.addFlightToCart(type);
        window.addHotelToCart = (type) => this.addHotelToCart(type);
        window.addCabToCart = (type) => this.addCabToCart(type);
        window.addActivityToCart = (name, price) => this.addActivityToCart(name, price);
        window.addTicketToCart = (name, price) => this.addTicketToCart(name, price);
    }
    
    selectService(service) {
        this.currentService = service;
        this.loadServiceContent(service);
        window.navigationManager.showPage('service');
        
        console.log(`🛍️ Selected service: ${service}`);
    }
    
    loadServiceContent(service) {
        const serviceTitle = document.getElementById('service-title');
        const serviceContent = document.getElementById('service-content');
        const currentDestination = window.destinationManager.getCurrentDestination();
        
        const serviceData = {
            'flights': {
                title: 'Book Your Flights',
                content: this.getFlightContent(currentDestination)
            },
            'hotels': {
                title: 'Choose Your Hotel',
                content: this.getHotelContent(currentDestination)
            },
            'cabs': {
                title: 'Book Transportation',
                content: this.getCabContent(currentDestination)
            },
            'activities': {
                title: 'Select Activities',
                content: this.getActivityContent(currentDestination)
            },
            'tickets': {
                title: 'Attraction Tickets',
                content: this.getTicketContent(currentDestination)
            }
        };
        
        const data = serviceData[service];
        if (data) {
            serviceTitle.textContent = data.title;
            serviceContent.innerHTML = data.content;
        }
    }
    
    getFlightContent(destination) {
        const destinationName = destination.charAt(0).toUpperCase() + destination.slice(1);
        return `
            <div class="flight-booking">
                <h3>Flight Options to ${destinationName}</h3>
                <div class="flight-options">
                    <div class="flight-option">
                        <div class="flight-info">
                            <h4>Economy Class</h4>
                            <p>Delhi → ${destinationName}</p>
                            <p>Duration: 2-3 hours • 1 Stop</p>
                        </div>
                        <div class="flight-price">₹8,500</div>
                        <button class="add-to-cart-btn" onclick="addFlightToCart('economy')">Add to Cart</button>
                    </div>
                    <div class="flight-option">
                        <div class="flight-info">
                            <h4>Business Class</h4>
                            <p>Delhi → ${destinationName}</p>
                            <p>Duration: 2-3 hours • Direct</p>
                        </div>
                        <div class="flight-price">₹25,000</div>
                        <button class="add-to-cart-btn" onclick="addFlightToCart('business')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    getHotelContent(destination) {
        const destinationName = destination.charAt(0).toUpperCase() + destination.slice(1);
        return `
            <div class="hotel-booking">
                <h3>Hotels in ${destinationName}</h3>
                <div class="hotel-options">
                    <div class="hotel-option">
                        <div class="hotel-info">
                            <h4>Budget Hotel</h4>
                            <p>⭐⭐⭐ • Basic amenities • Good location</p>
                            <p>Per night for 2 guests</p>
                        </div>
                        <div class="hotel-price">₹2,500/night</div>
                        <button class="add-to-cart-btn" onclick="addHotelToCart('budget')">Add to Cart</button>
                    </div>
                    <div class="hotel-option">
                        <div class="hotel-info">
                            <h4>Luxury Resort</h4>
                            <p>⭐⭐⭐⭐⭐ • All amenities • Premium location</p>
                            <p>Per night for 2 guests</p>
                        </div>
                        <div class="hotel-price">₹12,000/night</div>
                        <button class="add-to-cart-btn" onclick="addHotelToCart('luxury')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    getCabContent(destination) {
        const destinationName = destination.charAt(0).toUpperCase() + destination.slice(1);
        return `
            <div class="cab-booking">
                <h3>Transportation in ${destinationName}</h3>
                <div class="cab-options">
                    <div class="cab-option">
                        <div class="cab-info">
                            <h4>Airport Transfer</h4>
                            <p>🚗 Sedan • AC • Professional driver</p>
                            <p>Airport to hotel pickup & drop</p>
                        </div>
                        <div class="cab-price">₹1,500</div>
                        <button class="add-to-cart-btn" onclick="addCabToCart('airport')">Add to Cart</button>
                    </div>
                    <div class="cab-option">
                        <div class="cab-info">
                            <h4>Full Day Sightseeing</h4>
                            <p>🚐 SUV • AC • 8 hours • Fuel included</p>
                            <p>Local sightseeing with driver guide</p>
                        </div>
                        <div class="cab-price">₹4,500</div>
                        <button class="add-to-cart-btn" onclick="addCabToCart('sightseeing')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    getActivityContent(destination) {
        const destinationName = destination.charAt(0).toUpperCase() + destination.slice(1);
        const activities = window.destinationManager.getDestinationActivities(destination);
        
        const activitiesHTML = activities.map(activity => `
            <div class="activity-option">
                <div class="activity-info">
                    <h4>${activity.name}</h4>
                    <p>${activity.desc}</p>
                </div>
                <div class="activity-price">₹${activity.price}</div>
                <button class="add-to-cart-btn" onclick="addActivityToCart('${activity.name}', ${activity.price})">Add to Cart</button>
            </div>
        `).join('');
        
        return `
            <div class="activity-booking">
                <h3>Popular Activities in ${destinationName}</h3>
                <div class="activity-options">
                    ${activitiesHTML}
                </div>
            </div>
        `;
    }
    
    getTicketContent(destination) {
        const destinationName = destination.charAt(0).toUpperCase() + destination.slice(1);
        const tickets = window.destinationManager.getDestinationTickets(destination);
        
        const ticketsHTML = tickets.map(ticket => `
            <div class="ticket-option">
                <div class="ticket-info">
                    <h4>${ticket.name}</h4>
                    <p>${ticket.desc}</p>
                </div>
                <div class="ticket-price">₹${ticket.price}</div>
                <button class="add-to-cart-btn" onclick="addTicketToCart('${ticket.name}', ${ticket.price})">Add to Cart</button>
            </div>
        `).join('');
        
        return `
            <div class="ticket-booking">
                <h3>Attraction Tickets in ${destinationName}</h3>
                <div class="ticket-options">
                    ${ticketsHTML}
                </div>
            </div>
        `;
    }
      // Add to Cart Functions
    addFlightToCart(type, buttonElement) {
        const prices = { economy: 8500, business: 25000 };
        const destination = window.destinationManager.getCurrentDestination();
        const destinationName = destination.charAt(0).toUpperCase() + destination.slice(1);
        
        const flightItem = {
            id: Date.now(),
            type: 'Flight',
            name: `${type.charAt(0).toUpperCase() + type.slice(1)} Flight to ${destinationName}`,
            price: prices[type],
            destination: destination
        };
        
        // Find the button that was clicked
        const button = buttonElement || event.target;
        
        window.cartManager.addItem(flightItem);
        this.showAddToCartAnimation(button);
        this.showAddedToCartMessage();
        console.log(`✈️ Added flight to cart: ${flightItem.name}`);
    }
      addHotelToCart(type) {
        const prices = { budget: 2500, luxury: 12000 };
        const destination = window.destinationManager.getCurrentDestination();
        const destinationName = destination.charAt(0).toUpperCase() + destination.slice(1);
        
        const hotelItem = {
            id: Date.now(),
            type: 'Hotel',
            name: `${type.charAt(0).toUpperCase() + type.slice(1)} Hotel in ${destinationName}`,
            price: prices[type],
            destination: destination
        };
        
        // Find the button that was clicked
        const button = event.target;
        
        window.cartManager.addItem(hotelItem);
        this.showAddToCartAnimation(button);
        this.showAddedToCartMessage();
        console.log(`🏨 Added hotel to cart: ${hotelItem.name}`);
    }
      addCabToCart(type) {
        const prices = { airport: 1500, sightseeing: 4500 };
        const names = { airport: 'Airport Transfer', sightseeing: 'Full Day Sightseeing' };
        const destination = window.destinationManager.getCurrentDestination();
        const destinationName = destination.charAt(0).toUpperCase() + destination.slice(1);
        
        const cabItem = {
            id: Date.now(),
            type: 'Transport',
            name: `${names[type]} in ${destinationName}`,
            price: prices[type],
            destination: destination
        };
        
        // Find the button that was clicked
        const button = event.target;
        
        window.cartManager.addItem(cabItem);
        this.showAddToCartAnimation(button);
        this.showAddedToCartMessage();
        console.log(`🚗 Added transport to cart: ${cabItem.name}`);
    }
      addActivityToCart(name, price) {
        const destination = window.destinationManager.getCurrentDestination();
        
        const activityItem = {
            id: Date.now(),
            type: 'Activity',
            name: name,
            price: price,
            destination: destination
        };
        
        // Find the button that was clicked
        const button = event.target;
        
        window.cartManager.addItem(activityItem);
        this.showAddToCartAnimation(button);
        this.showAddedToCartMessage();
        console.log(`🎯 Added activity to cart: ${activityItem.name}`);
    }
      addTicketToCart(name, price) {
        const destination = window.destinationManager.getCurrentDestination();
        
        const ticketItem = {
            id: Date.now(),
            type: 'Ticket',
            name: name,
            price: price,
            destination: destination
        };
        
        // Find the button that was clicked
        const button = event.target;
        
        window.cartManager.addItem(ticketItem);
        this.showAddToCartAnimation(button);
        this.showAddedToCartMessage();
        console.log(`🎫 Added ticket to cart: ${ticketItem.name}`);
    }
    
    showAddedToCartMessage() {
        setTimeout(() => {
            if (confirm('Item added to cart! Would you like to view your cart?')) {
                window.navigationManager.showPage('cart');
            }
        }, 500);
    }
    
    // Visual feedback for add to cart buttons
    showAddToCartAnimation(button) {
        const originalText = button.textContent;
        const originalBackground = button.style.background;
        
        // Change button to show success
        button.textContent = '✅ Added!';
        button.style.background = '#28a745'; // Green success color
        button.style.transform = 'scale(1.05)';
        button.disabled = true;
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = originalBackground;
            button.style.transform = '';
            button.disabled = false;
        }, 2000);
    }
}
