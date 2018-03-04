var sharkSpaces = document.querySelectorAll(".gridBox div");
var highScore = document.getElementById("highScore");
var timer = document.getElementById("timer");
var interval;
var totalSeconds = 10;
var currentPlayer = 2;
var currentScore = 0;	
var player1Score = 0;
var player2Score = 0;

// Setup new game timer, scoreboard and display
var newGame = function() {
	totalSeconds = 10;
	player1Score = 0;
	player2Score = 0;
	// Add event listeners to boxes sharks will pop up in
	addSharkSpacesEventListeners();
	// Switch from home page to game page
	document.getElementById("gamePage").style.display = "block";
	document.getElementById("homePage").style.display = "none";
	// Set scoreboard display back to zero for both players
	document.getElementById("score-1").textContent = player1Score;
	document.getElementById("score-2").textContent = player2Score;
	// Show start button and hide play again button
	document.getElementById("start").style.display = "block";
	document.getElementById("start").textContent = "Player 1 GO!";
	document.getElementById("playerUp").textContent = "...Grab Your Paddle";
	document.getElementById("reset").style.display = "none";
}
// Start game and timer
var startGame = function(){
	totalSeconds = 5;
	countdown();
  // Set timer to zero 
	clearInterval(interval);
	interval = setInterval(countdown, 1000);

	// Set to player 1 or 2 
	playerTurn();

};

// Swith turns between player 1 and 2 and display current player
var playerTurn = function(){
	if(currentPlayer === 1){
		currentPlayer = currentPlayer + 1;
		currentScore = 0;
		document.getElementById("playerUp").textContent = "Player 2";
		document.getElementById("start").style.display = "none";
		document.getElementById("reset").style.display = "inline-block";

	}else {
		currentPlayer = currentPlayer - 1;
		document.getElementById("playerUp").textContent = "Player 1";
		// document.getElementById("start").textContent = "Player 2";
		document.getElementById("start").style.color = "#d3d3d3";

	}
};
// Change grid boxes background image randomly from waves to shark
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
	// Turn timer red with 3 or less seconds to go
	if(totalSeconds <= 3){
		document.getElementById("timer").style.color = "#d81e1e";
	}
	// Make sharks appear randomly and alert when time is up
	for(var i = 0; i < sharkSpaces.length; i++){
		//player 1 turn is over
		if(totalSeconds <= 0 && currentPlayer === 1){
			swal({ title:"Time's Up! Player 2's Turn", button: "Okay",});
		  clearInterval(interval);
		  sharkSpaces[i].classList.add("water");
		  document.getElementById("start").textContent = "Player 2 GO!";
		  document.getElementById("start").style.color = "#486A81";
			document.getElementById("playerUp").textContent = "...Grab Your Paddle";


		//player 2 turn is over
		}else if(totalSeconds <= 0 && currentPlayer === 2){
 			swal({ title:"Game Over!", button: "Okay",});
		  clearInterval(interval);
		  sharkSpaces[i].classList.add("water");
		
		}else{
			var sharkSpaceNumber = Math.floor(Math.random() * 9);
			displaySharks(sharkSpaces[sharkSpaceNumber]);
		}
		checkHighScore();
		checkWinner();
	}
};

//update game button display based on turn
// var buttonSwitch = function(){
// 	if(currentPlayer === 1 && totalSeconds <= 0){

// 	}
// }

// Keep track of points scored for each player
var gameScore = function(whack){
	if(!whack.target.classList.contains("shark")) return; {
		// Play whack sound when player clicks on shark
		var whack = document.getElementById("whack");
		whack.play()
		// Player 1 points
		if(currentPlayer === 1){
			player1Score++;
			document.getElementById("score-1").textContent = player1Score;
		// Player 2 points
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

// Check for game winner or draw
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
		text: "Use the paddle to whack the sharks! Get a point for each shark you whack until the time is up. The player with the most points wins.",
		button: "Got it",
	});
}

// Setup display, game and theme song on page load
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

	// Start jaws theme song on page load
	// themeSong = document.getElementById("theme");
	// themeSong.play();
	
});