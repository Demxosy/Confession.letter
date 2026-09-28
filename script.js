/* =========================================================
   MYRA — CONFESSION LETTER
   Interactive romantic letter experience
   ========================================================= */


/* ---------- Element references ---------- */

const envelope = document.getElementById("envelope");
const introScreen = document.getElementById("introScreen");
const letterScreen = document.getElementById("letterScreen");
const letterPaper = document.getElementById("letterPaper");
const questionCard = document.getElementById("questionCard");
const celebrationScreen = document.getElementById("celebrationScreen");

const closeLetter = document.getElementById("closeLetter");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const pleaText = document.getElementById("pleaText");
const restartBtn = document.getElementById("restartBtn");

const confettiContainer = document.getElementById("confettiContainer");
const floatingHearts = document.getElementById("floatingHearts");


/* =========================================================
   CONFIGURATION
   ========================================================= */

const HEART_EMOJIS = [
  "💗",
  "💖",
  "💕",
  "💘",
  "💝",
  "❤️",
  "🌸",
  "✨"
];

const NO_MESSAGES = [
  "That's completely okay. ❤️",
  "Take your time, Myra.",
  "No pressure — your feelings matter. 🌷",
  "I'll respect whatever your heart says. 💗",
  "Maybe the answer needs a little time. ✨"
];

const YES_MESSAGES = [
  "You just made my heart smile. 💖",
  "Some answers are worth waiting for. ✨",
  "And suddenly, this little letter means everything. 💗"
];

let letterOpened = false;
let isCelebrating = false;
let noClicks = 0;

let heartInterval;
let typingTimeout;


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/* =========================================================
   FLOATING HEARTS
   ========================================================= */

function spawnFloatingHeart() {
  if (!floatingHearts) return;

  const heart = document.createElement("span");

  heart.className = "float-heart";
  heart.textContent = randomItem(HEART_EMOJIS);

  heart.style.left = `${random(0, 100)}%`;
  heart.style.fontSize = `${random(0.8, 1.8)}rem`;
  heart.style.animationDuration = `${random(6, 12)}s`;

  heart.style.animationDelay = `${random(0, 1)}s`;

  floatingHearts.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}


/* Start background hearts */

function startFloatingHearts() {
  if (heartInterval) return;

  heartInterval = setInterval(() => {
    spawnFloatingHeart();
  }, 850);

  // Initial hearts
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      spawnFloatingHeart();
    }, i * 220);
  }
}

startFloatingHearts();


/* =========================================================
   ENVELOPE OPENING
   ========================================================= */

async function openEnvelope() {

  if (letterOpened) return;

  letterOpened = true;

  // Add opening animation
  envelope.classList.add("open");

  // Small pause so the envelope animation can breathe
  await wait(900);

  // Fade out intro
  introScreen.classList.add("hidden");

  // Show letter
  letterScreen.classList.remove("hidden");

  // Make sure letter is visible
  letterPaper.classList.remove("hidden");

  // Start romantic reveal
  revealLetter();

  // Wait before showing the question
  await wait(3500);

  if (!letterOpened) return;

  questionCard.classList.remove("hidden");

  // Scroll smoothly on smaller screens
  setTimeout(() => {
    questionCard.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 200);
}


/* Click */

envelope.addEventListener("click", openEnvelope);


/* Keyboard accessibility */

envelope.addEventListener("keydown", event => {

  if (event.key === "Enter" || event.key === " ") {

    event.preventDefault();

    openEnvelope();
  }
});


/* =========================================================
   LETTER REVEAL
   ========================================================= */

function revealLetter() {

  if (!letterPaper) return;

  letterPaper.classList.add("letter-reading");

  // Add a subtle sparkle effect
  createLetterSparkles();
}


/* =========================================================
   LETTER SPARKLES
   ========================================================= */

function createLetterSparkles() {

  const sparkleCount = window.innerWidth < 600 ? 8 : 14;

  for (let i = 0; i < sparkleCount; i++) {

    setTimeout(() => {

      const sparkle = document.createElement("span");

      sparkle.className = "letter-sparkle";
      sparkle.textContent = "✦";

      sparkle.style.left = `${random(5, 95)}%`;
      sparkle.style.top = `${random(5, 95)}%`;

      sparkle.style.animationDelay = `${random(0, 0.5)}s`;

      letterPaper.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1800);

    }, i * 120);
  }
}


/* =========================================================
   CLOSE LETTER
   ========================================================= */

function closeLetterAndReset() {

  letterOpened = false;

  questionCard.classList.add("hidden");
  letterScreen.classList.add("hidden");
  celebrationScreen.classList.add("hidden");

  introScreen.classList.remove("hidden");

  envelope.classList.remove("open");

  resetQuestion();

  // Return to top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


closeLetter.addEventListener("click", closeLetterAndReset);


/* =========================================================
   QUESTION RESET
   ========================================================= */

function resetQuestion() {

  noClicks = 0;

  pleaText.textContent = "";

  yesBtn.style.transform = "";
  noBtn.style.transform = "";

  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";

  noBtn.textContent = "No 💔";

  questionCard.style.minHeight = "";
}


/* =========================================================
   NO BUTTON
   ---------------------------------------------------------
   Playful movement, but it remains selectable.
   ========================================================= */

noBtn.addEventListener("click", () => {

  noClicks++;

  const messageIndex = Math.min(
    noClicks - 1,
    NO_MESSAGES.length - 1
  );

  pleaText.textContent = NO_MESSAGES[messageIndex];

  // Small playful movement instead of trapping the button
  if (noClicks <= 3) {

    const movement = noClicks * 6;

    noBtn.style.transform =
      `translateX(${Math.random() > 0.5 ? movement : -movement}px)`;
  }

  // Eventually return it to normal
  if (noClicks >= 4) {

    noBtn.style.transform = "scale(0.98)";

    setTimeout(() => {
      noBtn.style.transform = "";
    }, 350);
  }

  // Gentle feedback
  noBtn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.94)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 300,
      easing: "ease-out"
    }
  );
});


/* =========================================================
   YES BUTTON
   ========================================================= */

yesBtn.addEventListener("click", acceptConfession);


async function acceptConfession() {

  if (isCelebrating) return;

  isCelebrating = true;

  pleaText.textContent = randomItem(YES_MESSAGES);

  // Button feedback
  yesBtn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.12)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 500,
      easing: "ease-out"
    }
  );

  await wait(500);

  letterScreen.classList.add("hidden");

  celebrationScreen.classList.remove("hidden");

  // Scroll to celebration
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // Romantic effects
  launchConfetti();
  createHeartBurst();

  // Extra floating hearts
  romanticHeartRain();

  isCelebrating = false;
}


/* =========================================================
   HEART BURST
   ========================================================= */

function createHeartBurst() {

  const burstCount = window.innerWidth < 600 ? 20 : 35;

  for (let i = 0; i < burstCount; i++) {

    const heart = document.createElement("span");

    heart.className = "burst-heart";

    heart.textContent = randomItem([
      "💖",
      "💗",
      "💕",
      "💘",
      "✨"
    ]);

    heart.style.left = "50%";
    heart.style.top = "40%";

    const angle = Math.random() * Math.PI * 2;
    const distance = random(100, 300);

    heart.style.setProperty(
      "--x",
      `${Math.cos(angle) * distance}px`
    );

    heart.style.setProperty(
      "--y",
      `${Math.sin(angle) * distance}px`
    );

    heart.style.animationDelay =
      `${Math.random() * 0.25}s`;

    confettiContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1800);
  }
}


/* =========================================================
   ROMANTIC HEART RAIN
   ========================================================= */

function romanticHeartRain() {

  const amount = window.innerWidth < 600 ? 25 : 45;

  for (let i = 0; i < amount; i++) {

    setTimeout(() => {

      const heart = document.createElement("span");

      heart.className = "celebration-heart";

      heart.textContent = randomItem([
        "💗",
        "💖",
        "💕",
        "💘"
      ]);

      heart.style.left = `${random(0, 100)}%`;

      heart.style.fontSize =
        `${random(1, 2.2)}rem`;

      heart.style.animationDuration =
        `${random(3, 6)}s`;

      confettiContainer.appendChild(heart);

      heart.addEventListener("animationend", () => {
        heart.remove();
      });

    }, i * 80);
  }
}


/* =========================================================
   CONFETTI
   ========================================================= */

function launchConfetti() {

  if (!confettiContainer) return;

  confettiContainer.innerHTML = "";

  const confettiCount =
    window.innerWidth < 600 ? 70 : 120;

  const shapes = [
    "square",
    "circle",
    "heart"
  ];

  const colors = [
    "#ff4d6d",
    "#ff8fa3",
    "#ffd166",
    "#e8b04b",
    "#c9184a",
    "#ffccd5"
  ];

  for (let i = 0; i < confettiCount; i++) {

    const piece = document.createElement("span");

    piece.className = "confetti";

    const shape = randomItem(shapes);

    if (shape === "heart") {
      piece.textContent = "♥";
      piece.style.background = "transparent";
      piece.style.color = randomItem(colors);
      piece.style.fontSize = `${random(0.8, 1.4)}rem`;
      piece.style.width = "auto";
      piece.style.height = "auto";
    } else {

      piece.style.backgroundColor =
        randomItem(colors);

      piece.style.width =
        `${random(6, 12)}px`;

      piece.style.height =
        `${random(8, 18)}px`;

      if (shape === "circle") {
        piece.style.borderRadius = "50%";
      }
    }

    piece.style.left =
      `${random(-5, 105)}%`;

    piece.style.animationDuration =
      `${random(2.5, 5)}s`;

    piece.style.animationDelay =
      `${random(0, 1.2)}s`;

    piece.style.transform =
      `rotate(${random(0, 360)}deg)`;

    confettiContainer.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}


/* =========================================================
   RESTART
   ========================================================= */

restartBtn.addEventListener("click", async () => {

  confettiContainer.innerHTML = "";

  celebrationScreen.classList.add("hidden");

  introScreen.classList.remove("hidden");

  letterScreen.classList.add("hidden");

  questionCard.classList.add("hidden");

  envelope.classList.remove("open");

  letterOpened = false;
  isCelebrating = false;

  resetQuestion();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // Tiny pause before the envelope becomes interactive again
  await wait(300);

  envelope.focus();
});


/* =========================================================
   TOUCH / MOBILE POLISH
   ========================================================= */

document.addEventListener(
  "touchstart",
  () => {},
  { passive: true }
);


/* =========================================================
   REDUCE MOTION SUPPORT
   ---------------------------------------------------------
   Helpful for visitors who have enabled reduced motion.
   ========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


function handleReducedMotion() {

  if (prefersReducedMotion.matches) {

    document.documentElement.classList.add(
      "reduced-motion"
    );

  } else {

    document.documentElement.classList.remove(
      "reduced-motion"
    );
  }
}


handleReducedMotion();


prefersReducedMotion.addEventListener(
  "change",
  handleReducedMotion
);


/* =========================================================
   PAGE VISIBILITY
   ---------------------------------------------------------
   Saves battery when the tab is hidden.
   ========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if (document.hidden) {

      clearInterval(heartInterval);
      heartInterval = null;

    } else {

      startFloatingHearts();
    }

  }
);