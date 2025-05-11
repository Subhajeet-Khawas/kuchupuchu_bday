// Current step tracker
let currentStep = 1;

// Initialize confetti
const confettiCanvas = document.getElementById('confetti-canvas');

// Next step function
function nextStep(stepNumber) {
    // Hide current step
    document.getElementById(`step${stepNumber}`).classList.remove('active');
    
    // Show next step
    const nextStepNumber = stepNumber + 1;
    document.getElementById(`step${nextStepNumber}`).classList.add('active');
    
    // Update current step
    currentStep = nextStepNumber;
    
    // Scroll to top on mobile
    if (window.innerWidth < 768) {
        window.scrollTo(0, 0);
    }
    
    // Add special effects based on step transitions
    if (nextStepNumber === 3) {
        setTimeout(() => {
            const btn = document.querySelector("#step3 .love-btn");
            btn.classList.add('pulse');
        }, 1000);
    }
    
    if (nextStepNumber === 5) {
        setTimeout(() => {
            const btns = document.querySelectorAll('.game-buttons button');
            let delay = 0;
            btns.forEach(btn => {
                setTimeout(() => {
                    btn.style.opacity = '0';
                    btn.style.display = 'block';
                    btn.style.animation = 'fadeIn 0.5s forwards';
                }, delay);
                delay += 200;
            });
        }, 500);
    }
    
    if (nextStepNumber === 12) {
        setTimeout(() => {
            triggerSpecialConfetti();
        }, 500);
    }
}

// Show teasing message
function showTeasingMessage() {
    const message = document.getElementById('teasingMessage');
    message.classList.remove('hidden');
    
    // Apply shake animation
    message.style.animation = 'none';
    setTimeout(() => {
        message.style.animation = 'fadeIn 0.5s forwards';
    }, 10);
}

// Love notes reveal
function revealLoveNote(index) {
    // Hide the button
    event.target.classList.add('hidden');
    
    // Show the love note
    document.getElementById(`loveNote${index}`).classList.remove('hidden');
    
    // Add small heart animations
    addMiniHearts(5);
}

// Select trait function
function selectTrait(trait) {
    const responseElement = document.getElementById('traitResponse');
    const nextBtn = document.getElementById('traitNextBtn');
    
    // Clear previous response
    responseElement.innerHTML = '';
    
    // Different responses based on selection
    if (trait === 'All of the above') {
        responseElement.innerHTML = 'You got it! You are absolutely all of these things and so much more! ✨';
        // Add sparkle effect
        triggerSparkles();
    } else {
        responseElement.innerHTML = `Yes, you are definitely ${trait.toLowerCase()}! But that's just one of your many wonderful qualities! 💖`;
    }
    
    // Show response and next button
    responseElement.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

// Check birthday input
function checkBirthday() {
    const input = document.getElementById('birthdayInput').value.trim();
    const error = document.getElementById('birthdayError');
    
    // Get current date - for the special day
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${mm}/${dd}`;
    
    // Check if input matches today's date
    if (input === todayFormatted) {
        // Success! Move to next step
        nextStep(7);
        triggerConfetti();
    } else {
        // Show error message with hint
        error.classList.remove('hidden');
        
        // Apply shake animation to input
        const inputField = document.getElementById('birthdayInput');
        inputField.style.animation = 'none';
        setTimeout(() => {
            inputField.style.animation = 'shake 0.5s forwards';
        }, 10);
    }
}

// Unwrap gift animation
function unwrapGift() {
    const giftIcon = document.querySelector('.gift-icon');
    const giftMessage = document.getElementById('giftMessage');
    const nextBtn = document.getElementById('giftNextBtn');
    
    // Animate gift unwrapping
    giftIcon.style.animation = 'rotateOut 0.5s forwards';
    
    setTimeout(() => {
        giftIcon.style.display = 'none';
        giftMessage.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        
        // Trigger small confetti
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 500);
}

// Check riddle answer
function checkRiddle() {
    const input = document.getElementById('riddleInput').value.trim().toLowerCase();
    const hint = document.getElementById('riddleHint');
    
    // Check if answer is "love" or related
    if (input === 'love' || input === 'our love' || input === 'the love') {
        // Success! Move to next step
        nextStep(10);
        triggerConfetti();
    } else {
        // Show hint
        hint.classList.remove('hidden');
    }
}

// Show birthday letter
function showBirthdayMessage() {
    const letter = document.getElementById('birthdayLetter');
    letter.classList.add('active');
    letter.classList.remove('hidden');
    
    // Add animation
    document.body.style.overflow = 'hidden';
}

// Hide birthday letter
function hideBirthdayMessage() {
    const letter = document.getElementById('birthdayLetter');
    letter.classList.remove('active');
    
    setTimeout(() => {
        letter.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 500);
}

// Play birthday music
function playMusic() {
    const music = document.getElementById('birthdayMusic');
    
    if (music.paused) {
        music.play();
        // Change button text
        event.target.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
    } else {
        music.pause();
        // Change button text back
        event.target.innerHTML = '<i class="fas fa-music"></i> Play Birthday Music';
    }
}

// Animation functions
function triggerBalloons() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createBalloon();
        }, i * 300);
    }
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * 100 + 'vw';
    
    // Random balloon colors
    const colors = ['#ff6b9d', '#64d2ff', '#ffdf5a', '#8a2be2', '#50c878', '#ff7f50'];
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Random sizes
    const size = 40 + Math.random() * 40;
    balloon.style.width = size + 'px';
    balloon.style.height = size * 1.4 + 'px';
    
    // Random speed
    const duration = 7 + Math.random() * 7;
    balloon.style.animationDuration = duration + 's';
    
    document.body.appendChild(balloon);
    
    // Remove balloon after animation completes
    setTimeout(() => {
        balloon.remove();
    }, duration * 1000);
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function triggerSpecialConfetti() {
    // Multiple bursts of confetti
    const count = 200;
    const defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

function triggerHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 200);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Random sizes
    const size = 20 + Math.random() * 30;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    // Random opacity
    heart.style.opacity = 0.5 + Math.random() * 0.5;
    
    // Random speed
    const duration = 6 + Math.random() * 6;
    heart.style.animationDuration = duration + 's';
    
    document.body.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

function triggerSparkles() {
    // Create sparkle effect
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createSparkle();
        }, i * 100);
    }
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.backgroundColor = '#ffdf5a';
    sparkle.style.boxShadow = '0 0 10px 2px #ffdf5a';
    
    // Position around the trait response
    const container = document.getElementById('traitResponse');
    const rect = container.getBoundingClientRect();
    
    sparkle.style.left = rect.left - 20 + Math.random() * (rect.width + 40) + 'px';
    sparkle.style.top = rect.top - 20 + Math.random() * (rect.height + 40) + 'px';
    
    // Animation
    sparkle.style.animation = 'fadeIn 0.3s forwards, fadeOut 1s 0.5s forwards';
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation completes
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

// Add small decorative hearts
function addMiniHearts(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const miniHeart = document.createElement('div');
            miniHeart.style.position = 'absolute';
            miniHeart.style.width = '10px';
            miniHeart.style.height = '10px';
            miniHeart.style.background = '#e74c3c';
            miniHeart.style.transform = 'rotate(-45deg)';
            
            // Add before/after pseudo-elements via CSS
            miniHeart.style.boxShadow = 
                '5px -5px 0 0 #e74c3c, ' + 
                '5px 5px 0 0 #e74c3c';
            
            // Position around the button
            const loveBtn = event.target;
            const rect = loveBtn.getBoundingClientRect();
            
            miniHeart.style.left = rect.left - 10 + Math.random() * (rect.width + 20) + 'px';
            miniHeart.style.top = rect.top - 10 + Math.random() * (rect.height + 20) + 'px';
            
            // Animation
            miniHeart.style.animation = 'float 3s ease-out forwards';
            
            document.body.appendChild(miniHeart);
            
            // Remove mini heart after animation completes
            setTimeout(() => {
                miniHeart.remove();
            }, 3000);
        }, i * 200);
    }
}

// Add keyframe animation for new animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes rotateOut {
        0% { transform: rotate(0); }
        100% { transform: rotate(360deg) scale(0); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    
    @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);
