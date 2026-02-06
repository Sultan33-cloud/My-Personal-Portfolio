// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const pageContents = document.querySelectorAll('.page-content');
const heroSection = document.getElementById('home-hero');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Navigation functionality 
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the target page
        const targetPage = link.getAttribute('data-page');
        
        // Update active navigation link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
        
        // Show the corresponding page content
        pageContents.forEach(page => {
            page.classList.remove('active');
            
            if (page.id === targetPage) {
                page.classList.add('active');
            }
        });
        
        // If home page is selected, show hero section
        if (targetPage === 'home') {
            heroSection.style.display = 'block';
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Hide hero section for other pages
            heroSection.style.display = 'none';
            
            // Make sure the page is visible and at the top
            const targetElement = document.getElementById(targetPage);
            if (targetElement) {
                // Remove any inline display styles that might hide it
                targetElement.style.display = 'block';
                
                // Scroll to the top of the page content
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Form validation and submission
const messageForm = document.getElementById('messageForm');
if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showAlert('Please fill in all fields before submitting.', 'error');
            return;
        }
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showAlert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you at ${email} soon.`, 'success');
        
        // Reset form
        messageForm.reset();
    });
}

// Show alert message
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.textContent = message;
    
    // Style the alert
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        animation-fill-mode: forwards;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 350px;
    `;
    
    if (type === 'error') {
        alert.style.backgroundColor = '#e74c3c';
    } else {
        alert.style.backgroundColor = '#2ecc71';
    }
    
    // Add to DOM
    document.body.appendChild(alert);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 3000);
}

// Add CSS for alert animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Skill bar animation on scroll
const skillBars = document.querySelectorAll('.skill-level');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const originalWidth = bar.getAttribute('data-width') || bar.style.width;
        bar.setAttribute('data-width', originalWidth);
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = originalWidth;
        }, 300);
    });
}

// Check if skill bars are in viewport
function checkSkillBarVisibility() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const sectionPosition = skillsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // If skills section is in viewport
    if (sectionPosition.top < windowHeight * 0.8 && sectionPosition.bottom > 0) {
        animateSkillBars();
    }
}

// Initialize skill bars with proper data attributes
function initializeSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0%';
    });
}

// Timeline item animation
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
}

// Check if elements are in viewport for animation
function checkVisibility() {
    // Check for skill bars
    checkSkillBarVisibility();
    
    // Check for timeline items in active page
    const activePage = document.querySelector('.page-content.active');
    if (activePage && (activePage.id === 'childhood' || activePage.id === 'education')) {
        const timelineItems = activePage.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (itemPosition.top < windowHeight * 0.8 && itemPosition.bottom > 0) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's a page navigation link (handled separately)
        if (this.classList.contains('nav-link')) {
            return;
        }
        
        e.preventDefault();
        
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing page...');
    
    // Set home page as active by default
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.classList.add('active');
        homePage.style.display = 'block';
        homePage.style.opacity = '1';
    }
    
    // Make sure all other pages are hidden
    pageContents.forEach(page => {
        if (page.id !== 'home') {
            page.classList.remove('active');
            page.style.display = 'none';
        }
    });
    
    // Initialize skill bars
    initializeSkillBars();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', checkVisibility);
    
    // Initial check for animations
    setTimeout(() => {
        checkVisibility();
        // Animate skill bars if skills page is active
        const activePage = document.querySelector('.page-content.active');
        if (activePage && activePage.id === 'skills') {
            animateSkillBars();
        }
    }, 500);
    
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('footer p:first-child');
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
    
    // Add loading animation to page transition
    pageContents.forEach(page => {
        page.style.transition = 'opacity 0.5s ease';
    });
    
    console.log('Page initialization complete');
});

// Function to handle page switching with better visibility
function switchPage(pageId) {
    console.log('Switching to page:', pageId);
    
    // Hide all pages
    pageContents.forEach(page => {
        page.classList.remove('active');
        page.style.opacity = '0';
        setTimeout(() => {
            page.style.display = 'none';
        }, 300);
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        setTimeout(() => {
            targetPage.classList.add('active');
            targetPage.style.opacity = '1';
            
            // Trigger animations for the new page
            if (pageId === 'skills') {
                setTimeout(animateSkillBars, 300);
            } else if (pageId === 'childhood' || pageId === 'education') {
                setTimeout(animateTimelineItems, 300);
            }
        }, 50);
    }
    
    // Handle hero section
    if (pageId === 'home') {
        heroSection.style.display = 'block';
        setTimeout(() => {
            heroSection.style.opacity = '1';
        }, 50);
    } else {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.display = 'none';
        }, 300);
    }
}

// Navigation functionality
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetPage = link.getAttribute('data-page');
        
        // Update active navigation link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
        
        // Hide all pages
        pageContents.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });
        
        // Show target page
        const targetElement = document.getElementById(targetPage);
        if (targetElement) {
            targetElement.classList.add('active');
            targetElement.style.display = 'block';
        }
        
        // Handle hero section
        if (targetPage === 'home') {
            heroSection.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            heroSection.style.display = 'none';
            // Scroll to top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Initialize - make sure home page is visible
document.addEventListener('DOMContentLoaded', () => {
    // Show home page
    document.getElementById('home').classList.add('active');
    document.getElementById('home').style.display = 'block';
    
    // Hide other pages
    const pages = ['childhood', 'education', 'skills', 'future', 'contact'];
    pages.forEach(page => {
        const element = document.getElementById(page);
        if (element) {
            element.classList.remove('active');
            element.style.display = 'none';
        }
    });
});