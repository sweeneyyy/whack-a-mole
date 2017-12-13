var sharkSpaces = document.querySelectorAll("#gameGrid div");
var highScore = document.getElementById("highScore");
var timer = document.getElementById("timer");
var interval;
var totalSeconds = 10;
var numberOfPlayers = 2;
var currentPlayer = 2;
var currentScore = 0;	

// if(localStorage.highScore == undefined){
//    localStorage.highScore = 0;


var playerTurn = function(){
	if(currentPlayer === 1){
		 currentPlayer = currentPlayer + 1;
		 document.getElementById("playerUp").textContent = "Player 2";
		}else {
			currentPlayer = currentPlayer - 1;
			document.getElementById("playerUp").textContent = "Player 1";
		}
};

var startGame = function(){
	totalSeconds = 10;
	console.log("starting new game");
	countdown();

	clearInterval(interval);
	interval = setInterval(countdown, 500);

	playerTurn();
	console.log(currentPlayer);
};

// Change grid boxes background image randomly from ocean to shark
var displaySharks = function(spaceToPopulate){
	// Set everything back to waves
	for(var i = 0; i < sharkSpaces.length; i++){
	  sharkSpaces[i].classList.remove("shark");
	  sharkSpaces[i].classList.add("water");
	}
	// Set the selected box to shark
	spaceToPopulate.classList.add("shark");
	spaceToPopulate.classList.remove("water");

};

// Set time limit of the game
var countdown = function(){
	totalSeconds -= 1;
	document.getElementById("timer").textContent = totalSeconds;

	for(var i = 0; i < sharkSpaces.length; i++){
	  sharkSpaces[i].classList.remove("shark");
	  sharkSpaces[i].classList.add("water");
	}
	for(var i = 0; i < sharkSpaces.length; i++){
		if(totalSeconds <= 0){
		  clearInterval(interval);
		  sharkSpaces[i].classList.add("water");
		}
		else{
			var sharkSpaceNumber = Math.floor(Math.random() * 9);
			displaySharks(document.querySelectorAll(".gridBox")[sharkSpaceNumber]);
		}
	}
};

// Keep track of points scored for each player
var gameScore = function(bop){
	if(!bop.target.classList.contains("shark")) return; {
		currentScore++;
			console.log("Got one!");
	}
	if(currentPlayer === 1){
		document.getElementById("score-1").textContent = currentScore;
	}else{
		document.getElementById("score-2").textContent = currentScore;
	}
	// Save high score in local storage and stay displayed on board
	// if(currentScore > localStorage.highScore){
	// 	localStorage.highScore = currentScore;
	// 	document.getElementById("highScore").textContent = localStorage. highScore;

	// }

};

var addSharkSpacesEventListeners = function(){
	for(var i = 0; i < sharkSpaces.length; i++){
		sharkSpaces[i].addEventListener("click", gameScore);
  }
}

addSharkSpacesEventListeners();



document.addEventListener("DOMContentLoaded", function() {
// Add Event Listeners
	// document.getElementById("reset").addEventListener("click", reset);
	document.getElementById("start").addEventListener("click", startGame);
	// call function that is sharkBoxes event listeners


	// Start jaws theme song?
	

	// Set up the sharkBoxes
	
});

// Set time shark image is displayed before switching back to ocean?
