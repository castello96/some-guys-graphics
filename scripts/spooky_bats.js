let img;
let bats = [];
let numBats = 10;
let flicker = 255;
let flickerDirection = -10;
let mistParticles = [];

function preload() {
    img = loadImage("./some-guys-1.png"); // Replace with your image URL or local path
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);

    // Create bats with random positions and speeds
    for (let i = 0; i < numBats; i++) {
        bats.push({
            x: random(-100, width + 100),
            y: random(height / 2),
            speedX: random(2, 5),
            speedY: random(-1, 1),
        });
    }

    // Create mist particles
    for (let i = 0; i < 100; i++) {
        mistParticles.push({
            x: random(width),
            y: random(height),
            speedX: random(-0.5, 0.5),
            speedY: random(0, 0.5),
            size: random(10, 20),
            alpha: random(50, 150),
        });
    }
}

function draw() {
    background(0);

    // Flickering light effect for spookiness
    flicker += flickerDirection;
    if (flicker < 100 || flicker > 255) flickerDirection *= -1;
    tint(flicker); // Adjust brightness of the image based on flickering
    image(img, width / 2, height / 2, width, height); // Full screen backdrop

    // Draw flying bats
    drawBats();

    // Draw moving mist
    drawMist();

    // Add some creepy text to set the Halloween party vibe
    drawText();
}

// Function to draw bats
function drawBats() {
    for (let i = 0; i < bats.length; i++) {
        let bat = bats[i];

        // Draw a bat as a simple black shape (you can replace this with a bat image if desired)
        fill(50, 50, 50);
        noStroke();
        ellipse(bat.x, bat.y, 50, 20); // Bat body
        triangle(
            bat.x - 25,
            bat.y,
            bat.x - 50,
            bat.y - 20,
            bat.x - 25,
            bat.y - 40
        ); // Left wing
        triangle(
            bat.x + 25,
            bat.y,
            bat.x + 50,
            bat.y - 20,
            bat.x + 25,
            bat.y - 40
        ); // Right wing

        // Move bats across the screen
        bat.x -= bat.speedX;
        bat.y += bat.speedY;

        // Reset bat position when it flies off screen
        if (bat.x < -100) {
            bat.x = width + 100;
            bat.y = random(height / 2);
            bat.speedX = random(2, 5);
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

// Function to draw spooky text
function drawText() {
    textAlign(CENTER, CENTER);
    textSize(60);
    fill(255, 100, 100, flicker); // Flickering red text for spookiness
    text("Halloween Band Party", width / 2, height * 0.1);

    textSize(40);
    fill(255, 150, 150, flicker);
    text("Get Ready for a Spooky Night!", width / 2, height * 0.2);
}
