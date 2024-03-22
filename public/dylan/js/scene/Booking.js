import Player from "../components/Player.js";
import Pnj from "../components/Pnj.js";
import Question from "../components/Question.js";

class Booking extends Phaser.Scene {
  constructor() {
    super("Booking");
    this.compteur = 0;
  }
  preload() {
    this.load.image("combat", "dylan/assets/combat.jpg");
    this.load.image("platform", "dylan/assets/deco/platform.png");
    this.load.spritesheet("dude", "dylan/assets/perso/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Booking", "dylan/assets/perso/Booking.png", {
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

    this.Booking = new Pnj(this, 1000, 800, "Booking");
    this.physics.add.collider(this.Booking, this.platforms);

    setTimeout(() => {
      this.Booking.text(
        this,
        this.Booking,
        "Bien nous allons commencer l'entretien, tu n'auras qu'a cliquer sur la bonne reponse, en cas de faute tu perdras 40 points de vie !"
      );
      setTimeout(() => {
        this.Booking.text(
          this,
          this.Booking,
          "Bonne chance a toi Devellopeur, que le sort puisse t'être favorable"
        );
        setTimeout(() => {
          this.affichage_question(this.compteur);
        }, 2000);
      }, 3000);
    }, 2000);

    this.question = [
      "Quel langage n'est pas orienté objet par défaut ?",
      "Que signifie l'acronyme API ?",
      "À quoi sert le CSS ?",
      "Quelle est la syntaxe correcte pour commenter une ligne en JavaScript ?",
      "Qu'est-ce que jQuery ?",
      "Lequel n'est pas un système de gestion de base de données ?",
      "Quel langage est principalement utilisé pour les scripts côté serveur ?",
      "Quel protocole est utilisé pour sécuriser les transferts de données sur le web ?",
      "Quel est le rôle principal de Docker ?",
      "Lequel n'est pas un outil de versioning de code ?",
    ];
    this.answer1 = [
      "Java",
      "Application Programming Interface",
      "Structurer le contenu d'une page web",
      "// Ceci est un commentaire",
      "Un langage de programmation",
      "MySQL",
      "JavaScript",
      "HTTP",
      "Créer des conteneurs pour applications",
      "Git",
    ];
    this.answer2 = [
      "Python",
      "Automated Public Interface",
      "Styliser les éléments d'une page web",
      "/* Ceci est un commentaire */",
      "Une bibliothèque JavaScript",
      "Oracle",
      "Python",
      "HTTPS",
      "Compiler des programmes",
      "Subversion",
    ];
    this.answer3 = [
      "C",
      "Advanced Programming Interface",
      "Animer les éléments d'une page web",
      "<!-- Ceci est un commentaire -->",
      "Un framework CSS",
      "PostgreSQL",
      "PHP",
      "FTP",
      "Gérer les versions d'un projet",
      "Mercurial",
    ];
    this.answer4 = [
      "HTML",
      "Application Performance Indicator",
      "Créer des applications mobiles",
      "# Ceci est un commentaire",
      "Un outil de versioning de code",
      "React",
      "Ruby",
      "SSH",
      "Optimiser le SEO de sites web",
      "Docker",
    ];
    this.good_answer = [
      "HTML",
      "Application Programming Interface",
      "Styliser les éléments d'une page web",
      "// Ceci est un commentaire",
      "Une bibliothèque JavaScript",
      "React",
      "PHP",
      "HTTPS",
      "Créer des conteneurs pour applications",
      "Docker",
    ];
  }

  reponse_callback = (_response, _goodanswer) => {
    if (_response == _goodanswer) {
      this.Booking.text(
        this,
        this.Booking,
        "La reponse etais bien " + _goodanswer
      );
    } else {
      this.Booking.text(
        this,
        this.Booking,
        "Faux ! la reponse etais " + _goodanswer
      );
      setTimeout(() => {
        this.Booking.text(
          this,
          this.Booking,
          "Tu perds donc 40 points de vie MOUHAHA !"
        );
      }, 2000);
      this.player.set_vie(-40);
    }
    if (this.player.vie < 0) {
      this.game_over();
      return;
    }

    if (this.compteur == 5 && this.player.bonus == "Eloquance") {
      this.player.text(
        this,
        this.player,
        "Je vous remercie pour cet entretien dont je me délecte."
      );
      setTimeout(() => {
        this.player.text_clear(this.player);
        this.Booking.text(this, this.Booking, "Quelle éloquence !");
        setTimeout(() => {
          this.Booking.text(
            this,
            this.player,
            "Yes, je gagne 30 points de vie."
          );
          this.player.set_vie(30);
        }, 3000);
      }, 2000);
    }

    setTimeout(() => {
      this.Booking.text_clear(this.Booking);
      this.Booking.text_clear(this.player);
      this.compteur++;
      if (this.compteur == 10) {
        this.Booking.text(
          this,
          this.Booking,
          "Tu m'as convaincu ! Bien joué à toi... Bienvenue dans l'équipe."
        );
        this.player.force++;
        setTimeout(() => {
          this.scene.stop("Google");
          this.scene.start("Scene6", {
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
    this.Booking.text(
      this,
      this.Booking,
      "Tu n'as plus de points de vie ! GAME OVER"
    );
    setTimeout(() => {
      this.Booking.text_clear(this.Booking);
      this.player.text(this, this.player, "Aie je n'est plus de vie...");
      setTimeout(() => {
        this.scene.stop("Booking");
        this.scene.start("Scene2");
      }, 2000);
    }, 2000);
  }
}
export default Booking;
