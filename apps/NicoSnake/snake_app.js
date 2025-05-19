
// Snake per Bangle.js (semplificato)
let snake, food, dir, interval;

function resetGame() {
  snake = [{x:4,y:4}];
  food = {x:Math.floor(Math.random()*12), y:Math.floor(Math.random()*12)};
  dir = {x:1,y:0};
  g.clear();
}

function draw() {
  g.clear();
  g.setColor(0,1,0);
  snake.forEach(s => g.fillRect(s.x*10,s.y*10,s.x*10+8,s.y*10+8));
  g.setColor(1,0,0);
  g.fillRect(food.x*10, food.y*10, food.x*10+8, food.y*10+8);
  g.flip();
}

function step() {
  let head = {x:snake[0].x + dir.x, y:snake[0].y + dir.y};

  // collisione con bordi
  if (head.x<0 || head.y<0 || head.x>11 || head.y>11) return gameOver();

  // collisione con se stesso
  if (snake.some(s => s.x == head.x && s.y == head.y)) return gameOver();

  snake.unshift(head);

  if (head.x == food.x && head.y == food.y) {
    food = {x:Math.floor(Math.random()*12), y:Math.floor(Math.random()*12)};
  } else {
    snake.pop();
  }

  draw();
}

function gameOver() {
  clearInterval(interval);
  g.clear();
  g.setFont("6x8",2);
  g.drawString("GAME OVER", 30, 50);
  g.flip();
  setTimeout(resetGameAndStart, 2000);
}

function resetGameAndStart() {
  resetGame();
  interval = setInterval(step, 500);
}

function onSwipe(lr,ud) {
  if (lr==-1 && dir.x==0) dir={x:-1,y:0};
  if (lr==1 && dir.x==0) dir={x:1,y:0};
  if (ud==-1 && dir.y==0) dir={x:0,y:-1};
  if (ud==1 && dir.y==0) dir={x:0,y:1};
}

Bangle.on('swipe', onSwipe);
g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
resetGameAndStart();
