var c = document.getElementById("mainCanvas");
var canvas = c.getContext('2d');
document.getElementById("start").onclick = start;

var runSpeed = 1;
var canvasWidth = c.width;
var canvasHeight = c.height;
canvas.lineWidth = 0.5;
canvas.globalAlpha = 1.0;
canvas.imageSmoothingEnable = false;
var pixelsWide = 10;
var pixels = new Array(pixelsWide);
var pixelWidth = canvasWidth/pixelsWide;
var running = false;

function Pixel(posX, posY, row, column) {
    this.x = posX;
    this.y = posY;
    this.row = row;
    this.column = column;
    this.alive = false;
    this.numNeighbors = 0;
    this.draw = function() {
        if(this.alive) {
            canvas.fillStyle = "black";
        } else {
            canvas.fillStyle = "white";
        }
        canvas.fillRect(this.x, this.y, pixelWidth, pixelWidth);
        drawLines();
    };
    this.toggle = function() {
        if(this.alive) {
            this.alive = false;
        } else {
            this.alive = true;
        }
        this.draw();
    };

    this.checkNeighbors = function() {
        this.numNeighbors = 0;
        //North
        if(this.row > 0) {
            if (pixels[this.row - 1][this.column].alive) {
                this.numNeighbors++;
            }
        }
        //North East
        if(this.row > 0 && this.column < pixelsWide-1) {
            if (pixels[this.row - 1][this.column + 1].alive) {
                this.numNeighbors++;
            }
        }
        //East
        if(this.column < pixelsWide-1) {
            if (pixels[this.row][this.column + 1].alive) {
                this.numNeighbors++;
            }
        }
        //South East
        if(this.column < pixelsWide-1 && this.row < pixelsWide-1) {
            if (pixels[this.row + 1][this.column + 1].alive) {
                this.numNeighbors++;
            }
        }
        //South
        if(this.row < pixelsWide-1) {
            if (pixels[this.row + 1][this.column].alive) {
                this.numNeighbors++;
            }
        }
        //South West
        if(this.row < pixelsWide-1 && this.column > 0) {
            if (pixels[this.row + 1][this.column - 1].alive) {
                this.numNeighbors++;
            }
        }
        //West
        if(this.column > 0) {
            if (pixels[this.row][this.column - 1].alive) {
                this.numNeighbors++;
            }
        }
        //North West
        if(this.column > 0 && this.row > 0) {
            if (pixels[this.row - 1][this.column - 1].alive) {
                this.numNeighbors++;
            }
        }

        return this.numNeighbors;
    }
}
function generatePixels() {
    for(var i = 0; i<pixelsWide; i++) {
        pixels[i] = new Array(pixelsWide);
        for(var j = 0; j<pixelsWide; j++) {
            pixels[i][j] =  new Pixel(i*(pixelWidth), j*(pixelWidth), i, j);
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
function start() {
    if(running) {
        running = false;
    } else {
        running = true;
    }
}
function run() {
    if(running) {

    }
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
setInterval(run(), 1000/runSpeed);
c.addEventListener("click", click);