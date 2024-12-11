const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getcontext Method 會回傳一個canvas的drawing context(可於canvas畫圖)
const unit = 20;
const row = canvas.height / unit; //16
const column = canvas.width / unit;

let snake = [];
snake[0] = {
  x: 80,
  y: 0,
};
snake[1] = {
  x: 60,
  y: 0,
};
snake[2] = {
  x: 40,
  y: 0,
};
snake[3] = {
  x: 20,
  y: 0,
};
// 果實設定
class Fruit {
  constructor() {
    this.x = unit * Math.floor(Math.random() * column);
    this.y = unit * Math.floor(Math.random() * row);
  }
  drawFruit() {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, unit, unit);
  }
  // 新的果實位置
  pickALocation() {
    let overlapping = false;
    let new_x;
    let new_y;

    function checkOverlap(new_x, new_y) {
      // 確認果實位置是否跟蛇身重疊
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x == new_x && snake[i].y == new_y) {
          console.log("overlapping...");
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }
    do {
      new_x = unit * Math.floor(Math.random() * column);
      new_y = unit * Math.floor(Math.random() * row);
      console.log("果實可能新座標", new_x, new_y);
      checkOverlap(new_x, new_y);
    } while (overlapping);
    this.x = new_x;
    this.y = new_y;
  }
}
let myFruit = new Fruit();
// 設定方向鍵
window.addEventListener("keydown", changeDirection);
let d = "Right";
function changeDirection(event) {
  //   console.log(event);
  if (event.key == "ArrowRight" && d != "Left") {
    d = "Right";
    // console.log("右");
  } else if (event.key == "ArrowDown" && d != "Up") {
    d = "Down";
    // console.log("下");
  } else if (event.key == "ArrowLeft" && d != "Right") {
    d = "Left";
    // console.log("左");
  } else if (event.key == "ArrowUp" && d != "Down") {
    d = "Up";
    // console.log("上");
  }
}

function draw() {
  // 背景設定為黑色
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //   console.log("正在執行draw");
  //   畫出果實
  myFruit.drawFruit();
  // 畫出蛇
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "green";
    } else {
      ctx.fillStyle = "lightgreen";
    }
    ctx.strokeStyle = "white";
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }
    //   x,y width, height
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }
  //   以目前的d變數方向，來決定蛇的下一幀要放在哪個座標。
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "Left") {
    snakeX -= unit;
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Right") {
    snakeX += unit;
  } else if (d == "Down") {
    snakeY += unit;
  }
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  // 確認蛇是否吃到果實
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    // console.log("吃到果實了")
    // 重新選定一個新的果實位置
    myFruit.pickALocation();
    // 更新分數
  } else {
    snake.pop();
  }
  // snake.pop();
  snake.unshift(newHead);
}

let myGame = setInterval(draw, 200);
