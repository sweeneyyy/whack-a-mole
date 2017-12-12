var interval;
var time = 10;
var sharkSpaces = document.querySelectorAll("#gameGrid div");
var player1Score = 0;
var player2Score = 0;
var highScore;


document.addEventListener("DOMContentLoaded", function() {


// On click of Start Game - Change grid boxes background image randomly from ocean to shark


// Set time limit of the game

var countdown = function(){
	time -= 1;
	console.log("time left", countdown);
 	// Display timer

	// document.getElementById("#timer").textContent = time;


};

countdown();


// Set time shark image is displayed before switching back to ocean


// Keep track of score

	// If player clicks on shark image before it disappears, add 1 point to score
	// If player does not click on the shark image while displayed, add 1 to missed


	// Display score and missed 


// Save high score in local storage and stay displayed on board



// Add Event Listeners
	// document.getElementById("reset").addEventListener("click", reset);
	// call function that is sharkBoxes event listeners

	// Start the timer
	interval = setInterval(countdown, 1000);


	// Start jaws theme song?
	

	// Set up the sharkBoxes

	
});