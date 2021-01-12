var path,mainCyclist;
var cyclist1,cyclist2,cyclist3;
var pathImg,mainRacerImg1,mainRacerImg2;

var PinkImg,Pink2Img;
var YellowImg,Yellow2Img;
var RedImg,Red2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  PinkImg = loadAnimation("opponent1.png","opponent2.png");
  Pink2Img = loadAnimation("opponent3.png");
  
  YellowImg = loadAnimation("opponent4.png","opponent5.png");
  Yellow2Img = loadAnimation("opponent6.png");
  
  RedImg = loadAnimation("opponent7.png","opponent8.png");
  Red2Img = loadAnimation("opponent9.png");
  
 // cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.04;
 
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
 pinkCyclist();
 yellowCyclist();
 redCyclist();
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     cyclist1.velocityY = 0;
     cyclist1.addAnimation("opponentPlayer1",Pink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      cyclist2.velocityY = 0;
      cyclist2.addAnimation("opponentPlayer2",Yellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      cyclist3.velocityY = 0;
      cyclist3.addAnimation("opponentPlayer3",Red2Img);
    }
    
}else if (gameState === END) {
   
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
   
    stroke("black");
    fill ("aqua");
    textSize(30);
    text("Game Over",500,150); 
}
}

function pinkCyclist(){
  if(frameCount%120===0){
        cyclist1 =createSprite(1100,Math.round(random(50, 250)));
        cyclist1.scale =0.04;
        cyclist1.velocityX = -(6 + 2*distance/150);
        cyclist1.addAnimation("opponentPlayer1",PinkImg);
        cyclist1.setLifetime=170;
        pinkCG.add(cyclist1);
}
}

function yellowCyclist(){
  if(frameCount%90===0){
        cyclist2 =createSprite(1100,Math.round(random(50, 250)));
        cyclist2.scale =0.04;
        cyclist2.velocityX = -(6 + 2*distance/150);
        cyclist2.addAnimation("opponentPlayer2",YellowImg);
        cyclist2.setLifetime=170;
        yellowCG.add(cyclist2);
}
}

function redCyclist(){
  if(frameCount%80===0){
        cyclist3 =createSprite(1100,Math.round(random(50, 250)));
        cyclist3.scale =0.04;
        cyclist3.velocityX = -(6 + 2*distance/150);
        cyclist3.addAnimation("opponentPlayer3",RedImg);
        cyclist3.setLifetime=170;
        redCG.add(cyclist3);
}
}
