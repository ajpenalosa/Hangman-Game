// Creates an array of Pixar Characters
var pixarCharacters = ["Flik","Princess Atta","Hopper","Merida","King Fergus","Queen Elinor","Lightning McQueen","Doc Hudson","Sally Carrera","Nemo","Dory","Marlin","Joy","Sadness","Anger","James P Sullivan","Mike Wazowski","Boo","Mr Incredible","Elastigirl","Edna Mode","Buzz Lightyear","Sheriff Woody","Bo Peep","Carl Fredricksen","Ellie Fredricksen","Russell"];

// Chooses a random Pixar character name from the array
var randomCharacter = pixarCharacters[Math.floor(Math.random() * pixarCharacters.length)];

// Logs the chosen Pixar character name to the console
console.log(randomCharacter);

// Creating variables to hold number of wins, losses, and guesses remaining
var wins = 0;
var losses = 0;
var guessesRemaining = 10;

// Empty array to hold letters of the current word
var currentWord = [];

// Puts underscores as placeholders for each letter of the current word
for (var i = 0; i < randomCharacter.length; i++) {

    currentWord[i] = "_";
    var s = currentWord.join(" ");
    document.getElementById("current-word").innerHTML = s;

    // Logs individual letters of the current word to the console
    console.log("The character at index " + [i] + " is: " + randomCharacter[i]);
};

// Gives JavaScript a function to execute when onkeyup event fires
document.onkeyup = function(event) {

    // Determines which key was pressed
    var userGuess = event.key;

    // Assigns correctly guessed letters to the appropriate place in the current word
    for (var j = 0; j < randomCharacter.length; j++) {

        if (randomCharacter[j] === userGuess) {
            currentWord[j] = userGuess;
        };
    };
    document.getElementById("current-word").innerHTML = currentWord.join(" ");
};