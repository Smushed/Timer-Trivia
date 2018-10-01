//Have the questions as an array that you access with a forloop for every page that is scrolled through
var questionArray = [{
    question: "What animal has the longest lifespan?",
    answers: ["Elephant", "Blue Whale", "Giant Tortoise", "Hippopotamus"],
    correctAnswer: "Giant Tortoise"
}, {
    question: "What is the fastest flying bird in the world?",
    answers: ["Golden Eagle", "Peregrine Falcon", "Black Vulture", "Mute Swan"],
    correctAnswer: "Peregrine Falcon"
}, {
    question: "What is the world's most poisonous spider?",
    answers: ["Banana Spider", "Brown Recluse", "Sydney Funnel Spider", "Daddy-Longlegs"],
    correctAnswer: "Banana Spider"
}, {
    question: "What animal is the largest land predator?",
    answers: ["Bengal Tiger", "African Lion", "Polar Bear", "Nile Crocodile"],
    correctAnswer: "Polar Bear"
}, {
    question: "Which animal has the largest brain?",
    answers: ["Orangutan", "Orca", "Elephant", "Sperm Whale"],
    correctAnswer: "Sperm Whale"
}];
var totalTime;
var intervalID;
var questionNumber = 0;
var onQuestion = true;
var score = 0;
var playerAnswer;

$(".answers").on("click", function(){
    playerAnswer = $(this).val();
    //Changes player answer from a number string to the answer string
    playerAnswer = questionArray[questionNumber].answers[playerAnswer];
    playerAnswered();
});

function startTimer() {
    totalTime = 15;
    intervalID = setInterval(function(){
        totalTime--;
        //This if statement is for when the player doesn't guess in time
        if (totalTime <= 0 && onQuestion === true) {
            clearInterval(intervalID);
            //Change the bool onQuestion to false because they are no longer on a question
            onQuestion = false;
            timeIsOver();
        };
        $("#timer").html(totalTime);
    }, 1000);
};

// This updates the page with the new question and possible answers
function updatePage() {
    $("#question").text(questionArray[questionNumber].question);
    $("#answer1").text(questionArray[questionNumber].answers[0]);
    $("#answer2").text(questionArray[questionNumber].answers[1]);
    $("#answer3").text(questionArray[questionNumber].answers[2]);
    $("#answer4").text(questionArray[questionNumber].answers[3]);
};

function togglePage(){
    //Toggle all the elements on the page on and off to make the page shift after each question
    //If statement to check if the game is over
    if (questionNumber < questionArray.length){
        $("#time-display").toggle();
        $("#question").toggle();
        $("#answer-list").toggle();
        if (onQuestion === false){
            $("#result").show();
        } else {
            $("#result").hide();
            updatePage();
            startTimer();
        }
    } else {
        $("#title").hide();
        $("#time-display").hide();
        $("#question").hide();
        $("#answer-list").hide();
        finalScreen();
        $("#result").show();
    }
};

function finalScreen() {
    //Thanks the player for playing and displays all the correct answers
    $("#result").html(`Thank you for playing! You scored ${score} correct. <p>The correct answers were:</p>`)
    for (var i = 0; i < questionArray.length; i++){
        $("#result").append(`<p>${questionArray[i].question} - ${questionArray[i].correctAnswer}</p>`)
    };
};

function timeIsOver() {
    $("#result").text(`Time has run out! The correct answer was ${questionArray[questionNumber].correctAnswer}`);
    afterQuestion();
};

function playerCorrect() {
    //If the player is correct, the score goes up by one and the result screen displays
    $("#result").text(`Correct! The answer was ${questionArray[questionNumber].correctAnswer}.`);
    score++;
    onQuestion = false;
    afterQuestion();
}

function playerIncorrect(){
    //If the player is incorrect, the result screen
    $("#result").text(`Incorrect. The answer was ${questionArray[questionNumber].correctAnswer}.`);
    onQuestion = false;
    afterQuestion();
}

function afterQuestion(){
    totalTime = 10;
    togglePage();
    //Checks if they are on the last question and updates the result div accordingly
    if (questionNumber < (questionArray.length - 1)){
        $(`<div>The next question will start in <span id="nextQuestionTimer">${totalTime}</span> seconds.</div>`).appendTo("#result");
    } else {
        $(`<div>You've answered all the questions. The game is over in <span id="nextQuestionTimer">${totalTime}</span> seconds.</div>`).appendTo("#result");
    }
    //Timer for inbetween questions
    intervalID = setInterval(function(){
        totalTime--;
        if (totalTime <= 0) {
            clearInterval(intervalID);
            //Changes it so it moves to the answer screen then the next question
            onQuestion = true;
            questionNumber++;
            togglePage();
        };
        $("#nextQuestionTimer").html(totalTime);
    }, 1000);

}

function playerAnswered() {
    //Checks the player answer
    clearInterval(intervalID);
    //Updates the HTML so it displays the correct timer when the next question loads
    $("#timer").html(`15`);
    if (playerAnswer === questionArray[questionNumber].correctAnswer){
        playerCorrect();
    } else {
        playerIncorrect();
    };
};

updatePage(questionNumber);
startTimer();

// If time runs out, the page changes to incorrect