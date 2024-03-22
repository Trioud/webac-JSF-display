import Player from "../components/Player.js";
import Pnj from "../components/Pnj.js";
import Question from "../components/Question.js";

class Google extends Phaser.Scene {
  constructor() {
    super("Google");
    this.compteur = 0;
  }
  preload() {
    this.load.image("combat", "dylan/assets/combat.jpg");
    this.load.image("platform", "dylan/assets/deco/platform.png");
    this.load.spritesheet("dude", "dylan/assets/perso/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Google", "dylan/assets/perso/Google.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(data) {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fullscreen();

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

    this.Google = new Pnj(this, 1000, 800, "Google");
    this.physics.add.collider(this.Google, this.platforms);

    setTimeout(() => {
      this.Google.text(
        this,
        this.Google,
        "Bien nous allons commencer l'entretien, tu n'auras qu'a cliquer sur la bonne reponse, en cas de faute tu perdras 30 points de vie !"
      );
      setTimeout(() => {
        this.Google.text(
          this,
          this.Google,
          "Bonne chance a toi jeune candidat, que le sort puisse t'être favorable"
        );
        setTimeout(() => {
          this.affichage_question(this.compteur);
        }, 2000);
      }, 3000);
    }, 2000);

    this.question = [
      "Quel framework n'est pas utilisé en JavaScript ?",
      "Quelle est la signification de l'acronyme MVC ?",
      "Que signifie l'acronyme PHP ?",
      "Comment déclare-t-on une variable en JavaScript ?",
      "Node.js est-il considéré comme un framework ?",
      "Lequel n'est pas un langage de programmation ?",
      "Lequel est le langage de programmation de plus bas niveau ?",
      "Laquelle de ces techniques n'existe pas en cybersécurité ?",
      "Comment se nomme la meilleure école de technologie ?",
      "Lequel n'est pas un framework PHP ?",
    ];
    this.answer1 = [
      "React.js",
      "Model Versus Controller",
      "HyperText Preprocessor",
      "let variable = valeur;",
      "Oui, c'est un framework.",
      "PHP",
      "Assembleur",
      "OSINT",
      "Epitech",
      "Laravel",
    ];
    this.answer2 = [
      "Laravel",
      "Model View Controller",
      "Programme d'Hexperience de Programmation",
      "var variable = valeur;",
      "Non, c'est un environnement d'exécution.",
      "Ruby",
      "PHP",
      "Reverse Engineering",
      "42",
      "Symfony",
    ];
    this.answer3 = [
      "Next.js",
      "Modélisation Virtuelle Controller",
      "Processor Hexa Ping",
      "const variable = valeur;",
      "Non, c'est un serveur.",
      "Pascal",
      "C++",
      "DDoS",
      "La Plateforme",
      "CakePHP",
    ];
    this.answer4 = [
      "Angular",
      "Must View Controller",
      "Primal Hyper Ping",
      "variable = valeur;",
      "Non, c'est une plateforme.",
      "React",
      "Java",
      "Le spying",
      "Digital School",
      "Angular",
    ];
    this.good_answer = [
      "Laravel",
      "Model View Controller",
      "HyperText Preprocessor",
      "const variable = valeur;",
      "Non, c'est un environnement d'exécution.",
      "React",
      "Assembleur",
      "Le spying",
      "Epitech",
      "Angular",
    ];
  }

  reponse_callback = (_response, _goodanswer) => {
    if (_response == _goodanswer) {
      this.Google.text(
        this,
        this.Google,
        "La reponse etais bien " + _goodanswer
      );
    } else {
      this.Google.text(
        this,
        this.Google,
        "Faux ! la reponse etais " + _goodanswer
      );
      setTimeout(() => {
        this.Google.text(
          this,
          this.Google,
          "Tu perd donc 30 point de vie MOUHAHA !"
        );
      }, 2000);
      this.player.set_vie(-30);
    }
    if (this.player.vie < 0) {
      this.game_over();
      return;
    }

    if (this.compteur == 5 && this.player.malus == "Dissiper") {
      this.player.text(this, this.player, "Oh un papillon ! ");
      setTimeout(() => {
        this.player.text_clear(this.player);
        this.Google.text(
          this,
          this.Google,
          "Vous êtes distrait à ce que je vois..."
        );
        setTimeout(() => {
          this.player.text(
            this,
            this.player,
            "Mince... Je perds 30 points de vie."
          );
          this.player.set_vie(-30);
          setTimeout(() => {
            this.player.text_clear(this.player);
          }, 3000);
        }, 3000);
      }, 2000);
    }

    setTimeout(() => {
      this.Google.text_clear(this.Google);
      this.player.text_clear(this.player);
      this.compteur++;
      if (this.compteur == 10) {
        this.Google.text(
          this,
          this.Google,
          "Tu m'as convaincu ! Bien joué à toi... Tu as décroché une proposition d'alternance."
        );
        this.player.force++;
        setTimeout(() => {
          this.scene.stop("Google");
          this.scene.start("Scene5", {
            vie: this.player.vie,
            force: this.player.force,
            bonus: this.player.bonus,
            malus: this.player.malus,
          });
          return;
        }, 5000);
      }
      this.affichage_question();
    }, 4000);
  };

  affichage_question = () => {
    this.question_affichage = new Question(
      this,
      this.question[this.compteur],
      this.answer1[this.compteur],
      this.answer2[this.compteur],
      this.answer3[this.compteur],
      this.answer4[this.compteur],
      this.good_answer[this.compteur],
      this.reponse_callback
    );
  };

  update() {
    this.player.move(this.cursors);
    this.player.update_stats();
  }

  fullscreen() {
    var backgroundImage = this.add.image(0, 0, "combat").setOrigin(0, 0);
    backgroundImage.displayWidth = this.sys.game.config.width;
    backgroundImage.displayHeight = this.sys.game.config.height;
  }

  game_over() {
    this.Google.text(
      this,
      this.Google,
      "Tu n'as plus de points de vie ! GAME OVER"
    );
    setTimeout(() => {
      this.Google.text_clear(this.Google);
      this.player.text(this, this.player, "Aie je n'est plus de vie...");
      setTimeout(() => {
        this.scene.stop("Google");
        this.scene.start("Scene2");
      }, 2000);
    }, 2000);
  }
}
export default Google;
