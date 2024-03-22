// scenes/preload_scene.js

import { SCENE_KEYS, __dirname } from "./scene_keys.js";
import { Character } from "../character.js";
import { DialogManager } from "../dialog.js";
import { mainCharacters } from "../characters/mainCharacters.js";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.PRELOAD_SCENE });

    this.hasSelectedChar = false;
  }

  preload() {
    this.load.image("ground", `tanguy/assets/ground.jpg`);
    this.load.image("welcome-sign", `tanguy/assets/welcome_sign.png`);
    this.load.image("platform", `tanguy/assets/platform.jpg`);
    this.load.image("portal", `tanguy/assets/portal.gif`);

    mainCharacters.forEach((character) => {
      this.load.image(character.image_key, character.image);
    });

    Character.preload(this);
  }

  create() {
    this.add.image(0, 0, "ground").setOrigin(0, 0).setDepth(0);

    this.platforms = this.physics.add.staticGroup();

    const platformWidth = 100;
    const platformHeight = 20;
    const numberOfPlatforms = Math.ceil(
      this.sys.game.config.width / platformWidth
    );

    for (let i = 0; i < numberOfPlatforms; i++) {
      const platformX =
        this.sys.game.config.width - i * platformWidth - platformWidth / 2;
      const platformY = this.sys.game.config.height - 50;

      this.platforms
        .create(platformX, platformY, "platform")
        .setScale(0.1)
        .refreshBody();
    }

    this.welcomeSign = this.physics.add
      .image(250, this.sys.game.config.height - 280, "welcome-sign")
      .setOrigin(0, 0)
      .setScale(0.2);
    this.portal = this.physics.add
      .image(30, this.sys.game.config.height - 290, "portal")
      .setOrigin(0, 0)
      .setScale(1);

    this.randomChar = new Character(
      this,
      this.sys.game.config.width - 50,
      this.sys.game.config.height - 130,
      "Random",
      "down"
    );
    this.randomChar.verticalControlsEnabled = false;
    this.randomChar.setScale(2);
    this.physics.world.enable(this.randomChar);

    this.dialogManager = new DialogManager(this);
    let firstDiag = this.dialogManager.showDialog(
      350,
      200,
      this.randomChar,
      "Hey! Je suis {random} et nous allons parcourir\nensemble Alternance Quest !\nAppuyez sur [Espace]"
    );

    setTimeout(() => {
      firstDiag.hideDialog();
    }, 3500);
  }

  update() {
    if (!this.isFirstEventInProgress) {
      this.input.keyboard.once("keyup-SPACE", this.handleFirstEvent, this);
    }
  }

  handleFirstEvent() {
    this.randomChar.controlsEnabled = false;
    this.isFirstEventInProgress = true;
    this.randomChar.setSpriteFace("left");
    this.randomChar.moveLeft();

    this.time.delayedCall(3000, () => {
      this.randomChar.stopMoving();
      this.randomChar.setSpriteFace("down");

      let secondDiag = this.dialogManager.showCharacterOptions(
        -50,
        530,
        this.randomChar,
        "Cliquez sur l'image du personnage pour l'incarner\net appuyez sur [Espace] !",
        mainCharacters
      );

      this.input.keyboard.off("keyup-SPACE", this.handleFirstEvent, this);
      this.input.keyboard.on(
        "keyup-SPACE",
        () => {
          this.handleSecondEvent(secondDiag);
        },
        this
      );
    });
  }

  handleSecondEvent(secondDiag) {
    // console.log(this.dialogManager.selectedCharacter);

    if (this.dialogManager.selectedCharacter && !this.hasSelectedChar) {
      this.hasSelectedChar = true;
      this.randomChar.die();

      this.mainChar = new Character(
        this,
        this.randomChar.x,
        this.randomChar.y,
        this.dialogManager.selectedCharacter,
        "down"
      );
      this.mainChar.verticalControlsEnabled = false;
      this.mainChar.setScale(2);
      this.physics.world.enable(this.mainChar);

      secondDiag.hideDialog();

      // console.log(this.mainChar.skills);

      this.mainChar.setSpriteFace("left");
      this.mainChar.moveLeft();

      this.time.delayedCall(5300, () => {
        this.mainChar.stopMoving();
        this.mainChar.setSpriteFace("up");
        this.isFirstEventInProgress = false;

        const mainCharData = {
          x: this.mainChar.x,
          y: this.mainChar.y,
          assetKey: this.mainChar.assetKey,
          name: this.mainChar.name,
          image: this.mainChar.image,
          health: this.mainChar.health,
          vulnerability: this.mainChar.vulnerability,
          skills: this.mainChar.skills,
        };

        // console.log(mainCharData);

        this.time.delayedCall(2000, () => {
          this.scene.start(SCENE_KEYS.INTRO_SCENE, { mainCharData });
        });
      });
    }
  }
}
