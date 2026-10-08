/* =====================================================
   DIYA'S BIRTHDAY WEBSITE
   Vanilla JavaScript
===================================================== */


/* =====================================================
   SCREEN NAVIGATION
===================================================== */

let currentScreen = 1;

function goTo(number) {

    document.querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });

    const next = document.getElementById("screen" + number);

    if (next) {
        next.classList.add("active");
        currentScreen = number;
    }
}


/* =====================================================
   START
===================================================== */

function startAdventure() {

    playPop();

    goTo(2);

    setTimeout(moveCat, 700);
}


/* =====================================================
   CAT GAME
===================================================== */

let catScore = 0;

function catchCat() {

    catScore++;

    document.getElementById("catScore").textContent = catScore;

    playPop();

    const messages = [
        "HEY! 😭",
        "STOP CHASING ME 😭",
        "NOOOO 😼",
        "YOU GOT ME!",
        "okay okay... 😂"
    ];

    document.getElementById("catMessage")
        .textContent =
        messages[Math.floor(Math.random() * messages.length)];

    createMiniConfetti();

    if (catScore >= 3) {

        document.getElementById("catMessage")
            .textContent =
            "MISSION COMPLETE! The cat gives up. 😭🐱";

        setTimeout(() => {

            goTo(3);

        }, 1200);

        return;
    }

    moveCat();
}


function moveCat() {

    const cat = document.getElementById("runningCat");
    const arena = document.getElementById("catArena");

    const maxX = arena.clientWidth - 95;
    const maxY = arena.clientHeight - 95;

    const x = Math.max(
        10,
        Math.random() * maxX
    );

    const y = Math.max(
        10,
        Math.random() * maxY
    );

    cat.style.left = x + "px";
    cat.style.top = y + "px";

    const rotation =
        Math.random() * 30 - 15;

    cat.style.transform =
        `translate(-50%, -50%) rotate(${rotation}deg)`;
}


/* =====================================================
   FLOWERS
===================================================== */

function openFlowers() {

    const bouquet =
        document.querySelector(".bouquet");

    bouquet.classList.add("opened");

    document.getElementById("flowerMessage")
        .textContent =
        "For the prettiest girl — tulips + roses because you deserve both. 🌷🌹";

    document.getElementById("flowerNext")
        .classList.remove("hidden");

    createConfetti(25);

    playPop();
}


/* =====================================================
   CAKE
===================================================== */

let candlesOut = 0;
let cakeCut = false;

function blowCandle(candle) {

    if (candle.classList.contains("out")) {
        return;
    }

    candle.classList.add("out");

    candlesOut++;

    playPop();

    if (candlesOut === 1) {

        document.getElementById("cakeInstruction")
            .textContent =
            "One candle down! Make your wish... ✨";

    }

    if (candlesOut === 3) {

        document.getElementById("cakeInstruction")
            .textContent =
            "All candles are out! Now cut your cake! 🎂";

        document.getElementById("cakeButton")
            .textContent =
            "🔪 CUT THE CAKE";

        createConfetti(45);
    }
}


function cutCake() {

    if (cakeCut) return;

    cakeCut = true;

    document.getElementById("cakeMessage")
        .textContent =
        "🎂 CAKE CUT! HAPPY 17TH BIRTHDAY DIYA! 💗";

    document.getElementById("cakeButton")
        .textContent =
        "Cake successfully delivered 😭💗";

    createConfetti(80);

    playCelebrationSound();

    setTimeout(() => {

        goTo(5);

    }, 2500);
}


/* =====================================================
   VIDEO
===================================================== */

function changeVideo(videoName) {

    const video =
        document.getElementById("memoryVideo");

    video.pause();

    video.src = videoName;

    video.load();

    video.play().catch(() => {
        // Browser may block autoplay.
    });
}


/* =====================================================
   FINAL CELEBRATION
===================================================== */

function finalCelebration() {

    createConfetti(150);

    playCelebrationSound();

    document.getElementById("celebration")
        .classList.add("show");

}


function closeCelebration() {

    document.getElementById("celebration")
        .classList.remove("show");

    catScore = 0;

    candlesOut = 0;

    cakeCut = false;

    document.getElementById("catScore")
        .textContent = "0";

    document.querySelectorAll(".candle")
        .forEach(candle => {
            candle.classList.remove("out");
        });

    document.getElementById("cakeButton")
        .textContent = "🎂 Cut the cake";

    document.getElementById("cakeInstruction")
        .textContent =
        "Make a wish and blow out the candles 🕯️";

    goTo(1);
}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti(amount = 50) {

    const container =
        document.getElementById("confetti");

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti-piece";

        const colors = [
            "#ff72a8",
            "#ffb4d2",
            "#cba8ff",
            "#ffd166",
            "#8fe3cf",
            "#ffffff"
        ];

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.animationDelay =
            Math.random() * .8 + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 4000);
    }
}


function createMiniConfetti() {
    createConfetti(12);
}


/* =====================================================
   SOUND EFFECTS
   No external audio files needed.
===================================================== */

function playPop() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        const audio =
            new AudioContext();

        const oscillator =
            audio.createOscillator();

        const gain =
            audio.createGain();

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            500,
            audio.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            900,
            audio.currentTime + .08
        );

        gain.gain.setValueAtTime(
            .12,
            audio.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            .001,
            audio.currentTime + .12
        );

        oscillator.connect(gain);

        gain.connect(audio.destination);

        oscillator.start();

        oscillator.stop(
            audio.currentTime + .12
        );

    } catch (error) {

        console.log("Audio unavailable");

    }
}


function playCelebrationSound() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        const audio =
            new AudioContext();

        const notes = [
            523.25,
            659.25,
            783.99,
            1046.50
        ];

        notes.forEach((frequency, index) => {

            const oscillator =
                audio.createOscillator();

            const gain =
                audio.createGain();

            oscillator.type = "sine";

            oscillator.frequency.value =
                frequency;

            gain.gain.setValueAtTime(
                .001,
                audio.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                .12,
                audio.currentTime +
                index * .15
            );

            gain.gain.exponentialRampToValueAtTime(
                .001,
                audio.currentTime +
                index * .15 +
                .35
            );

            oscillator.connect(gain);

            gain.connect(audio.destination);

            oscillator.start(
                audio.currentTime +
                index * .15
            );

            oscillator.stop(
                audio.currentTime +
                index * .15 +
                .4
            );

        });

    } catch (error) {

        console.log("Audio unavailable");

    }
}


/* =====================================================
   MOBILE TOUCH EFFECT
===================================================== */

document.addEventListener(
    "touchstart",
    () => {

        // Helps unlock audio on some mobile browsers.
        try {
            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (AudioContext) {
                const ctx = new AudioContext();

                if (ctx.state === "suspended") {
                    ctx.resume();
                }
            }
        } catch (e) {}

    },
    { once: true }
);


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            document
                .getElementById("celebration")
                .classList.remove("show");
        }

    }
);2