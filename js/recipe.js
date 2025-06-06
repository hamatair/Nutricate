// Recipe functionality for Nutricate

// Global variables
let currentServings = 2;

// Data bahan per 2 servings (default)
const ingredientsData = [
  { base: 200, unit: 'g', text: 'turkey breast' },
  { base: 1, unit: 'cup', text: 'asparagus (steamed)' },
  { base: 0.5, unit: 'cup', text: 'cooked brown rice' },
  { base: 1, unit: 'tbsp', text: 'olive oil' },
  { base: 0, unit: '', text: 'Salt and pepper to taste' },
  { base: 0, unit: '', text: 'Lemon for garnish' }
];

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeRecipe();
  setupEventListeners();
});

// Initialize recipe data
function initializeRecipe() {
  updateIngredients();
  updateNutritionValues();
}

// Setup event listeners
function setupEventListeners() {
  // Add click effects to navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
    });
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll('.recipe-card, .servings-card, .nutrition-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add click effect to user profile
  const userProfile = document.querySelector('.user-profile');
  if (userProfile) {
    userProfile.addEventListener('click', function() {
      console.log('User profile clicked');
      // Add user profile functionality here
    });
  }

  // Add click effects to icons
  const searchIcon = document.querySelector('.search-icon');
  const notificationIcon = document.querySelector('.notification-icon');
  
  if (searchIcon) {
    searchIcon.addEventListener('click', function() {
      console.log('Search clicked');
      // Add search functionality here
    });
  }
  
  if (notificationIcon) {
    notificationIcon.addEventListener('click', function() {
      console.log('Notifications clicked');
      // Add notification functionality here
    });
  }
}

// Change serving size
function changeServing(delta) {
  const newServings = currentServings + delta;
  
  // Validate serving range (1-10 servings)
  if (newServings >= 1 && newServings <= 10) {
    currentServings = newServings;
    
    // Update UI
    const servingCountElement = document.getElementById('servingCount');
    if (servingCountElement) {
      servingCountElement.textContent = currentServings;
      
      // Add animation effect
      servingCountElement.style.transform = 'scale(1.2)';
      setTimeout(() => {
        servingCountElement.style.transform = 'scale(1)';
      }, 150);
    }
    
    // Update ingredients and nutrition
    updateIngredients();
    updateNutritionValues();
    
    // Add feedback animation to serving buttons
    const buttons = document.querySelectorAll('.serving-btn');
    buttons.forEach(btn => {
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 100);
    });
  } else {
    // Provide visual feedback for invalid range
    const servingCountElement = document.getElementById('servingCount');
    if (servingCountElement) {
      servingCountElement.style.color = '#ff6b6b';
      setTimeout(() => {
        servingCountElement.style.color = '';
      }, 500);
    }
  }
}

// Update ingredients list based on serving size
function updateIngredients() {
  const list = document.getElementById('ingredientsList');
  list.innerHTML = ingredientsData.map((item, i) => {
    let qty = item.base ? (item.base / 2 * currentServings) : '';
    // Untuk 0.5 cup, tampilkan 0.5, 1, 1.5 dst
    if (qty && item.unit === 'cup') qty = Math.round(qty * 10) / 10;
    if (qty && item.unit === 'g') qty = Math.round(qty);
    return `<li><span class="ingredient-num">${i + 1}</span>${qty ? qty + ' ' : ''}${item.unit ? item.unit + ' ' : ''}${item.text}</li>`;
  }).join('');
  document.getElementById('servingCount').textContent = currentServings;
}

window.changeServing = function(delta) {
  if (currentServings + delta < 1) return;
  currentServings += delta;
  updateIngredients();
};