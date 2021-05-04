let formula;
let textArray, textArray2;

let save, about;

let type_input, type_value, type_width;

let growth_slider, growth_value;

let slime, linchen, fungal;

let h1 = 50;
let h2 = 76;
let s1 = 50
let s2 = 100;
let b1 = 70;
let b2 = 80;
let a1 = 0.5;
let a2 = 1;

let right = 20;
let left = 15; 


function preload() {
	formula = loadFont('fonts/formula.otf');
  }

function setup() 
{

	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);

	type_value = 'Other Forms';
	type_input = createInput('Type here...').attribute('maxlength', 11);
	type_input.parent('typeInput');
	type_input.input(typeChange);

	save = createA('javascript:void(0)', 'Save');
	save.parent('aboutButtons');
	save.class('button left');
	save.mousePressed(saveImage);

	about = createA('javascript:void(0)', 'About');
	about.parent('aboutButtons');
	about.class('button right');
	about.mousePressed(openNav);

	growth_value = 3.3;
	growth_slider = createSlider(3.3, 4.5, 3.3, 0.1);
	growth_slider.parent('growthSlider');
	growth_slider.input(growthChange);

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

	myTurtle = new Turtle();

	noLoop();
	
}

function draw()
{

	background(59, 16, 21);

	drawText();

	drawGrowth();

}

function drawText(){

	const fontSize = windowWidth/4.4;

	textFont(formula);
	textSize(fontSize);
	textAlign(CENTER, CENTER);

	type_width = textWidth(type_value);

	textArray = formula.textToPoints(type_value, windowWidth/2 - type_width/2, windowHeight/1.5, fontSize, {sampleFactor: .25});

	// textArray2 = formula.textToPoints(type_value, windowWidth/2 - type_width/2, windowHeight/1.5, fontSize, {sampleFactor: .25});


}

function drawGrowth(){

	strokeWeight(1);

	for(let i = 0; i < textArray.length; i++){

		myTurtle.penUp();
		myTurtle.moveTo(textArray[i].x, textArray[i].y);
		myTurtle.penDown();

		stroke(random(h1, h2), random(s1, s2), random(b1, b2), random(a1, a2));
	
		stepGrowth(growth_value, i);
	}



	// for(let i = 0; i < textArray2.length; i++){

	// 	stroke(random(h1, h2), random(s1, s2), random(b1, b2), random(a1, a2));

	// 	push();

	// 	// rect(textArray2[i].x + (noise(i * .2) * 5), textArray2[i].y + (noise(i * .2) * 5), 1, 1);

	// 	line(textArray2[i].x + (noise(i * .2) * 5), textArray2[i].y + + (noise(i * .2) * 5), textArray2[i].x + random(5), textArray2[i].y + random(3));

	// 	pop();

	// }



}

function stepGrowth(length, i) {

	let adj = random(0.7, 0.9);

	if (length < 3) {
		return;
	};

	myTurtle.moveForward(length);
	myTurtle.moveForward(length);
	myTurtle.turnRight(PI * random(-1, 1));
	stepGrowth(length * adj);

	myTurtle.pushState();

	myTurtle.turnRight(right * noise(i * .01));
	myTurtle.moveForward(length);
	stepGrowth(length * adj);

	myTurtle.popState();

	myTurtle.turnLeft(left);
	stepGrowth(length * adj);

	myTurtle.pushState();

	myTurtle.turnLeft(left);
	myTurtle.moveForward(length);
	myTurtle.turnRight(right);
	myTurtle.turnRight(right);
	stepGrowth(length * adj);

	myTurtle.popState();

	myTurtle.pushState();

	myTurtle.turnRight(right);
	myTurtle.moveForward(length);
	myTurtle.turnLeft(left);
	myTurtle.turnLeft(left);
	stepGrowth(length * adj);

	myTurtle.popState();

	myTurtle.pushState();

	myTurtle.turnRight(right);
	myTurtle.turnLeft(left);
	myTurtle.turnLeft(left);
	
	stepGrowth(length * adj);

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


function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function saveImage(){

	saveCanvas('another-form', 'png');

}

let slider_message = document.getElementById('sliderMessage');

growthSlider.onmouseover = function(){

	slider_message.style.display = 'block';
  
  }
  
  
  growthSlider.onmouseleave = function(){
  
	slider_message.style.display = 'none';
  
  }