document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Typewriter Effect Logic for the Hero Section ---
    const typewriterTextElement = document.getElementById('typewriter-text');
    const phrases = [
        "System Architect.",
        "Kafka Enthusiast.",
        "Optimizing Latency.",
        "Solving NP-Hard Problems."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBeforeNext = 1500;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex);
        } else {
            charIndex++;
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex);
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = delayBeforeNext;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(type, speed);
    }

    type();


    // --- 2. Dynamic Skills Population ---
    const skillsData = [
        { category: "Languages", skills: ["Java (Expert)", "Python", "GoLang", "C++"] },
        { category: "Backend", skills: ["Spring Boot", "Microservices", "REST/gRPC", "Kafka/RabbitMQ"] },
        { category: "Databases", skills: ["PostgreSQL", "MySQL", "Redis (Caching)", "MongoDB"] },
        { category: "DevOps/Cloud", skills: ["AWS (S3, EC2, Lambda)", "Docker", "Kubernetes (K8s)", "Terraform"] }
    ];

    const skillsGrid = document.querySelector('.skills-grid');

    skillsData.forEach(item => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = item.category;
        
        const skillList = document.createElement('ul');
        skillList.className = 'skill-list';

        item.skills.forEach(skill => {
            const listItem = document.createElement('li');
            listItem.textContent = skill;
            skillList.appendChild(listItem);
        });

        skillItem.appendChild(categoryHeader);
        skillItem.appendChild(skillList);
        skillsGrid.appendChild(skillItem);
    });
});
