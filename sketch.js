var climber,climberImg
var door,doorImg
var tower,towerImg
var ghost,ghostImg
var climberGroup,doorGroup,climberOnABudgetGroup
var climberOnABudget
var spookySound

function preload(){
  climberImg=loadImage("climber.png");
  doorImg=loadImage("door.png");
  towerImg=loadImage("tower.png");
  ghostImg= loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav")
}

function setup(){
  createCanvas(500,700);
  tower=createSprite(250,160);
  tower.addImage(towerImg);
  tower.scale=0.9;
  tower.velocityY=3;
  
  ghost=createSprite(250,350);
  ghost.addImage(ghostImg);
  ghost.scale=0.29;

  doorGroup= createGroup();
  climberGroup= createGroup();
  climberOnABudgetGroup=createGroup();
  

}

function draw(){
  background("black");
  drawSprites();
  spookySound.play();
 // spookySound.setVolume(0.005)
  
  if(tower.y>=450){
    tower.y=160;
  }
  if(keyDown("space")){
    ghost.velocityY=-12;
  }
  if(keyDown(LEFT_ARROW)){
    ghost.x-=5
    
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x+=5
   
  }

  if(ghost.isTouching(climberOnABudgetGroup) || ghost.y>700){
    textSize(40);
    fill("black");
    text("GAME OVER !!",130,300 );
    climberOnABudgetGroup.setVelocityYEach(0);
    ghost.visible=false;
    doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);
    tower.velocityY=0;
  
  
  }
    
  ghost.collide(climberGroup)

  ghost.velocityY+=0.5
  spawnClimbingThingies()
}

function spawnClimbingThingies(){
  if(frameCount%120==0){
    door=createSprite(random(50,450), -100);
    door.addImage(doorImg)
    door.velocityY=4
    doorGroup.add(door);
    //ghost depth have to be more than door depth
    ghost.depth= door.depth+1
    climber=createSprite(door.x,door.y+65);
    climber.addImage(climberImg);
    climber.velocityY=4
    climberGroup.add(climber);
  
    climberOnABudget=createSprite(climber.x,climber.y+10, climber.width, 5);
    climberOnABudget.velocityY=4
    climberOnABudget.visible=false;
    climberOnABudgetGroup.add(climberOnABudget)
}
}

