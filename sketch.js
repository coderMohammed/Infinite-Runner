var boyImage,boy;
var treasure,treasureImage,treasureGroup;
var bullet,bulletImage,bulletGroup;
var bg,bgImg;
var bg2,bg2Img
var BEGIN = 0,PLAY = 1,WIN = 2,END = 3;
var gameState = BEGIN;
var isLevel1 = false;
var invisibleGround;
var lives = 3;
var score = 0;
var gameOverBg,gameOverBgImg;
var winner,winnerImg;
var playerBullet,enemyBullet;
var playerGrp,enemyGrp;
var playBtn


function preload(){
  boyImage = loadImage("Assets/Running.gif");
  treasureImage = loadImage("Assets/unnamed (1).png");
  bulletImage = loadImage("Assets/bullet.png");
  bg2Img = loadImage("Assets/BG2.jpeg");
  gameOverBgImg = loadImage("Assets/gif.gif");
  winnerImg = loadImage("Assets/giphy.gif");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  boy = createSprite(80,height-50);
  boy.addImage("run",boyImage);
  boy.scale = 0.2;
  boy.debug = true;
  boy.setCollider("rectangle",0,0,250,350);

  bulletGroup = new Group();
  treasureGroup = new Group();
  enemyGrp = new Group();
  playerGrp = new Group();

    playBtn = createImg("startBtn.png");
    playBtn.position(50,100);
    playBtn.size(45,45)
    playBtn.mouseClicked(start)
}

function draw() 
{ 

  background("green");
  if(gameState === BEGIN){
    
    }

    else if(gameState === PLAY){
  
      if(keyDown("space")){
        boy.y -= 18;
      }
  
  
  
      if(!isLevel1){
        isLevel1 = true;
        bg2 = createSprite(width/2,height/2);
        bg2.addImage("levelStart",bg2Img);
        bg2.scale = 2.2
        boy.depth = bg2.depth+1;
        boy.y = 500
        invisibleGround = createSprite(80,height-150,100,20);
        invisibleGround.visible = false;
      }
  
      boy.collide(invisibleGround);
  
      if(frameCount%150===0){
        spawnBullets()
      }
  
      if(frameCount%80===0){
        spawnTreasure()
      }
  
      boy.velocityY += 0.6;
  
       bg2.velocityX = -2
      if(bg2.x <= 600){
        bg2.x = width/2
      }
      
        if(boy.isTouching(bulletGroup)){
          lives -= 1;
          bulletGroup.destroyEach();
          if(lives===0){
            gameState=END;
          }
        }
    
        if(boy.isTouching(treasureGroup)){
          score += 25;
          treasureGroup.destroyEach();
          if(score >= 200){
            gameState = WIN
          }
          
        }
        
      }
  
    else if(gameState === WIN){
      winner = createSprite(300,300,300,300);
      winner.addImage("win",winnerImg);
      winner.scale = 0.99
      boy.destroy();
      bg2.destroy();
    }
  
    else if(gameState === END){ 
      //console.log("END");
      bg2.destroy();
      gameOverBg = createSprite(300,300);
      gameOverBg.addImage("GAmeOVer",gameOverBgImg);
      gameOverBg.scale = 1.5;
    }

    drawSprites();

  fill("red");
  textSize(20);
  text("PLAYER LIVES: "+lives,40,50);

  fill("red");
  textSize(20);
  text("SCORE: "+score,450,50);

  }


function spawnBullets(){
  bullet = createSprite(610,200,50,50);
  bullet.velocityX = -4
  bullet.y = Math.round(random(250,550))
  bullet.addImage("shoot",bulletImage);
  bullet.rotation = 180;
  bullet.scale = 0.1;
  bullet.lifetime = 610/4;
  bulletGroup.add(bullet);
}

function spawnTreasure(){
  treasure = createSprite(610,200,50,50);
  treasure.velocityX = -4
  treasure.y = Math.round(random(250,550))
  treasure.addImage("treasure",treasureImage);
  treasure.scale = 0.1;
  treasure.lifetime = 610/4;
  treasureGroup.add(treasure);
}

function start(){
  gameState = PLAY;
}