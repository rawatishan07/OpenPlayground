let events = [];

// Form submission handler
document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const category = document.getElementById('eventCategory').value;
    const description = document.getElementById('eventDescription').value;
    
    addEvent(title, date, category, description);
    
    // Reset form
    this.reset();
});

function addEvent(title, date, category, description) {
    const event = {
 id: Date.now(),
 title,
 date,
 category,
 description
    };
    
    events.push(event);
    renderEvents();
}

function deleteEvent(id) {
    events = events.filter(event => event.id !== id);
    renderEvents();
}

function clearAllEvents() {
    events = [];
    renderEvents();
}

function addSampleEvents() {
    const sampleEvents = [
 {
     title: 'Web Development Conference',
     date: '2024-03-15',
     category: 'Conference',
     description: 'Annual conference on modern web technologies.'
 },
 {
     title: 'JavaScript Workshop',
     date: '2024-03-20',
     category: 'Workshop',
     description: 'Hands-on JavaScript learning session.'
 }
    ];
    
    sampleEvents.forEach(event => {
 addEvent(event.title, event.date, event.category, event.description);
    });
}

function renderEvents() {
    const container = document.getElementById('eventsContainer');
    
    if (events.length === 0) {
 container.innerHTML = '<div class="empty-state">No events yet. Add your first event!</div>';
 return;
    }
    
    container.innerHTML = events.map(event => `
 <div class="event-card">
     <button class="delete-btn" onclick="deleteEvent(${event.id})">×</button>
     <h3>${event.title}</h3>
     <div class="event-date">📅 ${event.date}</div>
     <span class="event-category">${event.category}</span>
     <p class="event-description">${event.description}</p>
 </div>
    `).join('');
}

// DOM Manipulation Demo - innerHTML vs textContent
const keyDisplay = document.getElementById('keyDisplay');

document.addEventListener('keydown', function(e) {
    // Using innerHTML allows HTML interpretation
    if (e.key === 'Enter') {
 keyDisplay.innerHTML = 'You pressed: <span class="key-highlight">Enter</span> (using innerHTML)';
    } else if (e.key === ' ') {
 keyDisplay.innerHTML = 'You pressed: <span class="key-highlight">Space</span> (using innerHTML)';
    } else {
 // Using textContent treats everything as plain text
 keyDisplay.textContent = `You Pressed: ${e.key} (using textContent)`;
    }
    
    // Visual feedback
    keyDisplay.style.background = '#e3f2fd';
    setTimeout(() => {
 keyDisplay.style.background = '#f8f9fa';
    }, 200);
});

// Add some interactive styling
document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('focus', function() {
 this.style.transform = 'scale(1.02)';
    });
    
    element.addEventListener('blur', function() {
 this.style.transform = 'scale(1)';
    });
});

// Add hover effect to event cards using event delegation
document.getElementById('eventsContainer').addEventListener('mouseover', function(e) {
    const card = e.target.closest('.event-card');
    if (card) {
 card.style.borderLeft = '4px solid #667eea';
    }
});

document.getElementById('eventsContainer').addEventListener('mouseout', function(e) {
    const card = e.target.closest('.event-card');
    if (card) {
 card.style.borderLeft = 'none';
    }
});