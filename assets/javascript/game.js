//------------------------------------------------------------
// ---------- VARIABLES
//------------------------------------------------------------

var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var gameStarted = false;

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
var correctGuesses = [];
var wrongGuesses = [];

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
    correctGuesses = [];
    wrongGuesses = [];
    
    // Chooses a random Pixar character name from the array
    var randomCharacter = pixarCharacters[Math.floor(Math.random() * pixarCharacters.length)];
    
    // Changes letters to uppercase
    var upperCaseWord = randomCharacter.toUpperCase();
    
    // Puts underscores as placeholders for each letter of the current word
    for (var i = 0; i < upperCaseWord.length; i++) {
    
        if (upperCaseWord[i] === " ") {
            currentWord[i] = " ";
            // Push empty space to correctGuesses array
            correctGuesses.push(" ");
        } else {
            currentWord[i] = "_";
        }
    
        var placeHolder = currentWord.join("");
        document.getElementById("current-word").innerHTML = placeHolder;
    
    };
    
    document.onkeyup = function(event) {
        
        // Determines which key was pressed
        var userGuess = event.key.toUpperCase();

        var correct = false;
        var isLetter = false;

        // Determines if key that is pressed is a letter
        for (var k = 0; k < alphabet.length; k++) {
            if (alphabet[k] === userGuess) {

    
                // Checks for a match and assigns correctly guessed letters to the appropriate place in the current word
                for (var j = 0; j < upperCaseWord.length; j++) {
            
                    if (upperCaseWord[j] === userGuess) {
                        currentWord[j] = userGuess;
        
                        correct = true;
                        
                        // adds letter to correctGuesses array
                        correctGuesses.push(userGuess);
                    }
                    
                    // Adds +1 to wins if correctGuesses equals currentWord
                    if (correctGuesses.length === currentWord.length) {
                        wins++;
                        newGame();
                    }
                }
                
                // Subtracts 1 from guesses remaning if userGuess is wrong
                if (!correct) {
                    guessesRemaining--;
                    wrongGuesses.push(userGuess);
                }
        
                // Add 1 to losses and start new game when guesses remaining reaches 0
                if (guessesRemaining === 0) {
                    losses++;
                    newGame();
                }

            }
        }

        console.log(wrongGuesses);

        document.getElementById("user-guesses").innerHTML = wrongGuesses.join(" ");
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("losses").innerHTML = losses;
        document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
        document.getElementById("current-word").innerHTML = currentWord.join("");
    };
    
    //---------- CONSOLE ---------
    // Logs the chosen Pixar character name to the console
    console.log(upperCaseWord);

};

newGame();