import Player from "../components/Player.js";
import Pnj from "../components/Pnj.js";

class Scene6 extends Phaser.Scene {
  constructor() {
    super("Scene6");
  }

  preload() {
    this.load.image("background6", "dylan/assets/background6.jpg");
    this.load.audio("combat", "dylan/assets/music/pokemon.mp3");
    this.load.audio("rire", "dylan/assets/music/rire.mp3");
    this.load.spritesheet("dude", "dylan/assets/perso/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Netflix", "dylan/assets/perso/Netflix.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image("platform", "dylan/assets/deco/platform.png");
    this.load.image("house1", "dylan/assets/deco/house1.png");
    this.load.image("house2", "dylan/assets/deco/house2.png");
    this;
  }

  create(data) {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fullscreen();
    this.music = this.sound.add("combat");
    this.rire = this.sound.add("rire");

    this.platforms = this.physics.add.staticGroup();
    let add = 0;
    for (let i = 0; i < 4; i++) {
      this.platforms.create(200 + add, 850, "platform");
      add += 400;
    }
    this.player = new Player(this, 200, 800, "dude");
    this.player.force = data.force;
    this.player.vie = data.vie;
    this.player.bonus = data.bonus;
    this.player.malus = data.malus;
    this.physics.add.collider(this.player, this.platforms);
    console.log(this.player);

    this.Netflix = new Pnj(this, 600, 800, "Netflix");
    this.physics.add.collider(this.Netflix, this.player);
    this.physics.add.collider(this.Netflix, this.platforms);
    this.Netflix.setPushable(false);
    this.Netflix.text(this, this.Netflix, "CEO Netflix");
    this.Netflix.setInteractive();
    this.Netflix.on("pointerdown", () => {
      this.text_Netflix();
    });
  }

  update() {
    this.player.move(this.cursors);
    this.player.update_stats();
  }

  fullscreen() {
    var backgroundImage = this.add.image(0, 0, "background6").setOrigin(0, 0);
    backgroundImage.displayWidth = this.sys.game.config.width;
    backgroundImage.displayHeight = this.sys.game.config.height;
  }
  text_Netflix() {
    if (this.player.malus == "Dissiper") {
      this.Netflix.text(
        this,
        this.Netflix,
        "Bonjour, vous ne correspondez pas à notre demande. Vous êtes trop distrait..."
      );
      setTimeout(() => {
        this.Netflix.destroy();
        this.Netflix.text_clear(this.Netflix);
        this.scene.stop("Scene6");
        this.scene.start("Scene7", {
          vie: this.player.vie,
          force: this.player.force,
          bonus: this.player.bonus,
          malus: this.player.malus,
        });
      }, 5000);
      return;
    }
    this.Netflix.text(
      this,
      this.Netflix,
      "Bonjour Monsieur le designer ! Voici mon offre d'emploi."
    );
    setTimeout(() => {
      this.Netflix.text(
        this,
        this.Netflix,
        "35h, 35k-44k/an, compétences demandées (React, Photoshop, design). Ce poste est Front-end/Design, es-tu prêt ?"
      );
      setTimeout(() => {
        this.player.text(
          this,
          this.player,
          "Dois-je accepter son offre d'emploi ?"
        );
        this.accept = this.add
          .text(400, 300, "Oui", {
            fontFamily: "Arial",
            fontSize: 50,
            color: "Green",
          })
          .setInteractive();
        this.player.text_clear(this.player);
        this.accept.on("pointerdown", () => {
          this.refuse.destroy();
          this.accept.destroy();
          this.Netflix.text(this, this.Netflix, "Commençons !");
          this.music.play();
          setTimeout(() => {
            this.music.stop();
            this.scene.stop("Scene6");
            this.scene.start("Netflix", {
              vie: this.player.vie,
              force: this.player.force,
              bonus: this.player.bonus,
              malus: this.player.malus,
            });
          }, 4000);
        });

        this.refuse = this.add
          .text(600, 300, "Non", {
            fontFamily: "Arial",
            fontSize: 50,
            color: "red",
            border: "1px solid white",
          })
          .setInteractive();
        this.refuse.on("pointerdown", () => {
          this.refuse.destroy();
          this.accept.destroy();
          this.player.text_clear(this.player);
          this.rire.play();
          this.Netflix.text(
            this,
            this.Netflix,
            "Bon courage pour vos futures recherches !"
          );
          setTimeout(() => {
            this.Netflix.text_clear(this.Netflix);
            this.Netflix.move_right(this.Netflix);
            setTimeout(() => {
              this.rire.destroy();
              this.Netflix.destroy();
              this.scene.stop("Scene6");
              this.scene.start("Scene7", {
                vie: this.player.vie,
                force: this.player.force,
                bonus: this.player.bonus,
                malus: this.player.malus,
              });
            }, 4000);
          }, 2000);
        });
      }, 2000);
    }, 2000);
  }
}
export default Scene6;
