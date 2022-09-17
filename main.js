screenWidth = 0;
screenHeight = 0;
apple = "";
speak_data = "";
saidNumber = "";
x = 0;
y = 0;

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload() {
  apple = loadImage("apple.png");
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;
  saidNumber = Number(content);
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
  if(Number.isInteger(saidNumber)){
    document.getElementById("status").innerHTML = "Starting to draw apple(s)";
    draw_apple = "set";
  }
  else {
    document.getElementById("status").innerHTML = "The speech has not been recognized as a number.";
  }
}

function setup() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas = createCanvas(screenWidth, screenHeight-150);
    canvas.position(0,150);
}

function draw() {
  if(draw_apple == "set")
  {
    draw_apple = "";

    for(i = 1; i <= saidNumber; i++){
      y = Math.floor(Math.random()*400);
      x = Math.floor(Math.random()*700);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apple(s) drawn";
    speak_data = saidNumber + "Apples drawn";
    speak()
  }
}

function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
