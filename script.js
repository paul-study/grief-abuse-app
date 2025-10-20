// ===================================
// Navigation & Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===================================
    // Smooth Scrolling
    // ===================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // Search Functionality
    // ===================================
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    
    // Create searchable content index
    const searchableContent = [
        {
            title: 'Tension Building Phase',
            content: 'Stress and tension accumulate. Walking on eggshells. Increased anxiety and fear.',
            section: 'abuse-cycles',
            category: 'Abuse Cycle'
        },
        {
            title: 'Acute Incident Phase',
            content: 'Physical, emotional, verbal, or sexual abuse occurs. Most destructive phase.',
            section: 'abuse-cycles',
            category: 'Abuse Cycle'
        },
        {
            title: 'Reconciliation Phase',
            content: 'Apologies, promises to change, honeymoon period, expressions of love.',
            section: 'abuse-cycles',
            category: 'Abuse Cycle'
        },
        {
            title: 'Calm Period',
            content: 'Temporary peace, normal activities, victim feels hope.',
            section: 'abuse-cycles',
            category: 'Abuse Cycle'
        },
        {
            title: 'Physical Abuse',
            content: 'Hitting, kicking, pushing, restraining, unwanted physical contact.',
            section: 'abuse-cycles',
            category: 'Types of Abuse'
        },
        {
            title: 'Emotional Abuse',
            content: 'Manipulation, gaslighting, intimidation, humiliation, isolation, controlling behavior.',
            section: 'abuse-cycles',
            category: 'Types of Abuse'
        },
        {
            title: 'Verbal Abuse',
            content: 'Name-calling, yelling, threatening, blaming, demeaning words.',
            section: 'abuse-cycles',
            category: 'Types of Abuse'
        },
        {
            title: 'Financial Abuse',
            content: 'Controlling finances, preventing employment, financial dependency.',
            section: 'abuse-cycles',
            category: 'Types of Abuse'
        },
        {
            title: 'Sexual Abuse',
            content: 'Non-consensual sexual activity, coercion, sex as control.',
            section: 'abuse-cycles',
            category: 'Types of Abuse'
        },
        {
            title: 'Denial Stage of Grief',
            content: 'Shock, disbelief, numbness, avoiding reality, difficulty accepting loss.',
            section: 'grief-stages',
            category: 'Grief Stages'
        },
        {
            title: 'Anger Stage of Grief',
            content: 'Frustration, irritability, blaming others, feeling abandoned, questioning why.',
            section: 'grief-stages',
            category: 'Grief Stages'
        },
        {
            title: 'Bargaining Stage of Grief',
            content: 'If only thoughts, negotiating, dwelling on what could have been different.',
            section: 'grief-stages',
            category: 'Grief Stages'
        },
        {
            title: 'Depression Stage of Grief',
            content: 'Deep sadness, withdrawal, loss of interest, changes in sleep or appetite.',
            section: 'grief-stages',
            category: 'Grief Stages'
        },
        {
            title: 'Acceptance Stage of Grief',
            content: 'New normal, more good days, ability to recall memories without intense pain.',
            section: 'grief-stages',
            category: 'Grief Stages'
        },
        {
            title: 'Family Violence Information Line',
            content: '0800 456 450 - Free confidential support 24/7',
            section: 'resources',
            category: 'NZ Resources'
        },
        {
            title: "Women's Refuge",
            content: '0800 REFUGE (0800 733 843) - Support for women and children 24/7',
            section: 'resources',
            category: 'NZ Resources'
        },
        {
            title: 'Shine - Safer Homes',
            content: '0508 SHINES (0508 744 633) - Domestic abuse helpline',
            section: 'resources',
            category: 'NZ Resources'
        },
        {
            title: 'Victim Support',
            content: '0800 VICTIM (0800 842 846) - Free support for victims of crime 24/7',
            section: 'resources',
            category: 'NZ Resources'
        },
        {
            title: 'Lifeline',
            content: '0800 LIFELINE (0800 543 354) - Free confidential support 24/7',
            section: 'resources',
            category: 'NZ Resources'
        },
        {
            title: 'Youthline',
            content: '0800 376 633 - Free counseling for young people 24/7',
            section: 'resources',
            category: 'NZ Resources'
        },
        {
            title: 'Suicide Crisis Helpline',
            content: '0508 TAUTOKO (0508 828 865) - 24/7 support',
            section: 'resources',
            category: 'NZ Resources'
        },
        {
            title: '1737',
            content: 'Call or text 1737 for free support from trained counselor 24/7',
            section: 'resources',
            category: 'NZ Resources'
        },
        {
            title: 'Safe to Talk',
            content: '0800 044 334 - Sexual harm helpline 24/7',
            section: 'resources',
            category: 'NZ Resources'
        },
        {
            title: 'Emergency Services',
            content: 'Call 111 if you are in immediate danger - Police, ambulance, fire',
            section: 'help',
            category: 'Emergency'
        },
        {
            title: 'Safety Planning',
            content: 'Important documents, code word, safe places, emergency contacts, emergency bag',
            section: 'resources',
            category: 'Safety'
        }
    ];
    
    function performSearch(query) {
        if (!query || query.trim().length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        query = query.toLowerCase().trim();
        
        // Search through content
        const results = searchableContent.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                   item.content.toLowerCase().includes(query) ||
                   item.category.toLowerCase().includes(query);
        });
        
        displaySearchResults(results);
    }
    
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item"><p>No results found. Try different keywords.</p></div>';
            return;
        }
        
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="navigateToSection('${result.section}')">
                <h4>${result.title}</h4>
                <p><strong>${result.category}</strong> - ${result.content}</p>
            </div>
        `).join('');
    }
    
    // Make navigateToSection globally available
    window.navigateToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Clear search
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    };
    
    // Search event listeners
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    // ===================================
    // Accordion Functionality
    // ===================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    
    // ===================================
    // Back to Top Button
    // ===================================
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTopButton);
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===================================
    // Quick Exit Functionality
    // ===================================
    const quickExitBtn = document.getElementById('quickExitBtn');
    
    function quickExit() {
        // Clear browsing history and redirect to Google
        window.location.replace('https://www.google.com');
    }
    
    if (quickExitBtn) {
        quickExitBtn.addEventListener('click', quickExit);
    }
    
    // ESC key for quick exit
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (confirm('Quick exit? This will redirect you to Google.')) {
                quickExit();
            }
        }
    });
    
    // ===================================
    // Scroll Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and timeline items
    const animatedElements = document.querySelectorAll('.card, .timeline-item, .resource-card, .help-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // ===================================
    // Phone Number Click Tracking
    // ===================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Emergency contact clicked:', link.href);
            // Could be used for analytics in production
        });
    });
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🌟 Hope & Healing Support App', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cIf you need immediate help, call 111 (Emergency) or 0800 456 450 (Family Violence Line)', 'font-size: 14px; color: #dc2626;');
    console.log('%cYou are not alone. Help is available 24/7.', 'font-size: 12px; color: #059669;');
    
    // ===================================
    // Service Worker for Offline Support (Optional)
    // ===================================
    if ('serviceWorker' in navigator) {
        // Could register service worker for offline functionality
        // Commented out as it's optional for a static site
        /*
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered');
                })
                .catch(err => {
                    console.log('Service Worker registration failed');
                });
        });
        */
    }
    
    // ===================================
    // Accessibility Enhancements
    // ===================================
    
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'visually-hidden';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        z-index: 9999;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.id = 'main';
    }
    
    // ===================================
    // Handle External Links Safely
    // ===================================
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        // Ensure rel attributes are set for security
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // ===================================
    // Dark Mode Support (Optional - Commented)
    // ===================================
    /*
    // Detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Could implement dark mode if needed
        console.log('User prefers dark mode');
    }
    */
    
    // ===================================
    // Browser Compatibility Checks
    // ===================================
    
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements
        animatedElements.forEach(el => {
            el.style.opacity = '1';
        });
    }
    
    // ===================================
    // Performance Monitoring
    // ===================================
    
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    });
    
    // ===================================
    // Error Handling
    // ===================================
    window.addEventListener('error', (e) => {
        console.error('An error occurred:', e.error);
        // In production, could send to error tracking service
    });
    
    // ===================================
    // Print Functionality
    // ===================================
    window.addEventListener('beforeprint', () => {
        // Expand all accordions for printing
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.add('active');
        });
    });
    
    window.addEventListener('afterprint', () => {
        // Collapse accordions after printing
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
    });
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format phone numbers for display
function formatPhoneNumber(number) {
    // Remove all non-digit characters
    const cleaned = number.replace(/\D/g, '');
    
    // Format NZ numbers
    if (cleaned.startsWith('0800')) {
        return `0800 ${cleaned.substring(4, 7)} ${cleaned.substring(7)}`;
    } else if (cleaned.startsWith('0508')) {
        return `0508 ${cleaned.substring(4, 7)} ${cleaned.substring(7)}`;
    } else if (cleaned.length === 4) {
        return cleaned;
    }
    
    return number;
}
