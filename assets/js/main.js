document.addEventListener('DOMContentLoaded', () => {
    const countdownHours = document.querySelector('[data-countdown-hours]');
    const countdownMinutes = document.querySelector('[data-countdown-minutes]');
    const countdownSeconds = document.querySelector('[data-countdown-seconds]');

    if (countdownHours && countdownMinutes && countdownSeconds) {
        const campaignDuration = 10 * 60 * 60;
        const savedEnd = Number(localStorage.getItem('nanavesteCampaignEnd'));
        let campaignEnd = savedEnd && savedEnd > Date.now()
            ? savedEnd
            : Date.now() + campaignDuration * 1000;

        localStorage.setItem('nanavesteCampaignEnd', String(campaignEnd));

        const renderCountdown = () => {
            let remaining = Math.max(0, Math.floor((campaignEnd - Date.now()) / 1000));

            if (remaining === 0) {
                campaignEnd = Date.now() + campaignDuration * 1000;
                localStorage.setItem('nanavesteCampaignEnd', String(campaignEnd));
                remaining = campaignDuration;
            }

            const hours = Math.floor(remaining / 3600);
            const minutes = Math.floor((remaining % 3600) / 60);
            const seconds = remaining % 60;

            countdownHours.textContent = String(hours).padStart(2, '0');
            countdownMinutes.textContent = String(minutes).padStart(2, '0');
            countdownSeconds.textContent = String(seconds).padStart(2, '0');
        };

        renderCountdown();
        setInterval(renderCountdown, 1000);
    }

    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                navLinks.classList.remove('active');
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mantem o header estavel; a aparencia fixa dele fica no CSS.
});
