let flashState = false;
let neonGlow = 0;

// Define variables for magic numbers
const canvasWidth = 700;
const canvasHeight = 500;
const marqueeX = 50;
const marqueeY = 100;
const marqueeWidth = 600;
const marqueeHeight = 300;
const neonLineWidth = 460;
const gridWidth = 500;
const gridHeight = 180;
const gridX = 100;
const gridY = 180;
const textYOffset = 50;
const pinkLineY1 = 380;
const pinkLineY2 = 390;
const zigzagHeight = 20;
const zigzagWidth = 80;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  textAlign(CENTER, CENTER);
  frameRate(2); // Flashing lights rate
}

function draw() {
  background(0);

  // Neon glow effect for "Palace"
  neonGlow = flashState ? 255 : 150;

  // Draw marquee frame
  fill(50); // Dark gray background
  stroke(255, 204, 0); // Neon yellow glow
  strokeWeight(10);
  rect(marqueeX, marqueeY, marqueeWidth, marqueeHeight, 20); // Main marquee body

  noStroke();

  // Draw straight pink neon circles overlapping on a straight line
  drawWavyNeon(120, 185, neonLineWidth, color(255, 105, 180)); // Pink neon circles

  // Flashing lights around the marquee
  drawLights();

  // Draw vertical blue neon side bars
  drawNeonLine(marqueeX, marqueeY, marqueeX, marqueeY + marqueeHeight, color(0, 0, 255)); // Left vertical blue
  drawNeonLine(marqueeX + marqueeWidth, marqueeY, marqueeX + marqueeWidth, marqueeY + marqueeHeight, color(0, 0, 255)); // Right vertical blue

  // Draw white background with light grid for "Some Guys" and "Thriller"
  drawGridBackground();

  // Draw "PALACE" text with neon glow
  drawPalaceText();

  // Draw "Some Guys" and "Thriller" in black, centered in the white grid
  fill(0); // Black text for movie title
  textSize(40);
  text("SOME GUYS", width / 2, height / 2 - textYOffset); // Adjusted Y position for centering
  textSize(35);
  text("THRILLER", width / 2, height / 2 + textYOffset); // Adjusted Y position for centering

  // Draw pink neon bars at the bottom and stop them before reaching the center
  let lineEnd = width / 2 - zigzagWidth / 2 - 10; // Distance before center
  drawNeonLine(80, pinkLineY1, lineEnd, pinkLineY1, color(255, 105, 180)); // Bottom pink neon line 1
  drawNeonLine(80, pinkLineY2, lineEnd, pinkLineY2, color(255, 105, 180)); // Bottom pink neon line 2

  // Draw yellow zigzag neon line in the center
  drawZigZagLine(lineEnd + 10, zigzagHeight, color(255, 255, 0));

  flashState = !flashState; // Toggle lights
}

// Function to draw reusable neon line with an outline to simulate glow
function drawNeonLine(x1, y1, x2, y2, c) {
  let glowColor = lerpColor(c, color(0), 0.6); // Darker shade for glow
  stroke(glowColor); // Draw outer glow first
  strokeWeight(10);
  line(x1, y1, x2, y2);

  stroke(c); // Draw the bright neon inner line
  strokeWeight(4);
  line(x1, y1, x2, y2);
}

// Function to draw overlapping pink neon circles in a straight line
function drawWavyNeon(xStart, yStart, waveWidth, c) {
  let numCircles = 25; // Number of circles to create the effect
  let circleSpacing = waveWidth / numCircles;

  noFill();
  stroke(lerpColor(c, color(0), 0.6)); // Darker shade for the outer glow
  strokeWeight(6); // Outer glow weight

  // Draw outer glow circles in a straight line
  for (let i = 0; i <= numCircles; i++) {
    let x = xStart + i * circleSpacing;
    let y = yStart;
    ellipse(x, y, 20, 20); // Overlapping circles in a straight line
  }

  stroke(c); // Bright pink neon
  strokeWeight(2); // Inner neon line

  // Draw bright neon circles in a straight line
  for (let i = 0; i <= numCircles; i++) {
    let x = xStart + i * circleSpacing;
    let y = yStart;
    ellipse(x, y, 20, 20); // Overlapping circles in a straight line
  }
}

// Function to draw yellow zigzag neon line in the center
function drawZigZagLine(xStart, height, c) {
  let segments = 6;
  let segmentWidth = zigzagWidth / segments;

  stroke(c);
  strokeWeight(4);
  let currentY = pinkLineY1;

  for (let i = 0; i < segments; i++) {
    let nextX = xStart + segmentWidth;
    let nextY = currentY === pinkLineY1 ? pinkLineY1 + height : pinkLineY1;
    line(xStart, currentY, nextX, nextY);
    xStart = nextX;
    currentY = nextY;
  }
}

// Function to draw flashing lights around the marquee
function drawLights() {
  let lightSize = 20;

  // Top row of lights
  for (let x = 80; x < width - 80; x += 40) {
    fill(flashState ? color(255, 255, 0) : color(255, 0, 0)); // Alternate lights between red and yellow
    ellipse(x, 80, lightSize, lightSize);
  }

  // Bottom row of lights
  for (let x = 80; x < width - 80; x += 40) {
    fill(flashState ? color(255, 255, 0) : color(255, 0, 0));
    ellipse(x, 410, lightSize, lightSize);
  }

  // Left column of lights
  for (let y = 100; y < 400; y += 40) {
    fill(flashState ? color(255, 255, 0) : color(255, 0, 0));
    ellipse(70, y, lightSize, lightSize);
  }

  // Right column of lights
  for (let y = 100; y < 400; y += 40) {
    fill(flashState ? color(255, 255, 0) : color(255, 0, 0));
    ellipse(width - 70, y, lightSize, lightSize);
  }
}

// Function to draw the "PALACE" neon sign with glow effect
function drawPalaceText() {
  // Neon glow background for "PALACE"
  textSize(100);
  fill(neonGlow, 102, 0, 150); // Neon orange with transparency
  text("PALACE", width / 2, 140);

  // Actual "PALACE" text
  fill(255, 102, 0); // Bright neon orange
  text("PALACE", width / 2, 140);
}

// Function to draw the grid background behind the movie titles
function drawGridBackground() {
  fill(255); // White background
  rect(gridX, gridY, gridWidth, gridHeight);

  stroke(200); // Light gray grid lines
  strokeWeight(1);

  for (let x = gridX + 20; x < gridX + gridWidth; x += 40) {
    line(x, gridY, x, gridY + gridHeight); // Vertical grid lines
  }
  for (let y = gridY; y < gridY + gridHeight; y += 40) {
    line(gridX, y, gridX + gridWidth, y); // Horizontal grid lines
  }
  noStroke();
}
