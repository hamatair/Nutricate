// NUTRIGATE Website JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initNavbarEffects();
    initAnimations();
    initInteractiveElements();
});

// Smooth Scrolling for Navigation Links
// Smooth scroll ke anchor (About, Feature, Contact)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});


// Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 139, 90, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    });
    
    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.display = 'none';
    
    // Add mobile menu functionality
    if (window.innerWidth <= 768) {
        const navContainer = document.querySelector('.nav-container');
        navContainer.appendChild(mobileMenuToggle);
        mobileMenuToggle.style.display = 'block';
        
        mobileMenuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
        });
    }
}

// Animation Effects
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.feature-card, .feature-box, .plans-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Interactive Elements
function initInteractiveElements() {
    // CTA Button Animation
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show welcome message or redirect
            showWelcomeMessage();
        });
    }
    
    // Feature boxes hover effects
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Goal items interactive effects
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            goalItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show selected goal message
            showGoalSelection(this.textContent.trim());
        });
    });
}

// Helper Functions
function showWelcomeMessage() {
    // Create modal or notification
    const modal = document.createElement('div');
    modal.className = 'welcome-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Selamat Datang di NUTRIGATE!</h2>
            <p>Terima kasih telah bergabung dengan komunitas sehat kami.</p>
            <button onclick="closeModal()" class="close-modal-btn">Mulai Perjalanan</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const closeBtn = modal.querySelector('.close-modal-btn');
    closeBtn.style.cssText = `
        background: #FF8B5A;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 10px;
        margin-top: 1rem;
        cursor: pointer;
        font-weight: bold;
    `;
    
    // Animate modal in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
}

function closeModal() {
    const modal = document.querySelector('.welcome-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function showGoalSelection(goalText) {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'goal-notification';
    notification.innerHTML = `
        <p>✓ Tujuan dipilih: <strong>${goalText}</strong></p>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 1500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Utility Functions
function debounce(func, wait) {
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

// Window resize handler
window.addEventListener('resize', debounce(function() {
    // Adjust layout for different screen sizes
    const featureCards = document.querySelectorAll('.feature-card');
    if (window.innerWidth <= 768) {
        featureCards.forEach(card => {
            card.style.flexDirection = 'column';
            card.style.textAlign = 'center';
        });
    } else {
        featureCards.forEach(card => {
            card.style.flexDirection = 'row';
            card.style.textAlign = 'left';
        });
    }
}, 250));

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s linear;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .goal-item.active {
        background: rgba(255, 255, 255, 0.4) !important;
        transform: scale(1.05);
    }
    
    .mobile-menu-toggle {
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 139, 90, 0.95);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization
if ('IntersectionObserver' in window) {
    // Lazy load images when they come into view
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe lazy images

// index.js

// Scroll smooth untuk navigasi internal
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Tombol "Mulai Sekarang"
const startButton = document.querySelector('.custom-btn');
startButton?.addEventListener('click', () => {
  alert("Ayo mulai perjalanan sehatmu bersama Nutricate!");
});

// Responsive navbar (opsional, jika pakai collapse)
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).toggle();
    }
  });
});}
