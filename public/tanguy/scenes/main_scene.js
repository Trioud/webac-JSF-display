// scenes/main_scene.js

import { SCENE_KEYS, __dirname } from "./scene_keys.js";
import { Character } from "../character.js";
import { DialogManager } from "../dialog.js";
import { Building } from "../building.js";
import { recruiterCharacters } from "../characters/recruiterCharacters.js";
import { dataJobs } from "../data/dataJobs.js";

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.MAIN_SCENE });

    this.mainChar = null;
    this.modeDifficult = false;
    this.counter = null;
  }

  preload() {
    this.load.image("main-ground", `tanguy/assets/main_ground.png`);
    this.load.image("main-sign", `tanguy/assets/main_sign.png`);
    this.load.image("portal", `tanguy/assets/portal.gif`);

    this.load.image("building-school", `tanguy/assets/map/school.png`);
    this.load.image("building_1", `tanguy/assets/map/building1.png`);
    this.load.image("building_2", `tanguy/assets/map/building2.png`);
    this.load.image("building_3", `tanguy/assets/map/building3.png`);
    this.load.image("building_4", `tanguy/assets/map/building4.png`);
    this.load.image("building_6", `tanguy/assets/map/building8.png`);
    this.load.image("building_7", `tanguy/assets/map/building7.png`);
    this.load.image("building_9", `tanguy/assets/map/building9.png`);
    this.load.image("building_10", `tanguy/assets/map/building10.png`);
    this.load.image("building_11", `tanguy/assets/map/building11.png`);

    Character.preload(this);
  }

  create(data) {
    let mainCharData = data.mainCharData;

    if (data.counter) {
      this.counter = data.counter;
    }

    this.add.image(0, 0, "main-ground").setOrigin(0, 0).setDepth(0);

    this.mainChar = new Character(this, 725, 235, mainCharData.name, "down");
    // this.mainChar = new Character(this, 725, 235, 'Dylan', 'down');
    this.mainChar.setDepth(2);
    this.mainChar.setScale(2);
    this.mainChar.setAlpha(0);
    this.physics.world.enable(this.mainChar);
    this.mainChar.body.setCollideWorldBounds(true);
    this.mainChar.horizontalControlsEnabled = true;
    this.mainChar.verticalControlsEnabled = true;
    this.mainChar.controlsEnabled = true;
    this.makeTweens(this.mainChar, 1);

    this.mainChar.health = mainCharData.health;
    this.mainChar.vulnerability = mainCharData.vulnerability;
    this.mainChar.skills = mainCharData.skills;

    this.saidChar = new Character(
      this,
      this.sys.game.config.width - 100,
      this.sys.game.config.height - 145,
      "Said",
      "down"
    );
    this.saidChar.setDepth(1);
    this.saidChar.setScale(2);
    this.saidChar.setAlpha(0);
    this.physics.world.enable(this.saidChar);
    this.saidChar.setImmovable(true);
    this.saidChar.body.setCollideWorldBounds(true);
    this.makeTweens(this.saidChar, 1);

    const buildings = [
      {
        key: "school",
        x: this.sys.game.config.width - 150,
        y: this.sys.game.config.height - 250,
        image: "building-school",
        scale: 0.4,
      },
      {
        key: "building_1",
        x: this.sys.game.config.width - 150,
        y: 150,
        image: "building_1",
        scale: 0.5,
      },
      {
        key: "building_2",
        x: this.sys.game.config.width - 110,
        y: 180,
        image: "building_2",
        scale: 0.5,
      },
      { key: "building_3", x: 50, y: 150, image: "building_3", scale: 0.6 },
      { key: "building_4", x: 200, y: 100, image: "building_4", scale: 0.4 },
      {
        key: "building_6",
        x: 50,
        y: this.sys.game.config.height - 250,
        image: "building_6",
        scale: 0.3,
      },
      {
        key: "building_7",
        x: this.sys.game.config.width / 2,
        y: 150,
        image: "building_7",
        scale: 0.3,
      },
      { key: "building_9", x: 300, y: 350, image: "building_9", scale: 0.3 },
      { key: "building_10", x: 550, y: 400, image: "building_10", scale: 0.3 },
    ];

    this.dialogManager = new DialogManager(this);

    buildings.forEach((building) => {
      this[building.key] = new Building(
        this,
        building.x,
        building.y,
        building.image,
        building.scale
      );
      this.physics.add.collider(this.mainChar, this[building.key]);

      const buildingData = recruiterCharacters.find(
        (recruiter) =>
          Object.values(recruiter.building_keys)[0] === building.key
      );
      if (buildingData) {
        this.dialogManager.showDialog(
          0,
          50,
          this[building.key],
          buildingData.company
        );
      }

      this[building.key].on("pointerdown", () => {
        // console.log(`Clicked on ${building.key}`);
        const jobDataArray = dataJobs.filter((job) =>
          Object.values(job.building_key).includes(building.key)
        );
        if (jobDataArray.length > 0) {
          this.dialogManager.showJobOffers(jobDataArray);
        } else if (building.key === "school") {
          if (this.mainChar.health < 90) {
            this.mainChar.health += 10;
          } else if (this.mainChar.health < 100) {
            this.mainChar.health = 100;
          }
        } else {
          console.error(`No data found for ${building.key}`);
        }
      });
    });

    this.dialogManager.showDialog(0, 50, this.school, "Epitech");

    recruiterCharacters.forEach((character) => {
      for (let key in character.building_keys) {
        let buildingKey = character.building_keys[key];
        let building = this[buildingKey];
        if (building) {
          this[character.key] = new Character(
            this,
            building.x + 50,
            building.y + 150,
            character.name,
            character.initial_face
          );
          this[character.key].setDepth(1);
          this[character.key].setScale(2);
          this[character.key].setAlpha(0);
          this.physics.world.enable(this[character.key]);
          this[character.key].setImmovable(true);
          this[character.key].body.setCollideWorldBounds(true);
          this.makeTweens(this[character.key], 1);

          this[character.key].setInteractive();
          this[character.key].on("pointerdown", () => {
            // console.log(`Clicked on ${character.name}`);
          });
        } else {
          console.error(`Building not found for key ${buildingKey}`);
        }
      }
    });

    this.add
      .rectangle(500, 20, this.sys.game.config.width, 55, 0x000)
      .setDepth(0);
    this.healthText = this.add.text(
      10,
      10,
      `Moral de ${mainCharData.name}: ${mainCharData.health} / 100`,
      { fontSize: "32px", fill: "#fff" }
    );
    // this.healthText = this.add.text(10, 10, 'Moral de Nathan: 70 / 100', { fontSize: '24px', fill: '#fff' });

    this.modeText = this.add
      .text(
        570,
        10,
        `${
          !this.modeDifficult
            ? "[Cliquez pour Hardcore mode]"
            : "[Cliquez pour Soft mode]"
        }`,
        { fontSize: "24px", fill: "#fff" }
      )
      .setInteractive();
    this.modeText.on("pointerdown", () => {
      this.modeDifficult = !this.modeDifficult;
      this.modeText.setText(
        `${
          !this.modeDifficult
            ? "[Cliquez pour Hardcore mode]"
            : "[Cliquez pour Soft mode]"
        }`
      );
      // console.log(`Mode difficile: ${this.modeDifficult}`);
    });

    this.add.text(
      30,
      this.sys.game.config.width - 340,
      "Traversez la rue pour trouver votre alternance.",
      { fontSize: "18px", fill: "#fff" }
    );
    this.add.text(
      30,
      this.sys.game.config.width - 320,
      "Cliquez sur une entreprise pour voir ses offres d'emploi.",
      { fontSize: "18px", fill: "#fff" }
    );
    this.add.text(
      30,
      this.sys.game.config.width - 300,
      "Cliquez sur l'école Epitech pour gagner des PV.",
      { fontSize: "18px", fill: "#fff" }
    );

    this.portal = this.physics.add
      .image(660, 125, "portal")
      .setOrigin(0, 0)
      .setDepth(0)
      .setScale(0.7);
    this.physics.world.enable(this.portal);
    this.portal.body.setImmovable(true);

    let graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffffff, 0);
    graphics.beginPath();
    graphics.moveTo(0, 200);
    graphics.lineTo(this.game.config.width, 200);
    graphics.closePath();
    graphics.strokePath();

    let lineCollider = this.physics.add.staticSprite(
      this.game.config.width / 2,
      200
    );
    lineCollider.setSize(this.game.config.width, 2);
    this.physics.add.collider(this.mainChar, lineCollider);

    // console.log(this.mainChar.health);
    // console.log(mainCharData.health);
  }

  update() {
    this.mainChar.update();

    this.healthText.setText(
      `Moral de ${this.mainChar.name}: ${this.mainChar.health} / 100`
    );

    if (this.dialogManager.selectedJob) {
      // console.log(`Selected job: ${this.dialogManager.selectedJob}`);
      // console.log('Selected job data:', this.dialogManager.jobOffer);

      let mainCharData = {
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

      this.scene.start(SCENE_KEYS.INTERVIEW_SCENE, {
        jobData: this.dialogManager.jobOffer,
        mainCharData: mainCharData,
        gameMode: this.modeDifficult,
        counter: this.counter,
      });
    }
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
