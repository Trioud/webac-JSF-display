import Player from "../components/Player.js";
import Pnj from "../components/Pnj.js";

class FirstScene extends Phaser.Scene {
  constructor() {
    super("Scene1");
    // localStorage.setItem("name", "dude");
    // this.player_sprite = localStorage.getItem("name");
  }

  preload() {
    this.load.audio("zelda", "dylan/assets/music/zelda.mp3");
    this.load.image("background", "dylan/assets/background.jpeg");
    this.load.image("platform", "dylan/assets/deco/platform.png");
    this.load.spritesheet("dude", "dylan/assets/perso/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("said", "dylan/assets/perso/said.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.zelda = this.sound.add("zelda");
    this.zelda.play();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fullscreen();
    this.platforms = this.physics.add.staticGroup();

    let add = 0;
    for (let i = 0; i < 4; i++) {
      this.platforms.create(200 + add, 850, "platform");
      add += 400;
    }

    this.player = new Player(this, 100, 700, "dude");
    this.physics.add.collider(this.player, this.platforms);
    this.said = new Pnj(this, 1200, 700, "said").setAlpha(0);
    this.physics.add.collider(this.said, this.platforms);
    setTimeout(() => {
      this.fondue_entrer(this.said);
      setTimeout(() => {
        this.said.text(this, this.said, "!!!!!");
        setTimeout(() => {
          this.said.text_clear(this.said);
          this.said.move_left(this.said);
          setTimeout(() => {
            this.said.move_turn(this.said);
            this.said.text(
              this,
              this.said,
              "Bonjour et bienvenue à AlternanceQuest, ravi de te rencontrer. Moi, c'est Saïd, et je serai ton coach pour cette aventure !"
            );
            setTimeout(() => {
              this.said.text(
                this,
                this.said,
                "Suis-moi pour découvrir la suite !"
              );
              setTimeout(() => {
                this.said.text_clear(this.said);
                this.said.move_right(this.said);
                setTimeout(() => {
                  this.fondue_sortie(this.said);
                  setTimeout(() => {
                    this.said.destroy();
                    this.scene.stop("Scene1");
                    this.scene.start("Scene2");
                  }, 3000);
                }, 3000);
              }, 3000);
            }, 4000);
          }, 4000);
        }, 4000);
      }, 4000);
    }, 4000);
  }

  update() {
    this.player.move(this.cursors);
  }

  fullscreen() {
    var backgroundImage = this.add.image(0, 0, "background").setOrigin(0, 0);
    backgroundImage.displayWidth = this.sys.game.config.width;
    backgroundImage.displayHeight = this.sys.game.config.height;
  }

  fondue_entrer(player) {
    this.tweens.add({
      targets: player,
      alpha: 1,
      duration: 2000,
      ease: "Power2",
      yoyo: false,
    });
  }

  fondue_sortie(player) {
    this.tweens.add({
      targets: player,
      alpha: 0,
      duration: 2000,
      ease: "Power2",
      yoyo: false,
    });
  }
}

export default FirstScene;
