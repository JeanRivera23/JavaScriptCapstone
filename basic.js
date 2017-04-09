// code will only run when entire document is loaded
document.addEventListener("DOMContentLoaded", function() {

  // global variables and arrays

  //stores buttons in variables
  var startBtn = document.getElementById("startBtn");
  var skipBtn = document.getElementById("skipBtn");
  var points = document.getElementById("pointsContainer");

  // stores all spans created for each letter
  var spanStorage = [];
  // console.log(spanStorage);

  // stores all keys pressed
  var keyStorage = [];

  // sets skipBtn display to none until the start button is clicked
  skipBtn.style.display = "none";

  // html elements that will show word, hints and wrong attempts
  var word = document.getElementById("word");
  var hint= document.getElementById("hint");
  var wrongLetter = document.getElementById('wrongLetter');

  // random use counter
  var x = 0;

  // word counter
  var i = 0;

  // character counter
  var c = 0;

  // wrong attempts counter
  var a = 0;

  // word array
  var words = [
    "nook",
    "lodge",
    "petal",
    "flock",
    "nebula",
    "pendulum",
    "gargoyle",
    "melodious",
    "spiderling",
    "percolator",
    "tsavolite",
    "hatshepsut",
  ];

  // hint array
  var hints = [
    "Tried to replace the book.",
    "You stay at this when you go skiing.",
    "Part of a flower.",
    "Birds of a feather do this together.",
    "Cloud of star dust.",
    "Helps a clock keep time.",
    "Statue that guards old medieval churches.",
    "Pleasant-sounding. Rhymes with harmonious.",
    "Baby spider.",
    "Brews coffee.",
    "A type of garnet.",
    "Female Egyptian pharaoh.",
  ];


  // functions

  // start function
  function start() {
    // resets attempt counter with each new word
    a = 0

    // removes the spans created for the previous word and previous attempts
    word.innerHTML = "";
    wrongLetter.innerHTML = "";

    // once end of word array is reached do this:
    if (i >= words.length) {
      // total score is displayed
      word.textContent = "There are no more words left.";
      word.style.fontSize= "24px";
      wrongLetter.innerHTML = "";
      skipBtn.style.display = "none";
      hint.style.display = "none";
    }

    var wordChoice = words[i];
    var displayHint = hints[i];

    // word loop, splits letters up, displays letter spans
    for (c = 0; c < wordChoice.length; c++) {

      // will display the hint for each word
      hint.textContent = displayHint;

      var spanElement = document.createElement("span");
      spanElement.setAttribute('id', c);
      spanElement.style.color = "#FFA500";
      spanElement.style.textDecoration = "underline";
      spanElement.style.textDecorationColor= "black";
      spanElement.textContent = wordChoice.charAt(c);
      word.appendChild(spanElement);

      // pushes each span created into array to store it
      spanStorage.push(spanElement);
    }

    // hides start btn after game has begun, shows skip btn
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


  // function that checks letters
  function checkLetters() {

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
      letterSpan.style.opacity = ".5";
      wrongLetter.appendChild(letterSpan);


      // loop will check if key pressed matches letter in word
      for (x = 0; x < spanStorage.length; x++) {
        if (info == spanStorage[x].innerHTML) {
          a--
          spanStorage[x].style.color = "black";
          spanStorage[x].style.textDecoration = "none";
          // removes letter span from wrong attempts if it's used in word
          wrongLetter.removeChild(letterSpan);
        }
      }
    }
  }


  // event listeners, functions invoked

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
      var gameOver = document.getElementById("gameOver");
      var pageChange = document.getElementById("pageChange");
      var songCont = document.getElementById("songCont");
      var hide = document.getElementById("hide");

      gameOver.style.display = "block";
      pageChange.style.backgroundColor = "black";
      songCont.setAttribute("src", "sounds/Funny-game-over-sound.mp3");
      songCont.loop = false;
      hide.style.display = "none";

      // this loop clears out the array that stores keys pressed
      for (a = 0; a <=10; a++) {
        keyStorage.pop()
      }
    }
    else if (startBtn.style.display == "none") {
      checkLetters();
    }
  });
})
