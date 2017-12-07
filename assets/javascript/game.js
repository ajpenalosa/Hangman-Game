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

// Logs individual letters of the ALPHABET to the console
// for (var i = 0; i < alphabet.length; i++) {
//     console.log("The character at index " + [i] + " is: " + alphabet[i]);
// };

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
    
    // Puts underscores as placeholders for each letter of the current word
    for (var i = 0; i < upperCaseWord.length; i++) {
    
        if (upperCaseWord[i] === " ") {
            currentWord[i] = " ";
            characterImageLetters[i] = "-";
        } else {
            currentWord[i] = "_";
            characterImageLetters[i] = randomCharacter[i].toLocaleLowerCase();
        }
    
        var placeHolder = currentWord.join("");
        document.getElementById("current-word").innerHTML = placeHolder;
    
    };
    
    characterImageOutput = characterImageLetters.join("");
    //---------- CONSOLE ---------
    // Logs the chosen Pixar character name to the console
    console.log(upperCaseWord);
    console.log("This is the character letters array " + characterImageLetters);
    console.log("This is the character output array " + characterImageOutput);

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
    
    // Subtracts 1 from guesses remaning if userGuess is wrong
    // Adds letter to Letters Already Guessed if hasn't been guessed
    if(!wrongGuesses.includes(userGuess) && alphabet.includes(userGuess)) {
        guessesRemaining--;
        wrongGuesses.push(userGuess);
    }

    // Creates variable that concatenates correctly guessed letters
    var winningWord = currentWord.join("");
    
    // Adds +1 to wins once winningWord equals upperCaseWord
    if (winningWord === upperCaseWord) {
        document.getElementById("message").innerHTML = "<h2>" + randomCharacter + "</h2>";
        document.getElementById("pixar-img").setAttribute("src", "assets/images/" + characterImageOutput +".jpg")
        wins++;
        newGame();
    }

    // Add 1 to losses and start new game when guesses remaining reaches 0
    if (guessesRemaining === 0) {
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