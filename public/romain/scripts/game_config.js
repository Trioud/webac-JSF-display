import { MainScene } from "./scenes/main_scene.js";
import { Shop } from "./scenes/shop.js";
import { Battle1, Battle1_Success } from "./scenes/battle1.js";
import { FullStackScene, FrontEndScene, BackEndScene } from "./scenes/boss1.js";

const gameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [
    MainScene,
    Shop,
    Battle1,
    FullStackScene,
    FrontEndScene,
    BackEndScene,
    Battle1_Success,
  ],
};

export default gameConfig;
