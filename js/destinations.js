// Destinations Management - Handles destination selection and data
class Destinations {
    constructor() {
        this.currentDestination = '';
        this.destinationData = {
            'shimla': {
                title: 'Plan Your Shimla Trip',
                subtitle: 'Experience the Queen of Hills with snow-capped mountains and colonial charm'
            },
            'goa': {
                title: 'Plan Your Goa Trip',
                subtitle: 'Enjoy pristine beaches, vibrant nightlife, and Portuguese heritage'
            },
            'rajasthan': {
                title: 'Plan Your Rajasthan Trip',
                subtitle: 'Discover royal palaces, desert landscapes, and rich cultural heritage'
            },
            'kerala': {
                title: 'Plan Your Kerala Trip',
                subtitle: 'Explore backwaters, spice plantations, and tropical paradise'
            },
            'Vaishno Devi': {
                title: 'Plan Your Vaishno Devi Trip',
                subtitle: 'Experience the spiritual journey to the sacred Vaishno Devi shrine nestled in the Trikuta Mountains'
            }
        };
        
        this.setupGlobalFunctions();
    }
    
    setupGlobalFunctions() {
        window.selectDestination = (destination) => this.selectDestination(destination);
    }
    
    selectDestination(destination) {
        this.currentDestination = destination;
        
        // Update destination page content
        const destinationTitle = document.getElementById('destination-title');
        const destinationSubtitle = document.getElementById('destination-subtitle');
        
        const data = this.destinationData[destination];
        if (data) {
            destinationTitle.textContent = data.title;
            destinationSubtitle.textContent = data.subtitle;
        }
        
        // Show destination page
        window.navigationManager.showPage('destination');
        
        console.log(`🌍 Selected destination: ${destination}`);
    }
    
    getCurrentDestination() {
        return this.currentDestination;
    }
    
    getDestinationData(destination) {
        return this.destinationData[destination];
    }
    
    // Get destination-specific activities
    getDestinationActivities(destination) {
        const activities = {
            'shimla': [
                { name: 'Toy Train Ride', desc: 'UNESCO World Heritage train journey', price: 800 },
                { name: 'Ice Skating', desc: 'Fun on Asia\'s largest ice skating rink', price: 500 },
                { name: 'Trekking Adventure', desc: 'Guided trek to scenic viewpoints', price: 2500 }
            ],
            'goa': [
                { name: 'Water Sports', desc: 'Jet ski, parasailing, banana boat rides', price: 3500 },
                { name: 'Sunset Cruise', desc: 'Romantic cruise with dinner', price: 2200 },
                { name: 'Spice Plantation Tour', desc: 'Learn about local spices with lunch', price: 1500 }
            ],
            'rajasthan': [
                { name: 'Camel Safari', desc: 'Desert camel ride with cultural show', price: 2800 },
                { name: 'Palace Tour', desc: 'Guided tour of royal palaces', price: 1800 },
                { name: 'Folk Dance Show', desc: 'Traditional Rajasthani cultural evening', price: 1200 }
            ],
            'kerala': [
                { name: 'Backwater Cruise', desc: 'Houseboat experience in backwaters', price: 5500 },
                { name: 'Ayurveda Spa', desc: 'Traditional Kerala wellness treatment', price: 3200 },
                { name: 'Tea Plantation Visit', desc: 'Guided tour with tea tasting', price: 1400 }
            ],
            'Vaishno Devi': [
                { name: 'Expedition to Baba Dhansar', desc: '17km from Katra with scenic Waterfalls', price: 1500 },
                { name: 'Shiv Khori cave shrine', desc: 'Naturally formed Shiva Lingam ', price: 5200 },
                { name: 'Sanjichhat', price: 1200, desc: 'View Scenic beauty of the Himlayas' }
            ]
        };
        
        return activities[destination] || [];
    }
    
    // Get destination-specific tickets
    getDestinationTickets(destination) {
        const tickets = {
            'shimla': [
                { name: 'Jakhu Temple', desc: 'Skip-the-line entry ticket', price: 50 },
                { name: 'Kufri Fun World', desc: 'Amusement park entry with rides', price: 350 }
            ],
            'goa': [
                { name: 'Basilica of Bom Jesus', desc: 'Heritage site entry', price: 25 },
                { name: 'Dudhsagar Falls', desc: 'Waterfall viewing with guide', price: 800 }
            ],
            'rajasthan': [
                { name: 'City Palace Udaipur', desc: 'Royal palace complex entry', price: 700 },
                { name: 'Amber Fort', desc: 'Historic fort with audio guide', price: 500 }
            ],
            'kerala': [
                { name: 'Periyar Wildlife Sanctuary', desc: 'National park safari', price: 1200 },
                { name: 'Mattancherry Palace', desc: 'Dutch palace museum entry', price: 100 }
            ],
            'Vaishno Devi': [
                { name: 'Yatra Ticket', desc: 'Registration and RFID generation', price: 20 },
                { name: 'Ropeway Ticket', desc: 'Bhawan to Bhairon', price: 100 }, 
                { name: 'Helicopter Ticket', desc: 'Katra to Bhawan', price: 5100 }
            ]
        };
        
        return tickets[destination] || [];
    }
}
