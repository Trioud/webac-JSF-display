// scenes/lose_scene.js

import { SCENE_KEYS, __dirname } from "./scene_keys.js";

export class LoseScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.LOSE_SCENE });

    this.counter = null;
  }

  preload() {
    this.load.image("lose-ground", `tanguy/assets/lose_ground.jpg`);
  }

  create(data) {
    this.add
      .image(0, 0, "lose-ground")
      .setOrigin(0, 0)
      .setDepth(0)
      .setAlpha(0.5);

    this.counter = data.counter + 1;
    const loseData = data.loseData;
    const mainChar = data.mainChar;

    // const data2 = {
    //     loseData: {
    //         title: 'Développeur web',
    //         company: 'Google',
    //         mainCharScore: 10,
    //         recruiterScore: 65
    //     },
    //     mainChar: {
    //         name: 'Tanguy',
    //         health: 90
    //     }
    // }

    // const loseData = data2.loseData;
    // const mainChar = data2.mainChar;

    this.add.text(this.sys.game.config.width / 2 - 150, 200, "GAME OVER !", {
      fontSize: "50px",
      fill: "#fff",
    });

    if (loseData.title && loseData.company) {
      this.add.text(
        100,
        270,
        `Tu as été viré de l'entretien pour\n${loseData.title}\nchez ${loseData.company}!`,
        { fontSize: "32px", fill: "#fff" }
      );
    } else if (this.counter >= 5) {
      this.add.text(100, 270, `Tu as perdu 5 fois,\ntu as perdu le jeu!`, {
        fontSize: "32px",
        fill: "#fff",
      });
    } else if (mainChar.health <= 0) {
      this.add.text(100, 270, `Tu n'as plus aucune vie,\ntu as perdu le jeu!`, {
        fontSize: "32px",
        fill: "#fff",
      });
    } else {
      this.add.text(100, 270, `Tu as perdu la bataille finale contre Kratos!`, {
        fontSize: "32px",
        fill: "#fff",
      });
    }

    this.add.text(
      100,
      400,
      `Tu as perdu à ${loseData.mainCharScore} contre ${loseData.recruiterScore}.`,
      { fontSize: "32px", fill: "#fff" }
    );

    const dialogRectangle = this.add
      .rectangle(this.sys.game.config.width / 2 - 50, 500, 200, 45, 0x000000)
      .setDepth(0);

    const text = this.add
      .text(
        dialogRectangle.x - dialogRectangle.width / 2,
        dialogRectangle.y - dialogRectangle.height / 2,
        `Retourner au début`,
        {
          fontFamily: "Arial, sans-serif",
          fontSize: 30,
          color: "#FF0000",
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
      this.game.scene.stop(SCENE_KEYS.LOSE_SCENE);

      if (this.counter >= 5 || mainChar.health <= 0) {
        this.game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
      } else {
        this.game.scene.start(SCENE_KEYS.MAIN_SCENE, {
          mainCharData: mainChar,
          counter: this.counter,
        });
      }
    });
  }
}
