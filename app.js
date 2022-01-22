const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_X = 800;
const CANVAS_Y = 600;


canvas.width = CANVAS_X;
canvas.height = CANVAS_Y;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, CANVAS_X, CANVAS_Y);
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event) {
	const size = event.target.value;
	ctx.lineWidth = size;
}

function handleModeClick() {
	if (filling) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
}

function handleCM(event){
	event.preventDefault();
}

function handleSaveClick(event){
	const image = canvas.toDataURL("image/png");
	const link = document.createElement("a");
	link.href = image;
	link.download = "PaintJS";
	link.click();
}

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseDown(event){
	if (filling) {
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	else{
		startPainting();
	}
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", onMouseDown);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("contextmenu", handleCM);
}

if (range) {
	range.addEventListener("input", handleRangeChange);
}

if (mode) {
	mode.addEventListener("click", handleModeClick);
}

if(save){
	save.addEventListener("click", handleSaveClick);
}

Array.from(colors).forEach((color) =>
	color.addEventListener("click", handleColorClick)
);
