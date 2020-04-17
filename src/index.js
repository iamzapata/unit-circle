import "./styles.css";

const mainCanvas = document.getElementById("canvas");
const context = mainCanvas.getContext("2d");

const canvasWidth = mainCanvas.width;
const canvasHeight = mainCanvas.height;

const PI = Math.PI;

let running = true;

let particle = null;

let radiansText = null;

/**
 * The TangentParticle "constructor" is responsible for creating the circle
 * objects and defining the various properties they have
 */
class TangentParticle {
  constructor(angle, radius, orbitRadius, phase, initialX, initialY) {
    this.angle = angle; // In radians
    this.radius = radius;
    this.orbitRadius = orbitRadius; // The displacement of the original radius
    this.initialX = initialX; // The horizontal coordinate of the arc's center.
    this.initialY = initialY; // The vertical coordinate of the arc's center.
    this.incrementer = 0.01 * phase; // This controls the speed
    this.phase = phase;
  }
}

TangentParticle.prototype.update = function() {
  this.angle += this.incrementer * -1;

  this.currentX = this.initialX + this.orbitRadius * Math.cos(this.angle);

  this.currentY = this.initialY + this.orbitRadius * Math.sin(this.angle);

  // 2 * PI = 360 degrees
  if (Math.abs(this.angle) >= PI * 2) {
    this.angle = 0;
  }

  context.save();
  context.font = "20px monospace";
  context.fillStyle = "blue";
  if (Math.abs(this.angle.toFixed(2)) === 1) {
    running = false;
    radiansText = "1 rad";
    context.fillText(radiansText, 220, 200);
  }

  if (Math.abs(this.angle.toFixed(2)) === 2) {
    running = false;
    radiansText = "2 rad";
    context.fillText(radiansText, 220, 200);
  }

  if (Math.abs(this.angle.toFixed(2)) === 3) {
    running = false;
    radiansText = "3 rad";
    context.fillText(radiansText, 220, 200);
  }

  if (Math.abs(this.angle.toFixed(1)) === PI.toFixed(1)) {
    running = false;
    radiansText = `\u{03A0} rad`;
    context.fillText(radiansText, 220, 200);
  }

  if (Math.abs(this.angle.toFixed(2)) === (2 * PI).toFixed(2)) {
    running = false;
    radiansText = `2\u{03A0} rad`;
    context.fillText(radiansText, 220, 200);
  }

  // circumference
  context.save();
  context.beginPath();
  context.setLineDash([3, 10]);
  context.arc(canvasWidth / 2, canvasHeight / 2, this.orbitRadius, 0, 2 * PI);
  context.stroke();
  context.restore();

  // Radius
  context.save();
  context.beginPath();
  context.strokeStyle = "red";
  context.moveTo(250, 250); // Begin first sub-path
  context.lineTo(this.currentX, this.currentY);
  context.stroke();
  context.restore();

  // Cartisian axes
  context.save();
  context.translate(250, 250);
  context.beginPath();
  context.strokeStyle = "lightgray";
  context.moveTo(0, 0); // Begin first sub-path
  context.lineTo(0, 150);
  context.moveTo(0, 0); // Begin first sub-path
  context.lineTo(0, -150);
  context.moveTo(0, 0); // Begin first sub-path
  context.lineTo(-150, 0);
  context.moveTo(0, 0); // Begin first sub-path
  context.lineTo(150, 0);
  context.stroke();
  context.restore();

  // center
  context.save();
  context.beginPath();
  context.strokeStyle = "black";
  context.arc(250, 250, 4, 0, 2 * PI);
  context.fillStyle = "red";
  context.fill();
  context.restore();

  // moving circle
  context.save();
  context.beginPath();
  context.arc(this.currentX, this.currentY, this.radius, 0, PI * 2, false);
  context.closePath();
  context.fillStyle = "red";
  context.fill();
  context.restore();

  // moving arc
  context.save();
  context.beginPath();
  context.strokeStyle = "blue";
  context.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    this.orbitRadius,
    0,
    this.angle,
    true
  );
  context.stroke();
  context.restore();

  // angle
  context.save();
  context.beginPath();
  context.fillStyle = "rgba(0, 255, 0, 0.5)";
  context.moveTo(250, 250); // Begin first sub-path
  context.arc(canvasWidth / 2, canvasHeight / 2, 20, this.angle, 0);
  context.lineTo(250, 250); // Begin first sub-path
  context.stroke();
  context.strokeStyle = "rgb(0, 255, 0)";
  context.fill();
  context.restore();

  const Xcoord = Math.round(this.currentX - 250) / 100;
  const Ycoord = (Math.round(this.currentY - 250) / 100) * -1;
  const currentAngle = Math.abs(this.angle.toFixed(2));

  // labels and data
  context.fillStyle = "black";
  context.font = "20px monospace";
  context.fillText(
    `\u{03B8}:${currentAngle}`,
    canvasWidth / 2 - this.orbitRadius,
    20
  );
  context.font = "lighter 20px monospace";
  context.fillText(`X:${Xcoord}`, canvasWidth / 2 - this.orbitRadius, 40);
  context.fillText(`Y:${Ycoord}`, canvasWidth / 2 - this.orbitRadius, 60);
  context.restore();
};

function createParticle() {
  let radius = 3;
  let initialX = canvasWidth / 2;
  let initialY = canvasHeight / 2;
  let orbitRadius = 100;
  let angle = 0;
  let phase = 1;

  particle = new TangentParticle(
    angle,
    radius,
    orbitRadius,
    phase,
    initialX,
    initialY
  );
}
createParticle();

let frameId = null;

function draw() {
  //running = true;

  if (running) {
    context.save();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = "#F6F6F6";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

    particle.update();
  } else {
    setTimeout(() => {
      running = true;
    }, 1000);

    context.save();
    context.fillStyle = "#F6F6F6";
    context.fillText(radiansText, 220, 200);
    context.restore();
  }

  frameId = requestAnimationFrame(draw);
}
draw();
