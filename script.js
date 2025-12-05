// Minecraft Portfolio JavaScript

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');
const oreContainer = document.getElementById('oreContainer');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');
const profilePhoto = document.getElementById('profilePhoto');
const healthBar = document.getElementById('healthBar');
const xpBar = document.getElementById('xpBar');
const xpValue = document.getElementById('xpValue');

// Game-like loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            
            // Start ore rain after loading
            createOreRain();
            
            // Start health and XP animations
            animateHealthBar();
            animateXPBar();
            
            // Initialize skill levels
            animateSkillLevels();
        }, 500);
    }, 2000);
});

// Create diamond ore rain
function createOreRain() {
    const oreCount = 30;
    const oreTypes = ['💎', '🔷', '💠', '🔹'];
    
    for (let i = 0; i < oreCount; i++) {
        const ore = document.createElement('div');
        ore.className = 'ore';
        ore.textContent = oreTypes[Math.floor(Math.random() * oreTypes.length)];
        
        // Random position
        const left = Math.random() * 100;
        
        // Random size
        const size = 1 + Math.random() * 1.5;
        
        // Random animation
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 5;
        const swing = Math.random() * 100;
        
        ore.style.left = `${left}%`;
        ore.style.fontSize = `${size}rem`;
        ore.style.animationDuration = `${duration}s`;
        ore.style.animationDelay = `${delay}s`;
        ore.style.animationName = `oreFall`;
        
        oreContainer.appendChild(ore);
        
        // Remove ore after animation completes
        setTimeout(() => {
            if (ore.parentNode === oreContainer) {
                oreContainer.removeChild(ore);
            }
        }, (duration + delay) * 1000);
    }
    
    // Continuously create new ore
    setInterval(() => {
        if (oreContainer.children.length < oreCount) {
            createOreRain();
        }
    }, 1000);
}

// Animate health bar
function animateHealthBar() {
    let health = 100;
    const interval = setInterval(() => {
        health -= Math.random() * 0.5;
        if (health < 20) health = 100; // Reset when low
        
        healthBar.style.width = `${health}%`;
        
        // Change color based on health
        if (health > 70) {
            healthBar.style.background = 'linear-gradient(90deg, #3cb371, #2ecc71)';
        } else if (health > 40) {
            healthBar.style.background = 'linear-gradient(90deg, #f39c12, #f1c40f)';
        } else {
            healthBar.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
        }
    }, 100);
}

// Animate XP bar
function animateXPBar() {
    let xp = 2450;
    const maxXP = 3000;
    const interval = setInterval(() => {
        xp += Math.random() * 2;
        if (xp > maxXP) xp = 0;
        
        const percentage = (xp / maxXP) * 100;
        xpBar.style.width = `${percentage}%`;
        xpValue.textContent = Math.floor(xp);
        
        // Level up animation
        if (xp >= maxXP) {
            xpBar.style.animation = 'pulse 0.5s 3';
            setTimeout(() => {
                xpBar.style.animation = '';
            }, 1500);
        }
    }, 2000);
}

// Animate skill levels
function animateSkillLevels() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        const width = item.offsetWidth;
        
        // Create progress bar inside skill item
        const progressBar = document.createElement('div');
        progressBar.className = 'skill-progress';
        progressBar.style.position = 'absolute';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.height = '100%';
        progressBar.style.width = '0%';
        progressBar.style.backgroundColor = 'rgba(60, 179, 113, 0.3)';
        progressBar.style.zIndex = '0';
        progressBar.style.transition = 'width 1.5s ease-out';
        
        item.appendChild(progressBar);
        
        // Animate progress bar
        setTimeout(() => {
            progressBar.style.width = `${level}%`;
        }, 500);
        
        // Add level text
        const levelText = document.createElement('span');
        levelText.className = 'skill-level';
        levelText.textContent = `${level}%`;
        levelText.style.position = 'absolute';
        levelText.style.top = '50%';
        levelText.style.right = '10px';
        levelText.style.transform = 'translateY(-50%)';
        levelText.style.fontSize = '0.7rem';
        levelText.style.color = '#3cb371';
        levelText.style.opacity = '0';
        levelText.style.transition = 'opacity 0.5s ease';
        
        item.appendChild(levelText);
        
        // Show level on hover
        item.addEventListener('mouseenter', () => {
            levelText.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', () => {
            levelText.style.opacity = '0';
        });
    });
}

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const hamburger = mobileMenuBtn.querySelector('.hamburger');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('.hamburger').classList.remove('active');
    });
});

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navBtns = document.querySelectorAll('.nav-btn');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('href') === `#${current}`) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
    
    // Parallax effect for profile photo
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (profilePhoto) {
        profilePhoto.style.transform = `translateY(${scrollPercent * 20}px)`;
    }
});

// Back to top button
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project filtering
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        const projectCards = document.querySelectorAll('.project-card');
        
        // Minecraft break animation
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Play minecraft click sound (commented out, but can be enabled)
        // playMinecraftSound('click');
    });
});

// Contact form validation with Minecraft style
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Name validation
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (name.value.trim() === '') {
        nameError.style.display = 'block';
        isValid = false;
        // Shake animation
        name.style.animation = 'shake 0.5s';
        setTimeout(() => {
            name.style.animation = '';
        }, 500);
    } else {
        nameError.style.display = 'none';
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.style.display = 'block';
        isValid = false;
        email.style.animation = 'shake 0.5s';
        setTimeout(() => {
            email.style.animation = '';
        }, 500);
    } else {
        emailError.style.display = 'none';
    }
    
    // Message validation
    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (message.value.trim() === '') {
        messageError.style.display = 'block';
        isValid = false;
        message.style.animation = 'shake 0.5s';
        setTimeout(() => {
            message.style.animation = '';
        }, 500);
    } else {
        messageError.style.display = 'none';
    }
    
    // If form is valid, show success message with Minecraft effect
    if (isValid) {
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        
        // Achievement unlocked effect
        successMessage.style.animation = 'achievementUnlock 2s ease';
        
        // Add particles
        createSuccessParticles();
        
        // Reset form
        this.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            successMessage.style.animation = '';
        }, 5000);
    }
});

// Create particles for success message
function createSuccessParticles() {
    const particleCount = 20;
    const colors = ['#3cb371', '#4169e1', '#ffd700', '#00bfff'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '9999';
        particle.style.pointerEvents = 'none';
        
        // Random start position (near form)
        const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
        const startY = window.innerHeight / 2 + 100;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        const distance = 100 + Math.random() * 200;
        
        let progress = 0;
        const duration = 1000;
        
        function animate() {
            progress += 16.67; // ~60fps
            
            const currentDistance = (progress / duration) * distance;
            const x = startX + Math.cos(angle) * currentDistance;
            const y = startY + Math.sin(angle) * currentDistance - (progress / duration) * 100;
            const scale = 1 - (progress / duration);
            const opacity = 1 - (progress / duration);
            
            particle.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            particle.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// Add shake animation for errors
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes achievementUnlock {
        0% { transform: scale(0.5); opacity: 0; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Update copyright year
currentYear.textContent = new Date().getFullYear();

// Add hover effect to minecraft buttons
document.querySelectorAll('.minecraft-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translate(4px, 4px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Add click effect to minecraft buttons
document.querySelectorAll('.minecraft-btn').forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'translate(8px, 8px)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'translate(4px, 4px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Random ore pick-up sound simulation (optional)
function playMinecraftSound(type) {
    // This is a placeholder - in a real implementation, you would play actual audio files
    console.log(`Playing Minecraft ${type} sound`);
    
    // Example of how to play a sound (commented out)
    /*
    const audio = new Audio(`sounds/${type}.mp3`);
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play failed:", e));
    */
}

// Add keyboard shortcuts for fun
document.addEventListener('keydown', (e) => {
    // F3 for debug info
    if (e.key === 'F3') {
        e.preventDefault();
        showDebugInfo();
    }
    
    // Spacebar to jump (scroll up)
    if (e.key === ' ' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        window.scrollBy({ top: -200, behavior: 'smooth' });
    }
});

// Debug info display
function showDebugInfo() {
    const debugInfo = document.createElement('div');
    debugInfo.id = 'debugInfo';
    debugInfo.style.position = 'fixed';
    debugInfo.style.top = '10px';
    debugInfo.style.left = '10px';
    debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    debugInfo.style.color = '#fff';
    debugInfo.style.fontFamily = 'monospace';
    debugInfo.style.fontSize = '12px';
    debugInfo.style.padding = '10px';
    debugInfo.style.zIndex = '10000';
    debugInfo.style.border = '2px solid #fff';
    
    const info = `
        ISWAN_EDISON_PORTFOLIO v1.0<br>
        FPS: 60<br>
        XYZ: 100.5 / 64.0 / 200.3<br>
        Chunk: 6, 4<br>
        Facing: west<br>
        Biome: portfolio_forest<br>
    `;
    
    debugInfo.innerHTML = info;
    document.body.appendChild(debugInfo);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (debugInfo.parentNode) {
            debugInfo.parentNode.removeChild(debugInfo);
        }
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Minecraft Portfolio Loaded!');
    console.log('Created by Iswan Edison');
    console.log('Multimedia Computing Student at UNIMAS');
    
    // Add custom cursor on hover of interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .minecraft-btn, .nav-btn');
    interactiveElements.forEach(el => {
        el.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><rect width=\'32\' height=\'32\' fill=\'%233cb371\'/><rect x=\'4\' y=\'4\' width=\'24\' height=\'24\' fill=\'black\'/></svg>") 16 16, pointer';
    });
});
