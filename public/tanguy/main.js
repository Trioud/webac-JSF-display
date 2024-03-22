// ./main.js

import { SCENE_KEYS } from "./scenes/scene_keys.js";
import { PreloadScene } from "./scenes/preload_scene.js";
import { IntroScene } from "./scenes/intro_scene.js";
import { MainScene } from "./scenes/main_scene.js";
import { InterviewScene } from "./scenes/interview_scene.js";
import { WinScene } from "./scenes/win_scene.js";
import { LoseScene } from "./scenes/lose_scene.js";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1000,
  height: 720,
  antialias: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
});

game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
game.scene.add(SCENE_KEYS.INTRO_SCENE, IntroScene);
game.scene.add(SCENE_KEYS.MAIN_SCENE, MainScene);
game.scene.add(SCENE_KEYS.INTERVIEW_SCENE, InterviewScene);
game.scene.add(SCENE_KEYS.WIN_SCENE, WinScene);
game.scene.add(SCENE_KEYS.LOSE_SCENE, LoseScene);
game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
