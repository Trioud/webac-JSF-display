import Player from "../components/Player.js";
import Pnj from "../components/Pnj.js";
import Question from "../components/Question.js";

class Samsung extends Phaser.Scene {
  constructor() {
    super("Samsung");
    this.compteur = 0;
  }
  preload() {
    this.load.image("hell", "dylan/assets/hell.jpeg");
    this.load.image("platform", "dylan/assets/deco/platform.png");
    this.load.spritesheet("dude", "dylan/assets/perso/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Samsung", "dylan/assets/perso/Samsung.png", {
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

    this.Samsung = new Pnj(this, 1000, 800, "Samsung");
    this.physics.add.collider(this.Samsung, this.platforms);

    setTimeout(() => {
      this.Samsung.text(
        this,
        this.Samsung,
        "Bien nous allons commencer l'entretien, tu n'auras qu'a cliquer sur la bonne reponse, en cas de faute tu perdras 60 points de vie !"
      );
      setTimeout(() => {
        this.Samsung.text(this, this.Samsung, "Bonne chance.");
        setTimeout(() => {
          this.affichage_question(this.compteur);
        }, 2000);
      }, 3000);
    }, 2000);

    this.question = [
      "Quel sélecteur CSS cible un élément avec l'ID spécifique 'menu' ?",
      "Quelle est la différence entre '=='' et '===' en JavaScript ?",
      "Quel est l'avantage principal de l'utilisation des fonctions fléchées (Arrow functions) en JavaScript ?",
      "Quelle méthode HTTP est idéalement utilisée pour envoyer des données sensibles, telles que des mots de passe ?",
      "Qu'est-ce que la programmation fonctionnelle ?",
      "Quel est le concept de 'Polymorphisme' en programmation orientée objet ?",
      "En base de données, que signifie l'acronyme ACID ?",
      "Qu'est-ce que le CORS en développement web ?",
      "Quelle est la commande pour fusionner une branche dans une autre avec Git ?",
      "Quelle est la principale caractéristique de React par rapport à d'autres bibliothèques ou frameworks frontend ?",
    ];
    this.answer1 = [
      ".menu",
      "'==' compare uniquement les valeurs, '===' compare les valeurs et les types",
      "Syntaxe plus courte et pas de liaison de 'this'",
      "GET",
      "Un style de programmation qui traite le calcul comme l'évaluation de fonctions mathématiques",
      "La capacité d'une fonction à exécuter différentes tâches",
      "Atomicity, Consistency, Isolation, Durability",
      "Un mécanisme qui permet de partager des ressources entre différents domaines",
      "git merge",
      "Son architecture basée sur les composants",
    ];
    this.answer2 = [
      "#menu",
      "'==' convertit les types de données, '===' ne le fait pas",
      "Elles peuvent être utilisées comme méthodes de constructeur",
      "POST",
      "Programmation en utilisant exclusivement des fonctions d'ordre supérieur",
      "La capacité d'un langage de programmation à traiter les objets de manière différente selon leur type ou classe",
      "Authentication, Code, Integrity, Data",
      "Une politique de sécurité appliquée par les navigateurs web pour limiter les requêtes HTTP",
      "git branch",
      "Son moteur de rendu virtuel pour améliorer les performances",
    ];
    this.answer3 = [
      "menu",
      "'==' peut être utilisé pour toutes les comparaisons, '===' est pour les types spécifiques",
      "Elles ne peuvent pas être utilisées avec 'new'",
      "PUT",
      "L'utilisation de fonctions pures et l'évitement des données mutables",
      "Un principe qui permet à différentes classes d'utiliser des méthodes qui portent le même nom",
      "Atomic, Consistent, Isolated, Durable",
      "Un protocole pour sécuriser les communications entre navigateurs et serveurs",
      "git checkout",
      "L'utilisation intensive de JSX",
    ];
    this.answer4 = [
      ":menu",
      "Il n'y a pas de différence; ils sont interchangeables",
      "Elles permettent une meilleure performance à l'exécution",
      "DELETE",
      "Une méthode pour résoudre des problèmes de programmation en évitant les états partagés",
      "La méthode par laquelle un objet peut prendre plusieurs formes",
      "Availability, Consistency, Isolation, Durability",
      "Une spécification pour le chargement asynchrone de JavaScript",
      "git commit",
      "Sa compatibilité avec toutes les versions d'Internet Explorer",
    ];
    this.good_answer = [
      "#menu",
      "'==' compare uniquement les valeurs, '===' compare les valeurs et les types",
      "Syntaxe plus courte et pas de liaison de 'this'",
      "POST",
      "L'utilisation de fonctions pures et l'évitement des données mutables",
      "La méthode par laquelle un objet peut prendre plusieurs formes",
      "Atomicity, Consistency, Isolation, Durability",
      "Une politique de sécurité appliquée par les navigateurs web pour limiter les requêtes HTTP",
      "git merge",
      "Son moteur de rendu virtuel pour améliorer les performances",
    ];
  }

  reponse_callback = (_response, _goodanswer) => {
    if (_response == _goodanswer) {
      this.Samsung.text(
        this,
        this.Samsung,
        "La reponse etais bien " + _goodanswer
      );
    } else {
      this.Samsung.text(
        this,
        this.Samsung,
        "Faux ! la reponse etais " + _goodanswer
      );
      setTimeout(() => {
        this.Samsung.text(
          this,
          this.Samsung,
          "Tu perds donc 60 point de vie MOUHAHA !"
        );
      }, 2000);
      this.player.set_vie(-60);
    }
    if (this.player.vie < 0) {
      this.game_over();
      return;
    }

    setTimeout(() => {
      this.Samsung.text_clear(this.Samsung);
      this.Samsung.text_clear(this.player);
      this.compteur++;
      if (this.compteur == 10) {
        this.Samsung.text(
          this,
          this.Samsung,
          "Bel entretien, rejoins notre équipe !"
        );
        this.player.force++;
        setTimeout(() => {
          this.scene.stop("Google");
          this.scene.start("Scene2");
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
    var backgroundImage = this.add.image(0, 0, "hell").setOrigin(0, 0);
    backgroundImage.displayWidth = this.sys.game.config.width;
    backgroundImage.displayHeight = this.sys.game.config.height;
  }

  game_over() {
    this.Samsung.text(
      this,
      this.Samsung,
      "Tu n'as plus de points de vie ! GAME OVER"
    );
    setTimeout(() => {
      this.Samsung.text_clear(this.Samsung);
      this.player.text(this, this.player, "Aie je n'est plus de vie...");
      setTimeout(() => {
        this.scene.stop("Samsung");
        this.scene.start("Scene2");
      }, 2000);
    }, 2000);
  }
}
export default Samsung;
