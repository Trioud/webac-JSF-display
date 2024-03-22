import Player from "../components/Player.js";
import Pnj from "../components/Pnj.js";

class Scene5 extends Phaser.Scene {
  constructor() {
    super("Scene5");
  }

  preload() {
    this.load.image("background5", "dylan/assets/background5.jpg");
    this.load.audio("combat", "dylan/assets/music/pokemon.mp3");
    this.load.audio("rire", "dylan/assets/music/rire.mp3");
    this.load.spritesheet("dude", "dylan/assets/perso/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Booking", "dylan/assets/perso/Booking.png", {
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

    this.Booking = new Pnj(this, 600, 800, "Booking");
    this.physics.add.collider(this.Booking, this.player);
    this.physics.add.collider(this.Booking, this.platforms);
    this.Booking.setPushable(false);
    this.Booking.text(this, this.Booking, "CEO Booking");
    this.Booking.setInteractive();
    this.Booking.on("pointerdown", () => {
      this.text_Booking();
    });
  }

  update() {
    this.player.move(this.cursors);
    this.player.update_stats();
  }

  fullscreen() {
    var backgroundImage = this.add.image(0, 0, "background5").setOrigin(0, 0);
    backgroundImage.displayWidth = this.sys.game.config.width;
    backgroundImage.displayHeight = this.sys.game.config.height;
  }
  text_Booking() {
    if (this.player.malus == "Age") {
      this.Booking.text(
        this,
        this.Booking,
        "Bonjour, vous ne correspondez pas à notre demande. Vous êtes trop vieux pour ce poste."
      );
      setTimeout(() => {
        this.Booking.destroy();
        this.Booking.text_clear(this.Booking);
        this.scene.stop("Scene5");
        this.scene.start("Scene6", {
          vie: this.player.vie,
          force: this.player.force,
          bonus: this.player.bonus,
          malus: this.player.malus,
        });
      }, 4000);
      return;
    }
    this.Booking.text(
      this,
      this.Booking,
      "Bonjour Monsieur le développeur ! Voici mon offre d'emploi."
    );
    setTimeout(() => {
      this.Booking.text(
        this,
        this.Booking,
        "39h, 55k-75k/an, compétences demandées (React, Angular, Node.js). Ce poste est Full-stack, es-tu prêt ?"
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
          this.Booking.text(this, this.Booking, "Allons y !");
          this.music.play();
          setTimeout(() => {
            this.music.stop();
            this.scene.stop("Scene5");
            this.scene.start("Booking", {
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
          this.Booking.text(
            this,
            this.Booking,
            "Bon courage pour vos futures recherches !"
          );
          setTimeout(() => {
            this.Booking.text_clear(this.Booking);
            this.Booking.move_right(this.Booking);
            setTimeout(() => {
              this.rire.destroy();
              this.Booking.destroy();
              this.scene.stop("Scene5");
              this.scene.start("Scene6", {
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
export default Scene5;
