/**
 * REUSABLE NAVIGATION & FOOTER JAVASCRIPT
 * Include this file on all pages for consistent navbar and footer functionality
 * 
 * Features:
 * - Theme toggle (dark/light mode)
 * - Mobile menu toggle
 * - Active link highlighting
 * - Scroll to top button
 * - Navbar shadow on scroll
 * - Smooth scrolling for anchor links
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // THEME TOGGLE FUNCTIONALITY
    // ==========================================
    
    function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = document.querySelector('.theme-toggle-slider i');
        if (icon) {
            if (newTheme === 'dark') {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }
    
    // Make toggleTheme available globally for onclick attribute
    window.toggleTheme = toggleTheme;

    // Load saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = document.querySelector('.theme-toggle-slider i');
    if (savedTheme === 'dark' && icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    
    const mobileToggle = document.getElementById('toggleMobileMenu');
    const navLinksMenu = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');

    if (mobileToggle && navLinksMenu && menuOverlay) {
        // Toggle menu on hamburger click
        mobileToggle.addEventListener('click', () => {
            navLinksMenu.classList.toggle('active');
            mobileToggle.classList.toggle('open');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = navLinksMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', () => {
            navLinksMenu.classList.remove('active');
            mobileToggle.classList.remove('open');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking a link
        navLinksMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksMenu.classList.remove('active');
                mobileToggle.classList.remove('open');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // ACTIVE LINK HIGHLIGHTING
    // ==========================================
    
    function activeLinks() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        const navLinks = document.querySelectorAll('#navLinks a');

        navLinks.forEach(link => {
            // Remove active class from all links first
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            
            // Handle hash links (e.g., #home, #services)
            if (href.startsWith('#')) {
                if (href === currentHash || (currentHash === '' && href === '#home')) {
                    link.classList.add('active');
                }
            }
            // Handle page links (e.g., ./elevated-about-page.html)
            else {
                // Extract just the filename from both paths for comparison
                const linkPath = href.split('/').pop().split('?')[0];
                const pagePath = currentPath.split('/').pop().split('?')[0];
                
                // Check if paths match exactly
                if (linkPath === pagePath && pagePath !== '') {
                    link.classList.add('active');
                }
                
                // Handle homepage/index
                if ((currentPath === '/' || currentPath.includes('homepage.html') || currentPath.includes('index.html')) && href === '#home') {
                    link.classList.add('active');
                }
            }
        });
    }

    // Call on page load
    activeLinks();

    // Re-run when hash changes (for same-page navigation)
    window.addEventListener('hashchange', activeLinks);

    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Make scrollToTop available globally for onclick attribute
    window.scrollToTop = scrollToTop;

    // ==========================================
    // SCROLL EFFECTS
    // ==========================================
    
    window.addEventListener('scroll', () => {
        // Show/hide scroll to top button
        const scrollTop = document.querySelector('.scroll-top');
        if (scrollTop) {
            if (window.pageYOffset > 300) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }
        }

        // Add shadow to navbar on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.pageYOffset > 100) {
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // ==========================================
    // UPDATE FOOTER YEAR
    // ==========================================
    
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    console.log('✅ Navigation & Footer scripts loaded successfully');
});