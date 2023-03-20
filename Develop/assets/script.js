$(document).ready(function() {
    var timerCount = $("#timer");
    var mainQuestion= $("#question-heading");
    var questionChoice = $(".question-choices");
    var questionParagraph = $(".question-choices p");
    var scoresContainer = $(".scores-container");

    // Questions JSON list
    const quizQuestions = [
        {
            main: "What is the === operator?",
            answer: [
                {question: "A strictly equal property that returns true when two operands have the same value and type.",
                correct: true },
                {question: "The equal property that returns true when two operands have the same value and type.",
                correct: false },
                {question: "A strictly equal property that returns true when three operands have the same value and type.",
                correct: false},
                {question: "This is not an operator in Javascript.",
                correct: false },

            ]
        },
        {            
            main: "What is a global scope?",
            answer: [
                {question: "Global scopes are only accessed by specific functions.",
                correct: false },
                {question: "Global scopes can be accessed from anywhere in the Javascript program.",
                correct: true },
                {question: "Global scopes are inaccessible and only your legal guardian can give permission for you to use it.",
                correct: false},
                {question: "Global scopes are accessed by only one function.",
                correct: false },

            ]
        },
        {            
            main: "Which of the following is NOT a Javascript data type?",
            answer: [
                {question: "Number",
                correct: false },
                {question: "Boolean",
                correct: false },
                {question: "Float",
                correct: true},
                {question: "Undefined",
                correct: false },

            ]
        },
        {            
            main: "What is the use of void(0)?",
            answer: [
                {question: "Void(0) makes it easier to import functions from other Javascript files.",
                correct: false },
                {question: "It calls another method and prevents the page from refreshing.",
                correct: true },
                {question: "Void(0) allows you to replace text in the HTML file.",
                correct: false},
                {question: "It sends an alert popup in the DOM.",
                correct: false },

            ]
        }
    ]


    let question = 0;

    // Renders the first set of questions
    mainQuestion.text(quizQuestions[question].main)
    questionParagraph.each(function(index){
        $(this).text(quizQuestions[question].answer[index].question);
    })

    // Validates the questions to check if the answer chosen is correct
    questionChoice.each(function() {
        // Checks the click event on the specific div
        $(this).on("click", function(e) {
            quizQuestions[question].answer.forEach(answer => {
                // If choice clicked is correct/true and the inner text of the choice clicked is the
                // same as the question provided in the JSON, then the choice is correct
                if (answer.correct && e.target.innerHTML.trim() === answer.question) {
                    setTimeout(function() {
                        $("#answer").removeClass("hidden");
                        $("#answer").text("Correct!").css("color", "#35A700");
                    }, 1500)
                    $("#answer").addClass("hidden");
                
                // If the choice clicked is wrong/false and the inner text of the choice clicked is the
                // same as the question provided in the JSON, then the choice is incorrect
                // Subtract 10 seconds from timer
                } else if (!answer.correct && e.target.innerHTML.trim() === answer.question) {
                    if (timerDown >= 10) {
                        timerDown -= 10;
                    }
                    setTimeout(function() {
                        $("#answer").removeClass("hidden");
                        $("#answer").text("Wrong!").css("color", "#F00000");
                    }, 1500)
                    $("#answer").addClass("hidden");
                
                }
            })     
           
                
            if (question < 4) {
                question++;
            } else {
                question = question;
            }
            
            displayQuestions(question);
            
            if (question === 4 || timerDown <= 0) {
                displayScores();
            }
        }            

        )      
    })

    // This function displays the questions presented in the JSON
    function displayQuestions(increase) {
        if (question < 4) {
            mainQuestion.text(quizQuestions[increase].main);

            questionParagraph.each(function(index){
                $(this).text(quizQuestions[increase].answer[index].question)
            })
        }
        
    }

    let timerDown = 75;

    // This is the timer function that counts down from 75 to 0
    function countDownTime() {
        var timerInterval = setInterval(function() {
            // Set text to timer countdown
            timerCount.text(timerDown);

            // If timer is 20 seconds or less, set to red text
            if (timerDown >= 0) {
                timerDown--;
            }  

            if (timerDown < 20) {
                timerCount.css("color", "#F00000");
            }

            if(question === 4 || timerDown < 0) {
              // Stops execution of action at set interval
              clearInterval(timerInterval);
            }

            if (timerDown <= 0){
                timerDown = 0;
            }   
        
          }, 1000);
    }



    var comment = $("#comment");
    var points = $("#points");
    var initials = $("#initials");
    var submit = $("#submit");

    // Displays the finals score and gives you a comment based on score
    function displayScores() {
        if (!$("#final-score").hasClass("hidden") || timerDown === 0) {
            $("#question-section").addClass("hidden")
            $("#final-score").removeClass("hidden")
        } else if ($("#final-score").hasClass("hidden") || timerDown === 0) {
            $("#final-score").removeClass("hidden")
            $("#question-section").addClass("hidden")
        }

        console.log(timerDown);
        points.text(timerDown);

        if (timerDown <= 75 && timerDown >= 55) {
            comment.text("You're a Javascript GOD!")
        } else if (timerDown < 55 && timerDown >= 35) {
            comment.text("Impressive!")
        } else if (timerDown < 35 && timerDown >= 21) {
            comment.text("Good, but could be better.")
        } else if (timerDown < 21 && timerDown >= 1) {
            comment.text("Not the best...")
        } else if (timerDown <= 0) {
            comment.text("There's always next time!")
        }
        
    }

    // Prepares a local storage to store scores and name
    function setScores() {
        var scoreBoard = {
            initials: initials.val().toUpperCase(),
            score: timerDown + 1
        }

        localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
        renderMessage();
    }

    // Create elements for new additions and build a class in CSS for
    // the scoreKeeper class
    var nameInitials = $("<span>")
    var scoreTracker = $("<span>")
    var scoreKeeper = $("<div>")


    // Get the items and store them accordingly in the scores list
    function renderMessage() {
        var finalScore = JSON.parse(localStorage.getItem('scoreBoard'));
        if (finalScore !== null) {
            console.log(finalScore.initials);

            nameInitials.text(finalScore.initials);
            scoreTracker.text(finalScore.score);

            scoreKeeper.attr("class", "score-board");

            scoreKeeper.append(nameInitials);
            scoreKeeper.append(scoreTracker);

            scoresContainer.append(scoreKeeper)


            $("#header").addClass("hidden");
            $("#final-score").addClass("hidden");
            $("#scores-list").removeClass("hidden");
        }
      }
    
    // Hides all other sections and just shows the questions section
    function showQuestions() {
        // Once the "START QUIZ" is clicked, show only the questions and
        // hide everything else
        $("#question-section").removeClass("hidden");
        $("#start-quiz").addClass("hidden");
        $("#scores-list").addClass("hidden");

        // Timer starts
        countDownTime();

    }

    // Show questions after "START QUIZ" is clicked
    $("#start").on("click", showQuestions);

    // Show scores list after clicking submit 
    submit.on("click", setScores);

    // When "View High Scores" is clicked, hide the "View High Scores"
    // and timer and only show the scores chart
    $("#scores-link").on("click", function() {
        if (!$("#header").hasClass("hidden") || $("#scores-list").hasClass("hidden")) {
            $("#scores-list").removeClass("hidden");
            $("#header").addClass("hidden");
            $("#start-quiz").addClass("hidden");
            $("#question-section").addClass("hidden");
            $("#final-score").addClass("hidden");
        } 
        
    });

     // When "GO BACK" is clicked, reload page and send user to the 
     // beginning
    $("#back").on("click", function() {
        location.reload();
    })

    // When "CLEAR SCORES", delete all entries
    $("#clear").on("click", function() {
        scoreKeeper.remove();       
    })

})