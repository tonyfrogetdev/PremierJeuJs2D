const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");

// Donner la width et la height au canvas;
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "assets/Raider_3/Walk.png";
const spriteWidth = 128;
const spriteHeight = 128;
let frameX = 0;

function animate() {
  // Nettoie le canvas à chaque fois pour réafficher nouvelle image
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  ctx.drawImage(
    playerImage, // L'image à dessiner
    frameX * spriteWidth, // Position horizontale du coin supérieur gauche de la sous-région de l'image source à dessiner
    0, // Position verticale du coin supérieur gauche de la sous-région de l'image source à dessiner
    spriteWidth, // Largeur de la sous-région de l'image source à dessiner
    spriteHeight, // Hauteur de la sous-région de l'image source à dessiner
    0, // Position horizontale où dessiner l'image sur le canevas
    0, // Position verticale où dessiner l'image sur le canevas
    spriteWidth, // Largeur à laquelle dessiner l'image sur le canevas
    spriteHeight // Hauteur à laquelle dessiner l'image sur le canevas
  );

  frameX++;
  if (frameX > 6) {
    frameX = 0;
  }
  requestAnimationFrame(animate);
}

animate();
