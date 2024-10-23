let img;
let stars = [];
let numStars = 500;
let rotationAngle = 0; // Variable to keep track of rotation

function preload() {
    img = loadImage("./images/some-guys-1.png"); // Replace with your image URL or local path
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);

    // Create stars with random positions and speeds
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(-width, width),
            y: random(-height, height),
            z: random(width), // Initial distance from the viewer
            speed: random(2, 10),
        });
    }
}

function draw() {
    background(0);

    // Draw and move stars
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];

        // Calculate star position based on its 'z' distance
        let sx = map(star.x / star.z, 0, 1, 0, width);
        let sy = map(star.y / star.z, 0, 1, 0, height);

        // Size of the star gets smaller as it moves away (higher z)
        let r = map(star.z, 0, width, 5, 0);

        fill(255);
        noStroke();
        ellipse(sx, sy, r, r); // Draw the star

        // Move the star closer to the viewer (decrease z)
        star.z -= star.speed;

        // Reset star to the back of the field when it reaches the viewer
        if (star.z < 1) {
            star.x = random(-width, width);
            star.y = random(-height, height);
            star.z = width;
            star.speed = random(2, 10);
        }
    }

    // Increase the rotation angle over time
    rotationAngle += 0.01; // Adjust for slower or faster rotation

    // Draw the rotating image in the center of the canvas
    push();
    translate(width / 2, height / 2); // Move the origin to the center
    rotate(rotationAngle); // Apply rotation
    image(img, 0, 0, 100, 100); // Draw image at the new rotated position
    pop();
}
