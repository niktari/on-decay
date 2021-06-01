let links = document.querySelectorAll('#about a');
let images = document.querySelectorAll('#photos img');
let slider_message = document.getElementById('sliderMessage');

let growthRange = document.querySelector('range');

function openNav() {
    document.getElementById("mySidenav").style.width = "35%";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  for (let i=0; i < links.length; i++){
    links[i].onmouseover = function(){
       images[i].style.display = 'block';
    }
    
    links[i].onmouseleave = function(){
        images[i].style.display = 'none';
    };
}

//// growth message

growthSlider.onmouseover = function(){

	slider_message.style.display = 'block';
  
  }
  
  growthSlider.onmouseleave = function(){
  
	slider_message.style.display = 'none';
  
  }

