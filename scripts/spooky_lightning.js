let someGuysLogo;

function preload() {
    someGuysLogo = loadImage("./some-guys-1.png");
}

let canvasWidth = 600;
let canvasHeight = 400;
let imgX = canvasWidth * 0.3;
let imgY = canvasHeight * 0.3;
let imgWidth = 200;
let imgHeight = 200;
let imgTextStartX = imgX + 20;
let imgTextEndX = imgX + 183;
let imgTextStartY = imgY + 50;
let imgTextEndY = imgY + 150;

let ghosts = [];
let numGhosts = 5;

let bloodDrops = [];
let numBloodDrops = 3;

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    for (i = 0; i < numGhosts; i++) {
        let x = int(random(0, canvasWidth));
        let y = int(random(0, canvasHeight));
        ghosts.push(new Ghost(x, y, 50, 100));
    }

    for (i = 0; i < numBloodDrops; i++) {
        let x = map(i, 0, numBloodDrops, imgTextStartX, imgTextEndX + 30);
        let y = random(imgTextStartY, imgTextEndY);
        let speed = 0;
        let acceleration = random(0.01, 0.1);
        bloodDrops.push(new BloodDrop(x, y, speed, acceleration));
    }
}

// Lightning
let lightingFrequencyInFrames = 200;
let lightningFlash = false;
let lightningDuration = 25;
let lightningTimer = 0;

function draw() {
    background(0, 0, 0);
    image(someGuysLogo, imgX, imgY, imgWidth, imgHeight);

    if (lightningFlash) {
        drawLightning(lightningTimer);
        lightningTimer++;
        if (lightningTimer > lightningDuration) {
            lightningFlash = false;
            lightningTimer = 0;
        }
    }

    if (frameCount % lightingFrequencyInFrames == 0) {
        console.log("LIGHTNING");
        lightningFlash = true;
        repositionGhosts();
    }

    drawBlood();
}

function drawLightning(lightningTimer) {
    let a = map(lightningTimer, 0, lightningDuration, 255, 0);
    background(255, 255, 255, a);
    drawGhosts(a);
    drawLightningBolt(a);
}

function drawGhosts(a) {
    for (ghost of ghosts) {
        ghost.display(a);
    }
}

function repositionGhosts() {
    for (ghost of ghosts) {
        ghost.x = int(random(0, canvasWidth));
        ghost.y = int(random(0, canvasHeight));
    }
}

function drawBlood() {
    for (bloodDrop of bloodDrops) {
        bloodDrop.display();
    }
}

function drawLightningBolt(a) {
    stroke(255, 255, 255, a);
    strokeWeight(3);
    // Draw a jagged lightning bolt using random points
    beginShape();
    let startX = random(100, 300);
    let startY = 0;
    vertex(startX, startY);
    for (let i = 0; i < 5; i++) {
        let x = startX + random(-30, 30);
        let y = startY + i * 80;
        vertex(x, y);
    }
    endShape();
}

class Ghost {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    display(a) {
        fill(255, 255, 255, a);
        // Body
        ellipse(this.x, this.y, this.width, this.height);
        // Eyes
        let eyeWidth = 5;
        let eyeHeight = 10;
        let leftEyeX = this.x - this.width * 0.2;
        let leftEyeY = this.y - this.height * 0.25;
        let rightEyeX = this.x + this.width * 0.2;
        let rightEyeY = this.y - this.height * 0.25;
        ellipse(leftEyeX, leftEyeY, eyeWidth, eyeHeight);
        ellipse(rightEyeX, rightEyeY, eyeWidth, eyeHeight);
    }
}

class BloodDrop {
    constructor(x, y, speed, acceleration) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.acceleration = acceleration;
    }

    display() {
        fill(150, 0, 0);
        ellipse(this.x, this.y, 5, 10);

        this.speed += this.acceleration;
        this.y += this.speed;

        if (this.y > canvasHeight) {
            this.y = imgY + 50;
            this.speed = 0;
        }
    }
}