import commopnMemberTypes from "./commonMemberTypes";

interface IEnemy {
  frameX: commopnMemberTypes.frameX;
  frameY: commopnMemberTypes.frameY;
  fps: commopnMemberTypes.fps;
  frameInterval: commopnMemberTypes.frameInterval;
  frameTimer: commopnMemberTypes.frameTimer;
  x: commopnMemberTypes.x;
  y: commopnMemberTypes.y;
  speedX: commopnMemberTypes.speedX;
  speedY: commopnMemberTypes.speedY;
  image: commopnMemberTypes.image;
  width: commopnMemberTypes.width;
  height: commopnMemberTypes.height;
  markedForDeletion: boolean;
}
