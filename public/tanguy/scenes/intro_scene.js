// scenes/intro_scene.js

import { SCENE_KEYS, __dirname } from "./scene_keys.js";
import { Character } from "../character.js";
import { DialogManager } from "../dialog.js";

export class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.INTRO_SCENE });

    this.currentEvent = 0;
  }

  preload() {
    this.load.image("intro_ground", `tanguy/assets/intro_ground.jpg`);
    this.load.image("intro_desk", `tanguy/assets/intro_desk.png`);
    this.load.image("intro_desk2", `tanguy/assets/intro_desk2.png`);

    Character.preload(this);
  }

  create(data) {
    let mainCharData = data.mainCharData;

    this.add.image(0, 0, "intro_ground").setOrigin(0, 0).setDepth(0);

    this.add
      .image(
        this.sys.game.config.width / 2 - 110,
        this.sys.game.config.height - 170,
        "intro_desk"
      )
      .setOrigin(0, 0)
      .setScale(1.1)
      .setDepth(4);

    this.add
      .image(
        this.sys.game.config.width - 220,
        this.sys.game.config.height - 170,
        "intro_desk2"
      )
      .setOrigin(0, 0)
      .setScale(1.1)
      .setDepth(4);

    this.add
      .rectangle(500, 20, this.sys.game.config.width, 55, 0x000)
      .setDepth(0);

    this.healthText = this.add.text(
      10,
      10,
      `Moral de ${mainCharData.name}: ${mainCharData.health} / 100`,
      { fontSize: "32px", fill: "#fff" }
    );
    // this.healthText = this.add.text(10, 10, 'Moral de Nathan: 70 / 100', { fontSize: '32px', fill: '#fff' });

    this.mainChar = new Character(
      this,
      this.sys.game.config.width,
      this.sys.game.config.height - 250,
      mainCharData.name,
      "left"
    );
    // this.mainChar = new Character(this, this.sys.game.config.width, this.sys.game.config.height - 250, 'Nathan', 'left');
    this.mainChar.setDepth(3);
    this.mainChar.setScale(4);
    this.mainChar.setAlpha(0);
    this.physics.world.enable(this.mainChar);

    this.makeTweens(this.mainChar, 1);

    this.time.delayedCall(3000, () => {
      this.mainChar.moveLeft();

      this.time.delayedCall(1500, () => {
        this.mainChar.stopMoving();
        this.mainChar.setSpriteFace("down");
        this.mainChar.moveDown();

        this.time.delayedCall(800, () => {
          this.mainChar.stopMoving();
          this.mainChar.setSpriteFace("left");
          this.mainChar.moveLeft();

          this.time.delayedCall(4500, () => {
            this.mainChar.stopMoving();

            this.saidChar = new Character(
              this,
              this.sys.game.config.width,
              this.sys.game.config.height - 250,
              "Said",
              "left"
            );
            this.saidChar.verticalControlsEnabled = false;
            this.saidChar.setScale(4);
            this.saidChar.setAlpha(0);
            this.physics.world.enable(this.saidChar);

            this.makeTweens(this.saidChar, 1);

            this.dialogManager = new DialogManager(this);

            this.time.delayedCall(3000, () => {
              this.mainChar.setSpriteFace("right");
              this.saidChar.moveLeft();

              this.time.delayedCall(1500, () => {
                this.saidChar.stopMoving();
                this.saidChar.setSpriteFace("down");

                let firstDiag = this.dialogManager.showDialog(
                  350,
                  200,
                  this.saidChar,
                  `Bonjour! Je suis ${this.saidChar.name}, et mon but\nest de vous aider à trouver votre alternance.\nN'hésitez pas si vous avez besoin d'aide.\n\nAppuyez sur [Espace]`
                );

                this.input.keyboard.once(
                  "keyup-SPACE",
                  () => {
                    firstDiag.hideDialog();

                    let secondDiag = this.dialogManager.showDialog(
                      100,
                      200,
                      this.mainChar,
                      `Bonjour ${this.saidChar.name}! Je suis ${this.mainChar.name}.\nJe n'hésiterais pas à revenir vers toi.\n\nAppuyez sur [Espace]`
                    );
                    // let secondDiag = this.dialogManager.showDialog(200, 200, this.mainChar, `Bonjour Said! Je suis Nathan.\nJe n'hésiterais pas à revenir vers toi.\n\nAppuyez sur [Espace]`);

                    this.input.keyboard.once(
                      "keyup-SPACE",
                      () => {
                        secondDiag.hideDialog();

                        this.mainChar.setSpriteFace("left");

                        this.saidChar.setSpriteFace("right");
                        this.saidChar.moveRight();

                        this.time.delayedCall(1500, () => {
                          this.saidChar.stopMoving();
                          this.makeTweens(this.saidChar, 0);

                          this.time.delayedCall(1500, () => {
                            this.kratosChar = new Character(
                              this,
                              this.sys.game.config.width,
                              this.sys.game.config.height - 250,
                              "Kratos",
                              "left"
                            );
                            this.kratosChar.verticalControlsEnabled = false;
                            this.kratosChar.setScale(4);
                            this.kratosChar.setAlpha(0);
                            this.physics.world.enable(this.kratosChar);

                            this.makeTweens(this.kratosChar, 1);

                            this.time.delayedCall(3000, () => {
                              this.kratosChar.moveLeft();
                              this.mainChar.setSpriteFace("right");

                              this.time.delayedCall(1500, () => {
                                this.kratosChar.stopMoving();
                                this.kratosChar.setSpriteFace("down");

                                let thirdDiag = this.dialogManager.showDialog(
                                  350,
                                  200,
                                  this.kratosChar,
                                  `Bonjour! Je suis Vincent aka ${this.kratosChar.name}, et mon but\nest de détruire votre moral avant que vous trouviez\nvotre alternance.\n\nAppuyez sur [Espace]`
                                );

                                this.mainChar.health -= 10;
                                this.healthText.setText(
                                  `Moral de ${this.mainChar.name}: ${this.mainChar.health} / 100`
                                );

                                this.input.keyboard.once(
                                  "keyup-SPACE",
                                  () => {
                                    thirdDiag.hideDialog();

                                    this.kratosChar.setSpriteFace("right");
                                    this.kratosChar.moveRight();

                                    this.time.delayedCall(1500, () => {
                                      this.kratosChar.stopMoving();
                                      this.makeTweens(this.kratosChar, 0);

                                      this.time.delayedCall(1500, () => {
                                        this.add.text(
                                          410,
                                          200,
                                          `Prenez la porte\npour visiter la\ncarte des entreprises`,
                                          { fontSize: "24px", fill: "#fff" }
                                        );

                                        this.time.delayedCall(800, () => {
                                          this.mainChar.moveRight();

                                          this.time.delayedCall(4500, () => {
                                            this.mainChar.stopMoving();
                                            this.mainChar.setSpriteFace("up");
                                            this.mainChar.moveUp();

                                            this.time.delayedCall(800, () => {
                                              this.mainChar.stopMoving();
                                              this.mainChar.setSpriteFace(
                                                "right"
                                              );
                                              this.mainChar.moveRight();

                                              this.time.delayedCall(
                                                1500,
                                                () => {
                                                  this.mainChar.stopMoving();
                                                  this.makeTweens(
                                                    this.mainChar,
                                                    0
                                                  );

                                                  this.time.delayedCall(
                                                    1000,
                                                    () => {
                                                      mainCharData = {
                                                        x: this.mainChar.x,
                                                        y: this.mainChar.y,
                                                        assetKey:
                                                          this.mainChar
                                                            .assetKey,
                                                        name: this.mainChar
                                                          .name,
                                                        image:
                                                          this.mainChar.image,
                                                        health:
                                                          this.mainChar.health,
                                                        vulnerability:
                                                          this.mainChar
                                                            .vulnerability,
                                                        skills:
                                                          this.mainChar.skills,
                                                      };

                                                      this.scene.start(
                                                        SCENE_KEYS.MAIN_SCENE,
                                                        { mainCharData }
                                                      );
                                                    }
                                                  );
                                                }
                                              );
                                            });
                                          });
                                        });
                                      });
                                    });
                                  },
                                  this
                                );
                              });
                            });
                          });
                        });
                      },
                      this
                    );
                  },
                  this
                );
              });
            });
          });
        });
      });
    });
  }

  makeTweens(character, alpha) {
    this.tweens.add({
      targets: character,
      alpha: alpha,
      ease: "Linear",
      duration: 1500,
      onComplete: () => {
        if (alpha == 0) {
          character.die();
        }
      },
    });
  }
}
