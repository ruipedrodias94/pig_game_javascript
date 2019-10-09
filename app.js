/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/**
 * Variable declarations
 */

var scores, roundScore, idActivePlayer, diceScore;

// Add state variable
var gameState;

// Initialize the game
initGame();

var scorePlayerDOM = document.querySelector('#current-' + idActivePlayer);

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gameState) {

        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + idActivePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayerPlay();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gameState) {

        // Add current score to the global score
        scores[idActivePlayer] += roundScore;
        // Update UI

        document.querySelector('#score-' + idActivePlayer).textContent = scores[idActivePlayer];
        // Check if the player won the game
        if (checkWinner(idActivePlayer)) {
            document.querySelector('#name-' + idActivePlayer).textContent = "Winner!";
            // Hide the dice
            document.querySelector('.dice').style.display = 'none';

            // Add the class winner
            document.querySelector('.player-' + idActivePlayer + '-panel').classList.add('winner');
            // Remove the class active
            document.querySelector('.player-' + idActivePlayer + '-panel').classList.remove('active');

            gameState = false;

        } else {
            nextPlayerPlay();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', initGame);

/** 
 * Function that defines the next player to play.
 * 1. Increments the round score
 * 2. Change the actual player
*/
function nextPlayerPlay() {

    idActivePlayer === 0 ? idActivePlayer = 1 : idActivePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

/**
 * Function that checks if a player has won the game
 * @param {int} idActivePlayer 
 */
function checkWinner(idActivePlayer) {
    return scores[idActivePlayer] >= 20 ? true : false;
}

/**
 * Function that removes class winner and adds class active
 */
function removeClassWinner() {
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

/**
 * Function to initialize the game
 */
function initGame() {
    // All scores variables at zero
    scores = [0, 0];
    roundScore = 0;
    idActivePlayer = 0;
    gameState = true;
    // Put all the scores at zero
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.dice').style.display = 'none';

    removeClassWinner();
}