//wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    button.addEventListener("click", function() { 
      if (this.getAttribute("data-type") === "submit"){
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    });
  }
  
  //enables answer submission by pressing the enter/return button on the keyboard
  //we target the answer-box element from the DOM, then we add an event listener to see if a key is pressed.
  //if a key is pressed we run a function. This function checks if the key pressed is "Enter"
  //if the enter key is pressed it calls the checkAnswer() function
  //every event creates an object called "Event" we can then apply methods and properties to this object ("event") which is what we pass into our function below
  document.getElementById("answer-box").addEventListener("keydown", function(event){
    if(event.key === "Enter") {
      checkAnswer();
    }
  })
  runGame("addition");
});

//game functions
function runGame(gameType){
  //clear answer box sfter each game runs
  document.getElementById("answer-box").value ="";

  //sets focus on the answer box, so that cursor is in the answer box each time the page loads
  document.getElementById("answer-box").focus();
  
  //Generate 2 random numbers between 1 and 25
  //Math.floor rounds down to the nearest whole number
  //Math random generates random numbers
  //We add 1 to the result so that it's selects a number between 1-25 and not 0-24

  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  if (gameType === "addition"){
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "multiply"){
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === "subtract"){
    displaySubtractQuestion(num1, num2);
  } else if (gameType === "division"){
    displayDivideQuestion(num1, num2);
  } else {
    alert(`Unknown game type ${gameType}`);
    throw `Unknown game type ${gameType}, aborting!`;
  }
}

function checkAnswer() {

  //retrieve users answer from the DOMContentLoaded
  
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  
  // we use .value because the input type of "answer-box" is a number not a string
  
  let calculatedAnswer = calculateCorrectAnswer();
  
  let isCorrect = userAnswer === calculatedAnswer[0];
  // Check user answer against the answer (the first array item) from the calculateCorrectAnswer function 
  
  if (isCorrect) {
    alert("Hey! You got it right! :D")
    incrementScore();

  } else {
    alert(`Awwww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`)
    incrementWrongAnswer();
  }

  runGame(calculatedAnswer[1]);
  // run the game again based on the second item from the calculateCorrectAnswer array 
  
}

function calculateCorrectAnswer(){
  // gets the operands (the random numbers) and the operator (+, - * / signs) from the DOM

  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  let operator = document.getElementById("operator").innerText;

  // parseInt function is used to treat the value that is retrieved from the DOM as a whole number. Values retrieved from the DOM
  // are treated as strings by default, so we have to convert the values of operand 1 and 2 we have retrieved from the dom using Get Element...
  // so that the numerical calculation works correctly

  if (operator === "+"){
    return [operand1 + operand2, "addition"];
    // returns an array where the 1st value is the correct answer and the second value is the gameType
  } else if(operator === "x"){
    return [(operand1 * operand2), "multiply"];
  } else if(operator === "-"){
    return [(operand1 - operand2), "subtract"];
  } else if(operator === "/"){
    return [(operand1 / operand2), "division"];
  } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}, aborting!`;
    // throws an error if it doesn't know the operator
  }
}

function incrementScore(){

  // gets current score from the dom and increments it

  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore;
  // the ++ adds one, we put it before so that the answer is incremented correctly
  
  if (oldScore >= 10){
    displayMilestone();
  }
 
}

function incrementWrongAnswer(){

  // gets current tally of incorrect answers from the dom and increments it

  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore;

}

//question functions

function displayAdditionQuestion(operand1, operand2){

  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion(operand1, operand2){
  document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
  document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
  // ternary operator is like a shortened if statement
  // condition ? return if condition is true : return if condition is false
  // eg operand 1 > operand2 (this is the condition) ie is operand 1 greater than operand2
  // ? this makes it a question
  // operand1 : operand2 => return operand1 if it's larger than operand2, return operand2 if it's larger than op1

}

function displayMultiplyQuestion(operand1, operand2){
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";

}

function displayDivideQuestion(operand1, operand2){
  document.getElementById("operand1").textContent = operand1 * operand2;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "/";
}

function displayMilestone(){
  let currentScore = parseInt(document.getElementById("score").innerText);
  
  if (currentScore === 10){
  alert("Yay you reached 10!")
  } else if(currentScore === 25){
    alert("You're on a roll! You've reached 25");
  } else {}
}