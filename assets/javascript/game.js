//------------------------------------------------------------
//----------- VARIABLES
//------------------------------------------------------------

var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var characterImageOutput;
var movie;
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

// Function to create the user interface
function createUserInterface() {

    // Creates a div with class of row
    var divRow = document.createElement("div");
    divRow.setAttribute("class","row");

    // Creates Wins column
    var winsColumn = document.createElement("div");
    winsColumn.setAttribute("class","col-sm-3 col-sm-offset-3");

    // Creates Losses column
    var lossesColumn = document.createElement("div");
    lossesColumn.setAttribute("class","col-sm-3");

    // Appends the divs to the User Interface div
    userInterface.appendChild(divRow);
    divRow.appendChild(winsColumn);
    divRow.appendChild(lossesColumn);

    // Creating variables to hold the HTML for wins and losses
    var winsHTML = "<h3>Wins</h3><p class='wins focus'>" + wins + "</p>";
    var lossesHTML = "<h3>Losses</h3><p class='losses focus'>" + losses + "</p>";

    // Set the inner HTMl contents of the wins and losses divs
    winsColumn.innerHTML = winsHTML;
    lossesColumn.innerHTML = lossesHTML;
    
    // Creates a div to hold the rest of the user interface content
    var mainContent = document.createElement("div");
    mainContent.setAttribute("class","main-content");

    userInterface.appendChild(mainContent);

    var mainContentHTML =
        "<h3>Current Word</h3>" +
        "<p class='current-word focus'></p>" +
        "<h3>Number of Guesses Remaining</h3>" +
        "<p class='guesses-remaining focus'></p>" +
        "<h3>Letters Already Guessed</h3>" +
        "<p class='user-guesses focus'></p>";

    mainContent.innerHTML = mainContentHTML;
}

// Function to start a new game
function newGame() {

    gameStarted = true;
    guessesRemaining = 10;
    currentWord = [];
    wrongGuesses = [];
    characterImageLetters = [];

    currentWordDiv.innerHTML = "";
    
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
    
    // Logs the chosen Pixar character name to the console
    console.log(upperCaseWord);

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
            messageDiv.innerHTML = "<h1>You win!</h1><h2>" + randomCharacter + " is from " + movie + "</h2>";
            characterImage.setAttribute("src", "assets/images/" + characterImageOutput +".jpg");
            winSound.pause();
            winSound.currentTime = 0;
            winSound.play();
            wins++;
            newGame();
        }

        // Add 1 to losses and start new game when guesses remaining reaches 0
        // Character name displays at top
        // Character image displays
        if (guessesRemaining === 0) {
            messageDiv.innerHTML = "<h1>Sorry! You Lose.</h1><h2>" + randomCharacter + " was the correct character.</h2>";
            characterImage.setAttribute("src", "assets/images/" + characterImageOutput +".jpg");
            loseSound.play();
            losses++;
            newGame();
        }

        userGuessesDiv.innerHTML = wrongGuesses.join(" ");
        winsDiv.innerHTML = wins;
        lossesDiv.innerHTML = losses;
        guessesRemainingDiv.innerHTML = guessesRemaining;
        
        console.log(winningWord);
        console.log(upperCaseWord);
    } else {

        // Removes the pulse effect from the get started message
        var getStartedDiv = document.getElementsByClassName("get-started")[0];
        getStartedDiv.classList.remove("pulse");

        // Fades YouTube video out slowly
        youtubeVideo.style.opacity = "0";
        characterImage.style.opacity = "1";
        setTimeout(function(){youtubeVideo.parentNode.removeChild(youtubeVideo);}, 3000);

        newGame();
        
    }
};