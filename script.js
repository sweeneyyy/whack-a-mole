var interval;
var timer = document.getElementById("timer");
var totalSeconds = 10;
var sharkSpaces = document.querySelectorAll("#gameGrid div");
var player1Score = 0;
var player2Score = 0;
var score = 0;
var highScore;
	

// On click of Start Game - Change grid boxes background image randomly from ocean to shark
var startGame = function(){
	console.log("starting new game");
	countdown();

	clearInterval(interval);
	interval = setInterval(countdown, 1000);
}


var displaySharks = function(spaceToPopulate){
	//Set everything back to waves
	for(var i = 0; i < sharkSpaces.length; i++){
	  sharkSpaces[i].classList.remove("shark");
	  sharkSpaces[i].classList.add("noShark");
	}
	//Set the selected box to shark
	spaceToPopulate.classList.add("shark");
	spaceToPopulate.classList.remove("noShark");
};


// Set time limit of the game
var countdown = function(){
	totalSeconds -= 1;
	document.getElementById("timer").textContent = totalSeconds;
	console.log("time left", totalSeconds);

	for(var i = 0; i < sharkSpaces.length; i++){
	  sharkSpaces[i].classList.remove("shark");
	  sharkSpaces[i].classList.add("noShark");
	}
	if(totalSeconds <= 0){
	  clearInterval(interval);	
	  sharkSpaces.classList.add("noShark");
	}
	else{
		var sharkSpaceNumber = Math.floor(Math.random() * 9);
		displaySharks(document.querySelectorAll(".gridBox")[sharkSpaceNumber]);
	}

};

// Keep track of score - use classes (on click if class is x then add point)
// var gameScore = function(){
// 	if(sharkSpaces.classList.contains("shark")

// 		score += 1;
// 		console.log("Got one!");
// 		document.getElementById("score").textContent = score;
// 	}
// }
	
	// If player clicks on shark image before it disappears, add 1 point to score
	// If player does not click on the shark image while displayed, add 1 to missed


	// Display score and missed 


// Save high score in local storage and stay displayed on board
// var addSharkSpacesEventListeners = function(){
// 	for(var i = 0; i < sharkSpaces.length; i++){
// 		sharkSpaces[i].addEventListener("click", gameScore);
//   }
// }
// addSharkSpacesEventListeners();



document.addEventListener("DOMContentLoaded", function() {
// Add Event Listeners
	// document.getElementById("reset").addEventListener("click", reset);
	document.getElementById("start").addEventListener("click", startGame);
	// call function that is sharkBoxes event listeners

	// Start the timer


	// Start jaws theme song?
	

	// Set up the sharkBoxes

	
});

// Set time shark image is displayed before switching back to ocean?
