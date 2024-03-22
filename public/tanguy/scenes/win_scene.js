// scenes/lose_scene.js

import { SCENE_KEYS, __dirname } from "./scene_keys.js";

export class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.WIN_SCENE });
  }

  preload() {
    this.load.image("win-ground", `tanguy/assets/win_ground.jpeg`);
  }

  create(data) {
    this.add
      .image(0, 0, "win-ground")
      .setOrigin(0, 0)
      .setDepth(0)
      .setAlpha(0.5);
    const winData = data.winData;
    const mainChar = data.mainChar;

    // const data2 = {
    //     winData: {
    //         title: 'Développeur web',
    //         company: 'Google',
    //         mainCharScore: 10,
    //         recruiterScore: 65
    //     },
    //     mainChar: {
    //         name: 'Tanguy',
    //         health: 90,
    //     }
    // }

    // const winData = data2.winData;
    // const mainChar = data2.mainChar;

    this.add.text(this.sys.game.config.width / 2 - 150, 200, "BIEN JOUÉ !", {
      fontSize: "50px",
      fill: "#fff",
    });

    if (winData.title && winData.company) {
      this.add.text(
        100,
        270,
        `Tu as été recruté comme\n${winData.title} en alternance\nchez ${winData.company}!`,
        { fontSize: "32px", fill: "#fff" }
      );
    } else {
      this.add.text(
        100,
        270,
        `Tu as remporté la bataille finale contre Kratos!`,
        { fontSize: "32px", fill: "#fff" }
      );
    }

    this.add.text(
      100,
      400,
      `Tu as gagné à ${winData.mainCharScore} contre ${winData.recruiterScore}.`,
      { fontSize: "32px", fill: "#fff" }
    );

    const dialogRectangle = this.add
      .rectangle(this.sys.game.config.width / 2 - 50, 500, 200, 45, 0x000000)
      .setDepth(0);

    const text = this.add
      .text(
        dialogRectangle.x - dialogRectangle.width / 2,
        dialogRectangle.y - dialogRectangle.height / 2,
        `Recommencer le jeu`,
        {
          fontFamily: "Arial, sans-serif",
          fontSize: 30,
          color: "#00FF00",
          backgroundColor: "#000",
          padding: {
            x: 10,
            y: 10,
          },
          cornerRadius: 10,
        }
      )
      .setInteractive();

    text.on("pointerdown", () => {
      this.game.scene.stop(SCENE_KEYS.WIN_SCENE);
      this.game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
      location.reload();
    });
  }
}
