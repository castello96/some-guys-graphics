let img;
let bats = [];
let numBats = 10;
let flicker = 255;
let flickerDirection = -15;
let mistParticles = [];
let ghosts = [];
let numGhosts = 3;
let glowColor = 255;

// Preload the background image and sound effects (if desired)
function preload() {
    img = loadImage("./images/some-guys-1.png"); // Replace with your image URL or local path
    // spookySound = loadSound('./spooky-sound.mp3'); // Add your own spooky sound effects
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);

    // Create bats with random positions and speeds
    for (let i = 0; i < numBats; i++) {
        bats.push({
            x: random(-100, width + 100),
            y: random(height / 2),
            speedX: random(3, 7),
            speedY: random(-1, 1),
        });
    }

    // Create mist particles
    for (let i = 0; i < 150; i++) {
        mistParticles.push({
            x: random(width),
            y: random(height),
            speedX: random(-0.8, 0.8),
            speedY: random(0, 0.5),
            size: random(10, 30),
            alpha: random(30, 80),
        });
    }

    // Create ghosts floating around
    for (let i = 0; i < numGhosts; i++) {
        ghosts.push({
            x: random(width),
            y: random(height / 2),
            speedX: random(1, 3),
            speedY: random(0.5, 1),
            size: random(100, 150),
        });
    }

    // Optional: Play spooky sound effects (uncomment after adding sound files)
    // spookySound.loop();
}

function draw() {
    background(0);

    // Flickering light effect for spookiness
    flicker += flickerDirection;
    if (flicker < 50 || flicker > 255) flickerDirection *= -1;

    // Draw flickering background image
    tint(flicker); // Adjust brightness of the image based on flickering
    image(img, width / 2, height / 2, width, height); // Full screen backdrop

    // Draw moving mist
    drawMist();

    // Draw flying bats
    drawBats();

    // Draw floating ghosts
    drawGhosts();

    // Draw the spooky glowing text
    drawText();
}

// Function to draw bats
function drawBats() {
    for (let i = 0; i < bats.length; i++) {
        let bat = bats[i];

        // Draw a bat as a simple black shape (you can replace this with a bat image if desired)
        fill(50);
        noStroke();
        ellipse(bat.x, bat.y, 60, 20); // Bat body
        triangle(
            bat.x - 30,
            bat.y,
            bat.x - 55,
            bat.y - 25,
            bat.x - 30,
            bat.y - 50
        ); // Left wing
        triangle(
            bat.x + 30,
            bat.y,
            bat.x + 55,
            bat.y - 25,
            bat.x + 30,
            bat.y - 50
        ); // Right wing

        // Move bats across the screen
        bat.x -= bat.speedX;
        bat.y += bat.speedY;

        // Reset bat position when it flies off screen
        if (bat.x < -100) {
            bat.x = width + 100;
            bat.y = random(height / 2);
            bat.speedX = random(3, 7);
            bat.speedY = random(-1, 1);
        }
    }
}

// Function to draw moving mist
function drawMist() {
    for (let i = 0; i < mistParticles.length; i++) {
        let mist = mistParticles[i];

        fill(255, mist.alpha);
        noStroke();
        ellipse(mist.x, mist.y, mist.size);

        // Move mist particles
        mist.x += mist.speedX;
        mist.y += mist.speedY;

        // Reset position when mist goes off screen
        if (mist.y > height) {
            mist.x = random(width);
            mist.y = 0;
        }
    }
}

// Function to draw floating ghosts
function drawGhosts() {
    for (let i = 0; i < ghosts.length; i++) {
        let ghost = ghosts[i];

        // Draw a translucent ghost with a creepy look
        fill(255, 255, 255, 120);
        noStroke();
        ellipse(ghost.x, ghost.y, ghost.size, ghost.size * 1.5); // Ghost body
        ellipse(ghost.x - 20, ghost.y - 30, 30, 40); // Left eye
        ellipse(ghost.x + 20, ghost.y - 30, 30, 40); // Right eye

        // Move ghosts slowly across the screen
        ghost.x += ghost.speedX;
        ghost.y += ghost.speedY;

        // Reset position when ghosts move off screen
        if (ghost.x > width + 100) {
            ghost.x = -100;
            ghost.y = random(height / 2);
        }
    }
}

// Function to draw spooky glowing text
function drawText() {
    glowColor = map(sin(frameCount * 0.05), -1, 1, 100, 255); // Make the text glow and pulse

    textAlign(CENTER, CENTER);
    textSize(80);
    fill(glowColor, 0, 0); // Glowing red text
    text("Halloween Band Party", width / 2, height * 0.15);

    textSize(40);
    fill(glowColor, 150, 150);
    text("Beware of the Ghostly Guests!", width / 2, height * 0.25);
}
