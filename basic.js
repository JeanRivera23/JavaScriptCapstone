//stores buttons in variables
var startBtn = document.getElementById("startBtn");
var skipBtn = document.getElementById("skipBtn");

// sets skipBtn display to none until the start button is clicked
skipBtn.style.display = "none";

// html elements that will show word and wrong attempts
var word = document.getElementById("word");
var wrongLetter = document.getElementById('wrongLetter');

// word counter
var i = 0;

// random counter
var x = 0;

// character counter
var c = 0;

// counter for attempts
var a = 0;

// word arrays
var easyWords = ["flock", "nebula", "lodge", "nook", "petal"];
var intWords = ["pendulum", "melodious", "disturbance", "gargoyle", "spiderling"];
var hardWords = ["percolator", "lichfield", "tsavolite", "hatshepsut", "dodecahedron"];


// onclick event for startBtn
startBtn.addEventListener("click", function() {
  event.preventDefault();
  start();
});

// onclick event for skipBtn
skipBtn.addEventListener("click", function() {
  event.preventDefault();
  skip();
});

// keypress event
document.addEventListener("keypress", function(event) {
  event.preventDefault();
  a++
  if (a > 10 && startBtn.style.display == "none") {
    // set score to 0 and bring user to level choice modal
    alert("Not the brightest bulb are you?");
    skip();

    // this loop clears out the array that stores keys pressed
    for (a = 0; a <=10; a++) {
      keyStorage.pop()
    }
  }
  else if (startBtn.style.display == "none") {
    checkLetters();
    // wordSolved ();
  }
});


// stores all spans created for each letter
var spanStorage = [];
// console.log(spanStorage);

// start function
function start() {
  // resets attempt counter with each new word
  a = 0

  // removes the spans created for the previous word and previous attempts
  word.innerHTML = "";
  wrongLetter.innerHTML = "";

  // if end of word array is reached, should prompt user to choose another level/theme
  if (i >= easyWords.length) {
    word.textContent = "There are no more words to choose from. Go read a book or something.";
    wrongLetter.innerHTML = "";

    // skipBtn.style.display = "none";
  }

  var wordChoice = easyWords[i];

  // word loop, displays letter spans
  for (c = 0; c < wordChoice.length; c++) {

    var spanElement = document.createElement("span");
    spanElement.setAttribute('id', c);
    spanElement.style.color = "#FFA500";
    // spanElement.style.textDecoration = "underline";
    spanElement.textContent = wordChoice.charAt(c);
    word.appendChild(spanElement);

    // pushes each span created into array to store it
    spanStorage.push(spanElement);
    // console.log(spanStorage);
  }
  // hides button after game has begun
  startBtn.style.display = "none";
  skipBtn.style.display = "block";

  // console.log(spanStorage);

}


// skip function
function skip() {
  // this loop clears out the array that stores keys pressed
  for (a = 0; a <=10; a++) {
    keyStorage.pop()
    spanStorage.pop()
  }
  // skips through word array by incrementing index
  i++
  // resets attempt counter with each new word
  a = 0
  start();
}


// stores all keys pressed
var keyStorage = [];

// // array stores wrong letters
// var wrong = [];

// function that checks letters
function checkLetters() {
  x = 0

  // stores value of single key pressed in variable
  var info = event.key;

  // pushes each key pressed into array to store it
  keyStorage.push(event.key);
  // console.log(keyStorage);

  // you only get 10 tries before game is over
  // if attempt is correct do this:
  if (a <= 10 && startBtn.style.display == "none") {

    // if attempt is wrong do this (only 10 attempts)
    var letterSpan = document.createElement("span");
    letterSpan.setAttribute('id', a + "b");
    letterSpan.textContent = info;
    letterSpan.style.backgroundColor = "red";
    letterSpan.style.opacity = ".5";      wrongLetter.appendChild(letterSpan);

    // // pushes each wrong key pressed into array to store it
    // wrong.push(event.key);

    // // if key has alredy been pressed, shouldn't count towards attempts after that or show up on wrong attempts
    // for (x = 0; x < wrong.length; x++) {
    //   if (event.key == wrong.indexOf(x)) {
    //     console.log(wrong.indexOf(x))
    //     a--
    //     // removes letter span from wrong attempts if it's used in word
    //     wrongLetter.removeChild(letterSpan);
    //     wrong.pop()
    //   }
    // }

    // loop will check if key pressed matches letter in word
    for (x = 0; x < spanStorage.length; x++) {
      if (info == spanStorage[x].innerHTML) {
        a--
        spanStorage[x].style.color = "black";
        // removes letter span from wrong attempts if it's used in word
        wrongLetter.removeChild(letterSpan);
        // wrong.pop()
      }
    }
  }
}

// checks if you solved the word
// function wordSolved () {
//   // if all spans in word have their style set to black, then the word is solved. Good Job
//   for (x = 0; x < spanStorage.length; x++) {
//     if (spanStorage[x].style.color = "black") {
//       alert("You did it! GREAT JOB!");
//       word.innerHTML = "";
//       wrongLetter.innerHTML = "";
//     }
//   }
// }
