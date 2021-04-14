// NOTES

// add infobar with volt bg
// add save button

let mencken;
let fontSize = 350;
let decayArray, decayArray2;

let save;

let type_input, type_value, type_width;

let growth_slider, growth_value;

let slime, linchen, fungal;

let h1 = 50;
let h2 = 76;
let s1 = 50
let s2 = 100;
let b1 = 70;
let b2 = 80;
let a1 = 1;
let a2 = 1;

function preload() {
	mencken = loadFont('fonts/mencken.otf');
  }

function setup() 
{

	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);

	textFont(mencken);
	textSize(fontSize);
	textAlign(CENTER, CENTER);

	type_value = 'Other Forms';
	type_input = createInput('Type here...').attribute('maxlength', 11);
	type_input.parent('typeInput');
	type_input.input(typeChange);

	save = createA('javascript:void(0)', 'Save');
	save.parent('infoContainer');
	save.class('button');
	save.mousePressed(saveImage);

	growth_value = 0.01;
	growth_slider = createSlider(0.01, 0.4, 0.01, 0.01);
	growth_slider.parent('growthSlider');
	growth_slider.input(growthChange);

	slime = createA('javascript:void(0)', 'Slime');
	slime.parent('strokeButtons');
	slime.class('button');
	slime.mousePressed(slimeStroke);

	cladonia = createA('javascript:void(0)', 'Cladonia');
	cladonia.parent('strokeButtons');
  	cladonia.class('button');
	cladonia.mousePressed(cladoniaStroke);

	fungal = createA('javascript:void(0)', 'Fungus');
	fungal.parent('strokeButtons');
	fungal.class('button');
	fungal.mousePressed(fungalStroke);

	myTurtle = new Turtle();

	noLoop();
	
}

function draw()
{

	background(59, 16, 21);

	drawBranch();

}

function drawBranch(){

	type_width = textWidth(type_value)

	decayArray = mencken.textToPoints(type_value, windowWidth/2 - type_width/2, 700, fontSize, {sampleFactor: growth_value});

	decayArray2 = mencken.textToPoints(type_value, windowWidth/2 - type_width/2, 700, fontSize, {sampleFactor: .25});

	strokeWeight(1);

	for(let i = 0; i < decayArray.length; i++){

		myTurtle.penUp();
		myTurtle.moveTo(decayArray[i].x, decayArray[i].y);
		//myTurtle.turnTo(-90);
		myTurtle.penDown();

		stroke(random(h1, h2), random(s1, s2), random(b1, b2), random(a1, a2));
	
		stepBranch(4, i);
	}

	beginShape();

	for(let i = 0; i < decayArray2.length; i++){

		stroke(random(h1, h2), random(s1, s2), random(b1, b2), random(a1, a2));

		ellipse(decayArray2[i].x + (noise(i * .2) * 5), decayArray2[i].y + (noise(i * .2) * 5), 1, 1);

	}

	endShape(CLOSE);

}

function stepBranch(length, i) {

	let right = 20;
	let left = 15;
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

function typeChange() {
	type_value = type_input.value();

	draw();

  }

function growthChange() {
	growth_value = growth_slider.value();

	draw();

  }

  function slimeStroke() {

	h1 = 50;
	h2 = 76;
	s1 = 50
	s2 = 100;
	b1 = 70;
	b2 = 80;
	a1 = 1;
	a2 = 1;

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

	draw();

  }


function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function saveImage(){

	saveCanvas('decay', 'png');

}