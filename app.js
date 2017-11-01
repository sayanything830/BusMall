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
function clickOnImage(event) { //event handler function that tells page to pull up new images until total clicks has reached 25
  console.log(event.target.id);
  var k = event.target.id;
  imgObjArr[k].imageClicked++;
  if (totalClicks < 26) { //total clicks starts at one once first page is loaded, so 26-1=25
    loadImage();//keep runing function
  } else { //after 25 clicks...
    //alert('That\'s the end our research, thank you for your participation!');
    displayTotals();
    function displayTotals(){ //turns each image object into a list item diplaying total times each one is shown and how many times it was clicked on
      var imgTotals = '';
      for (var j = 0; j < imageArr.length; j++) {
        imgTotals = imgTotals + '<li>' + imgObjArr[j].name + ' shown ' + imgObjArr[j].imageShown + ' times and selected ' + imgObjArr[j].imageClicked + ' times.</li>';
      }
      tally.innerHTML = imgTotals; //adds to list in DOM
      //tally.appendChild(imgTotals);
      console.log('image total lists', imgTotals);
      //This is where I add a chart
      var ctx = document.getElementById('myChart').getContext('2d');
      var chartTotals = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        data: {
          labels: [imgObjArr[0].name, imgObjArr[1].name, imgObjArr[2].name, imgObjArr[3].name, imgObjArr[4].name, imgObjArr[5].name, imgObjArr[6].name, imgObjArr[7].name, imgObjArr[8].name, imgObjArr[9].name, imgObjArr[10].name, imgObjArr[11].name, imgObjArr[12].name, imgObjArr[13].name, imgObjArr[14].name, imgObjArr[15].name, imgObjArr[16].name, imgObjArr[17].name, imgObjArr[18].name, imgObjArr[19].name],
          datasets: [
            {
              label: 'How many times an image was shown',
              backgroundColor: 'rgb(255, 99, 132)',
              data: [imgObjArr[0].imageShown, imgObjArr[1].imageShown, imgObjArr[2].imageShown, imgObjArr[3].imageShown, imgObjArr[4].imageShown, imgObjArr[5].imageShown, imgObjArr[6].imageShown, imgObjArr[7].imageShown, imgObjArr[8].imageShown, imgObjArr[9].imageShown, imgObjArr[10].imageShown, imgObjArr[11].imageShown, imgObjArr[12].imageShown, imgObjArr[13].imageShown, imgObjArr[14].imageShown, imgObjArr[15].imageShown, imgObjArr[16].imageShown, imgObjArr[17].imageShown, imgObjArr[18].imageShown,imgObjArr[19].imageShown
              ]
            },
            {
              label: 'How many times an image was clicked',
              backgroundColor: 'rgb(0, 110, 242)',
              data: [imgObjArr[0].imageClicked, imgObjArr[1].imageClicked, imgObjArr[2].imageClicked, imgObjArr[3].imageClicked, imgObjArr[4].imageClicked, imgObjArr[5].imageClicked, imgObjArr[6].imageClicked, imgObjArr[7].imageClicked, imgObjArr[8].imageClicked, imgObjArr[9].imageClicked, imgObjArr[10].imageClicked, imgObjArr[11].imageClicked, imgObjArr[12].imageClicked, imgObjArr[13].imageClicked, imgObjArr[14].imageClicked, imgObjArr[15].imageClicked, imgObjArr[16].imageClicked, imgObjArr[17].imageClicked, imgObjArr[18].imageClicked,imgObjArr[19].imageClicked]
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
  }
}

loadImage(); //calls initial images to load

webListOne.addEventListener('click', clickOnImage);
webListTwo.addEventListener('click', clickOnImage);
webListThree.addEventListener('click', clickOnImage);
