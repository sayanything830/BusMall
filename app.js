'use strict';

var imageArr = [
  'bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'
]; //these are my images
var imgObjArr = []; //this will become an array of my image objects after being passed through my constructor function
var imgOne; //this represents the index number of the image object array created above
var imgTwo;
var imgThree;
var prevOne; // imgOne becomes prevOne to varify an image is not re-posted immediately
var prevTwo;
var prevThree;
var totalClicks = 0; //grand total of clicks
var webListOne = document.getElementById('img-one'); //enters image into first list item
var webListTwo = document.getElementById('img-two'); //second list item
var webListThree = document.getElementById('img-three'); //third list item
//var finalHeading = document.getElementById('final');
var tally = document.getElementById('tally'); //lists image totals at the end of 25 selections

function ImageArrToObject(name) { //turns images into objects with specific key value pairs
  this.name = name;
  this.path = 'img/' + name;
  this.imageClicked = 0;
  this.imageShown = 0;
};

for (var i = 0; i < imageArr.length; i ++) { //calls constructor function for each image
  imgObjArr.push(new ImageArrToObject(imageArr[i]));
}

function randNumGen() { //generates random number from 0-19 to become index number of image object array
  var min = 0;
  var max = imageArr.length - 1;
  var randNum = Math.floor(Math.random() * (max - min) + 1);
  while (randNum === prevOne || randNum === prevTwo || randNum === prevThree) { //conditionals to prevent previous image from showing
    randNum = Math.floor(Math.random() * (max - min) + 1);
  }
  //console.log('random number', randNum);
  return randNum;
};

function compareImg() { //compares each index number to make sure same image does not display on same page
  imgOne = randNumGen();
  imgTwo = randNumGen();
  imgThree = randNumGen();
  while (imgTwo === imgOne) {
    imgTwo = randNumGen();
  }
  while (imgThree === imgOne || imgThree === imgTwo) {
    imgThree = randNumGen();
  }
  prevOne = imgOne; //this is where images are reassigned as previous images
  prevTwo = imgTwo;
  prevThree = imgThree;
};

function loadImage() { //this function assigns the image to a specified list item and displays in the DOM
  compareImg();
  var webArr = [];
  webArr.push(imgObjArr[imgOne]); //pushes each image to an array
  webArr.push(imgObjArr[imgTwo]);
  webArr.push(imgObjArr[imgThree]);
  imgObjArr[imgOne].imageShown++; //adds to counter for each time image is shown
  imgObjArr[imgTwo].imageShown++;
  imgObjArr[imgThree].imageShown++;
  webListOne.innerHTML = '<img src="' + webArr[0].path + '">'; //enters specific array item into DOM
  webListTwo.innerHTML = '<img src="' + webArr[1].path + '">';
  webListThree.innerHTML = '<img src="' + webArr[2].path + '">';
  totalClicks++; //adds to counter of total clicks
  console.log('total clicks', totalClicks);
  console.log('img 1 shown', imgObjArr[imgOne].imageShown);
  console.log('img 2 shown', imgObjArr[imgTwo].imageShown);
  console.log('img 3 shown', imgObjArr[imgThree].imageShown);
}
function clickOnImage(event) { //event handler function that tells page to pull up new images until total clicks has reached 25
  console.log(event.target);
  if (totalClicks < 26) { //total clicks starts at one once first page is loaded, so 26-1=25
    loadImage();//keep runing function
  } else { //after 25 clicks...
    alert('That\s the end our research, thank you for your participation!');
    displayTotals();
    function displayTotals(){ //turns each image object into a list item diplaying total times each one is shown and how many times it was clicked on
      var imgTotals = '';
      for (var j = 0; j < imageArr.length; j++) {
        imgTotals = imgTotals + '<li>' + imgObjArr[j].name + ' shown ' + imgObjArr[j].imageShown + ' times and selected ' + imgObjArr[j].imageClicked + ' times.</li>';
      }
      tally.innerHTML = imgTotals; //adds to list in DOM
      //tally.appendChild(imgTotals);
      console.log('image total lists', imgTotals);
    }
  }
}
loadImage(); //calls initial images to load
addImageClicks(); //calling on event listener conditions... this is not working as planned

function addImageClicks () { //event listener working, but not properly adding up each time an image was clicked
  if (webListOne.addEventListener('click', clickOnImage)) {
    event.target.imageClicked++;//this approach isn't working...yet.
    //console.log('image clicked', event.target.imageClicked);
  }
  if (webListTwo.addEventListener('click', clickOnImage)) {
    imgObjArr[imgTwo].imageClicked++;//nor is this one.
  }
  if (webListThree.addEventListener('click', clickOnImage)) {
    imgObjArr[imgThree].imageClicked++;
  }
}
