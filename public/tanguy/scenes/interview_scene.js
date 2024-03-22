// scenes/interview_scene.js

import { SCENE_KEYS, __dirname } from "./scene_keys.js";
import { Character } from "../character.js";
import { DialogManager } from "../dialog.js";
import { recruiterCharacters } from "../characters/recruiterCharacters.js";
import { dataQuestions } from "../data/dataQuestions.js";
import { dataAnswers } from "../data/dataAnswers.js";

export class InterviewScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.INTERVIEW_SCENE });

    this.jobOffer = null;
    this.mainChar = null;
    this.counter = null;
    this.personalQuestions = null;
    this.technicalQuestions = null;
    this.modeDifficult = null;
    this.questionsToShow = [];
    this.answerDialogs = [];
  }

  preload() {
    this.load.image("interview-ground", `tanguy/assets/map/interview-room.png`);
    this.load.image("col", `tanguy/assets/map/col.png`);

    recruiterCharacters.forEach((recruiter) => {
      this.load.image(recruiter.company, recruiter.logo);
    });

    Character.preload(this);
  }

  create(data) {
    let mainCharData = data.mainCharData;
    this.jobOffer = data.jobData;
    this.modeDifficult = data.gameMode;
    this.counter = data.counter;

    // this.modeDifficult = true;

    // console.log(jobOffer);
    // console.log(mainCharData);
    // console.log(mainCharData.name + mainCharData.health);

    this.add.image(0, 0, "interview-ground").setOrigin(0, 0).setDepth(0);

    this.mainChar = new Character(
      this,
      0,
      this.sys.game.config.height - 270,
      mainCharData.name,
      "right"
    );
    // this.mainChar = new Character(this, 0, this.sys.game.config.height - 270, 'Tanguy', 'right');
    this.mainChar.setDepth(2);
    this.mainChar.setScale(2);
    this.mainChar.setAlpha(0);
    this.physics.world.enable(this.mainChar);
    this.mainChar.body.setCollideWorldBounds(true);
    this.mainChar.horizontalControlsEnabled = true;
    this.mainChar.verticalControlsEnabled = true;
    this.mainChar.controlsEnabled = true;
    this.makeTweens(this.mainChar, 1);

    this.mainChar.health = mainCharData.health;
    this.mainChar.vulnerability = mainCharData.vulnerability;
    this.mainChar.skills = mainCharData.skills;

    // const recruiterData = recruiterCharacters.find(recruiter => recruiter.company === 'Naval Group');
    const recruiterData = recruiterCharacters.find(
      (recruiter) => recruiter.company === this.jobOffer.company
    );
    this.recruiter = new Character(
      this,
      600,
      400,
      recruiterData.name,
      recruiterData.initial_face
    );
    this.recruiter.setDepth(1);
    this.recruiter.setScale(2);
    this.recruiter.setAlpha(0);
    this.physics.world.enable(this.recruiter);
    this.recruiter.setImmovable(true);
    this.recruiter.body.setCollideWorldBounds(true);
    this.makeTweens(this.recruiter, 1);

    this.recruiter.health = recruiterData.health;

    this.add
      .image(500, 550, recruiterData.company)
      .setScale(1)
      .setDepth(1)
      .setRotation(0.5);

    this.dialogManager = new DialogManager(this);
    this.recruiterDialog = this.dialogManager.showDialog(
      -20,
      50,
      this.recruiter,
      `Bonjour, je suis ${this.recruiter.name} de\n${this.recruiter.company}. Mettez-vous à l'aise.\nNous allons commencer\ndans quelques instants.`
    );

    this.input.keyboard.once("keyup-SPACE", () => {
      this.recruiterDialog.hideDialog();

      // this.recruiterDialog = this.dialogManager.showDialog(-20, 50, this.recruiter, `Bien, commençons.\nVous avez postulé pour le poste\nde ${dataJobs[0].title}.\n\nAppuyez sur [Espace] pour continuer.`);
      this.recruiterDialog = this.dialogManager.showDialog(
        -20,
        50,
        this.recruiter,
        `Bien, commençons.\nVous avez postulé pour le poste\nde ${this.jobOffer.title}.\n\nAppuyez sur [Espace] pour continuer.`
      );

      this.input.keyboard.once("keyup-SPACE", () => {
        this.handleFirstEvent();
      });
    });

    this.platforms = this.physics.add.staticGroup();
    const platformCoordinates = [
      [30, 400],
      [80, 380],
      [130, 360],
      [180, 330],
      [230, 300],
      [280, 280],
      [320, 260],
      [380, 240],
      [410, 220],
      [410, 280],
      [420, 320],
      [470, 350],
      [520, 380],
      [570, 410],
      [570, 440],
      [630, 440],
      [700, 460],
      [750, 480],
      [810, 510],
      [850, 560],
      [830, 600],
      [770, 630],
      [710, 660],
      [650, 690],
      [590, 720],
      [500, 720],
      [440, 690],
      [380, 660],
      [320, 630],
      [260, 600],
      [190, 570],
      [130, 540],
      [70, 510],
      [10, 500],
    ];
    platformCoordinates.forEach((coord) => {
      this.platforms
        .create(coord[0], coord[1], "col")
        .setScale(0.7)
        .refreshBody();
    });

    this.physics.add.collider(this.mainChar, this.platforms);

    this.add
      .rectangle(500, 20, this.sys.game.config.width, 55, 0x000)
      .setDepth(0);
    this.modeText = this.add.text(
      10,
      10,
      `${this.modeDifficult ? "Mode difficile" : "Mode facile"}`,
      { fontSize: "32px", fill: "#fff" }
    );

    this.mainResult = this.add.text(
      570,
      150,
      `${this.mainChar.name}\n\n` +
        `${this.mainChar.health} / 100\n` +
        `${this.mainChar.vulnerability}\n`,
      { fontSize: "20px", fill: "#fff" }
    );
    this.mainResult.setRotation(0.4);

    this.recruiterResult = this.add.text(
      750,
      230,
      `${this.recruiter.name}\n\n` + `${this.recruiter.health} / 100`,
      { fontSize: "20px", fill: "#fff" }
    );
    this.recruiterResult.setRotation(0.4);

    this.add.text(
      30,
      this.sys.game.config.width - 320,
      "Appuyez sur [Espace] dès que vous êtes prêts à lancer l'entretien.",
      { fontSize: "18px", fill: "#fff" }
    );

    this.physics.add.collider(this.mainChar, this.recruiter);

    const questionData = dataQuestions.find(
      (question) => question.company === this.jobOffer.company
    );
    const answersData = dataAnswers.find(
      (answer) => answer.character === this.mainChar.name
    );

    // const questionData = dataQuestions.find(question => question.company === 'Voyage Privé');
    // const answersData = dataAnswers.find(answer => answer.character === 'Tanguy');

    this.personalQuestions = questionData.personnal_questions.map(
      (question) => {
        const personalAnswers = answersData.personal_answers.filter(
          (answer) => answer.id_question === question.id
        );
        return {
          question: question.question,
          malus: personalAnswers.map((answer) => answer.malus),
          answers: personalAnswers.map((answer) => answer.answer),
          vulnerability: personalAnswers.map((answer) => answer.vulnerability),
        };
      }
    );

    this.technicalQuestions = questionData.technical_questions.map(
      (question) => {
        const technicalAnswers = answersData.technical_answers.filter(
          (answer) => answer.id_question === question.id
        );
        return {
          question: question.question,
          malus: technicalAnswers.map((answer) => answer.malus),
          answers: technicalAnswers.map((answer) => answer.answer),
          vulnerability: technicalAnswers.map((answer) => answer.vulnerability),
        };
      }
    );

    // console.log(this.personalQuestions);
    // console.log(this.technicalQuestions);
  }

  update() {
    this.mainChar.update();
  }

  async handleFirstEvent() {
    this.recruiterDialog.hideDialog();

    this.questionsToShow = this.personalQuestions.concat(
      this.technicalQuestions
    );

    while (this.questionsToShow.length > 0) {
      // console.log(this.questionsToShow);
      const questionObject = this.questionsToShow.shift();
      await this.showQuestion(questionObject);
    }

    // console.log('Fin de l\'entretien');
  }

  showQuestion(questionObject) {
    return new Promise((resolve) => {
      if (this.questionDialog) {
        this.questionDialog.hideDialog();
      }

      // console.log(questionObject.answers);

      this.answerDialog = this.dialogManager.showAnswersResults(
        questionObject.answers
      );
      this.questionDialog = this.dialogManager.showDialog(
        -20,
        50,
        this.recruiter,
        `${questionObject.question}`
      );

      const spaceKeyListener = () => {
        // console.log(this.dialogManager.selectedAnswer);
        // console.log(questionObject.malus[this.dialogManager.selectedAnswer]);

        if (this.dialogManager.selectedAnswer !== null) {
          const malus = questionObject.malus[this.dialogManager.selectedAnswer];
          console.log(malus);

          if (this.modeDifficult === true) {
            switch (malus) {
              case -1:
                this.mainChar.health -= 4;
                this.mainChar.vulnerability ===
                questionObject.vulnerability[this.dialogManager.selectedAnswer]
                  ? (this.mainChar.health -= 2)
                  : null;
                break;
              case 1:
                this.recruiter.health -= 4;
                this.mainChar.health -= 5;
                this.mainChar.vulnerability ===
                questionObject.vulnerability[this.dialogManager.selectedAnswer]
                  ? (this.mainChar.health -= 2)
                  : null;
                break;
              case 2:
                this.recruiter.health -= 7;
                this.mainChar.vulnerability ===
                questionObject.vulnerability[this.dialogManager.selectedAnswer]
                  ? (this.mainChar.health -= 0)
                  : null;
                break;
            }
          } else {
            switch (malus) {
              case -1:
                this.mainChar.health -= 2;
                this.mainChar.vulnerability ===
                questionObject.vulnerability[this.dialogManager.selectedAnswer]
                  ? (this.mainChar.health -= 2)
                  : null;
                break;
              case 1:
                this.recruiter.health -= 2;
                this.mainChar.health -= 3;
                this.mainChar.vulnerability ===
                questionObject.vulnerability[this.dialogManager.selectedAnswer]
                  ? (this.mainChar.health -= 1)
                  : null;
                break;
              case 2:
                this.recruiter.health -= 5;
                this.mainChar.vulnerability ===
                questionObject.vulnerability[this.dialogManager.selectedAnswer]
                  ? (this.mainChar.health -= 1)
                  : null;
                break;
            }
          }

          this.mainResult.setText(
            `${this.mainChar.name}\n\n${this.mainChar.health} / 100\n${this.mainChar.vulnerability}\n`
          );
          this.recruiterResult.setText(
            `${this.recruiter.name}\n\n${this.recruiter.health} / 100`
          );

          this.answerDialog.hideDialog();
          this.questionDialog.hideDialog();
          this.input.keyboard.off("keyup-SPACE", spaceKeyListener);
          resolve(questionObject.answers[this.dialogManager.selectedAnswer]);

          this.dialogManager.selectedAnswer = null;

          if (this.mainChar.health <= 0) {
            this.time.delayedCall(2000, () => {
              this.scene.start(SCENE_KEYS.LOSE_SCENE, {
                loseData: {
                  title: this.jobOffer.title,
                  company: this.jobOffer.company,
                  mainCharScore: this.mainChar.health,
                  recruiterScore: this.recruiter.health,
                },
                mainChar: {
                  name: this.mainChar.name,
                  health: this.mainChar.health,
                  vulnerability: this.mainChar.vulnerability,
                },
                counter: this.counter,
              });
            });
          } else if (this.recruiter.health <= 0) {
            this.time.delayedCall(2000, () => {
              this.scene.start(SCENE_KEYS.WIN_SCENE, {
                winData: {
                  title: this.jobOffer.title,
                  company: this.jobOffer.company,
                  mainCharScore: this.mainChar.health,
                  recruiterScore: this.recruiter.health,
                },
                mainChar: {
                  name: this.mainChar.name,
                  health: this.mainChar.health,
                  vulnerability: this.mainChar.vulnerability,
                },
                counter: this.counter,
              });
            });
          } else if (
            this.questionsToShow.length === 0 &&
            this.mainChar.health < this.recruiter.health
          ) {
            this.time.delayedCall(2000, () => {
              this.scene.start(SCENE_KEYS.LOSE_SCENE, {
                loseData: {
                  title: this.jobOffer.title,
                  company: this.jobOffer.company,
                  mainCharScore: this.mainChar.health,
                  recruiterScore: this.recruiter.health,
                },
                mainChar: {
                  name: this.mainChar.name,
                  health: this.mainChar.health,
                  vulnerability: this.mainChar.vulnerability,
                },
                counter: this.counter,
              });
            });
          } else if (
            this.questionsToShow.length === 0 &&
            (this.mainChar.health > this.recruiter.health ||
              this.mainChar.health === this.recruiter.health)
          ) {
            this.time.delayedCall(2000, () => {
              this.scene.start(SCENE_KEYS.WIN_SCENE, {
                winData: {
                  title: this.jobOffer.title,
                  company: this.jobOffer.company,
                  mainCharScore: this.mainChar.health,
                  recruiterScore: this.recruiter.health,
                },
                mainChar: {
                  name: this.mainChar.name,
                  health: this.mainChar.health,
                  vulnerability: this.mainChar.vulnerability,
                },
                counter: this.counter,
              });
            });
          }
        }
      };

      this.input.keyboard.on("keyup-SPACE", spaceKeyListener);
    });
  }

  makeTweens(character, alpha) {
    this.tweens.add({
      targets: character,
      alpha: alpha,
      ease: "Linear",
      duration: 1500,
      onComplete: () => {
        if (alpha == 0) {
          character.die();
        }
      },
    });
  }
}
