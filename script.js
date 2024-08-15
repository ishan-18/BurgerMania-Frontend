const slides = document.querySelectorAll(".slides");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const toggle = document.querySelector(".toggle");
const menu = document.querySelector("nav");

let i = 0;

function ActiveSlide(index) {
  for (let slide of slides) {
    slide.classList.remove("active");
  }
  slides[index].classList.add("active");
}

next.addEventListener("click", function () {
  if (i == slides.length - 1) {
    i = 0;
    ActiveSlide(i);
  } else {
    i++;
    ActiveSlide(i);
  }
});

prev.addEventListener("click", function () {
  if (i == 0) {
    i = slides.length - 1;
    ActiveSlide(i);
  } else {
    i--;
    ActiveSlide(i);
  }
});

toggle.addEventListener("click", function () {
  toggle.classList.toggle("active");
  menu.classList.toggle("active");
});