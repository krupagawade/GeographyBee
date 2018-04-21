
var stopTimeoutVar ="";
var userClicked = false; // check if user has selected the answer
var win=0;
var loss=0;

var q1= {

    question: "Which is the highest mountain peak in the world?",
    choices: ["Mt Everest", "K2", "Mt Kilimanjaro", "Mt Olympus"],
    correctAns: "Mt Everest",
    urlvideo: "https://www.youtube.com/embed/PlblwP2oa-0?autoplay=1",
}

var q2 = {
    question: "Most of the wheat in the United States is grown in which region?",
    choices: ["Great Plains", "Columbia River Valley","Colorado Plateau","Napa Valley"],
    correctAns: "Great Plains",
    urlvideo: "https://www.youtube.com/embed/pQKwzhEXLEo?autoplay=1",
}

var q3 = {
    question: "Which island group is made of Cuba, Hispaniola, Jamaica and Puerto Rico?",
    choices: ["Great Antilles","East Indies", "Lesser Antilles","Carribean"],
    correctAns: "Great Antilles",
    urlvideo: "https://www.youtube.com/embed/k3KLTSDOCHM?autoplay=1",
}

var q4 = {
    question: "Cinco de Mayo is a holiday celebrated in the United States by people who emigrated from which country?",
    choices: ["Mexico","Brazil","Argentina","Canada"],
    correctAns: "Mexico",
    urlvideo: "https://www.youtube.com/embed/cxN6QuntiBs?autoplay=1",
}

var q5 = {
    question: "Which of these countries are ruled by a person known as the Sultan?",
    choices: ["Oman","Afghanistan","Ukraine","Denmark"],
    correctAns: "Oman",
    urlvideo: "https://www.youtube.com/embed/VfhZDfegV-A?autoplay=1",
}

var q6 = {
    question: "Which state does not have any barrier islands?",
    choices: ["Florida","North Carolina","Vermont","Maryland"],
    correctAns: "Vermont",
    urlvideo: "https://www.youtube.com/embed/9dO5GJVv6mc?autoplay=1",
}

var q7 = {
    question: "Which state has more marshand in United States?",
    choices: ["Texas","Louisiana","Florida","South Carolina"],
    correctAns: "Louisiana",
    urlvideo: "https://www.youtube.com/embed/I3V-AoOY3hU?autoplay=1",
}

var q8 = {
    question: "Which of the following is not a name for rotating storm?",
    choices: ["Typhoon","Monsoon","Hurricane","Tornado"],
    correctAns: "Monsoon",
    urlvideo: "https://www.youtube.com/embed/5Ts0rLh1AX4?autoplay=1",
}

var q9 = {
    question: "New York is the same time zone as which other state?",
    choices: ["South Carolina","Montana","Illinois","Texas"],
    correctAns: "South Carolina",
    urlvideo: "https://www.youtube.com/embed/ow3UOQk06-E?autoplay=1",
}

var q10 = {
    question: "More than one-third of Canada's population lives in the only province of?",
    choices: ["Quebec","Ontario","British Columbia","New Found Land"],
    correctAns: "Ontario",
    urlvideo: "https://www.youtube.com/embed/nbYR6daAKdo?autoplay=1",
}

var questionsArr = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

var i = 0;

function loadQuestion() {
    console.log("Lenght of questionarr : " + questionsArr.length);
        console.log("Question " + questionsArr[i].question);
        $("#question").append("<h3>" + questionsArr[i].question + "</h3>");
        //$("#textDetail").html("<br>");

        for(var j=0; j<questionsArr[i].choices.length; j++){
            $("#answer"+j).append("<h3>"+ questionsArr[i].choices[j] + "</h3>")
            $("#answer"+j).hover(function(){
                $(this).css("background-color", "blue");

            }, function(){
            $(this).css("background-color", "#00b6bd");
            });
            //Clear the timer
            clearInterval(stopTimeoutVar);
            stopTimeoutVar = setInterval(checkTimerExpired, 800);
        }

}

function nextQuestion(){
        //hide video and show timer
        $("#playVideo").attr("src", "");
        //$("#playVideo").pause();
        $(".answer").empty();
        $("#playVideo").hide();
        $("#myCircle").show();    

    //check for the last question in the array of questions
        i++; //move the counter for next question
        if(i<questionsArr.length){
            startTimer();
            loadQuestion();
            userClicked = false;
    }
    else{
        //$("#question").empty();
        $(".answer").empty();
        $("#question").append("<p><h2>Total Questions answered correctly : " + win + "</h2");
        $("#question").append("<p><h2>Total Questions answered wrong : " + loss + "</h2");
        $("#question").append("<input type='button' value='Try Again!!' id='resetButton' onclick='resetGeoBee()'>");
        clearInterval(stopTimeoutVar);

    }
}

loadQuestion();

function resetGeoBee(){
    i=-1;
    win=0;
    loss=0;
    nextQuestion();
}


//function to verify answer selected by user
$(".answer").on("click",function(){
    console.log("Verify : " + $(this).text());
    if(!userClicked){
        if(questionsArr[i].correctAns === $(this).text()){
            win++;
            $("#result").append("<BR><h3>You got a correct answer!</h3>");
        }
        else{
            loss++;
            $("#result").append("<BR><h3>Wrong Answer! Correct answer is " +questionsArr[i].correctAns + "</h3>");        
        }
        console.log("TIMEOUT CALLED");
        userClicked = true;
        loadVideo();
    }
});

function loadVideo(){
        //hide timer
        $("#myCircle").hide();
        clearTimer(); // Function from Cirlce.js
        //Show video 
        $("#playVideo").attr("src", questionsArr[i].urlvideo);
        $("#playVideo").show();
        //$("#playVideo").playVideo();
        //document.getElementById("playVideo").play();
        setTimeout(nextQuestion, 20000); 
}

function loadCircle(){
    console.log("calling load circle");
    $("#circle-1").Circlebar({
        maxValue: 30,
        fontSize: "14px",
        triggerPercentage: true
    })
}

//check if timer is expired
function checkTimerExpired(){
    console.log("check timer expiry : " + isTimerExpired);
    if(isTimerExpired){
        clearInterval(stopTimeoutVar);
        loss++;
        $("#result").append("<br><h3>Timer has expired. Correct answer is " +questionsArr[i].correctAns + "</h3>");
        loadVideo();
    }
}

$(document).ready(function() {
    loadCircle();    
    $("#playVideo").hide();
});
