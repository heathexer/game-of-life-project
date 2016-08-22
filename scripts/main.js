var c = document.getElementById("mainCanvas");
var canvas = c.getContext('2d');

var canvasWidth = document.getElementById("mainCanvas").getAttribute("width");
var pixelsWide = 10;
var pixels = new Array(pixelsWide);
var pixelWidth = canvasWidth/pixelsWide;


var Pixel = function(posX, posY){
    this.x = posX;
    this.y = posY;
    this.draw = function() {
        canvas.strokeRect(this.x, this.y, pixelWidth, pixelWidth);
    }
};
function generatePixels() {
    for(var i = 0; i<pixelsWide; i++) {
        pixels[i] = new Array(pixelsWide);
        for(var j = 0; j<pixelsWide; j++) {
            pixels[i][j] =  new Pixel(i*pixelWidth, j*pixelWidth);
            pixels[i][j].draw();
        }
    }
}

function getMousePos() {
    var mouseX =  event.clientX - c.offsetLeft;
    var mouseY =  event.clientY - c.offsetTop;
}

function click() {
    alert(getMousePos());
}
generatePixels();
c.addEventListener("click", click);
