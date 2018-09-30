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
    answers: ["Brazilian Wandering Spider aka Banana Spider", "Brown Recluse", "Sydney Funnel Spider", "Daddy-Longlegs"],
    correctAnswer: "Brazilian Wandering Spider aka Banana Spider"
}, {
    question: "What animal is the largest land predator?",
    answers: ["Bengal Tiger", "African Lion", "Polar Bear", "Nile Crocodile"],
    correctAnswer: "Polar Bear"
}, {
    question: "Which animal has the largest brain?",
    answers: ["Orangutan", "Orca", "Elephant", "Sperm Whale"],
    correctAnswer: "Sperm Whale"
}];
var totalTime = 2;
var intervalID;
var questionNumber = 0;
var onQuestion = true;



function startTimer() {
    totalTime = 2;
    intervalID = setInterval(function(){
        totalTime--;
        //This if statement is for when the player doesn't guess in time
        if (totalTime <= 0 && onQuestion === true) {
            clearInterval(intervalID);
            //Change the bool onQuestion to false because they are no longer on a question
            onQuestion = false;
            timeIsOver();
        };
        $("#timer").html(totalTime)
    }, 1000);
};

function updatePage() {
    $("#question").text(questionArray[questionNumber].question);
    $("#answer1").text(questionArray[questionNumber].answers[0]);
    $("#answer2").text(questionArray[questionNumber].answers[1]);
    $("#answer3").text(questionArray[questionNumber].answers[2]);
    $("#answer4").text(questionArray[questionNumber].answers[3]);
};

function togglePage(){
    //Toggle all the elements on the page on and off to make the page shift after each question
    if (questionNumber < 4){
        $("#title").toggle();
        $("#time-display").toggle();
        $("#question").toggle();
        $("#question-list").toggle();
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
        $("#question-list").hide();
        finalScreen();
        $("result").show();
    }
};

function finalScreen() {
    //This is where I put the result of the game
    //How many they got right and wrong and what the correct answers were
};

function timeIsOver() {
    totalTime = 2;
    togglePage();
    $("#result").text(`Time has run out! The correct answer was ${questionArray[questionNumber].correctAnswer}`);
    $(`<div>The next question will start in <span id="nextQuestionTimer">${totalTime}</span> seconds</div>`).appendTo("#result");
    intervalID = setInterval(function(){
        totalTime--;
        if (totalTime <= 0) {
            clearInterval(intervalID);
            //Changes it so it moves to the answer screen then the next question
            onQuestion = true;
            questionNumber++;
            togglePage();
        };
        $("#nextQuestionTimer").html(totalTime)
    }, 1000);
}

updatePage(questionNumber);
startTimer();

// If time runs out, the page changes to incorrect