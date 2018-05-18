# Word-Guess-Game
Homework 3 - JavaScript

Game Functionality

When the page loads, the player is greeted by an image of the Pixar logo. The message to the right of the logo pulses to grab the player’s attention: "Press any key to get started!" Once any key is pressed, the game begins.

The logo disappears, creating a blank canvas on the left side of the browser. A random character name is chosen by the computer and a placeholder with underscores displays on the right side. A scoreboard on the bottom displays Guesses Remaining, Letters Already Guessed, Wins, and Losses. The theme song from the movie of the character plays to give a hint to the player.

The user can begin pressing keys to guess what character has been chosen. A correctly chosen letter will reveal that letter in the Current Word section. An incorrect guess displays the letter under Letters Already Guessed, 1 is subtracted from Guesses Remaining, and a piece of the hangman drawing is revealed.

If the player guesses all the letters of the word, the hangman drawing disappears and an image of the character appears in its place. The user interface area is hidden and a message appears in its place that notifies the player they have won and what movie the character is from. A pulsing message alerts the player to press space to play again. This allows the player to read the message rather than beginning a game immediately after they have won the game.

If a player runs out of guesses, the complete hangman drawing is revealed and the body is animated swinging. A "Sorry! You Lose." message displays along with the correct character. The player is alerted again to press space to play again.

Once the player presses space, a new game begins. The drawing canvas is blank and a new character name is chosen. Guesses remaining is reset back to 10 and letters guessed is blank. The Wins and Losses numbers update depending on whether the player won or lost the previous game.
