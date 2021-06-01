//// base text

let formula;
let textArray;

//// right panel

let save, about;

//// text input

let type_input, type_value, type_width;

//// growth + style settings

let growth_slider, growth_value;

let slime, linchen, fungal;

// default style settings
let h1 = 50;
let h2 = 76;
let s1 = 50
let s2 = 100;
let b1 = 70;
let b2 = 80;
let a1 = 0.5;
let a2 = 1;

// default turn radius
let right = 20;
let left = 15; 


function preload() {

	// load the font
	formula = loadFont('fonts/formula.otf');

  }

function setup() {

	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);

	// text input
	type_value = 'Other Forms';
	type_input = createInput('Type here...').attribute('maxlength', 11);
	type_input.parent('typeInput');
	type_input.input(typeChange);

	// save button
	save = createA('javascript:void(0)', 'Save');
	save.parent('aboutButtons');
	save.class('button left');
	save.mousePressed(saveImage);

	// about button
	about = createA('javascript:void(0)', 'About');
	about.parent('aboutButtons');
	about.class('button right');
	about.mousePressed(openNav);

	// growth params
	growth_value = 3.3;
	growth_slider = createSlider(3.3, 4.5, 3.3, 0.1);
	growth_slider.parent('growthSlider');
	growth_slider.input(growthChange);

	// style params
	slime = createA('javascript:void(0)', 'Slime Mold');
	slime.parent('strokeButtons');
	slime.class('button left');
	slime.mousePressed(slimeStroke);

	cladonia = createA('javascript:void(0)', 'Reindeer Lichen');
	cladonia.parent('strokeButtons');
  	cladonia.class('button middle');
	cladonia.mousePressed(cladoniaStroke);

	fungal = createA('javascript:void(0)', 'Coral Fungus');
	fungal.parent('strokeButtons');
	fungal.class('button right');
	fungal.mousePressed(fungalStroke);

	// create a new Turtle
	myTurtle = new Turtle();

	noLoop();
	
}

function draw(){

	background(59, 16, 21);

	drawText();

	drawBranch();

}

//// draws the base font
function drawText(){

	const fontSize = windowWidth/4.4;

	textFont(formula);
	textSize(fontSize);
	textAlign(CENTER, CENTER);

	type_width = textWidth(type_value);

	// turns text into an array of points
	textArray = formula.textToPoints(type_value, windowWidth/2 - type_width/2, windowHeight/1.5, fontSize, {sampleFactor: .25});

}

//// draws a branch at each point in the text array
function drawBranch(){

	strokeWeight(1);

	for(let i = 0; i < textArray.length; i++){

		myTurtle.penUp();
		myTurtle.moveTo(textArray[i].x, textArray[i].y);
		myTurtle.penDown();

		stroke(random(h1, h2), random(s1, s2), random(b1, b2), random(a1, a2));
	
		stepBranch(growth_value, i);
	}


}

//// creates a branch
function stepBranch(length, i) {

	// pass in i for noise

	// adds randomness to the length
	let adj = random(0.7, 0.9);

	if (length < 3) {
		return;
	};

	myTurtle.moveForward(length);
	myTurtle.moveForward(length);
	myTurtle.turnRight(PI * random(-1, 1));
	stepBranch(length * adj);

	myTurtle.pushState();

	myTurtle.turnRight(right * noise(i * .01));
	myTurtle.moveForward(length);
	stepBranch(length * adj);

	myTurtle.popState();

	myTurtle.turnLeft(left);
	stepBranch(length * adj);

	myTurtle.pushState();

	myTurtle.turnLeft(left);
	myTurtle.moveForward(length);
	myTurtle.turnRight(right);
	myTurtle.turnRight(right);
	stepBranch(length * adj);

	myTurtle.popState();

	myTurtle.pushState();

	myTurtle.turnRight(right);
	myTurtle.moveForward(length);
	myTurtle.turnLeft(left);
	myTurtle.turnLeft(left);
	stepBranch(length * adj);

	myTurtle.popState();

	myTurtle.pushState();

	myTurtle.turnRight(right);
	myTurtle.turnLeft(left);
	myTurtle.turnLeft(left);
	
	stepBranch(length * adj);

	myTurtle.popState();

}

//// see text change in real time
function typeChange() {
	type_value = type_input.value();

	draw();

  }

//// see growth change in real time
function growthChange() {

	growth_value = growth_slider.value();

	draw();

  }

//// see style settings change in real time
function slimeStroke() {

	h1 = 50;
	h2 = 76;
	s1 = 50
	s2 = 100;
	b1 = 70;
	b2 = 80;
	a1 = 0.5;
	a2 = 1;

	right = 20;
	left = 15;

	draw();

  }

  function cladoniaStroke() {

	h1 = 30;
	h2 = 70;
	s1 = 0;
	s2 = 0;
	b1 = 80;
	b2 = 100;
	a1 = 0.1;
	a2 = 1;

	right = 180;
	left = 10;

	draw();

  }

  function fungalStroke() {

	h1 = 5;
	h2 = 25;
	s1 = 50
	s2 = 80;
	b1 = 95;
	b2 = 95;
	a1 = 0.5;
	a2 = 1;

	right = 60;
	left = 7;

	draw();

  }

//// save the canvas
function saveImage(){

	saveCanvas('another-form', 'png');

}

//// canvas responsive to window resize
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}