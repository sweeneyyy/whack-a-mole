var sharkSpaces = document.querySelectorAll("#gameGrid div");
var highScore = document.getElementById("highScore");
var timer = document.getElementById("timer");
var interval;
var totalSeconds = 10;
var numberOfPlayers = 2;
var currentPlayer = 2;
var currentScore = 0;	
var player1Score = 0;
var player2Score = 0;

// if(localStorage.getItem("highScore") === undefined){
//    localStorage.setItem("highScore", 0);
//    console.log(localStorage);
// }

var playerTurn = function(){
	if(currentPlayer === 1){
		currentPlayer = currentPlayer + 1;
		currentScore = 0;
		document.getElementById("playerUp").textContent = "Player 2";
	}else {
		currentPlayer = currentPlayer - 1;
		document.getElementById("playerUp").textContent = "Player 1";
	}
};

var startGame = function(){
	totalSeconds = 10;
	countdown();

	clearInterval(interval);
	interval = setInterval(countdown, 1000);

	playerTurn();


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

		}else{
			var sharkSpaceNumber = Math.floor(Math.random() * 9);
			displaySharks(document.querySelectorAll(".gridBox")[sharkSpaceNumber]);
		}
		checkHighScore();
		checkWinner();
	}
};

// Keep track of points scored for each player
var gameScore = function(whack){
	if(!whack.target.classList.contains("shark")) return; {
		if(currentPlayer === 1){
			player1Score++;
			document.getElementById("score-1").textContent = player1Score;
			console.log("player 1 score is", player1Score);

		}else{
			player2Score++;
			document.getElementById("score-2").textContent = player2Score;
			console.log("player 2 score is", player2Score);
		}
	}
};

var checkHighScore = function(){
	console.log(localStorage.getItem("highScore"));
	if(player1Score > localStorage.getItem("highScore")){
		highScore = player1Score;
		document.getElementById("highScore").textContent = highScore;
		localStorage.setItem("highScore", highScore);
			console.log("P1 highScore is ", highScore);

	}else if(player2Score > localStorage.getItem("highScore")){
		highScore = player2Score;
		document.getElementById("highScore").textContent = highScore;
		localStorage.setItem("highScore", highScore);
			console.log("P2 highScore is ", highScore);
	}	
};


// Who's score was higher?
var checkWinner = function(){
	if(currentPlayer === 2 && totalSeconds <= 0){
		if(player1Score > player2Score){
			document.getElementById("playerUp").textContent = "Player 1 Wins!";
		}else if(player2Score > player1Score){
			document.getElementById("playerUp").textContent = "Player 2 Wins!";
		}else if(player1Score === player2Score){
			document.getElementById("playerUp").textContent = "It's a Draw!";
		}
	}
};

var addSharkSpacesEventListeners = function(){
	for(var i = 0; i < sharkSpaces.length; i++){
		sharkSpaces[i].addEventListener("click", gameScore);
  }
}

addSharkSpacesEventListeners();


document.addEventListener("DOMContentLoaded", function() {
// Add Event Listeners
if(localStorage.getItem("highScore")){
		document.getElementById("highScore").textContent = localStorage.getItem("highScore");
	}
	// document.getElementById("reset").addEventListener("click", reset);
	document.getElementById("start").addEventListener("click", startGame);
	// call function that is sharkBoxes event listeners

	// Start jaws theme song?	

	// Set up the sharkBoxes
	
});