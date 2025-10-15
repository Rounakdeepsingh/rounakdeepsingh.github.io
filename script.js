document.addEventListener('DOMContentLoaded', () => {

    // --- GSAP PLUGIN REGISTRATION ---
    gsap.registerPlugin(ScrollTrigger);

    // --- CUSTOM CURSOR ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverables = document.querySelectorAll('a, button, .project-card, .theme-toggle');

    window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        gsap.to(cursorDot, { x, y, duration: 0.3, ease: 'power2.out' });
        gsap.to(cursorOutline, { x, y, duration: 0.7, ease: 'power2.out' });
    });

    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, { scale: 1.8, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, { scale: 1, duration: 0.3 });
        });
    });

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        themeToggle.innerHTML = currentTheme === 'dark-theme' ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        let theme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', theme);
        themeToggle.innerHTML = theme === 'dark-theme' ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
    });

    // --- PRELOADER & INITIAL PAGE ANIMATION ---
    const preloader = document.querySelector('.preloader');
    const heroLines = document.querySelectorAll('.hero-line');
    const heroSub = document.querySelector('.animate-hero');

    const tl = gsap.timeline();
    tl.to(preloader, { opacity: 0, duration: 0.5, delay: 1, onComplete: () => preloader.style.display = 'none' })
      .to(heroLines, { y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' })
      .to(heroSub, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "-=0.5");

    // --- HEADER SCROLL ---
    const header = document.querySelector('header');
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: header }
    });
    
    // --- GSAP SCROLL-TRIGGERED ANIMATIONS ---
    // Section Titles
    document.querySelectorAll('.section-title').forEach(title => {
        const chars = title.textContent.split('');
        title.innerHTML = chars.map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        
        gsap.from(title.querySelectorAll('.char'), {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            },
            yPercent: 100,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.05
        });
    });

    // About Section Text
    document.querySelectorAll('.split-text').forEach(text => {
        gsap.from(text, {
            scrollTrigger: { trigger: text, start: 'top 85%' },
            opacity: 0, y: 30, duration: 0.8, ease: 'power2.out'
        });
    });

    // Experience Timeline
    document.querySelectorAll('.timeline-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 85%' },
            opacity: 0, x: -50, duration: 0.8, ease: 'power2.out'
        });
    });

    // Project Cards
    document.querySelectorAll('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%' },
            opacity: 0, y: 50, duration: 0.8, ease: 'power2.out'
        });
    });

    // --- 3D TILT EFFECT ---
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

});