var c = document.getElementById("mainCanvas");
var canvas = c.getContext('2d');

var canvasWidth = c.width;
var canvasHeight = c.height;
canvas.lineWidth = 1;
canvas.globalAlpha = 1.0;
canvas.imageSmoothingEnable = false;
var pixelsWide = 25;
var pixels = new Array(pixelsWide);
var pixelWidth = canvasWidth/pixelsWide;
var running = false;

function Pixel(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.alive = false;
    this.draw = function() {
        if(this.alive) {
            canvas.fillStyle = "black";
        } else {
            canvas.fillStyle = "white";
        }
        canvas.fillRect(this.x, this.y, pixelWidth, pixelWidth);
        drawLines();
    }
    this.toggle = function() {
        if(this.alive) {
            this.alive = false;
        } else {
            this.alive = true;
        }
        this.draw();
    }
};
function generatePixels() {
    for(var i = 0; i<pixelsWide; i++) {
        pixels[i] = new Array(pixelsWide);
        for(var j = 0; j<pixelsWide; j++) {
            pixels[i][j] =  new Pixel(i*(pixelWidth), j*(pixelWidth));
            pixels[i][j].draw();
        }
    }
}
function drawLines() {
    canvas.strokeStyle = "gray";
    for(var i=pixelWidth; i<canvasWidth; i+=pixelWidth) {
        canvas.beginPath();
        canvas.moveTo(i, 0);
        canvas.lineTo(i, canvasHeight);
        canvas.stroke();
    }
    for(var i=pixelWidth; i<canvasHeight; i+=pixelWidth) {
        canvas.beginPath();
        canvas.moveTo(0, i);
        canvas.lineTo(canvasWidth, i);
        canvas.stroke();
    }
}

while(running) {
    
}

function getMousePos() {
    return {
        x: event.clientX - c.offsetLeft,
        y: event.clientY - c.offsetTop
    }
}
function click() {
    var pixelX = Math.floor(getMousePos().x/pixelWidth);
    var pixelY = Math.floor(getMousePos().y/pixelWidth);
    pixels[pixelX][pixelY].toggle();
    drawLines();
}
generatePixels();
drawLines();
c.addEventListener("click", click);
