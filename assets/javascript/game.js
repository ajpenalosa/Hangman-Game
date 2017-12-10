//------------------------------------------------------------
//----------- VARIABLES
//------------------------------------------------------------

var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var characterImageOutput;
var movie;
var isFirstGame = true;
var gameStarted = false;

// Divs

var characterImage = document.getElementsByClassName("character-image")[0];
var winsDiv = document.getElementsByClassName("wins")[0];
var lossesDiv = document.getElementsByClassName("losses")[0];
var guessesRemainingDiv = document.getElementsByClassName("guesses-remaining")[0];
var currentWordDiv = document.getElementsByClassName("current-word")[0];
var messageDiv = document.getElementsByClassName("message")[0];
var userGuessesDiv = document.getElementsByClassName("user-guesses")[0];
var youtubeVideo = document.getElementsByClassName("video-pixar-logo")[0];
var userInterface = document.getElementsByClassName("user-interface")[0];
var gameImageWrapper = document.getElementsByClassName("game-image-wrapper")[0];

// Hangman Drawing
var drawHangman = document.getElementsByClassName("hang-man")[0];
var drawBase = document.getElementsByClassName("base")[0];
var drawPost = document.getElementsByClassName("post")[0];
var drawWoodTop = document.getElementsByClassName("wood-top")[0];
var drawSwingWrapper = document.getElementsByClassName("swing-wrapper")[0];
var drawRope = document.getElementsByClassName("rope")[0];
var drawPersonHead = document.getElementsByClassName("person-head")[0];
var drawFaceWrapper = document.getElementsByClassName("face-wrapper")[0];
var drawPersonBody = document.getElementsByClassName("person-body")[0];
var drawLeftArm = document.getElementsByClassName("person-left-arm")[0];
var drawRightArm = document.getElementsByClassName("person-right-arm")[0];
var drawLeftLeg = document.getElementsByClassName("person-left-leg")[0];
var drawRightLeg = document.getElementsByClassName("person-right-leg")[0];

// Sounds

var winSound = document.getElementsByClassName("win-sound")[0];
var loseSound = document.getElementsByClassName("lose-sound")[0];
var correctPress = document.getElementsByClassName("correct-press-sound")[0];
var wrongPress = document.getElementsByClassName("wrong-press-sound")[0];

//------------------------------------------------------------
//----------- ARRAYS
//------------------------------------------------------------

// Creates an array of Pixar Characters
var pixarCharacters = ["Flik","Princess Atta","Hopper","Merida","King Fergus","Queen Elinor","Lightning McQueen","Doc Hudson","Sally Carrera","Nemo","Dory","Marlin","Joy","Sadness","Anger","James P Sullivan","Mike Wazowski","Boo","Mr Incredible","Elastigirl","Edna Mode","Buzz Lightyear","Sheriff Woody","Bo Peep","Carl Fredricksen","Ellie Fredricksen","Russell"];

//------------------------------------------------------------
//----------- EMPTY ARRAYS
//------------------------------------------------------------

var alphabet = [];
var currentWord = [];
var wrongGuesses = [];
var randomCharacter = [];
var upperCaseWord = [];
var characterImageLetters = [];

//------------------------------------------------------------
//----------- LOGIC
//------------------------------------------------------------

// Creates alphabet array
for (var i = 65; i <= 90; i++) {
    alphabet[alphabet.length] = String.fromCharCode(i);
};

// Function to start a new game
function newGame() {

    // Reset game settings
    isFirstGame = false;
    gameStarted = true;
    guessesRemaining = 10;
    currentWord = [];
    wrongGuesses = [];
    characterImageLetters = [];

    userGuessesDiv.innerHTML = "";
    currentWordDiv.innerHTML = "";

    // Sets which game objects display
    characterImage.style.display = "none";
    messageDiv.style.display = "none";
    userInterface.style.display = "block";

    drawBase.classList.remove("draw");
    drawPost.classList.remove("draw");
    drawWoodTop.classList.remove("draw");
    drawRope.classList.remove("draw");
    drawPersonHead.classList.remove("draw");
    drawPersonBody.classList.remove("draw");
    drawLeftArm.classList.remove("draw");
    drawRightArm.classList.remove("draw");
    drawLeftLeg.classList.remove("draw");
    drawRightLeg.classList.remove("draw");
    drawFaceWrapper.classList.remove("draw");
    drawSwingWrapper.classList.remove("swing-animation");
    
    // Chooses a random Pixar character name from the array
    randomCharacter = pixarCharacters[Math.floor(Math.random() * pixarCharacters.length)];
    
    // Changes letters to uppercase
    upperCaseWord = randomCharacter.toUpperCase();

    // Defines which movies each character is from
    if (randomCharacter === "Flik" || randomCharacter === "Princess Atta" || randomCharacter === "Hopper") {
        movie = "A Bug's Life";
    } else if (randomCharacter === "Merida" || randomCharacter === "King Fergus" || randomCharacter === "Queen Elinor") {
        movie = "Brave";
    } else if (randomCharacter === "Lightning McQueen" || randomCharacter === "Doc Hudson" || randomCharacter === "Sally Carrera") {
        movie = "Cars";
    } else if (randomCharacter === "Nemo" || randomCharacter === "Dory" || randomCharacter === "Marlin") {
        movie = "Finding Nemo";
    } else if (randomCharacter === "Joy" || randomCharacter === "Sadness" || randomCharacter === "Anger") {
        movie = "Inside Out";
    } else if (randomCharacter === "James P Sullivan" || randomCharacter === "Mike Wazowski" || randomCharacter === "Boo") {
        movie = "Monsters, Inc.";
    } else if (randomCharacter === "Mr. Incredible" || randomCharacter === "Elastigirl" || randomCharacter === "Edna Mode") {
        movie = "The Incredibles";
    } else if (randomCharacter === "Buzz Lightyear" || randomCharacter === "Sheriff Woody" || randomCharacter === "Bo Peep") {
        movie = "Toy Story";
    } else if (randomCharacter === "Carl Fredricksen" || randomCharacter === "Ellie Fredricksen" || randomCharacter === "Russell") {
        movie = "Up";
    };
    
    for (var i = 0; i < upperCaseWord.length; i++) {

        var span = document.createElement("span");
        span.setAttribute("class","letter");
    
        if (upperCaseWord[i] === " ") {
            span.textContent = " ";
            currentWord[i] = " "; // Puts a space when there is a space in the current word
            characterImageLetters[i] = "-"; // Adds a dash for the image source
        } else {
            span.textContent = "_";
            currentWord[i] = "_"; // Puts underscores as placeholders for each letter of the current word
            characterImageLetters[i] = randomCharacter[i].toLocaleLowerCase(); // Creating array to be used for image source
        }

        currentWordDiv.appendChild(span);
    };

    characterImageOutput = characterImageLetters.join(""); // To be used for image source
    characterImage.setAttribute("src", "assets/images/" + characterImageOutput +".jpg"); // Sets image source
    
    // Logs the chosen Pixar character name to the console
    console.log(upperCaseWord);

    drawHangman.className += " draw";
};
    
document.onkeyup = function(event) {

    if(isFirstGame) {
        // Removes YouTube Video and displays image
        youtubeVideo.parentNode.removeChild(youtubeVideo);
    }

    if (gameStarted) {
    
        // Determines which key was pressed
        var userGuess = event.key.toUpperCase();

        var letterSpan = document.getElementsByClassName("letter");
        var isGuessCorrect = false;

        // Determines if key that is pressed is part of the alphabet
        if(alphabet.includes(userGuess)) {
            
            // Checks for a match and assigns correctly guessed letters to the appropriate place in the current word
            for (var j = 0; j < upperCaseWord.length; j++) {
        
                if (upperCaseWord[j] === userGuess) {
                    letterSpan[j].innerHTML = userGuess;
                    currentWord[j] = userGuess;
                    isGuessCorrect = true;
                    letterSpan[j].setAttribute("class","letter activate");
                    // letterSpan[j].style.fontSize = "50px";
                    
                }
            }
            if (isGuessCorrect) {
                correctPress.pause();
                correctPress.currentTime = 0;
                correctPress.play();
            } else {
                wrongPress.pause();
                wrongPress.currentTime = 0;
                wrongPress.play();
            }
        }
        
        // If the wrong guesses array doesn't already include the user guess
        // AND the user guess is a letter
        // AND the current word doesn't have the user guess
        // Then subtract 1 from guesses remaining
        // And add letter to Letters Already Guessed
        if (!wrongGuesses.includes(userGuess) && alphabet.includes(userGuess) && !upperCaseWord.includes(userGuess)) {
            guessesRemaining--;
            wrongGuesses.push(userGuess);
        }

        // Draws hangman
        if (guessesRemaining === 9) {
            drawBase.className += " draw";
        } else if (guessesRemaining === 8) {
            drawPost.className += " draw";
        } else if (guessesRemaining === 7) {
            drawWoodTop.className += " draw";
        } else if (guessesRemaining === 6) {
            drawRope.className += " draw";
        } else if (guessesRemaining === 5) {
            drawPersonHead.className += " draw";
        } else if (guessesRemaining === 4) {
            drawPersonBody.className += " draw";
        } else if (guessesRemaining === 3) {
            drawLeftArm.className += " draw";
        } else if (guessesRemaining === 2) {
            drawRightArm.className += " draw";
        } else if (guessesRemaining === 1) {
            drawLeftLeg.className += " draw";
        } else if (guessesRemaining === 0) {
            drawRightLeg.className += " draw";
            drawFaceWrapper.className += " draw";
            drawSwingWrapper.className += " swing-animation";
        }

        // Creates variable that concatenates correctly guessed letters
        var winningWord = currentWord.join("");
        
        // Adds +1 to wins once winningWord equals upperCaseWord
        // Character name displays at top
        // Character image displays
        if (winningWord === upperCaseWord) {

            messageDiv.innerHTML =
            "<h1>You win!</h1><h2>" +
            randomCharacter +
            " is from " + movie + "</h2>" +
            "<h3 class='get-started pulse'>Press any key to get started!</h3>";

            winSound.pause();
            winSound.currentTime = 0;
            winSound.play();
            wins++;
            drawHangman.classList.remove("draw");
            characterImage.style.display = "block";
            gameStarted = false;
            
            // Sets which game objects display
            messageDiv.style.display = "block";
            userInterface.style.display = "none";
        }

        // Add 1 to losses and start new game when guesses remaining reaches 0
        // Character name displays at top
        // Character image displays
        if (guessesRemaining === 0) {

            messageDiv.innerHTML =
            "<h1>Sorry! You Lose.</h1><h2>" +
            randomCharacter +
            " was the correct character.</h2>" +
            "<h3 class='get-started pulse'>Press any key to get started!</h3>";

            loseSound.play();
            losses++;
            gameStarted = false;
            
            // Sets which game objects display
            messageDiv.style.display = "block";
            userInterface.style.display = "none";
        }

        userGuessesDiv.innerHTML = wrongGuesses.join(" ");
        winsDiv.innerHTML = wins;
        lossesDiv.innerHTML = losses;
        guessesRemainingDiv.innerHTML = guessesRemaining;
        
        console.log(winningWord);
        console.log(upperCaseWord);
    } else {
        newGame();
    }
};