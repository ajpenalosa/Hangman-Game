//------------------------------------------------------------
// ---------- VARIABLES
//------------------------------------------------------------

var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var characterImageOutput;
var gameStarted = false;

//------------------------------------------------------------
// ---------- MESSAGES
//------------------------------------------------------------

var messageWin = "You Win!"
var messageLose = "You Lose!"

//------------------------------------------------------------
// ---------- ARRAYS
//------------------------------------------------------------

// Creates an array of Pixar Characters
var pixarCharacters = ["Flik","Princess Atta","Hopper","Merida","King Fergus","Queen Elinor","Lightning McQueen","Doc Hudson","Sally Carrera","Nemo","Dory","Marlin","Joy","Sadness","Anger","James P Sullivan","Mike Wazowski","Boo","Mr Incredible","Elastigirl","Edna Mode","Buzz Lightyear","Sheriff Woody","Bo Peep","Carl Fredricksen","Ellie Fredricksen","Russell"];

//------------------------------------------------------------
// ---------- EMPTY ARRAYS
//------------------------------------------------------------

var alphabet = [];
var currentWord = [];
var wrongGuesses = [];
var randomCharacter = [];
var upperCaseWord = [];
var characterImageLetters = [];

//------------------------------------------------------------
// ---------- GRAB ELEMENTS BY ID
//------------------------------------------------------------

document.getElementById("wins").innerHTML = wins;
document.getElementById("losses").innerHTML = losses;
document.getElementById("guesses-remaining").innerHTML = guessesRemaining;

//------------------------------------------------------------
// ---------- LOGIC
//------------------------------------------------------------

// Creates alphabet array
for (var i = 65; i <= 90; i++) {
    alphabet[alphabet.length] = String.fromCharCode(i);
};

function newGame() {

    gameStarted = true;
    guessesRemaining = 10;
    currentWord = [];
    wrongGuesses = [];
    characterImageLetters = [];
    
    // Chooses a random Pixar character name from the array
    randomCharacter = pixarCharacters[Math.floor(Math.random() * pixarCharacters.length)];
    
    // Changes letters to uppercase
    upperCaseWord = randomCharacter.toUpperCase();
    
    for (var i = 0; i < upperCaseWord.length; i++) {
    
        if (upperCaseWord[i] === " ") {
            currentWord[i] = " "; // Puts a space when there is a space in the current word
            characterImageLetters[i] = "-"; // Adds a dash for the image source
        } else {
            currentWord[i] = "_"; // Puts underscores as placeholders for each letter of the current word
            characterImageLetters[i] = randomCharacter[i].toLocaleLowerCase(); // Creating array to be used for image source
        }
    
        var placeHolder = currentWord.join("");    
    };

    document.getElementById("current-word").innerHTML = placeHolder;
    characterImageOutput = characterImageLetters.join(""); // To be used for image source
    
    // Logs the chosen Pixar character name to the console
    console.log(upperCaseWord);

};

newGame();
    
document.onkeyup = function(event) {
    
    // Determines which key was pressed
    var userGuess = event.key.toUpperCase();

    // Determines if key that is pressed is part of the alphabet
    if(alphabet.includes(userGuess)) {
        
        // Checks for a match and assigns correctly guessed letters to the appropriate place in the current word
        for (var j = 0; j < upperCaseWord.length; j++) {
    
            if (upperCaseWord[j] === userGuess) {
                currentWord[j] = userGuess;
            }
        }
    }
    
    // If the wrong guesses array doesn't already include the user guess
    // AND the user guess is a letter
    // AND the current word doesn't have the user guess
    // Then subtract 1 from guesses remaning
    // And add letter to Letters Already Guessed
    if(!wrongGuesses.includes(userGuess) && alphabet.includes(userGuess) && !upperCaseWord.includes(userGuess)) {
        guessesRemaining--;
        wrongGuesses.push(userGuess);
    }

    // Creates variable that concatenates correctly guessed letters
    var winningWord = currentWord.join("");
    
    // Adds +1 to wins once winningWord equals upperCaseWord
    // Character name displays at top
    // Character image displays
    if (winningWord === upperCaseWord) {
        document.getElementById("message").innerHTML = "<h2>You win!<br>" + randomCharacter + "</h2>";
        document.getElementById("pixar-img").setAttribute("src", "assets/images/" + characterImageOutput +".jpg");
        wins++;
        newGame();
    }

    // Add 1 to losses and start new game when guesses remaining reaches 0
    // Character name displays at top
    // Character image displays
    if (guessesRemaining === 0) {
        document.getElementById("message").innerHTML = "<h2>Sorry! You Lose.<br>" + randomCharacter + " was the correct character.</h2>";
        document.getElementById("pixar-img").setAttribute("src", "assets/images/" + characterImageOutput +".jpg");
        losses++;
        newGame();
    }

    document.getElementById("user-guesses").innerHTML = wrongGuesses.join(" ");
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
    document.getElementById("current-word").innerHTML = currentWord.join("");
    
    console.log(winningWord);
    console.log(upperCaseWord);
};