import Player from "../components/Player.js";
import Pnj from "../components/Pnj.js";

class Scene7 extends Phaser.Scene {
  constructor() {
    super("Scene7");
  }

  preload() {
    this.load.image("background7", "dylan/assets/background7.png");
    this.load.audio("combat", "dylan/assets/music/pokemon.mp3");
    this.load.audio("rire", "dylan/assets/music/rire.mp3");
    this.load.spritesheet("dude", "dylan/assets/perso/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Samsung", "dylan/assets/perso/Samsung.png", {
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

    this.Samsung = new Pnj(this, 600, 800, "Samsung");
    this.physics.add.collider(this.Samsung, this.player);
    this.physics.add.collider(this.Samsung, this.platforms);
    this.Samsung.setPushable(false);
    this.Samsung.text(this, this.Samsung, "CEO Samsung");
    this.Samsung.setInteractive();
    this.Samsung.on("pointerdown", () => {
      this.text_Samsung();
    });
  }

  update() {
    this.player.move(this.cursors);
    this.player.update_stats();
  }

  fullscreen() {
    var backgroundImage = this.add.image(0, 0, "background7").setOrigin(0, 0);
    backgroundImage.displayWidth = this.sys.game.config.width;
    backgroundImage.displayHeight = this.sys.game.config.height;
  }
  text_Samsung() {
    this.Samsung.text(this, this.Samsung, "Encore un imposteur...");
    setTimeout(() => {
      this.Samsung.text(
        this,
        this.Samsung,
        "45h, 80k-90k/an, compétences demandées (Assembleur, C, Pascal), cela vous convient ?"
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
          this.Samsung.text(this, this.Samsung, "Bien, allons-y.");
          this.music.play();
          setTimeout(() => {
            this.music.stop();
            this.scene.stop("Scene7");
            this.scene.start("Samsung", {
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
          this.Samsung.text(this, this.Samsung, "....");
          setTimeout(() => {
            this.Samsung.text_clear(this.Samsung);
            this.Samsung.destroy();
            setTimeout(() => {
              this.player.text(
                this,
                this.player,
                "Mince, il n'y a plus d'entreprises..."
              );
              setTimeout(() => {
                this.player.text_clear(this.player);
                this.player.text(
                  this,
                  this.player,
                  "Bon retour à la case départ..."
                );
                setTimeout(() => {
                  this.rire.destroy();
                  this.scene.stop("Scene7");
                  this.scene.start("Scene2");
                }, 3000);
              }, 4000);
            }, 3000);
          }, 2000);
        });
      }, 2000);
    }, 2000);
  }
}
export default Scene7;
