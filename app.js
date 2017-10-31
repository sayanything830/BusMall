'use strict';

var imageArr = [
  'bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg'
];
var imgObjArr = [];
var imgOne;
var imgTwo;
var imgThree;
var prevOne;
var prevTwo;
var prevThree;
var totalClicks = 0;
var webListOne = document.getElementById('img-one');
var webListTwo = document.getElementById('img-two');
var webListThree = document.getElementById('img-three');

function ImageArrToObject(name) {
  this.name = name;
  this.path = 'img/' + name;
  this.imageClicked = 0;
  this.imageShown = 0;
};

for (var i = 0; i < imageArr.length; i ++) {
  imgObjArr.push(new ImageArrToObject(imageArr[i]));
}

function randNumGen() {
  var min = 0;
  var max = imageArr.length - 1;
  var randNum = Math.floor(Math.random() * (max - min) + 1);
  while (randNum === prevOne || randNum === prevTwo || randNum === prevThree) {
    randNum = Math.floor(Math.random() * (max - min) + 1);
  }
  //console.log('random number', randNum);
  return randNum;
};

function compareImg() {
  imgOne = randNumGen();
  imgTwo = randNumGen();
  imgThree = randNumGen();
  while (imgTwo === imgOne) {
    imgTwo = randNumGen();
  }
  while (imgThree === imgOne || imgThree === imgTwo) {
    imgThree = randNumGen();
  }
  prevOne = imgOne;
  prevTwo = imgTwo;
  prevThree = imgThree;
};

function loadImage() {
  compareImg();
  var webArr = [];
  webArr.push(imgObjArr[imgOne]);
  webArr.push(imgObjArr[imgTwo]);
  webArr.push(imgObjArr[imgThree]);
  imgObjArr[imgOne].imageShown++;
  imgObjArr[imgTwo].imageShown++;
  imgObjArr[imgThree].imageShown++;
  webListOne.innerHTML = '<img src="' + webArr[0].path + '">';
  webListTwo.innerHTML = '<img src="' + webArr[1].path + '">';
  webListThree.innerHTML = '<img src="' + webArr[2].path + '">';

}
function clickOnImage(event) {
  console.log(event.target);
  loadImage();
  totalClicks++;
}


loadImage();
console.log('total clicks', totalClicks);
webListOne.addEventListener('click', loadImage);
webListTwo.addEventListener('click', loadImage);
webListThree.addEventListener('click', loadImage);
