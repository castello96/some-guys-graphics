let someGuysLogo;

function preload() {
    someGuysLogo = loadImage("./some-guys-1.png");
}

let canvasWidth = 600;
let canvasHeight = 400;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

let imgWidth = 100;
let imgHeight = 100;
let imgPadding = 10;
let imgX = 0;
let imgY = 0;
let imgXSpeed = 1.5;
let imgYSpeed = 1.5;

// Colors
let componentColorMin = 75;
let componentColorMax = 255;
let red = componentColorMax;
let green = componentColorMax;
let blue = componentColorMax;

function draw() {
    background(0);
    tint(red, green, blue);
    image(someGuysLogo, imgX, imgY, imgWidth, imgHeight);

    if (imgX + imgWidth - imgPadding > canvasWidth || imgX + imgPadding < 0) {
        imgXSpeed *= -1;
        updateColors();
    }
    if (imgY + imgHeight - imgPadding > canvasHeight || imgY + imgPadding < 0) {
        imgYSpeed *= -1;
        updateColors();
    }

    // Update position
    imgX += imgXSpeed;
    imgY += imgYSpeed;
}

function updateColors() {
    red = int(random(componentColorMin, componentColorMax));
    green = int(random(componentColorMin, componentColorMax));
    blue = int(random(componentColorMin, componentColorMax));
    console.log("rgb: ", red, blue, green);
}
