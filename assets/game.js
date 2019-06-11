var myQuestions = [
    {
        question: "The earth is mostly water",
        answers: {
            a: 'True',
            b: 'False'
        },
        correctAnswer: 'a'
    },
    {
        question: "What color is the sky",
        answers: {
            a: 'Red',
            b: 'Yellow',
            c: 'Blue'
        },
        correctAnswer: 'c'
    },
    {
        question: "Your name is David.  What is your name?",
        answers: {
            a: 'David',
            b: 'Not David'
        },
        correctAnswer: 'b'
    },
    {
        question: "Your name is not Michael.  What is your name?",
        answers: {
            a: 'Michael',
            b: 'Not Michael'
        },
        correctAnswer: 'a'
    }
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var timer1 = document.getElementById('timer');
const timeLimit = 30;

generateQuiz(myQuestions, quizContainer, resultsContainer, timer1);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        var output = [];
        var answers;

        for(var i=0; i<questions.length; i++){
            
            answers = [];

            for(letter in questions[i].answers){

                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // combine output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;
                
                answerContainers[i].style.color = 'lightgreen';
            }
            else{
                answerContainers[i].style.color = 'red';
            }
        }

        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    showQuestions(questions, quizContainer);
    
    // 1000 = 1 sec countdown
    // timer from 30
    
    setInterval(countDown, 1000);
    setTimeout(endGame, timeLimit*1000);
    var count = timeLimit;
    var gameHasEnded = false;

    function countDown(){
        if(count > 0){
            $("#timer").text(count);
            count--;
        }
        else {
            if(!gameHasEnded) {
                gameHasEnded = true;
                endGame();
            }
        }
    }

    function endGame(){
        $("#timer").text("Time's Up!");
        showResults(questions, quizContainer, resultsContainer)
    }
};
