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
var currentWordP = document.getElementsByClassName("current-word")[0];
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

// Theme Songs

var songABugsLife = document.getElementsByClassName("a-bugs-life")[0];
var songBrave = document.getElementsByClassName("brave")[0];
var songCars = document.getElementsByClassName("cars")[0];
var songFindingNemo = document.getElementsByClassName("finding-nemo")[0];
var songInsideOut = document.getElementsByClassName("inside-out")[0];
var songMonstersInc = document.getElementsByClassName("monsters-inc")[0];
var songTheIncredibles = document.getElementsByClassName("the-incredibles")[0];
var songToyStory = document.getElementsByClassName("toy-story")[0];
var songUp = document.getElementsByClassName("up")[0];

// Sounds Effects

var newGameSound = document.getElementsByClassName("new-game-sound")[0];
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

setTimeout(function(){youtubeVideo.style.opacity ="0";}, 16000);

// Function to stop all theme songs
function stopAllThemeSongs() {
    var allThemeSongs = document.getElementsByClassName("theme-song");
    for(var i = 0; i < allThemeSongs.length; i++) {
        allThemeSongs[i].pause();
        allThemeSongs[i].currentTime = 0;
    }
};

// Function to start a new game
function newGame() {

    // Plays new game sound
    newGameSound.play();

    // Reset game settings
    isFirstGame = false;
    gameStarted = true;
    guessesRemaining = 10;
    currentWord = [];
    wrongGuesses = [];
    characterImageLetters = [];

    userGuessesDiv.innerHTML = "";
    currentWordP.innerHTML = "";

    // Sets which game elements display
    characterImage.style.display = "none";
    messageDiv.style.display = "none";
    userInterface.style.display = "block";

    // Resets hangman drawing
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
        songABugsLife.play();
    } else if (randomCharacter === "Merida" || randomCharacter === "King Fergus" || randomCharacter === "Queen Elinor") {
        movie = "Brave";
        songBrave.play();
    } else if (randomCharacter === "Lightning McQueen" || randomCharacter === "Doc Hudson" || randomCharacter === "Sally Carrera") {
        movie = "Cars";
        songCars.play();
    } else if (randomCharacter === "Nemo" || randomCharacter === "Dory" || randomCharacter === "Marlin") {
        movie = "Finding Nemo";
        songFindingNemo.play();
    } else if (randomCharacter === "Joy" || randomCharacter === "Sadness" || randomCharacter === "Anger") {
        movie = "Inside Out";
        songInsideOut.play();
    } else if (randomCharacter === "James P Sullivan" || randomCharacter === "Mike Wazowski" || randomCharacter === "Boo") {
        movie = "Monsters, Inc.";
        songMonstersInc.play();
    } else if (randomCharacter === "Mr Incredible" || randomCharacter === "Elastigirl" || randomCharacter === "Edna Mode") {
        movie = "The Incredibles";
        songTheIncredibles.play();
    } else if (randomCharacter === "Buzz Lightyear" || randomCharacter === "Sheriff Woody" || randomCharacter === "Bo Peep") {
        movie = "Toy Story";
        songToyStory.play();
    } else if (randomCharacter === "Carl Fredricksen" || randomCharacter === "Ellie Fredricksen" || randomCharacter === "Russell") {
        movie = "Up";
        songUp.play();
    };
    
    // Creating placeholder with underscores for current word
    for (var i = 0; i < upperCaseWord.length; i++) {

        // Creates a span with class of letter
        var span = document.createElement("span");
        span.setAttribute("class","letter");
    
        // If the letter is a space
        if (upperCaseWord[i] === " ") {
            span.textContent = " "; // Puts a space in the span
            span.setAttribute("class","letter space"); // Adds class of space to span
            currentWord[i] = " "; // Puts a space when there is a space in the current word
            characterImageLetters[i] = "-"; // Adds a dash for the image source
        } else {
            span.textContent = "_"; // Puts an underscore in the span
            currentWord[i] = "_"; // Puts underscores as placeholders for each letter of the current word
            characterImageLetters[i] = randomCharacter[i].toLocaleLowerCase(); // Creating array to be used for image source
        }

        currentWordP.appendChild(span); // Appends the spans to p.current-word
    };

    characterImageOutput = characterImageLetters.join(""); // To be used for image source
    characterImage.setAttribute("src", "assets/images/" + characterImageOutput +".jpg"); // Sets image source
    
    // Logs the chosen Pixar character name to the console
    console.log(upperCaseWord);

    drawHangman.className += " draw"; // Makes the hangman div visible
};
    
document.onkeyup = function(event) {

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
                    isGuessCorrect = true; // Sets isGuessCorrect to true to play correct guess sound
                }
            }
            if (isGuessCorrect) { // Plays correct guess sound
                correctPress.currentTime = 0;
                correctPress.play();
            } else { // Plays wrong guess sound
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

        // Draws a line of hangman after each wrong guess
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

            // Message that displays when player wins
            messageDiv.innerHTML =
            "<h2 class='game-end'>You win!<br><span>" +
            randomCharacter +
            " is from " + movie + "</span></h2>" +
            "<h3 class='get-started pulse'>Press space to play again!</h3>";

            // Stops all theme songs
            stopAllThemeSongs();
            
            // Resets the win sound before playing
            winSound.currentTime = 0;
            winSound.play();

            wins++;
            drawHangman.classList.remove("draw"); // Hides the hangman drawing
            characterImage.style.display = "block"; // Shows image of the correct character
            gameStarted = false;
            
            // Sets which game objects display
            messageDiv.style.display = "block";
            userInterface.style.display = "none";
        }

        // Add 1 to losses and start new game when guesses remaining reaches 0
        // Character name displays
        if (guessesRemaining === 0) {

            // Message that displays when winner loses
            messageDiv.innerHTML =
            "<h2 class='game-end'>Sorry! You Lose.<br><span>" +
            randomCharacter +
            " was the correct character.</span></h2>" +
            "<h3 class='get-started pulse'>Press space to play again!</h3>";

            // Stops all theme songs
            stopAllThemeSongs();

            loseSound.play();

            losses++;

            gameStarted = false;
            
            // Sets which game objects display
            messageDiv.style.display = "block";
            userInterface.style.display = "none";
        }

        // Updates scoreboard values in the browser
        userGuessesDiv.innerHTML = wrongGuesses.join(" ");
        winsDiv.innerHTML = wins;
        lossesDiv.innerHTML = losses;
        guessesRemainingDiv.innerHTML = guessesRemaining;
        
        console.log(winningWord);
        console.log(upperCaseWord);
    } else {
        
        var keyPress = event.key;

        // Game starts with any key if first game, but next games only start with space bar
        if (keyPress === " " || isFirstGame) {
            if(isFirstGame) {
                // Removes YouTube Video
                youtubeVideo.parentNode.removeChild(youtubeVideo);
            }
            newGame();
        }
    }
};