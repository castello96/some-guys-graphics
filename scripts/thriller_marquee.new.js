let flashState = false;
let neonGlow = 0;

// Define variables for magic numbers
const canvasWidth = 700;
const canvasHeight = 500;
const marqueeX = 50;
const marqueeY = 100;
const marqueeWidth = 600;
const marqueeHeight = 300;
const neonLineWidth = 540;
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
  
  noStroke();
  drawFlashingBulbs();

  // Draw marquee body
  fill(50); // Dark gray background
  rect(marqueeX, marqueeY, marqueeWidth, marqueeHeight, 20);


  // Draw horizontal neon lines behind the "Palace" text
  drawHorizontalNeonLines(
    marqueeX + 20,
    170,
    marqueeWidth - 40,
    color(14, 152, 118)
  );

  // Draw straight pink neon circles overlapping on a straight line
  drawWavyNeon(80, 185, neonLineWidth, color(255, 105, 180)); // Pink neon circles

  let verticalLineOffset = 20;
  let neonBlue = color(0, 141, 238);
  // Draw vertical blue neon side bars
  drawNeonLine(
    marqueeX,
    marqueeY,
    marqueeX,
    marqueeY + marqueeHeight,
    neonBlue
  ); // Left vertical blue
  drawNeonLine(
    marqueeX + verticalLineOffset,
    marqueeY,
    marqueeX + verticalLineOffset,
    marqueeY + marqueeHeight,
    neonBlue
  ); // Left vertical blue
  drawNeonLine(
    marqueeX + marqueeWidth,
    marqueeY,
    marqueeX + marqueeWidth,
    marqueeY + marqueeHeight,
    neonBlue
  ); // Right vertical blue
  drawNeonLine(
    marqueeX + marqueeWidth - verticalLineOffset,
    marqueeY,
    marqueeX + marqueeWidth - verticalLineOffset,
    marqueeY + marqueeHeight,
    neonBlue
  ); // Right vertical blue

  // Draw yellow neon rectangles between the blue vertical lines
  drawYellowNeonRectangles();

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

function drawFlashingBulbs() {
  let bulbWidth = 20; // Width of the bulbs (oblong shape)
  let bulbHeight = 10; // Height of the bulbs (oblong shape)
  let numBulbs = 18; // Number of bulbs to line the bottom
  let bulbSpacing = marqueeWidth / numBulbs; // Spacing between bulbs
  let bulbY = marqueeY + marqueeHeight; // Y position just below the marquee

  // Loop to draw bulbs along the bottom
  for (let i = 0; i < numBulbs; i++) {
    let x = marqueeX + 20 + i * bulbSpacing; // X position of each bulb

    // Flashing effect: alternate colors based on the flashState
    if (flashState) {
      fill(255, 255, 0); // Bright yellow for the "on" state
    } else {
      fill(255, 0, 0); // Red for the "off" state
    }

    noStroke(); // No outline for the bulbs

    // Glow effect: larger, more transparent ellipse to simulate glowing light
    fill(255, 255, 0, 50); // Transparent yellow glow
    ellipse(x, bulbY, bulbWidth + 10, bulbHeight + 15); // Outer glow

    // Draw the actual bulb (oblong shape)
    fill(flashState ? color(255, 255, 150) : color(255, 100, 100)); // Softer yellow or red
    ellipse(x, bulbY, bulbWidth, bulbHeight); // Draw the bulb

    // Add a white highlight for realism (simulates reflection)
    fill(255, 255, 255, 200); // Slightly transparent white
    ellipse(x + 5, bulbY - 3, bulbWidth / 3, bulbHeight / 3); // Small highlight
  }
}


function drawYellowNeonRectangles() {
  let rectWidth = 10; // Width of the rectangle (narrow)
  let rectHeight = marqueeHeight / 2 - 5; // Height of the rectangle (tall)
  let leftRectX = marqueeX + 5; // X position for left-side rectangles
  let rightRectX = marqueeX + marqueeWidth - 15; // X position for right-side rectangles
  let topRectY = marqueeY; // Y position for the top rectangles
  let bottomRectY = topRectY + rectHeight + 10; // Y position for the bottom rectangles
  let cornerRadius = 10; // Soft corners for the rectangles

  // Draw 2 rectangles on the left side
  for (let i = 0; i < 2; i++) {
    let y = i === 0 ? topRectY : bottomRectY;

    // Outer glow layer (soft glow effect)
    stroke(255, 255, 0, 150); // Soft yellow glow
    strokeWeight(5); // Outer glow stroke weight
    noFill();
    rect(leftRectX, y, rectWidth, rectHeight, cornerRadius);

    // Core neon layer (bright yellow rectangle)
    stroke(255, 255, 0); // Bright yellow stroke for the core
    strokeWeight(1); // Inner core stroke weight
    fill(255, 255, 0, 100); // Slightly transparent yellow fill
    rect(leftRectX, y, rectWidth, rectHeight, cornerRadius);
  }

  // Draw 2 rectangles on the right side (mirrored)
  for (let i = 0; i < 2; i++) {
    let y = i === 0 ? topRectY : bottomRectY;

    // Outer glow layer (soft glow effect)
    stroke(255, 255, 0, 150); // Soft yellow glow
    strokeWeight(5); // Outer glow stroke weight
    noFill();
    rect(rightRectX, y, rectWidth, rectHeight, cornerRadius);

    // Core neon layer (bright yellow rectangle)
    stroke(255, 255, 0); // Bright yellow stroke for the core
    strokeWeight(1); // Inner core stroke weight
    fill(255, 255, 0, 100); // Slightly transparent yellow fill
    rect(rightRectX, y, rectWidth, rectHeight, cornerRadius);
  }
}

function drawMovieTitlesText() {
  let gridCenterX = gridX + gridWidth / 2; // X position: center of the grid
  let gridCenterY = gridY + gridHeight / 2; // Y position: middle of the grid

  // Draw "Some Guys" centered horizontally and slightly above the middle vertically
  fill(19, 74, 130); // Blue-ish color for "Some Guys"
  textSize(30);
  text("SOME GUYS", gridCenterX, gridCenterY - 39); // Adjust Y for top text

  // Draw "Thriller" centered horizontally and slightly below the middle vertically
  fill(110, 0, 4); // Red color for "Thriller"
  textSize(60);
  text("THRILLER", gridCenterX, gridCenterY + 32); // Adjust Y for bottom text
}


// Function to draw reusable neon line with an outline to simulate glow
function drawNeonLine(x1, y1, x2, y2, c) {
  let glowColor = lerpColor(c, color(0), 0.6); // Darker shade for glow
  stroke(glowColor); // Draw outer glow first
  strokeWeight(10);
  line(x1, y1, x2, y2);

  stroke(c); // Draw the bright neon inner line
  strokeWeight(3);
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
  noStroke();
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
