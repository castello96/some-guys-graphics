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
const gridWidth = 540;
const gridHeight = 175;
const gridX = 80;
const gridY = 200;
const textYOffset = 40;
const pinkLineY1 = 380;
const pinkLineY2 = 390;
const zigzagHeight = 20;
const zigzagWidth = 80;

// Fonts
let fontNeonderthaw;

function preload(){
  fontNeonderthaw = loadFont('../fonts/Neonderthaw/Neonderthaw-Regular.ttf');
}

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

  // Draw horizontal neon lines behind the "Palace" text
  drawHorizontalNeonLines(
    marqueeX + 20,
    170,
    marqueeWidth - 40,
    color(14, 152, 118)
  );

  // Draw straight pink neon circles overlapping on a straight line
  drawWavyNeon(120, 185, neonLineWidth, color(255, 105, 180)); // Pink neon circles

  let verticalLineOffset = 20;
  // Draw vertical blue neon side bars
  drawNeonLine(
    marqueeX,
    marqueeY,
    marqueeX,
    marqueeY + marqueeHeight,
    color(111, 226, 253)
  ); // Left vertical blue
  drawNeonLine(
    marqueeX + verticalLineOffset,
    marqueeY,
    marqueeX + verticalLineOffset,
    marqueeY + marqueeHeight,
    color(111, 226, 253)
  ); // Left vertical blue
  drawNeonLine(
    marqueeX + marqueeWidth,
    marqueeY,
    marqueeX + marqueeWidth,
    marqueeY + marqueeHeight,
    color(111, 226, 253)
  ); // Right vertical blue
  drawNeonLine(
    marqueeX + marqueeWidth - verticalLineOffset,
    marqueeY,
    marqueeX + marqueeWidth - verticalLineOffset,
    marqueeY + marqueeHeight,
    color(111, 226, 253)
  ); // Right vertical blue

  // Draw white background with light grid for "Some Guys" and "Thriller"
  drawGridBackground();

  // Draw "PALACE" text with neon glow
  drawPalaceText();

  // Draw "Some Guys" and "Thriller" in black, centered in the white grid
  drawMovieTitlesText();

  // Draw pink neon bars at the bottom and stop them before reaching the center
  let leftPinkLineStartX = 80;
  let leftPinkLineEndX = width / 2 - zigzagWidth / 2 - 10; // Distance before center
  let rightPinkLineStartX = width / 2 + zigzagWidth / 2 + 10;
  let rightPinkLineEndX = canvasWidth - 80;
  drawNeonLine(
    leftPinkLineStartX,
    pinkLineY1,
    leftPinkLineEndX,
    pinkLineY1,
    color(255, 154, 249)
  ); // Bottom pink neon line 1
  drawNeonLine(
    leftPinkLineStartX,
    pinkLineY2,
    leftPinkLineEndX,
    pinkLineY2,
    color(255, 154, 249)
  ); // Bottom pink neon line 2
  drawNeonLine(
    rightPinkLineStartX,
    pinkLineY1,
    rightPinkLineEndX,
    pinkLineY1,
    color(255, 154, 249)
  ); // Bottom pink neon line 1
  drawNeonLine(
    rightPinkLineStartX,
    pinkLineY2,
    rightPinkLineEndX,
    pinkLineY2,
    color(255, 154, 249)
  ); // Bottom pink neon line 1

  // Draw yellow zigzag neon line in the center
  drawZigZagLine(leftPinkLineEndX + 10, zigzagHeight, color(255, 255, 0));

  flashState = !flashState; // Toggle lights
}

function drawMovieTitlesText() {
  fill(19, 74, 130); // Black text for movie title
  textSize(30);
  text("SOME GUYS", width / 2, height / 2 - textYOffset); // Adjusted Y position for centering
  fill(110, 0, 4); // Red for Thriller
  textSize(60);
  text("THRILLER", width / 2, height / 2 + textYOffset); // Adjusted Y position for centering
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

// Function to draw horizontal neon lines behind the "Palace" text
function drawHorizontalNeonLines(xStart, yStart, lineWidth, c) {
  let numLines = 8;
  let lineSpacing = 10; // Adjust the spacing between lines
  for (let i = 0; i < numLines; i++) {
    let y = yStart - i * lineSpacing;
    drawNeonLine(xStart, y, xStart + lineWidth, y, c);
  }
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
  let zigZagTop = pinkLineY1;
  let zigZagBottom = pinkLineY2;

  stroke(c);
  strokeWeight(4);

  let currentX;
  for (let i = 0; i < segments; i++) {
    currentX = xStart + i * segmentWidth;
    line(currentX, zigZagTop, currentX, zigZagBottom);
    if (i % 2 == 0) {
      line(currentX, zigZagBottom, currentX + segmentWidth, zigZagBottom);
    } else {
      line(currentX, zigZagTop, currentX + segmentWidth, zigZagTop);
    }
  }
  line(
    currentX + segmentWidth,
    zigZagTop,
    currentX + segmentWidth,
    zigZagBottom
  );
}

// Function to draw the "PALACE" neon sign with glow effect
function drawPalaceText() {
  // Neon glow background for "PALACE"
  textSize(110);
  fill(neonGlow, 102, 0, 150); // Neon orange with transparency
  textFont(fontNeonderthaw)
  text("Palace", width / 2, 110);
  
  // Actual "PALACE" text
  textSize(105);
  fill(248, 130, 32); // Bright neon orange
  text("Palace", width / 2, 110);

  // Reset font to default or desired font for the rest of the text
  textFont('sans-serif'); // This resets it to the default font
}

// Function to draw the grid background behind the movie titles
function drawGridBackground() {
  fill(169, 212, 251); // White background
  rect(gridX, gridY, gridWidth, gridHeight);

  stroke(55, 78, 67); // Light gray grid lines
  strokeWeight(1);

  let verticalLineSpacing = gridWidth / 8;
  for (let x = gridX; x < gridX + gridWidth; x += verticalLineSpacing) {
    line(x, gridY, x, gridY + gridHeight); // Vertical grid lines
  }
  let horizontalLineSpacing = gridHeight / 9;
  for (let y = gridY; y < gridY + gridHeight; y += horizontalLineSpacing) {
    line(gridX, y, gridX + gridWidth, y); // Horizontal grid lines
  }
  noStroke();
}
