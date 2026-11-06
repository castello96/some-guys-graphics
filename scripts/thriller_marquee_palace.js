// Palace Theatre "Thriller" marquee, drawn straight on.
// Reference photos: images/thriller-marquee-reference-*.jpg (reference 3 is the
// straight-on view this layout follows).

const canvasWidth = 700;
const canvasHeight = 500;
const centerX = canvasWidth / 2;

// Readerboard (the glowing white letter board)
const boardX = 110;
const boardY = 168;
const boardWidth = 480;
const boardHeight = 132;
const boardRows = 7;

// Marquee body (dark sheet metal around the board)
const bodyX = 92;
const bodyY = 150;
const bodyWidth = 516;
const bodyHeight = 172;

// Pillars at each end that rise above the sign and curl outward
const pillarInset = 10;
const pillarTop = 42;

// Blue tube under the board
const blueTubeY = 310;

// Soffit under the marquee, edged with chasing bulbs
const soffitTopY = 326;
const soffitBottomY = 398;
const soffitTopInset = 0;
const soffitBottomInset = 70;
const bulbSpacing = 18;
const bulbChaseFrames = 5;

// Lower "THRILLER" sign over the entrance
const lowerSignX = 190;
const lowerSignY = 408;
const lowerSignWidth = 320;
const lowerSignHeight = 58;

// Neon tube rendering
const tubeGlowBlur = 18;
const tubeCoreBlur = 6;

// Neon colors sampled from the reference photos
let neonOrange;
let neonAmber;
let neonPink;
let neonMagenta;
let neonBlue;
let neonIce;
let neonGreen;
let neonRed;

// Fonts
let fontNeonderthaw;
let fontBebasNeueu;

// Per-tube flicker state, keyed by tube name
let flickers = {};

function preload() {
  fontNeonderthaw = loadFont('../fonts/Neonderthaw/Neonderthaw-Regular.ttf');
  fontBebasNeueu = loadFont('../fonts/Bebas_Neue/BebasNeue-Regular.ttf');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  textAlign(CENTER, CENTER);
  frameRate(30);

  neonOrange = color(255, 110, 30);
  neonAmber = color(255, 190, 60);
  neonPink = color(255, 80, 170);
  neonMagenta = color(255, 40, 110);
  neonBlue = color(40, 140, 255);
  neonIce = color(200, 235, 255);
  neonGreen = color(40, 230, 140);
  neonRed = color(255, 50, 40);
}

function draw() {
  background(0);
  updateFlickers();

  drawSoffit();
  drawLowerSign();
  drawMarqueeBody();
  drawReaderboard();
  drawMovieTitlesText();
  drawBlueTube();

  drawPillars();
  drawGreenStripes();
  drawWaveBand();
  drawFlameClusters();
  drawPalaceText();
}

// ---------------------------------------------------------------------------
// Neon helpers
// ---------------------------------------------------------------------------

// Draws a neon tube: a blurred colored glow with a hot, pale core on top.
// drawShape is called once per layer and should only issue stroke geometry.
function neonTube(c, weight, drawShape, brightness = 1) {
  push();
  noFill();
  let glow = color(red(c), green(c), blue(c), 255 * brightness);
  let core = lerpColor(c, color(255), 0.65);
  core.setAlpha(255 * brightness);

  drawingContext.shadowColor = glow.toString();
  drawingContext.shadowBlur = tubeGlowBlur * brightness;
  stroke(glow);
  strokeWeight(weight);
  drawShape();

  drawingContext.shadowBlur = tubeCoreBlur * brightness;
  stroke(core);
  strokeWeight(max(1, weight * 0.4));
  drawShape();
  pop();
}

function neonLine(c, weight, x1, y1, x2, y2, brightness = 1) {
  neonTube(c, weight, () => line(x1, y1, x2, y2), brightness);
}

// Old neon signs stutter now and then. Each named tube occasionally drops out
// for a few frames.
function updateFlickers() {
  for (let name in flickers) {
    flickers[name]--;
    if (flickers[name] <= 0) {
      delete flickers[name];
    }
  }
  if (random() < 0.02) {
    let name = random(['palace', 'leftFlames', 'rightFlames', 'green', 'wave']);
    flickers[name] = floor(random(2, 6));
  }
}

function tubeBrightness(name) {
  if (!flickers[name]) {
    return 1;
  }
  return random([0.15, 0.35, 0.8]);
}

// ---------------------------------------------------------------------------
// Marquee structure
// ---------------------------------------------------------------------------

function drawMarqueeBody() {
  noStroke();
  fill(26, 12, 16);
  rect(bodyX, bodyY, bodyWidth, bodyHeight, 4);
}

// The readerboard is a backlit milky panel lit by vertical fluorescent tubes,
// so it glows brighter in vertical bands, with letter tracks running across.
function drawReaderboard() {
  push();
  drawingContext.shadowColor = 'rgba(255, 250, 225, 0.9)';
  drawingContext.shadowBlur = 40;
  noStroke();
  fill(238, 240, 222);
  rect(boardX, boardY, boardWidth, boardHeight);
  drawingContext.shadowBlur = 0;

  // Fluorescent banding behind the panel
  let numTubes = 8;
  let tubeSpacing = boardWidth / numTubes;
  for (let i = 0; i < numTubes; i++) {
    let cx = boardX + tubeSpacing * (i + 0.5);
    let band = drawingContext.createLinearGradient(cx - tubeSpacing / 2, 0, cx + tubeSpacing / 2, 0);
    band.addColorStop(0, 'rgba(200, 205, 180, 0.5)');
    band.addColorStop(0.5, 'rgba(255, 255, 250, 0.85)');
    band.addColorStop(1, 'rgba(200, 205, 180, 0.5)');
    drawingContext.fillStyle = band;
    drawingContext.fillRect(cx - tubeSpacing / 2, boardY, tubeSpacing, boardHeight);
  }

  // Letter tracks
  stroke(110, 115, 100, 170);
  strokeWeight(1);
  let rowHeight = boardHeight / boardRows;
  for (let i = 1; i < boardRows; i++) {
    let y = boardY + i * rowHeight;
    line(boardX, y, boardX + boardWidth, y);
  }

  // Panel seams
  stroke(90, 95, 85, 200);
  let numPanels = 8;
  for (let i = 1; i < numPanels; i++) {
    let x = boardX + (boardWidth / numPanels) * i;
    line(x, boardY, x, boardY + boardHeight);
  }
  pop();
}

function drawMovieTitlesText() {
  let rowHeight = boardHeight / boardRows;

  push();
  textFont(fontBebasNeueu);
  noStroke();

  fill(28, 52, 120);
  textSize(34);
  drawSpacedText('SOME GUYS', centerX, boardY + rowHeight * 1.9, 6);

  fill(170, 30, 25);
  textSize(66);
  drawSpacedText('THRILLER', centerX, boardY + rowHeight * 4.4, 16);
  pop();
}

// Readerboard letters are individual tiles, so they sit far apart.
function drawSpacedText(str, x, y, spacing) {
  let totalWidth = 0;
  for (let letter of str) {
    totalWidth += textWidth(letter) + spacing;
  }
  totalWidth -= spacing;

  let letterX = x - totalWidth / 2;
  for (let letter of str) {
    let w = textWidth(letter);
    text(letter, letterX + w / 2, y);
    letterX += w + spacing;
  }
}

// Blue tube along the bottom of the board, split at the center seam.
function drawBlueTube() {
  let left = bodyX + 4;
  let right = bodyX + bodyWidth - 4;
  neonLine(neonBlue, 5, left, blueTubeY, centerX - 4, blueTubeY);
  neonLine(neonBlue, 5, centerX + 4, blueTubeY, right, blueTubeY);
}

// The underside of the marquee, seen straight on, is a trapezoid edged with
// bulbs that chase around its front and sides.
function drawSoffit() {
  let topLeft = createVector(bodyX + soffitTopInset, soffitTopY);
  let topRight = createVector(bodyX + bodyWidth - soffitTopInset, soffitTopY);
  let bottomLeft = createVector(bodyX + soffitBottomInset, soffitBottomY);
  let bottomRight = createVector(bodyX + bodyWidth - soffitBottomInset, soffitBottomY);

  push();
  noStroke();
  let glow = drawingContext.createLinearGradient(0, soffitTopY, 0, soffitBottomY);
  glow.addColorStop(0, 'rgba(150, 90, 40, 0.55)');
  glow.addColorStop(1, 'rgba(60, 30, 15, 0.4)');
  drawingContext.fillStyle = glow;
  beginShape();
  vertex(topLeft.x, topLeft.y);
  vertex(topRight.x, topRight.y);
  vertex(bottomRight.x, bottomRight.y);
  vertex(bottomLeft.x, bottomLeft.y);
  endShape(CLOSE);

  // Recessed panel lines in the soffit ceiling
  stroke(255, 200, 120, 50);
  strokeWeight(1);
  line(topLeft.x + 40, topLeft.y + 8, centerX, bottomLeft.y - 12);
  line(topRight.x - 40, topRight.y + 8, centerX, bottomRight.y - 12);
  pop();

  // Bulbs: down the left side, along the front edge, and down the right side
  let bulbPath = [];
  addBulbsAlong(bulbPath, bottomLeft, topLeft);
  addBulbsAlong(bulbPath, topLeft, topRight);
  addBulbsAlong(bulbPath, topRight, bottomRight);

  let step = floor(frameCount / bulbChaseFrames);
  push();
  noStroke();
  for (let i = 0; i < bulbPath.length; i++) {
    let lit = (i + step) % 3 !== 0;
    if (lit) {
      drawingContext.shadowColor = 'rgba(255, 210, 130, 1)';
      drawingContext.shadowBlur = 14;
      fill(255, 240, 200);
    } else {
      drawingContext.shadowBlur = 0;
      fill(100, 65, 35);
    }
    ellipse(bulbPath[i].x, bulbPath[i].y, 7, 7);
  }
  pop();
}

function addBulbsAlong(bulbPath, from, to) {
  let count = floor(p5.Vector.dist(from, to) / bulbSpacing);
  for (let i = 0; i < count; i++) {
    bulbPath.push(p5.Vector.lerp(from, to, i / count));
  }
}

// Small attraction sign over the entrance with "THRILLER" in orange neon.
function drawLowerSign() {
  push();
  noStroke();
  fill(30, 22, 18);
  rect(lowerSignX, lowerSignY, lowerSignWidth, lowerSignHeight);
  pop();

  neonTube(neonAmber, 2, () => rect(lowerSignX, lowerSignY, lowerSignWidth, lowerSignHeight));

  push();
  textFont(fontBebasNeueu);
  textSize(48);
  neonTube(neonOrange, 2, () => {
    drawSpacedText('THRILLER', centerX, lowerSignY + lowerSignHeight / 2 + 2, 4);
  });
  pop();
}

// ---------------------------------------------------------------------------
// Sign ornaments above the board
// ---------------------------------------------------------------------------

// Tall pillars at each end of the marquee. The tubes run up the sides and curl
// outward at the top like a shepherd's crook.
function drawPillars() {
  let bottom = blueTubeY;
  drawPillar(bodyX + pillarInset, bottom, -1, [neonBlue, neonAmber, neonIce]);
  drawPillar(bodyX + bodyWidth - pillarInset, bottom, 1, [neonBlue, neonOrange, neonRed]);
}

// direction is -1 for the left pillar (curls left) and 1 for the right.
function drawPillar(x, bottom, direction, colors) {
  for (let i = 0; i < colors.length; i++) {
    let tubeX = x - direction * i * 7;
    let top = pillarTop + i * 9;
    let curl = 14 + i * 3;
    neonTube(colors[i], 4, () => {
      beginShape();
      vertex(tubeX, bottom);
      vertex(tubeX, top + curl);
      quadraticVertex(tubeX, top, tubeX + direction * curl, top);
      vertex(tubeX + direction * (curl + 6), top + 4);
      endShape();
    });
  }
}

// Green stripes run out from behind the "E" toward the right ornament.
function drawGreenStripes() {
  let brightness = tubeBrightness('green');
  let numStripes = 5;
  for (let i = 0; i < numStripes; i++) {
    let y = 122 + i * 8;
    neonLine(neonGreen, 3, 405 - i * 4, y, 490, y, brightness);
  }
}

// A pink wave runs along the top of the board under the ornaments.
function drawWaveBand() {
  let y = boardY - 9;
  let amplitude = 4;
  let wavelength = 24;
  let brightness = tubeBrightness('wave');

  neonTube(neonPink, 3, () => {
    beginShape();
    for (let x = boardX; x <= boardX + boardWidth; x += 2) {
      vertex(x, y + sin(((x - boardX) / wavelength) * TWO_PI) * amplitude);
    }
    endShape();
  }, brightness);
}

// Clusters of flame-shaped neon on either side of "Palace": red, pink and blue
// on the left, pink and white on the right.
function drawFlameClusters() {
  drawFlameCluster(160, 152, [neonRed, neonPink, neonBlue, neonPink, neonRed], tubeBrightness('leftFlames'));
  drawFlameCluster(540, 152, [neonPink, neonIce, neonMagenta, neonIce, neonPink], tubeBrightness('rightFlames'));
}

function drawFlameCluster(cx, baseY, colors, brightness) {
  let count = colors.length;
  let spread = 14;
  for (let i = 0; i < count; i++) {
    let offset = i - (count - 1) / 2;
    let x = cx + offset * spread;
    let height = 58 - abs(offset) * 9;
    let width = 10;
    let lean = offset * 4;
    neonTube(colors[i], 3, () => {
      beginShape();
      vertex(x - width, baseY);
      bezierVertex(x - width - 4, baseY - height * 0.5, x + lean - 6, baseY - height * 0.7, x + lean, baseY - height);
      bezierVertex(x + lean + 2, baseY - height * 0.75, x + width, baseY - height * 0.6, x + width, baseY);
      endShape();

      // Inner lick of flame
      bezier(x - 3, baseY - 4, x - 5, baseY - height * 0.35, x + lean * 0.5 + 3, baseY - height * 0.5, x + lean * 0.5, baseY - height * 0.65);
    }, brightness);
  }
}

// The script "Palace" in orange neon, centered over the board. The real sign
// uses outlined letters, so the glyphs are stroked rather than filled to get
// that double-tube look.
function drawPalaceText() {
  let brightness = tubeBrightness('palace');

  push();
  textFont(fontNeonderthaw);
  textSize(94);
  textAlign(CENTER, CENTER);
  neonTube(neonOrange, 5, () => text('PalacE', centerX, 112), brightness);
  pop();
}
