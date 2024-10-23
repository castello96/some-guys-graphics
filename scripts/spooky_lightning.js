let someGuysLogo;
let ghostImage;

function preload() {
  someGuysLogo = loadImage("./images/some-guys-1.png");
  ghostImage = loadImage("./images/ghost.png");
}

let canvasWidth = 600;
let canvasHeight = 400;
let imgX = canvasWidth * 0.25;
let imgY = canvasHeight * 0.25;
let imgWidth = 300;
let imgHeight = 200;
let imgTextStartX = imgX + 20;
let imgTextEndX = imgX + 183;
let imgTextStartY = imgY + 50;
let imgTextEndY = imgY + 150;
let imageBounds = [];

let ghosts = [];
let numGhosts = 5;

let bloodDrops = [];
let numBloodDrops = 3;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  imageBounds.push(new ImageBoundaries(0, 120, 135));
  imageBounds.push(new ImageBoundaries(10, 95, 155));
  imageBounds.push(new ImageBoundaries(15, 90, 160));
  imageBounds.push(new ImageBoundaries(20, 35, 165));
  imageBounds.push(new ImageBoundaries(25, 30, 170));
  imageBounds.push(new ImageBoundaries(50, 20, 185));
  imageBounds.push(new ImageBoundaries(100, 68, 148));
  imageBounds.push(new ImageBoundaries(150, 35, 193));
  imageBounds.push(new ImageBoundaries(200, 15, 145));
  imageBounds.push(new ImageBoundaries(250, 22, 125));
  imageBounds.push(new ImageBoundaries(275, 40, 102));
  imageBounds.push(new ImageBoundaries(295, 70, 90));

  for (bound of imageBounds) {
    let drop = new BloodDrop(bound, 0, random(0.005, 0.02));
    bloodDrops.push(drop);
  }

  for (i = 0; i < numGhosts; i++) {
    let x = int(random(0, canvasWidth));
    let y = int(random(0, canvasHeight));
    let z = int(random(0, 100));
    ghosts.push(new Ghost(x, y, z, 100, 100, ghostImage));
  }
}

function mousePressed() {
  console.log("Mouse clicked at: " + mouseX + ", " + mouseY);
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
  constructor(x, y, z, width, height, image) {
    this.x = x;
    this.y = y;
    this.z = z; // z value to simulate distance
    this.width = width;
    this.height = height;
    this.image = image;
  }

  display(a) {
    // Use tint() to set the transparency (a)
    tint(255, a); // a is the alpha value (0 = transparent, 255 = opaque)

    // Simulate distance by adjusting size based on z
    let scaleFactor = map(this.z, 0, 100, 1, 0.5); // Modify the range as needed

    // Apply the scaling based on z to width and height
    let scaledWidth = this.width * scaleFactor;
    let scaledHeight = this.height * scaleFactor;

    // Display the image with the adjusted size and opacity
    image(this.image, this.x, this.y, scaledWidth, scaledHeight);

    // Reset tint to default (full opacity) for any subsequent drawings
    noTint();
  }
}

class BloodDrop {
  constructor(path, speed, acceleration) {
    this.path = path;
    this.x = path.x;
    this.y = path.top;
    this.speed = speed;
    this.acceleration = acceleration;
  }

  display() {
    stroke(0); // Set the outline color to black
    strokeWeight(1); // Set the outline thickness
    fill(150, 0, 0);
    ellipse(this.x, this.y, 5, 10);

    this.speed += this.acceleration;
    this.y += this.speed;

    if (this.y > canvasHeight) {
      this.y = this.path.top;
      this.speed = 0;
    }
  }
}

class ImageBoundaries {
  constructor(x, top, bottom) {
    let X_OFFSET = imgX + 2;
    let Y_OFFSET = imgY;
    this.x = x + X_OFFSET;
    this.top = top + Y_OFFSET;
    this.bottom = bottom + Y_OFFSET;
  }
}
