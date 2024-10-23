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

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  imageBounds.push(new ImageBoundaries(0, 120, 135, -1));
  imageBounds.push(new ImageBoundaries(10, 95, 155, -1));
  imageBounds.push(new ImageBoundaries(15, 90, 160, -1));
  imageBounds.push(new ImageBoundaries(20, 35, 165, -1));
  imageBounds.push(new ImageBoundaries(25, 30, 170, -1));
  imageBounds.push(new ImageBoundaries(50, 20, 185, -1));
  imageBounds.push(new ImageBoundaries(100, 68, 148, 1));
  imageBounds.push(new ImageBoundaries(150, 35, 193, 0));
  imageBounds.push(new ImageBoundaries(200, 15, 145, 1));
  imageBounds.push(new ImageBoundaries(250, 22, 125, 1));
  imageBounds.push(new ImageBoundaries(275, 40, 102, 0));
  imageBounds.push(new ImageBoundaries(295, 70, 90, 1));

  for (bound of imageBounds) {
    let drop = new BloodDrop(bound, 0, random(0.005, 0.02));
    bloodDrops.push(drop);
  }

  for (i = 0; i < numGhosts; i++) {
    let x = int(random(0, canvasWidth));
    let y = int(random(0, canvasHeight));
    let z = int(random(0, 500));
    ghosts.push(new Ghost(x, y, z, 100, 100, ghostImage));
  }
}

function mousePressed() {
  console.log("Mouse clicked at: " + mouseX + ", " + mouseY);
}

// Lightning
let lightingFrequencyInFrames = 200;
let lightningFlash = false;
let lightningDuration = 200;
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
  noFill(); // Prevents any unwanted fill color
  stroke(255, 255, 255, a); // Set stroke to white with opacity
  strokeWeight(3); // Set stroke weight for the bolt

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
  constructor(boundary, speed, acceleration, swayDirection) {
    this.boundary = boundary; // Store the boundary
    this.x = boundary.x;
    this.y = boundary.top;
    this.speed = speed;
    this.acceleration = acceleration;
    this.stuck = false; // Whether the drop is "hanging" at the bottom
    this.swayDirection = -1 * boundary.bottomSlope; // Direction for swaying (left or right)
    this.swayAmount = 0; // How much the drop sways
    this.hangTime = 15; // Number of frames to "hang" before falling
    this.isFalling = true; // If the drop is falling (not stuck)
    this.hasFallenOff = false; // Whether the drop has already fallen after swaying
  }

  display() {
    if (this.isFalling && !this.hasFallenOff) {
      // If falling, apply acceleration and make the drop move down
      this.speed += this.acceleration;
      this.y += this.speed;

      // Check if the drop hits the bottom of the boundary
      if (this.y >= this.boundary.bottom) {
        // Stick to the bottom and start swaying
        this.y = this.boundary.bottom;
        this.isFalling = false;
        this.stuck = true;
      }
    } else if (this.stuck) {
      // Sway the drop back and forth
      this.swayAmount += this.swayDirection * 0.25;

      // Decrease hang time
      this.hangTime--;

      // Once hang time is over, start falling again
      if (this.hangTime <= 0) {
        this.stuck = false;
        this.isFalling = true;
        this.hasFallenOff = true; // Mark that the drop has fallen off
        this.speed = 1; // Reset speed to avoid abrupt drops
        this.hangTime = 15; // Reset hang time for future cycles
      }
    }

    // If the drop has fallen off, apply acceleration and continue falling
    if (this.isFalling && this.hasFallenOff) {
      this.speed += this.acceleration;
      this.y += this.speed;
    }

    // Display the drop
    fill(150, 0, 0); // Main blood drop color
    stroke(0);
    strokeWeight(1);
    ellipse(this.x + this.swayAmount, this.y, 5, 10); // Main blood drop shape

    // Add shimmer or shine effect
    noStroke();
    fill(255, 150); // A light color with some transparency for the shine
    ellipse(this.x + this.swayAmount - 1, this.y - 2, 2, 4); // Small vertical shimmer near the top of the drop

    // Reset fill and stroke for future drawings
    stroke(0);
    fill(150, 0, 0);

    // If the drop falls past the canvas height, reset it
    if (this.y > canvasHeight) {
      this.y = this.boundary.top;
      this.speed = 0;
      this.isFalling = true; // Reset to falling state
      this.hasFallenOff = false; // Reset fall status
      this.hangTime = 15; // Reset hang time
      this.swayAmount = 0; // Reset sway
    }
  }
}

class ImageBoundaries {
  constructor(x, top, bottom, bottomSlope) {
    let X_OFFSET = imgX + 2;
    let Y_OFFSET = imgY;
    this.x = x + X_OFFSET;
    this.top = top + Y_OFFSET;
    this.bottom = bottom + Y_OFFSET;
    this.bottomSlope = bottomSlope;
  }
}
