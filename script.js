// Initial Data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let size = 1;

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');


// Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

/*
Passo a passo para desenhar no canvas:
 - Quando o click do mouse ABAIXAR, ative o modo desenho.
 - Quando o mouse se MOVER, se o modo desenho estiver ativado, desenhe.
 - Quando o click no mouse LEVANTAR, desative o modo desenho.
*/

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

document.querySelector('.clear').addEventListener('click', clearScreen);
document.querySelector('.dimension').addEventListener('click', dimension);


// Functions
function colorClickEvent(e) {
   let color =  e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    // desenhar
    ctx.beginPath();
    ctx.lineWidth = size;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
}

function dimension() {
   let select = document.querySelector("#dm");
   var value = select.options[select.selectedIndex].text;
   size = value; 
   console.log(value);
   return size;

}