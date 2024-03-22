import Player from "../components/Player.js";
import Pnj from "../components/Pnj.js";

class Scene2 extends Phaser.Scene {
  constructor() {
    super("Scene2");
    // localStorage.setItem("name", "dude");
    // this.player_sprite = localStorage.getItem("name");
  }

  preload() {
    this.load.image("background2", "dylan/assets/background2.jpeg");
    this.load.image("platform", "dylan/assets/deco/platform.png");
    this.load.image("wood_platform", "dylan/assets/deco/wood_platform.png");
    this.load.spritesheet("dude", "dylan/assets/perso/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("said", "dylan/assets/perso/said.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("romain", "dylan/assets/perso/romain.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("nathan", "dylan/assets/perso/nathan.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("abou", "dylan/assets/perso/abou.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.fullscreen();

    this.platforms = this.physics.add.staticGroup();
    let add = 0;
    for (let i = 0; i < 4; i++) {
      this.platforms.create(200 + add, 850, "platform");
      add += 400;
    }
    this.wood_platform = this.physics.add.staticGroup();
    this.wood_platform.create(200, 500, "wood_platform");
    this.wood_platform.create(600, 500, "wood_platform");
    this.wood_platform.create(1000, 500, "wood_platform");
    this.wood_platform.create(1400, 500, "wood_platform");
    this.player = new Player(this, 400, 750, "dude").setAlpha(0);
    setTimeout(() => {
      this.fondue_entrer(this.player);
    }, 2000);
    this.physics.add.collider(this.player, this.platforms);

    this.said = new Pnj(this, 1100, 750, "said").setAlpha(0);
    setTimeout(() => {
      this.said_talk();
    }, 3000);

    this.physics.add.collider(this.said, this.platforms);

    this.romain = new Pnj(this, 400, 400, "romain").setInteractive();
    this.romain.on("pointerout", () => {
      this.romain.text_clear(this.romain);
    });
    this.romain.on("pointerover", () => {
      this.romain_talk();
    });
    this.romain.on("pointerdown", () => {
      this.select_romain();
    });
    this.physics.add.collider(this.romain, this.wood_platform);

    this.nathan = new Pnj(this, 750, 400, "nathan").setInteractive();
    this.nathan.on("pointerout", () => {
      this.nathan.text_clear(this.nathan);
    });
    this.nathan.on("pointerover", () => {
      this.nathan_talk();
    });
    this.nathan.on("pointerdown", () => {
      this.select_nathan();
    });
    this.physics.add.collider(this.nathan, this.wood_platform);

    this.abou = new Pnj(this, 1100, 400, "abou").setInteractive();
    this.abou.on("pointerout", () => {
      this.abou.text_clear(this.abou);
    });
    this.abou.on("pointerover", () => {
      this.abou_talk();
    });
    this.abou.on("pointerdown", () => {
      this.select_abou();
    });
    this.physics.add.collider(this.abou, this.wood_platform);
  }

  update() {
    this.player.move(this.cursors);
    this.player.update_stats();
  }

  fullscreen() {
    var backgroundImage = this.add.image(0, 0, "background2").setOrigin(0, 0);
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

  nathan_talk() {
    this.nathan.text(
      this,
      this.nathan,
      "Bonjour, je m'appelle Nathan. J'ai 27 ans. Je suis très bon en PHP et je suis très rapide à apprendre. Mon défaut est que je ne suis pas super bon en JavaScript."
    );
    this.player.vie = 110;
    this.player.bonus = "Rapiditer";
    this.player.malus = "Age";
  }

  select_nathan() {
    this.player.text(this, this.player, "Tu as choisi Nathan !");
    setTimeout(() => {
      this.scene.stop("Scene2");
      this.scene.start("Scene4", {
        vie: this.player.vie,
        force: this.player.force,
        bonus: this.player.bonus,
        malus: this.player.malus,
      });
    }, 1000);
  }

  romain_talk() {
    this.romain.text(
      this,
      this.romain,
      "Bonjour, je m'appelle Romain. J'ai 20 ans. Je suis très bon en algorithmique et je code en C++. Mon défaut est que je suis souvent feignant et je me dissipe très vite"
    );
    this.player.vie = 100;
    this.player.bonus = "Eloquance";
    this.player.malus = "Dissiper";
  }

  select_romain() {
    this.player.text(this, this.player, "Tu as sélectionné Romain !");
    setTimeout(() => {
      this.scene.stop("Scene2");
      this.scene.start("Scene4", {
        vie: this.player.vie,
        force: this.player.force,
        bonus: this.player.bonus,
        malus: this.player.malus,
      });
    }, 3000);
  }

  abou_talk() {
    this.abou.text(
      this,
      this.abou,
      "Bonjour, je m'appelle Aboubakr. J'ai 26 ans. Je suis très bon en design et en CSS. Mon défaut est que je ne suis vraiment pas bon en backend et je lis la documentation sans rien comprendre."
    );
    this.player.vie = 90;
    this.player.bonus = "Acharner";
    this.player.malus = "Decourager";
  }
  select_abou() {
    this.player.text(this, this.player, "Tu as sélectionné Abou !");
    setTimeout(() => {
      this.scene.stop("Scene2");
      this.scene.start("Scene4", {
        vie: this.player.vie,
        force: this.player.force,
        bonus: this.player.bonus,
        malus: this.player.malus,
      });
    }, 3000);
  }

  said_talk() {
    this.fondue_entrer(this.said);
    setTimeout(() => {
      this.said.text(
        this,
        this.said,
        "Bon, maintenant nous allons choisir un personnage"
      );
      setTimeout(() => {
        this.said.text(
          this,
          this.said,
          "Tu peux voir que des statistiques sont apparues en haut de ton écran."
        );
        setTimeout(() => {
          this.said.text(
            this,
            this.said,
            "Chaque personnage a des statistiques différentes. Les recruteurs auront des préférences pour certaines caractéristiques."
          );
          setTimeout(() => {
            this.said.text(
              this,
              this.said,
              "Pour voir les caractéristiques de chaque personnage, survole-les avec ta souris."
            );
            setTimeout(() => {
              this.said.text(
                this,
                this.said,
                "Pour sélectionner un personnage, clique dessus. Bon courage !"
              );
              setTimeout(() => {
                this.said.text_clear(this.said);
                this.fondue_sortie(this.said);
                setTimeout(() => {
                  this.said.destroy();
                }, 4000);
              }, 4000);
            }, 5000);
          }, 5000);
        }, 5000);
      }, 5000);
    }, 5000);
  }
}
export default Scene2;
