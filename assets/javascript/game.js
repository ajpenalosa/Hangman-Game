// Creates an array of Pixar Characters
var pixarCharacters = ["Flik","Princess Atta","Hopper","Merida","King Fergus","Queen Elinor","Lightning McQueen","Doc Hudson","Sally Carrera","Nemo","Dory","Marlin","Joy","Sadness","Anger","James P Sullivan","Mike Wazowski","Boo","Mr Incredible","Elastigirl","Edna Mode","Buzz Lightyear","Sheriff Woody","Bo Peep","Carl Fredricksen","Ellie Fredricksen","Russell"];

// Creates an array of the alphabet
var alphabet = [];

for (var i = 65; i <= 90; i++) {
    alphabet[alphabet.length] = String.fromCharCode(i);
}
console.log(alphabet);

for (var i = 0; i < alphabet.length; i++) {
    // Logs individual letters of the current word to the console
    console.log("The character at index " + [i] + " is: " + alphabet[i]);
}

// Chooses a random Pixar character name from the array
var randomCharacter = pixarCharacters[Math.floor(Math.random() * pixarCharacters.length)];

// Changes letters to uppercase
var upperCaseWord = randomCharacter.toUpperCase();

// Logs the chosen Pixar character name to the console
console.log(upperCaseWord);

// Creating variables
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var lettersMatched = 0;

// Empty array to hold letters of the current word
var currentWord = [];

// Grabbing elements by ID
document.getElementById("wins").innerHTML = wins;
document.getElementById("guesses-remaining").innerHTML = guessesRemaining;

// Puts underscores as placeholders for each letter of the current word
for (var i = 0; i < upperCaseWord.length; i++) {

    if (upperCaseWord[i] === " ") {
        currentWord[i] = " ";
    } else {
        currentWord[i] = "_";
    }

    var placeHolder = currentWord.join("");
    document.getElementById("current-word").innerHTML = placeHolder;

    // Logs individual letters of the current word to the console
    console.log("The character at index " + [i] + " is: " + upperCaseWord[i]);
};

// Gives JavaScript a function to execute when onkeyup event fires
document.onkeyup = function(event) {

    // Determines which key was pressed
    var userGuess = event.key.toUpperCase();

    // Assigns correctly guessed letters to the appropriate place in the current word
    for (var j = 0; j < upperCaseWord.length; j++) {

        if (upperCaseWord[j] === userGuess) {
            currentWord[j] = userGuess;
            lettersMatched++;
            console.log("Letters matched: " + lettersMatched);
        } else {
            guessesRemaining--;
        }

        if (lettersMatched === upperCaseWord.length) {
            wins++;
            lettersMatched = 0;
            console.log("Wins: " + wins);
        }

    }
    document.getElementById("user-guesses").innerHTML = event.key;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
    document.getElementById("current-word").innerHTML = currentWord.join("");
};