var sharkSpaces = document.querySelectorAll(".gridBox div");
var highScore = document.getElementById("highScore");
var timer = document.getElementById("timer");
var interval;
var totalSeconds = 10;
var numberOfPlayers = 2;
var currentPlayer = 2;
var currentScore = 0;	
var player1Score = 0;
var player2Score = 0;


var newGame = function() {
	totalSeconds = 10;
	player1Score = 0;
	player2Score = 0;
	addSharkSpacesEventListeners();

	document.getElementById("gamePage").style.display = "block";
	document.getElementById("homePage").style.display = "none";
	document.getElementById("score-1").textContent = player1Score;
	document.getElementById("score-2").textContent = player2Score;
	document.getElementById("start").style.display = "block";
	document.getElementById("start").textContent = "Start";
	document.getElementById("playerUp").textContent = "...Grab Your Paddle";
	document.getElementById("reset").style.display = "none";
}
// Start new game
var startGame = function(){
	totalSeconds = 10;
	countdown();
  // Set timer to zero for new game
	clearInterval(interval);
	interval = setInterval(countdown, 1000);
	// Set player 1 or 2 for new game
	playerTurn();
};

// Swith turns between player 1 and 2 and dislplay current player
var playerTurn = function(){
	if(currentPlayer === 1){
		currentPlayer = currentPlayer + 1;
		currentScore = 0;
		document.getElementById("playerUp").textContent = "Player 2";
		document.getElementById("start").style.display = "none";
		document.getElementById("reset").style.display = "block";

	}else {
		currentPlayer = currentPlayer - 1;
		document.getElementById("playerUp").textContent = "Player 1";
		document.getElementById("start").textContent = "Player 2";
	}
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

// Set time limit of the game and increment
var countdown = function(){
	totalSeconds -= 1;
	document.getElementById("timer").textContent = totalSeconds;
	// Set grid back to all water, no sharks
	for(var i = 0; i < sharkSpaces.length; i++){
	  sharkSpaces[i].classList.remove("shark");
	  sharkSpaces[i].classList.add("water");
	}

	if(totalSeconds <= 3){
		document.getElementById("timer").style.color = "red";
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

		}else{
			player2Score++;
			document.getElementById("score-2").textContent = player2Score;
		}
	}
};

// Track high score and save in local storage to display
var checkHighScore = function(){
	if(player1Score > localStorage.getItem("highScore")){
		highScore = player1Score;
		document.getElementById("highScore").textContent = highScore;
		localStorage.setItem("highScore", highScore);

	}else if(player2Score > localStorage.getItem("highScore")){
		highScore = player2Score;
		document.getElementById("highScore").textContent = highScore;
		localStorage.setItem("highScore", highScore);
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

// Add event listeners to each box sharks will pop up in
var addSharkSpacesEventListeners = function(){
	for(var i = 0; i < sharkSpaces.length; i++){
		sharkSpaces[i].addEventListener("click", gameScore);
  }
};

addSharkSpacesEventListeners();

// Display modal with game instructions on landing page
var howTo = function(){
	swal({
		title:"How To Play",
		text: "Use the paddle to whack the sharks!",
		button: "Got it",
	});
}

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("gamePage").style.display = "none";
	document.getElementById("homePage").style.display = "block";

// Add Event Listeners
	if(localStorage.getItem("highScore")){
		document.getElementById("highScore").textContent = localStorage.getItem("highScore");
	}

	document.getElementById("howTo").addEventListener("click", howTo);
	document.getElementById("letsPlay").addEventListener("click", newGame);
	document.getElementById("reset").addEventListener("click", newGame);
	document.getElementById("reset").style.display = "none";
	document.getElementById("start").addEventListener("click", startGame);

	// Start jaws theme song?	

	// Set up the sharkBoxes
	
});
