const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");

// Donner la width et la height au canvas;
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
//AJOUT DES TOUCHES
// https://www.toptal.com/developers/keycode site pour récupéré
document.addEventListener("keydown", toucheEnfoncee, false);
document.addEventListener("keyup", toucheRelachee, false);

const playerImage = new Image();
playerImage.src = "assets/Raider_3/Walk.png";
const jumpImage = new Image();
jumpImage.src = "assets/Raider_3/Jump.png";

const spriteWidth = 128;
const spriteHeight = 128;

// position horizontal de la frame à utiliser
let frameX = 0;

// compteur pour déterminer le moment où changer de frame
let gameFrame = 0;

// Contrôle à quel fréquence les frames doivent être changer
const staggerFrames = 10;

// Variables pour le saut

let isJumping = false;
let jumpSpeed = 10;
let gravity = 1; // Il faudra ramener le perso au sol

// les touches

let KeyRight = false;
let KeyLeft = false;
let KeyUp = false;
let KeyDown = false;

let x = 0;
let y = 0;

function toucheEnfoncee(t) {
  t.preventDefault();
  if (t.code == "ArrowRight") {
    KeyRight = true;
  }
  if (t.code == "ArrowUp") {
    KeyUp = true;
  }
  if (t.code == "ArrowLeft") {
    KeyLeft = true;
  }
  if (t.code == "ArrowDown") {
    KeyDown = true;
  }
}

function toucheRelachee(t) {
  t.preventDefault();
  if (t.code == "ArrowRight") {
    KeyRight = false;
  }
  if (t.code == "ArrowUp") {
    KeyUp = false;
  }
  if (t.code == "ArrowLeft") {
    KeyLeft = false;
  }
  if (t.code == "ArrowDown") {
    KeyDown = false;
  }
}

function animate() {
  // Nettoie le canvas à chaque fois pour réafficher nouvelle image
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.save();

  if (isJumping) {
    y -= jumpSpeed;
    jumpSpeed -= gravity;

    if (y > CANVAS_HEIGHT - spriteHeight) {
      y = CANVAS_HEIGHT - spriteHeight;
      isJumping = false;
      jumpSpeed = 10;
    }
  }

  if (KeyRight) {
    x += 1;
  }

  if (KeyLeft) {
    ctx.scale(-1, 1);
    ctx.translate(-CANVAS_WIDTH, 0);
    ctx.drawImage(
      playerImage,
      frameX * spriteWidth,
      0,
      spriteWidth,
      spriteHeight,
      CANVAS_WIDTH - x - spriteWidth,
      y,
      spriteWidth,
      spriteHeight
    );
  } else {
    ctx.drawImage(
      playerImage,
      frameX * spriteWidth,
      0,
      spriteWidth,
      spriteHeight,
      x,
      y,
      spriteWidth,
      spriteHeight
    );
  }
  if (KeyLeft) {
    x--;
  }

  if (KeyUp && !isJumping) {
    isJumping = true;
  }
  if (KeyDown) {
    y++;
  }

  // vérifie si le nombre de frames est un multiple de staggerFrames , contrôle la fréquence à laquel on change de frame
  if (gameFrame % staggerFrames === 0) {
    if (frameX < 6) {
      frameX++;
    } else {
      frameX = 0;
    }
  }

  gameFrame++;
  ctx.restore();
  requestAnimationFrame(animate);
}

animate();
