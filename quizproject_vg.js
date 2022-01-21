// loads Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

let currentQuestion = 0;
let score = 0;
let questionDiv;
let questions;
let timeleft = 0;

window.onload = function() {
	closeLightBox();
	questionDiv = document.getElementById("question");
	fetchQuestion();
	timer();
};

function fetchQuestion() {
  let rand = Math.floor(Math.random() * 100000);
	fetch("https://opentdb.com/api.php?amount=10&category=15&type=multiple&foo=" + rand)
	.then(response => response.json())
	.then(data => changeData(data)
	);
}

function changeData(data) {
	console.log(data);
	 questions = [
   {
	"question": data.results[0].question,
	"question_number": "1",
	"a": data.results[0].incorrect_answers[2],
	"b": data.results[0].correct_answer,
	"c": data.results[0].incorrect_answers[0],
	"d": data.results[0].incorrect_answers[1],
	"answer": "b",
	"c_answer": data.results[0].correct_answer,
	"difficulty": data.results[0].difficulty
   },
   {
	"question": data.results[1].question,
	"question_number": "2",
	"a": data.results[1].correct_answer,
	"b": data.results[1].incorrect_answers[0],
	"c": data.results[1].incorrect_answers[2],
	"d": data.results[1].incorrect_answers[1],
	"answer": "a",
	"c_answer": data.results[1].correct_answer,
	"difficulty": data.results[1].difficulty
   },
   {
	"question": data.results[2].question,
	"question_number": "3",
	"a": data.results[2].incorrect_answers[1],
	"b": data.results[2].incorrect_answers[2],
	"c": data.results[2].incorrect_answers[0],
	"d": data.results[2].correct_answer,
	"answer": "d",
	"c_answer": data.results[2].correct_answer,
	"difficulty": data.results[2].difficulty
   },
   {
	"question": data.results[3].question,
	"question_number": "4",
	"a": data.results[3].incorrect_answers[0],
	"b": data.results[3].incorrect_answers[2],
	"c": data.results[3].correct_answer,
	"d": data.results[3].incorrect_answers[1],
	"answer": "c",
	"c_answer": data.results[3].correct_answer,
	"difficulty": data.results[3].difficulty
   },
   {
	"question": data.results[4].question,
	"question_number": "5",
	"a": data.results[4].correct_answer,
	"b": data.results[4].incorrect_answers[1],
	"c": data.results[4].incorrect_answers[0],
	"d": data.results[4].incorrect_answers[2],
	"answer": "a",
	"c_answer": data.results[4].correct_answer,
	"difficulty": data.results[4].difficulty
   },
   {
	"question": data.results[5].question,
	"question_number": "6",
	"a": data.results[5].incorrect_answers[2],
	"b": data.results[5].incorrect_answers[1],
	"c": data.results[5].incorrect_answers[0],
	"d": data.results[5].correct_answer,
	"answer": "d",
	"c_answer": data.results[5].correct_answer,
	"difficulty": data.results[5].difficulty
   },
   {
	"question": data.results[6].question,
	"question_number": "7",
	"a": data.results[6].incorrect_answers[0],
	"b": data.results[6].incorrect_answers[1],
	"c": data.results[6].correct_answer,
	"d": data.results[6].incorrect_answers[2],
	"answer": "c",
	"c_answer": data.results[6].correct_answer,
	"difficulty": data.results[6].difficulty
   },
   {
	"question": data.results[7].question,
	"question_number": "8",
	"a": data.results[7].incorrect_answers[1],
	"b": data.results[7].correct_answer,
	"c": data.results[7].incorrect_answers[2],
	"d": data.results[7].incorrect_answers[0],
	"answer": "b",
	"c_answer": data.results[7].correct_answer,
	"difficulty": data.results[7].difficulty
   },
   {
	"question": data.results[8].question,
	"question_number": "9",
	"a": data.results[8].correct_answer,
	"b": data.results[8].incorrect_answers[0],
	"c": data.results[8].incorrect_answers[2],
	"d": data.results[8].incorrect_answers[1],
	"answer": "a",
	"c_answer": data.results[8].correct_answer,
	"difficulty": data.results[8].difficulty
   },
   {
	"question": data.results[9].question,
	"question_number": "10",
	"a": data.results[9].incorrect_answers[1],
	"b": data.results[9].incorrect_answers[2],
	"c": data.results[9].incorrect_answers[0],
	"d": data.results[9].correct_answer,
	"answer": "d",
	"c_answer": data.results[9].correct_answer,
	"difficulty": data.results[9].difficulty
   }
 ];
	loadQuestion();
}

 function loadQuestion() {
	
    // close light box for first question
    if (currentQuestion == 0) {
       closeLightBox();
    }
    
    // load the question and answers
    document.getElementById("question").innerHTML = "Q" + questions[currentQuestion].question_number + ": " + questions[currentQuestion].question;
    document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
    document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
    document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
    document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
	document.getElementById("diff").innerHTML = "<strong>" + "Difficulty: " + questions[currentQuestion].difficulty + "</strong>";
	
 } // loadQuestion
 
 
 function markIt(ans) {
	 
     if (timeleft >= -1) {
		 if (currentQuestion < 10) {
    let message = "";
    
    if (ans == questions[currentQuestion].answer) {
        
       // add 1 to score
       score++;
	          
       // display score 
       document.getElementById("score").innerHTML = score + " / " + questions.length;
       
       message = "Correct! Your score is " + score + " / " + questions.length;
	   document.getElementById("message").style.backgroundColor = "green";
	   
    } else {
       message = "Incorrect! Your score is " + score + " / " + questions.length + "<br>" + "Correct Answer: " + questions[currentQuestion].answer + ") " + questions[currentQuestion].c_answer;
	   document.getElementById("message").style.backgroundColor = "red";
		if (currentQuestion == 0) {
			document.getElementById("score").innerHTML = "0 / 10";
		}
    } // else
    
    // move to the next question
    currentQuestion++;
	
	 if (currentQuestion == questions.length) {
      // create a special message
        if (ans == questions[9].answer) {
          message = "Question 10: Correct!" + "<br><br>";
          document.getElementById("message").style.backgroundColor = "green";
        } else {
         message = "Question 10: Incorrect!" + "<br>" + "Correct Answer: " + questions[9].answer + ") " + questions[9].c_answer + "<br><br>";
         document.getElementById("message").style.backgroundColor = "red";
          
       }
        
        message += "Final Score: " + score + " / " + questions.length;
        document.getElementById("message").style.backgroundColor = "orange";
	   
	   if(score == 0 || score == 1) {
		message += "<br><br>" + "This is terrible! I know you can do better than this! Keep practicing!";
	} else if (score == 2 || score == 3) {
		message += "<br><br>" + "This is not good! Keep trying!";
	} else if (score == 4 || score == 5) {
		message += "<br><br>" + "This is not that bad, but it is still not good. Keep working on it!";
	} else if (score == 6 || score == 7 || score == 8) {
		message += "<br><br>" + "This is average, or in other words, just OK. Keep polishing your knowledge!";
	} else if (score == 9 || score == 10) {
		message += "<br><br>" + "Amazing job! You are a trivia genius!";
	}
	   message += "<br><br>" + "What would you like to do next?" + "<br>" + "<button id='retry' onclick='retry()'>Play Again</button>" + "&nbsp;" + "<button id='cool' onclick='home()'>Go to Home</button>" + "&nbsp;" + "<button id='good' onclick='sci()'>Next Quiz: Science</button>";
    } else {
       loadQuestion();
    }
    
    // show the lightbox
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
	
		 }
	 }
  
 }  // markIt

function closeLightBox() {
    if(currentQuestion <= 9 && timeleft >= -1) {
		document.getElementById("lightbox").style.display = "none";
	}
	
	if(currentQuestion == 10 && timeleft >= -1) {
		document.getElementById("lightbox").style.display = "block";
	}
	
	if(currentQuestion <= 10 && timeleft <= -1) {
		document.getElementById("lightbox").style.display = "block";
	}
 } // closeLightbox

function timer() {
  timeleft = 180;
  let downloadTimer = setInterval(function(){
  document.getElementById("countdown").innerHTML = "<strong>" + timeleft + " seconds remaining" + "</strong>";
  timeleft -= 1;
  if(timeleft <= -1){
    clearInterval(downloadTimer);
    document.getElementById("message").innerHTML = "Time is up! Final Score: " + score + " / " + questions.length + 
	"<br><br>" + "What would you like to do next?" + "<br>" + "<button id='retry' onclick='retry()'>Play Again</button>" + "&nbsp;" + "<button id='cool' onclick='home()'>Go to Home</button>" + "&nbsp;"
	+ "<button id='good' onclick='sci()'>Next Quiz: Science</button>";
	document.getElementById("message").style.backgroundColor = "blue";
	document.getElementById("countdown").innerHTML = "<strong>Finished</strong>";
	document.getElementById("lightbox").style.display = "block";
  }
  if (currentQuestion >= 10) {
	  clearInterval(downloadTimer);
	  document.getElementById("countdown").innerHTML = "<strong>Finished</strong>";
	  document.getElementById("lightbox").style.display = "block";
    }
 }, 1000);
}

function retry() {
	location.reload(true);
}

function home() {
	window.location.href = 'index.html';
}

function sci() {
	window.location.href = 'science.html';
}