var database, position;
var balloon,balloonImage1,balloonImage2;
var ballonPosition;
// create database and position variable here

 function preload(){
  bg =loadImage("cityImage.png");
  balloonImage1=loadAnimation("hotairballoon1.png");
  balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
 function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
 function draw() {
  background(bg);
  ballonPosition = database.ref('balloon/height');
  updateHeight(220, 200);
  ballonPosition.on("value", readHeight, showError); 
   

  if(keyDown(LEFT_ARROW)){  
   updateHeight(-5, 0);
   balloon.addAnimation("hotAirBalloon",balloonImage2);
  }

  if(keyDown(RIGHT_ARROW)){
   //updateHeight(0, 5);
   balloon.addAnimation("hotAirBalloon",balloonImage2);
  }

  if(keyDown(UP_ARROW)){
   //updateHeight(0, -10);
   balloon.addAnimation("hotAirBalloon",balloonImage2);
   balloon.scale = balloon.scale -0.01;
  }

  if(keyDown(DOWN_ARROW)){
   //updateHeight(0, -5);
   balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  x=200;
  y=220;


  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

 function updateHeight(data,x,y){
  height = data.val();
  ballonPosition.set({
   'x':height.x + x,
   'y':height.y + y
  })
 }

 function readHeight(data){
  height = data.val();
  console.log("kkkk", height);
  balloon.x = height.x;
  balloon.y = height.y;
 }

 function showError(){
  console.log("Error in writing to the database");
 }
