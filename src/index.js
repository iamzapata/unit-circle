import "./styles.css";

const mainCanvas = document.getElementById("canvas");
const context = mainCanvas.getContext("2d");

const canvasWidth = mainCanvas.width;
const canvasHeight = mainCanvas.height;

const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;

const PI = Math.PI;

const background = "#F6F6F6";

let running = true;

let particle = null;

let radiansText = "";

let timeout = 1000;

class Animation {
  constructor(angle, radius, orbitRadius, speed, initialX, initialY) {
    this.angle = angle; // In radians
    this.radius = radius;
    this.orbitRadius = orbitRadius; // The displacement of the original radius
    this.initialX = initialX; // The horizontal coordinate of the arc's center.
    this.initialY = initialY; // The vertical coordinate of the arc's center.
    this.incrementer = 0.01 * speed; // This controls the speed
    this.speed = speed;
  }

  drawStats() {
    const Xcoord = (Math.round(this.currentX - 250) / 100).toFixed(2);
    const Ycoord = ((Math.round(this.currentY - 250) / 100) * -1).toFixed(2);
    const currentAngle = Math.abs(this.angle).toFixed(2);
    const currentAngleDegrees = (Math.abs(this.angle * 180) / PI).toFixed(2);

    // labels and data
    context.fillStyle = "black";
    context.font = "18px monospace";
    context.fillText(
      `\u{03B8}:${currentAngle} / ${currentAngleDegrees}\u{00B0}`,
      centerX - this.orbitRadius + 20,
      20
    );
    context.font = "lighter px monospace";
    context.fillText(`X:${Xcoord}`, centerX - this.orbitRadius + 20, 45);
    context.fillText(`Y:${Ycoord}`, centerX - this.orbitRadius + 110, 45);
    context.restore();
  }

  drawTangentDot(x, y, radius) {
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, PI * 2, false);
    context.closePath();
    context.fillStyle = "green";
    context.fill();
    context.restore();
  }

  drawArc() {
    // moving arc
    context.save();
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "green";
    context.arc(centerX, centerY, this.orbitRadius, 0, this.angle, true);
    context.stroke();
    context.restore();
  }

  drawAngle(
    x,
    y,
    radius,
    startAngle,
    endAngle,
    anticlockwise,
    transparencey = 0.5
  ) {
    context.save();
    context.beginPath();
    context.fillStyle = `rgba(0, 255, 0, ${transparencey}`;
    context.moveTo(250, 250); // Begin first sub-path
    context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    context.lineTo(250, 250); // Begin first sub-path
    context.stroke();
    context.strokeStyle = "rgb(0, 255, 0)";
    context.fill();
    context.restore();
  }

  drawRadianText() {
    const xCoord = 220;
    const yCoord = 180;
    const angle = Math.abs(this.angle).toFixed(2);

    context.save();
    context.font = "20px monospace";
    context.fillStyle = "green";

    if (angle === "1.00") {
      radiansText = "1 rad";
      context.fillText(radiansText, xCoord, yCoord);
      running = false;
    }

    if (angle === "2.00") {
      radiansText = "2 rad";
      context.fillText(radiansText, xCoord, yCoord);
      running = false;
    }

    if (angle === "3.00") {
      radiansText = "3 rad";
      context.fillText(radiansText, xCoord, yCoord);
      running = false;
      timeout = 400;
    }

    if (angle === PI.toFixed(2)) {
      radiansText = `\u{03A0} rad`;
      context.fillText(radiansText, xCoord, yCoord);
      running = false;
      timeout = 1000;
    }

    if (angle === "4.00") {
      radiansText = "4 rad";
      context.fillText(radiansText, xCoord, yCoord);
      running = false;
    }

    if (angle === "5.00") {
      radiansText = "5 rad";
      context.fillText(radiansText, xCoord, yCoord);
      running = false;
    }

    if (angle === "6.00") {
      radiansText = "6 rad";
      context.fillText(radiansText, xCoord, yCoord);
      running = false;
      timeout = 400;
    }

    if (angle === (2 * PI).toFixed(2)) {
      radiansText = `2\u{03A0} rad`;
      context.fillText(radiansText, xCoord, yCoord);
      running = false;
    }
  }

  drawRadianSegment() {
    const angle = Math.abs(this.angle).toFixed(2);

    const getCoors = angle => {
      const x = centerX + this.orbitRadius * Math.cos(angle);
      const y = centerY + this.orbitRadius * Math.sin(-angle);
      return { x, y };
    };

    if (angle >= 1) {
      const { x, y } = getCoors(1);
      this.drawRadius(x, y, "lightgreen");
      this.drawTangentDot(x, y, 3);
    }

    if (angle >= 2) {
      const { x, y } = getCoors(2);
      this.drawRadius(x, y, "lightgreen");
      this.drawTangentDot(x, y, 3);
    }

    if (angle >= 3) {
      const { x, y } = getCoors(3);
      this.drawRadius(x, y, "lightgreen");
      this.drawTangentDot(x, y, 3);
    }

    if (angle >= PI) {
      const { x, y } = getCoors(PI);
      this.drawRadius(x, y, "lightgreen");
      this.drawTangentDot(x, y, 3);
    }

    if (angle >= 4) {
      const { x, y } = getCoors(4);
      this.drawRadius(x, y, "lightgreen");
      this.drawTangentDot(x, y, 3);
    }

    if (angle >= 5) {
      const { x, y } = getCoors(5);
      this.drawRadius(x, y, "lightgreen");
      this.drawTangentDot(x, y, 3);
    }

    if (angle >= 6) {
      const { x, y } = getCoors(6);
      this.drawRadius(x, y, "lightgreen");
      this.drawTangentDot(x, y, 3);
    }

    if (angle >= 2 * PI) {
      const { x, y } = getCoors(2 * PI);
      this.drawRadius(x, y, "lightgreen");
      this.drawTangentDot(x, y, 3);
    }
  }

  drawCircumference() {
    context.save();
    context.beginPath();
    context.setLineDash([1, 5]);
    context.strokeStyle = "blue";
    context.arc(centerX, centerY, this.orbitRadius, 0, 2 * PI);
    context.stroke();
    context.restore();
  }

  drawRadius(x = this.currentX, y = this.currentY, strokeColor = "red") {
    context.save();
    context.beginPath();
    context.strokeStyle = strokeColor;
    context.moveTo(centerX, centerY);
    context.lineTo(x, y);
    context.stroke();
    context.restore();
  }

  drawCenter() {
    context.save();
    context.beginPath();
    context.strokeStyle = "black";
    context.arc(250, 250, 2, 0, 2 * PI);
    context.fillStyle = "black";
    context.fill();
    context.restore();
  }

  drawCartisianAxes() {
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
  }

  update() {
    this.angle += this.incrementer * -1;

    this.currentX = this.initialX + this.orbitRadius * Math.cos(this.angle);

    this.currentY = this.initialY + this.orbitRadius * Math.sin(this.angle);

    // 2 * PI = 360 degrees
    if (Math.abs(this.angle) >= PI * 2) {
      this.angle = 0;
    }

    this.drawStats();

    this.drawRadianText();

    this.drawCenter();

    this.drawCartisianAxes();

    this.drawRadianSegment();

    this.drawCircumference();

    this.drawRadius();

    this.drawTangentDot();

    this.drawArc();

    this.drawAngle(centerX, centerY, 15, this.angle, 0);
  }
}

function createParticle() {
  let radius = 3;
  let initialX = centerX;
  let initialY = centerY;
  let orbitRadius = 100;
  let angle = 0;
  let speed = 0.4;

  particle = new Animation(
    angle,
    radius,
    orbitRadius,
    speed,
    initialX,
    initialY
  );
}
createParticle();

function draw() {
  if (running) {
    context.save();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = background;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

    particle.update();
  } else {
    setTimeout(() => {
      running = true;
    }, timeout);
  }

  requestAnimationFrame(draw);
}
draw();
