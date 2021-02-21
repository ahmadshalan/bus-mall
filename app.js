'use strict';



let leftImageElement = document.getElementById('left-image');

let middleImageElement = document.getElementById('middle-image');

let rightImageElement = document.getElementById('right-image');
let maxAttempts = 25;
let userAttemptsCounter = 0;
let leftImageIndex;
let middleImageIndex;
let rightImageIndex;

function productImage(name, source, view) {
    this.name = name;
    this.source = source;
    this.view = 0;

    this.votes = 0;

    productImage.allImages.push(this);
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
    // rightImageIndex = generateRandomIndex();
    middleImageIndex = generateRandomIndex();

    do {
        rightImageIndex = generateRandomIndex();
    } while (leftImageIndex === rightImageIndex || middleImageIndex === rightImageIndex)


    // if (leftImageIndex === rightImageIndex || middleImageIndex === rightImageIndex) {

    //     rightImageIndex = generateRandomIndex();

    // } else {
    //     middleImageIndex = generateRandomIndex();
    // }


    productImage.allImages

    leftImageElement.src = productImage.allImages[leftImageIndex].source;

    middleImageElement.src = productImage.allImages[rightImageIndex].source;

    rightImageElement.src = productImage.allImages[rightImageIndex].source;

}

renderThreeImages();


leftImageElement.addEventListener('click', handleUserClick);
middleImageElement.addEventListener('click', handleUserClick);
rightImageElement.addEventListener('click', handleUserClick);

function handleUserClick(event) {

    userAttemptsCounter++;

    console.log(event.target.id);

    if (userAttemptsCounter < maxAttempts) {

        if (event.target.id === 'left-image') {
            productImage.allImages[leftImageIndex].votes++
            productImage.allImages[leftImageIndex].view++


        } else if (event.target.id === 'middle-image') {

            productImage.allImages[middleImageIndex].votes++
            productImage.allImages[middleImageIndex].view++

        } else {
            productImage.allImages[rightImageIndex].votes++
            productImage.allImages[rightImageIndex].view++
        }
        renderThreeImages();

    }
    else {


        let list = document.getElementById('results-list');
        let button = document.createElement('button');
        list.appendChild(button);
        button.textContent = "show-result"
        button.addEventListener('click', enter)
        


        function enter() {
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

        } 
    }
}
