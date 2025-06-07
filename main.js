const numberOfRings = 3;
const ringRadiusOffset = 7;
const waveOffset = 15;
const colors = [`#771122`, `#bb1122`, `#ff1122`, `#771144`, `#bb1144`];
let startAngle = 0;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

function start() {
    init();
    window.addEventListener("resize", onResize); 
    loop(); 
}

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
}

function init() {
    onResize(); 
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateRings();
    window.requestAnimationFrame(loop);
}

function updateRings() {
    for (let i = 0; i < numberOfRings; i++) {
        let radius = i * ringRadiusOffset + 250;
        let offsetAngle = (i * waveOffset * Math.PI) / 180;
        drawRing(radius, colors[i], offsetAngle);
    }
    startAngle = (startAngle >= 360) ? 0 : startAngle + 0.25;
}

function drawRing(radius, color, offsetAngle) {
    ctx.beginPath();

    for (let j = -180; j < 180; j++) {
        let currentAngle = (j + startAngle) * Math.PI / 180;
        let displacement = 0;
        let now = Math.abs(j);
        let maxWavesAmplitude = 17;
        let numberOfWaves = 7;
        let ringRadius = radius;
        if (now > 70) {
            displacement = (now - 70) / 70;
        }
        if (displacement >= 1) {
            displacement = 1;
        }
        let waveAmplitude = displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
        let x = centerX + Math.cos(currentAngle) * (ringRadius + waveAmplitude);
        let y = centerY + Math.sin(currentAngle) * (ringRadius + waveAmplitude);
        j > -180 ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }

    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.stroke();
}

start();
