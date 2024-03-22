import Player from "../components/Player.js";
import Pnj from "../components/Pnj.js";
import Question from "../components/Question.js";

class Netflix extends Phaser.Scene {
  constructor() {
    super("Netflix");
    this.compteur = 0;
  }
  preload() {
    this.load.image("combat", "dylan/assets/combat.jpg");
    this.load.image("platform", "dylan/assets/deco/platform.png");
    this.load.spritesheet("dude", "dylan/assets/perso/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Netflix", "dylan/assets/perso/Netflix.png", {
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

    this.Netflix = new Pnj(this, 1000, 800, "Netflix");
    this.physics.add.collider(this.Netflix, this.platforms);

    setTimeout(() => {
      this.Netflix.text(
        this,
        this.Netflix,
        "Bien, nous allons commencer l'entretien. Tu n'auras qu'à cliquer sur la bonne réponse. En cas de faute, tu perdras 20 points de vie !"
      );
      setTimeout(() => {
        this.Netflix.text(
          this,
          this.Netflix,
          "Bonne chance à toi, développeur. Que le sort te soit favorable."
        );
        setTimeout(() => {
          this.Netflix.text_clear(this.Netflix);
          this.affichage_question(this.compteur);
        }, 3000);
      }, 3000);
    }, 3000);

    this.question = [
      "Quelle propriété CSS définit la couleur de fond d'un élément ?",
      "En programmation, quelle structure de contrôle permet d'exécuter des instructions différentes selon des conditions ?",
      "Qu'est-ce qu'un algorithme ?",
      "Comment ajouter un commentaire sur une seule ligne en Python ?",
      "Quel est le principal usage de Node.js ?",
      "Quel type de données n'est pas primitif en JavaScript ?",
      "Lequel de ces éléments est une méthode de l'objet Array en JavaScript ?",
      "Quelle commande Git permet de cloner un dépôt ?",
      "À quoi sert le protocole HTTP ?",
      "Lequel n'est pas un principe de la programmation orientée objet ?",
    ];
    this.answer1 = [
      "color",
      "If",
      "Une suite d'instructions pour résoudre un problème",
      "// C'est un commentaire",
      "Création de sites web dynamiques côté serveur",
      "Boolean",
      ".push()",
      "git clone",
      "Envoyer des emails",
      "Héritage",
    ];
    this.answer2 = [
      "background-color",
      "Switch",
      "Un outil de développement web",
      "# C'est un commentaire",
      "Modification d'images et de vidéos",
      "String",
      ".sort()",
      "git commit",
      "Transférer des fichiers",
      "Polymorphisme",
    ];
    this.answer3 = [
      "font-color",
      "Loop",
      "Une fonction spécifique à JavaScript",
      "/* C'est un commentaire */",
      "Création d'applications mobiles natives",
      "Number",
      ".slice()",
      "git pull",
      "Permettre la navigation sur le web",
      "Encapsulation",
    ];
    this.answer4 = [
      "border-color",
      "Function",
      "Un type de données en programmation",
      "''' C'est un commentaire '''",
      "Création d'animations web complexes",
      "Object",
      ".reduce()",
      "git push",
      "Crypter les données",
      "Globalisation",
    ];
    this.good_answer = [
      "background-color",
      "If",
      "Une suite d'instructions pour résoudre un problème",
      "# C'est un commentaire",
      "Création de sites web dynamiques côté serveur",
      "Object",
      ".push()",
      "git clone",
      "Permettre la navigation sur le web",
      "Globalisation",
    ];
  }

  reponse_callback = (_response, _goodanswer) => {
    if (_response == _goodanswer) {
      this.Netflix.text(
        this,
        this.Netflix,
        "La reponse étais bien " + _goodanswer
      );
    } else {
      this.Netflix.text(
        this,
        this.Netflix,
        "Faux ! la reponse étais " + _goodanswer
      );
      setTimeout(() => {
        this.Netflix.text(
          this,
          this.Netflix,
          "Tu perds donc 40 points de vie MOUHAHA !"
        );
      }, 2000);
      this.player.set_vie(-40);
    }
    if (this.player.vie < 0) {
      this.game_over();
      return;
    }

    if (this.compteur == 5 && this.player.bonus == "Acharner") {
      this.player.text(this, this.player, "Je veux toujours plus !");
      setTimeout(() => {
        this.player.text_clear(this.player);
        this.Netflix.text(this, this.Netflix, "Bon état d'esprit !");
        setTimeout(() => {
          this.Netflix.text(
            this,
            this.player,
            "Yes, je gagne 30 points de vie."
          );
          this.player.set_vie(30);
        }, 3000);
      }, 2000);
    }

    setTimeout(() => {
      this.Netflix.text_clear(this.Netflix);
      this.Netflix.text_clear(this.player);
      this.compteur++;
      if (this.compteur == 10) {
        this.Netflix.text(
          this,
          this.Netflix,
          "Je te propose de rejoindre mon équipe quand tu veux... Tu m'as convaincu."
        );
        this.player.force++;
        setTimeout(() => {
          this.scene.stop("Google");
          this.scene.start("Scene7", {
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
    this.Netflix.text(
      this,
      this.Netflix,
      "Tu n'as plus de points de vie ! GAME OVER"
    );
    setTimeout(() => {
      this.Netflix.text_clear(this.Netflix);
      this.player.text(this, this.player, "Aie je n'est plus de vie...");
      setTimeout(() => {
        this.scene.stop("Netflix");
        this.scene.start("Scene2");
      }, 2000);
    }, 2000);
  }
}
export default Netflix;
