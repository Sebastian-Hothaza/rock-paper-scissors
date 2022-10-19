// Note, these have global scope
let computerScore = 0;
let playerScore = 0;
let numTies = 0;
const numRounds = 3;


const playerButtons = document.querySelectorAll('.playerButton'); // Selecting all buttons so we can attach listeners

// Attaching the listeners to each button
playerButtons.forEach((playerButton) => {
    playerButton.addEventListener('click', (e) => {
        getPlayerChoice(e.target);
    });
});

// Sent a click event target object, plays a round
function getPlayerChoice(e){

    e.classList.add('selected');

    // Defining the player choice
    let playerChoice;
    if(e.className.includes("rock")){
        playerChoice = "rock";
    } else if (e.className.includes("paper")){
        playerChoice = "paper";
    } else if (e.className.includes("scissor")){
        playerChoice = "scissor";
    }
    const computerChoice = getComputerChoice();
    console.log("Player chose: " + playerChoice);
    console.log("Computer chose: " + computerChoice);

    

    // Update image of computer thinking to reflect their decision
    if (computerChoice==="rock"){
        document.getElementById('computerChoiceImg').src = "images/rockRed.png";
    } else if (computerChoice==="paper"){
        document.getElementById('computerChoiceImg').src = "images/paperRed.png";
    } else {
        document.getElementById('computerChoiceImg').src = "images/scissorRed.png";
    }

    // Selections complete; now we play!
    let winner = playRound(playerChoice, computerChoice);
    console.log(winner + "wins");
    
    // Scoring
    if (winner == "Player"){
        playerScore++;
        document.getElementById("userScore").innerHTML++;

        document.getElementById("winner").textContent = "You Win!";
        document.getElementById("windesc").textContent = playerChoice + " beats " + computerChoice;
    } else if (winner == "Computer"){
        computerScore++;
        document.getElementById("computerScore").innerHTML++;

        document.getElementById("winner").textContent = "You Lose!";
        document.getElementById("windesc").textContent =  computerChoice + " beats " + playerChoice;
    } else {
        numTies++;
        document.getElementById("winner").textContent = "Tie Game!";
        document.getElementById("windesc").textContent =  "HAL is not amused...";
    }
    console.log("userscore: "+playerScore);
    console.log("computerScore: "+computerScore);

    // Time before next round
    window.setTimeout(resetBoard, 2000);
   

    // Ending the game. Calls endGame with winner
    if (playerScore+computerScore == 5){
        if (playerScore>computerScore){
            endGame("player"); 
        } else {
            setTimeout(endGame("computer"), 1000);  
        }
    }
}




// Resets board
function resetBoard(){
    
    // removing CSS for each player button
    playerButtons.forEach((playerButton) => {
        playerButton.classList.remove('selected');
    });
    

    document.getElementById('computerChoiceImg').src = "images/computerThinking.png";
    document.getElementById("winner").textContent = "Make your selection!";
    document.getElementById("windesc").textContent =  "HAL9000 is plotting...";

}

// Ends the game and prepares for new game
function endGame(winner){
    playerScore=0;
    computerScore=0;


    if (winner === "player"){
        setTimeout(function () {
            alert("You Win! Hope you are proud of your accomplishment.");
            document.getElementById("computerScore").innerHTML=0;
            document.getElementById("userScore").innerHTML=0;
         }, 100);
    } else {
        setTimeout(function () {
            alert("You Lose! HAL has taken control of your life.");
            document.getElementById("computerScore").innerHTML=0;
            document.getElementById("userScore").innerHTML=0;
        }, 100);
    }
    
    
}

// returns oneof(rock, paper scissor)
function getComputerChoice(){
    let num = Math.floor(Math.random() * 3 + 1);
    switch (num){
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissor";
    }
}


// Plays a round and returns a string of the resulting winner (OneOf: Player, Computer or Tie)
function playRound(playerSelection, computerSelection){
    if (playerSelection.toUpperCase() === "ROCK"){
        if (computerSelection.toUpperCase() === "ROCK"){
            return "Tie"
        } else if (computerSelection.toUpperCase() === "PAPER"){
            return "Computer"
        } else {
            return "Player"
        }
    } else if (playerSelection.toUpperCase() === "PAPER"){
        if (computerSelection.toUpperCase() === "ROCK"){
            return "Player"
        } else if (computerSelection.toUpperCase() === "PAPER"){
            return "Tie"
        } else {
            return "Computer"
        }
    } else{
        if (computerSelection.toUpperCase() === "ROCK"){
            return "Computer"
        } else if (computerSelection.toUpperCase() === "PAPER"){
            return "Player"
        } else {
            return  "Tie"
        }
    }
}
