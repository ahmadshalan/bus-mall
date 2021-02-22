'use strict';

let leftImageElement = document.getElementById('left-image');

let middleImageElement = document.getElementById('middle-image');

let rightImageElement = document.getElementById('right-image');
let maxAttempts = 25;
let userAttemptsCounter = 0;
let leftImageIndex;
let middleImageIndex;
let rightImageIndex;
let productNames=[];
let productVotes = [];
let productView = [];

function productImage(name, source, view) {
    this.name = name;
    this.source = source;
    this.view = 0;
    this.votes = 0;
    productImage.allImages.push(this);
    productNames.push(name);
}

productImage.allImages = [];

new productImage('bag', 'img/bag.jpg');
new productImage('banana', 'img/banana.jpg');
new productImage('bathroom', 'img/bathroom.jpg');
new productImage('boots', 'img/boots.jpg');
new productImage('breakfast', 'img/breakfast.jpg');
new productImage('bubblegum', 'img/bubblegum.jpg');
new productImage('chair', 'img/chair.jpg');
new productImage('cthulhu', 'img/cthulhu.jpg');
new productImage('dog-duck', 'img/dog-duck.jpg');
new productImage('dragon', 'img/dragon.jpg');
new productImage('pen', 'img/pen.jpg');
new productImage('pet-sweep', 'img/pet-sweep.jpg');
new productImage('scissors', 'img/scissors.jpg');
new productImage('shark', 'img/shark.jpg');
new productImage('sweep', 'img/sweep.png');
new productImage('tauntaun', 'img/tauntaun.jpg');
new productImage('unicorn', 'img/unicorn.jpg');
new productImage('usb', 'img/usb.gif');
new productImage('water-can', 'img/water-can.jpg');
new productImage('wine-glass', 'img/wine-glass.jpg');

console.log(productImage.allImages);

function generateRandomIndex() {
    return Math.floor(Math.random() * productImage.allImages.length);
}

function renderThreeImages() {

    leftImageIndex = generateRandomIndex();
    
    do {
        middleImageIndex = generateRandomIndex();
        rightImageIndex = generateRandomIndex();
    } while((leftImageIndex===rightImageIndex)||(middleImageIndex===rightImageIndex)||(middleImageIndex===leftImageIndex))
    
    productImage.allImages
    
    leftImageElement.src = productImage.allImages[leftImageIndex].source;
    productImage.allImages[leftImageIndex].view++
    
    rightImageElement.src = productImage.allImages[rightImageIndex].source;
    productImage.allImages[rightImageIndex].view++
    
    middleImageElement.src = productImage.allImages[middleImageIndex].source;
    productImage.allImages[middleImageIndex].view++

    
}

renderThreeImages();

leftImageElement.addEventListener('click', handleUserClick);
middleImageElement.addEventListener('click', handleUserClick);
rightImageElement.addEventListener('click', handleUserClick);

function handleUserClick(event) {

    userAttemptsCounter++;

    console.log(event.target.id);

    if (userAttemptsCounter <= maxAttempts) {

        if (event.target.id === 'left-image') {
            productImage.allImages[leftImageIndex].votes++


        } else if (event.target.id === 'middle-image') {

            productImage.allImages[middleImageIndex].votes++

        } else {
            productImage.allImages[rightImageIndex].votes++
        }
        renderThreeImages();
    }
    else {

        let list = document.getElementById('results-list');
        // let button = document.createElement('button');
        // list.appendChild(button);
        // button.textContent = "show-result"
        // button.addEventListener('click', enter)

        // function enter() {
            let productResult;
            for (let i = 0; i < productImage.allImages.length; i++) {
                productResult = document.createElement('li');
                list.appendChild(productResult);
                productResult.textContent = productImage.allImages[i].name + ' has ' + productImage.allImages[i].votes
                    + ' votes and was seen' + productImage.allImages[i].view;
            }

            rightImageElement.removeEventListener('click', handleUserClick);
            middleImageElement.removeEventListener('click', handleUserClick);
            leftImageElement.removeEventListener('click', handleUserClick);

            for (let i = 0; i < productImage.allImages.length; i++) {
                
                productVotes.push(productImage.allImages[i].votes);
          
                productView.push(productImage.allImages[i].view);
              }
              viewChart()    
    }
}
function viewChart() {

    let ctx = document.getElementById('myChart').getContext('2d');
  
    let chart = new Chart(ctx, {

      type: 'bar',
  
      data: {
        labels: productNames,
  
        datasets: [
          {
            label: 'product votes',
            backgroundColor: '#1e212d',
            borderColor: '#1e212d',
            data: productVotes
          },
          
          {
            label: 'Product View',
            backgroundColor: 'red',
            borderColor: 'red',
            data: productView
          },
        ]
      },
      options: {}
    });
}
