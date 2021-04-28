let links = document.querySelectorAll('#about a');
let images = document.querySelectorAll('#photos img');

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