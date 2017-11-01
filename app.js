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
  var max = imageArr.length;
  var randNum = Math.floor(Math.random() * (max - min) + min);
  while (randNum === prevOne || randNum === prevTwo || randNum === prevThree) { //conditionals to prevent previous image from showing
    randNum = Math.floor(Math.random() * (max - min) + min);
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

// var displayArr = [];
function loadImage() { //this function assigns the image to a specified list item and displays in the DOM
  compareImg();
  var webArr = [];
  webArr.push(imgObjArr[imgOne]); //pushes each image to an array
  webArr.push(imgObjArr[imgTwo]);
  webArr.push(imgObjArr[imgThree]);
  // displayArr.push(imgObjArr[imgOne]);
  // displayArr.push(imgObjArr[imgTwo]);
  // displayArr.push(imgObjArr[imgThree]);
  imgObjArr[imgOne].imageShown++; //adds to counter for each time image is shown
  imgObjArr[imgTwo].imageShown++;
  imgObjArr[imgThree].imageShown++;
  webListOne.innerHTML = '<img id="' + imgOne + '" src="' + webArr[0].path + '">'; //enters specific array item into DOM
  webListTwo.innerHTML = '<img id="' + imgTwo + '" src="' + webArr[1].path + '">';
  webListThree.innerHTML = '<img id="' + imgThree + '" src="' + webArr[2].path + '">';
  totalClicks++; //adds to counter of total clicks
  console.log('total clicks', totalClicks);
  console.log('img 1 shown', imgObjArr[imgOne].imageShown);
  console.log('img 2 shown', imgObjArr[imgTwo].imageShown);
  console.log('img 3 shown', imgObjArr[imgThree].imageShown);
  //console.log(displayArr[0]);
}
loadImage(); //calls initial images to load


function clickOnImage(event) { //event handler function that tells page to pull up new images until total clicks has reached 25
  console.log(event.target.id);
  var k = event.target.id;
  imgObjArr[k].imageClicked++;
  if (totalClicks < 26) { //total clicks starts at one once first page is loaded, so 26-1=25
    loadImage();//keep runing function
  } else { //after 25 clicks...
    displayTotals();
    function displayTotals(){ //turns each image object into a list item diplaying total times each one is shown and how many times it was clicked on
      var imgTotals = '';
      for (var j = 0; j < imageArr.length; j++) {
        imgTotals = imgTotals + '<li>' + imgObjArr[j].name + ' shown ' + imgObjArr[j].imageShown + ' times and selected ' + imgObjArr[j].imageClicked + ' times.</li>';
      }
      tally.innerHTML = imgTotals; //adds to list in DOM
      webListOne.removeEventListener('click', clickOnImage);
      webListTwo.removeEventListener('click', clickOnImage);
      webListThree.removeEventListener('click', clickOnImage);
      //*** adding local storage feature conditional ***
      save();
      //*** calling chart data functions to turn objects into properties ***
      objNameToArr();
      objShownToArr();
      objClickToArr();
      //This is where I add a chart
      var ctx = document.getElementById('myChart').getContext('2d');
      var chartTotals = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: imageName,
          datasets: [
            {
              label: 'How many times an image was shown',
              backgroundColor: 'rgb(255, 99, 132)',
              data: shown
            },
            {
              label: 'How many times an image was clicked',
              backgroundColor: 'rgb(0, 110, 242)',
              data: clicked
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Images Clicked vs. Shown'
          }
        }
      });

    }
    //*** Reseting chart tables ***
    imageName = []; //resets the chart tables
    shown = [];
    clicked = [];
  }
}
//*** Arrays to place in chart labels and data ***
var imageName = [];
var shown = [];
var clicked = [];

//*** chart data functions ***
function objNameToArr () {
  for (var a = 0; a < imgObjArr.length; a++) {
    imageName.push(imgObjArr[a].name);
  }
}

function objShownToArr () {
  for (var b = 0; b < imgObjArr.length; b++) {
    shown.push(imgObjArr[b].imageShown);
  }
}

function objClickToArr () {
  for (var c = 0; c < imgObjArr.length; c++) {
    clicked.push(imgObjArr[c].imageClicked);
  }
}
//*** event listeners per image ***
webListOne.addEventListener('click', clickOnImage);
webListTwo.addEventListener('click', clickOnImage);
webListThree.addEventListener('click', clickOnImage);

if (localStorage.saveImgObjArr) {
  var saveImgObjArr = localStorage.saveImgObjArr.split('^,');
} else var saveImgObjArr = [];

//*** adding local storage save function ***
function save () {
  if (saveImgObjArr = []) {
    for (var d = 0; d < imgObjArr.length; d++) {
      if (d === imgObjArr.length - 1) {
        saveImgObjArr.push(JSON.stringify(imgObjArr[d]));
        break;
      }
      saveImgObjArr.push(JSON.stringify(imgObjArr[d]) + '^');
    }
    localStorage.saveImgObjArr = saveImgObjArr;
  }
}

//*** now local storage loading function for saved data ***
function load () {
  if (localStorage.saveImgObjArr) {
    for (var e = 0; e < saveImgObjArr.length; e++) {
      JSON.parse(saveImgObjArr[e]);
      imgObjArr[e] = saveImgObjArr[e];
    }
  }
}
load();
