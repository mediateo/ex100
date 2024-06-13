let dino;
let obstacles = [];
let score = 0;

function setup() {
  createCanvas(600, 150);
  dino = new Dino();
  obstacles.push(new Obstacle());
}

function draw() {
  background(220);
  
  // Display score
  textSize(20);
  text('Score: ' + score, 10, 30);
  
  // Update and display the dino
  dino.update();
  dino.show();
  
  // Create new obstacles
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
  }
  
  // Update and display obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();
    
    // Check for collision with dino
    if (obstacles[i].hits(dino)) {
      gameOver();
    }
    
    // Remove offscreen obstacles
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    dino.jump();
  }
}

function gameOver() {
  noLoop();
  console.log('Game Over');
  // Add your own game over logic here
}

class Dino {
  constructor() {
    this.x = 50;
    this.y = height - 50;
    this.velocityY = 0;
    this.gravity = 1;
    this.isJumping = false;
  }
  
  jump() {
    if (!this.isJumping) {
      this.velocityY = -15;
      this.isJumping = true;
    }
  }
  
  update() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;
    
    if (this.y >= height - 50) {
      this.y = height - 50;
      this.velocityY = 0;
      this.isJumping = false;
    }
  }
  
  show() {
    fill(0);
    rect(this.x, this.y, 50, 50);
  }
}

class Obstacle {
  constructor() {
    this.x = width;
    this.y = height - 50;
    this.width = 20;
    this.height = 50;
    this.speed = 5;
  }
  
  update() {
    this.x -= this.speed;
  }
  
  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }
  
  offscreen() {
    return this.x + this.width < 0;
  }
  
  hits(dino) {
    return (
      dino.x + 50 > this.x &&
      dino.x < this.x + this.width &&
      dino.y + 50 > this.y
    );
  }
}