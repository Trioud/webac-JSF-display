import Player from "../components/Player.js";
import Pnj from "../components/Pnj.js";

class Scene4 extends Phaser.Scene {
  constructor() {
    super("Scene4");
  }

  preload() {
    this.load.image("background4", "dylan/assets/background4.jpeg");
    this.load.audio("combat", "dylan/assets/music/pokemon.mp3");
    this.load.audio("rire", "dylan/assets/music/rire.mp3");
    this.load.spritesheet("dude", "dylan/assets/perso/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Google", "dylan/assets/perso/Google.png", {
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

    this.Google = new Pnj(this, 600, 800, "Google");
    this.physics.add.collider(this.Google, this.player);
    this.physics.add.collider(this.Google, this.platforms);
    this.Google.setPushable(false);
    this.Google.text(this, this.Google, "CEO Google");
    this.Google.setInteractive();
    this.Google.on("pointerdown", () => {
      this.text_Google();
    });
  }

  update() {
    this.player.move(this.cursors);
    this.player.update_stats();
  }

  fullscreen() {
    var backgroundImage = this.add.image(0, 0, "background4").setOrigin(0, 0);
    backgroundImage.displayWidth = this.sys.game.config.width;
    backgroundImage.displayHeight = this.sys.game.config.height;
  }
  text_Google() {
    if (this.player.malus == "Decourager") {
      this.Google.text(
        this,
        this.Google,
        "Bonjour, vous ne correspondez pas à notre demande. Revenez plus tard lorsque vous serez plus expérimenté."
      );
      setTimeout(() => {
        this.Google.destroy();
        this.Google.text_clear(this.Google);
        setTimeout(() => {
          this.scene.stop("Scene4");
          this.scene.start("Scene5", {
            vie: this.player.vie,
            force: this.player.force,
            bonus: this.player.bonus,
            malus: this.player.malus,
          });
        }, 3000);
      }, 4000);
      return;
    }
    this.Google.text(
      this,
      this.Google,
      "Bonjour jeune développeur ! Voici mon offre d'emploi."
    );
    setTimeout(() => {
      this.Google.text(
        this,
        this.Google,
        "35h, 40k-55k/an, compétences demandées (Laravel, Symfony, Node.js). Ce poste est surtout orienté Backend, es-tu prêt ?"
      );
      setTimeout(() => {
        this.player.text(
          this,
          this.player,
          "Devrais-je accepter son offre d'emploi ?"
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
          this.Google.text(this, this.Google, "YEAHHHHHH");
          this.refuse.destroy();
          this.accept.destroy();
          this.music.play();
          setTimeout(() => {
            this.music.destroy();
            this.scene.stop("Scene4");
            this.scene.start("Google", {
              vie: this.player.vie,
              force: this.player.force,
              bonus: this.player.bonus,
              malus: this.player.malus,
            });
          }, 5000);
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
          this.player.text_clear(this.player);
          this.refuse.destroy();
          this.accept.destroy();
          this.rire.play();
          this.Google.text(
            this,
            this.Google,
            "AHAHAHAH tu n'es pas à la hauteur !"
          );
          setTimeout(() => {
            this.Google.text_clear(this.Google);
            this.Google.move_right(this.Google);
            setTimeout(() => {
              this.Google.destroy();
              this.rire.destroy();
              this.music.destroy();
              this.scene.stop("Scene4");
              this.scene.start("Scene5", {
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
export default Scene4;
