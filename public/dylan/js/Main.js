import FirstScene from "./scene/FirstScene.js";
import Booking from "./scene/Booking.js";
import Google from "./scene/Google.js";
import Netflix from "./scene/Netflix.js";
import Samsung from "./scene/Samsung.js";
import Scene2 from "./scene/Scene2.js";
import Scene4 from "./scene/Scene4.js";
import Scene5 from "./scene/Scene5.js";
import Scene6 from "./scene/Scene6.js";
import Scene7 from "./scene/Scene7.js";

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    FirstScene,
    Scene2,
    Scene4,
    Scene5,
    Scene6,
    Scene7,
    Google,
    Booking,
    Netflix,
    Samsung,
  ],
};

var game = new Phaser.Game(config);
