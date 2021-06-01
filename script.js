function openNav() {
  document.getElementById("mySidenav").style.width = "35%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function attachUIListeners() {
  // illustrations in about sidebar
  let links = document.querySelectorAll("#about a");
  let images = document.querySelectorAll("#photos img");
  for (let i = 0; i < links.length; i++) {
    links[i].onmouseover = function () {
      images[i].style.display = "block";
    };

    links[i].onmouseleave = function () {
      images[i].style.display = "none";
    };
  }

  // growth slider tool-tip
  // let growthRange = document.querySelector("range");
  let slider_message = document.getElementById("sliderMessage");

  growthSlider.onmouseover = function () {
    slider_message.style.display = "block";
  };

  growthSlider.onmouseleave = function () {
    slider_message.style.display = "none";
  };
}

attachUIListeners();
