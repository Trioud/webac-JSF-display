import Main from "./main.js";
import BattleScene from "./battlescene.js";

class CharacterSelectionScene extends Phaser.Scene {
  constructor() {
    super({ key: "CharacterSelectionScene" });
    this.player1;
    this.player2;
    this.player3;
    this.player4;
    this.player5;
    this.platforms;
  }

  preload() {
    this.load.image("sky", "nathan/assets/selec.png");
    this.load.image("ground", "nathan/assets/nuage.png");

    this.load.spritesheet("nathan", "nathan/assets/nathan.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("roro", "nathan/assets/roro.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("tanguyche", "nathan/assets/tanguyche.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("dydou", "nathan/assets/dydou.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("abou", "nathan/assets/abou.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.add.image(800, 400, "sky");

    this.player1 = this.add.image(1350, 400, "nathan").setScale(3);
    this.player2 = this.add.image(150, 400, "dydou").setScale(3);
    this.player3 = this.add.image(450, 400, "roro").setScale(3);
    this.player4 = this.add.image(750, 400, "tanguyche").setScale(3);
    this.player5 = this.add.image(1050, 400, "abou").setScale(3);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(200, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(500, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(800, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(1100, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(1400, 568, "ground").setScale(2).refreshBody();

    this.physics.add.collider(this.player1, this.platforms);
    this.physics.add.collider(this.player2, this.platforms);
    this.physics.add.collider(this.player3, this.platforms);
    this.physics.add.collider(this.player4, this.platforms);
    this.physics.add.collider(this.player5, this.platforms);

    let selectedIndex = 0;

    const instructionText = this.add.text(
      500,
      30,
      "Utilisez les flèches pour choisir un personnage\n( Appuyez sur Entrée pour valider ) ",
      { fontSize: "25px", fill: "#000000" }
    );

    this.input.keyboard.on("keydown", (event) => {
      switch (event.code) {
        case "ArrowLeft":
          selectedIndex = Phaser.Math.Wrap(selectedIndex - 1, 0, 5);
          break;
        case "ArrowRight":
          selectedIndex = Phaser.Math.Wrap(selectedIndex + 1, 0, 5);
          break;
        case "Enter":
          // Stocker l'index du personnage sélectionné dans le localStorage
          localStorage.setItem("selectedCharacter", selectedIndex.toString());
          // Passer à la scène principale
          this.scene.start("Main");
          break;
      }
      this.updateHighlight(selectedIndex);
    });

    this.updateHighlight(selectedIndex);
  }

  // Mettre à jour la surbrillance du personnage sélectionné
  updateHighlight(selectedIndex) {
    // Supprimer la surbrillance des précédents personnages
    this.children.each((child) => {
      if (child.hasOwnProperty("isHighlighted")) {
        child.isHighlighted.setVisible(false);
      }
    });

    // Supprimer les bulles de texte précédentes
    this.children.each((child) => {
      if (child.hasOwnProperty("bubble")) {
        child.bubble.destroy();
        child.bubbleText.destroy();
      }
    });

    // Ajouter la surbrillance au personnage sélectionné
    const characters = [
      this.player1,
      this.player2,
      this.player3,
      this.player4,
      this.player5,
    ];
    const character = characters[selectedIndex];
    character.isHighlighted = this.add.graphics();
    character.isHighlighted.lineStyle(5, 0xffd700);
    character.isHighlighted.strokeRect(
      character.x - character.displayWidth / 2,
      character.y - character.displayHeight / 2,
      character.displayWidth,
      character.displayHeight
    );

    const textStyle = { fontSize: "18px", fill: "#ffffff" };
    const attributesText = [
      [
        "Nathan",
        "HP : 100",
        "Attack : 20",
        "Defense : 30",
        "Skill : Débrouillard ",
        "Hard skill : PHP",
        "Intelligence : Moyenne",
        "Defaut : Beaucoup trop...",
      ],
      [
        "Dydou",
        "HP : 90",
        "Attack : 25",
        "Defense : 35",
        "Skill : Charismatique ",
        "Hard skill :  JS / PHP",
        "Intelligence : Élevée",
        "Defaut : Raciste",
      ],
      [
        "Roro",
        "HP : 80",
        "Attack : 28",
        "Defense : 28",
        "Skill : Expert jeux vidéo ",
        "Hard skill :  JS / PHP",
        "Intelligence : Très élevée",
        "Defaut : Folie",
      ],
      [
        "Tanguyche",
        "HP : 70",
        "Attack : 22",
        "Defense : 33",
        "Skill : Ingénieux ",
        "Hard skill :  JS / PHP",
        "Intelligence : Élevée",
        "Defaut : Impatient",
      ],
      [
        "Abou",
        "HP : 90",
        "Attack : 30",
        "Defense : 25",
        "Skill : Athlétique ",
        "Hard skill : HTML / CSS",
        "Intelligence : Faible",
        "Defaut :\nManque de confiance",
      ],
    ];

    attributesText.forEach((attributes, index) => {
      const x = characters[index].x;
      const y = characters[index].y - characters[index].displayHeight / 2 - 20; // Position au-dessus du personnage
      const text = attributes.join("\n");
      const bubbleWidth = 290;
      const bubbleHeight = 180;
      const bubble = this.add.graphics();
      bubble.fillStyle(0x000000, 0.7);
      bubble.fillRoundedRect(
        x - bubbleWidth / 2,
        y - bubbleHeight,
        bubbleWidth,
        bubbleHeight,
        10
      );
      characters[index].bubble = bubble;
      const textObject = this.add
        .text(x, y - bubbleHeight / 2, text, textStyle)
        .setOrigin(0.5, 0.5);
      characters[index].bubbleText = textObject;
    });
  }
}

const config = {
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
  scene: [CharacterSelectionScene, Main, BattleScene],
};

const game = new Phaser.Game(config);
