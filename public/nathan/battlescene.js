export default class BattleScene extends Phaser.Scene {
  constructor() {
    super("BattleScene");
    this.pnjText = null;
    this.currentIntroductionIndex = 0;
    this.pnjQuestions = null;
    this.currentQuestionIndex = 0;
    this.pnjintro = null;
    this.optionsContainer = null;
    this.optionsButtons = [];
    this.endPhrase = "";
  }

  preload() {
    this.load.image("font", "nathan/assets/battlescene.png");
  }

  create(data) {
    let bg = this.add.image(770, 350, "font");
    bg.setScale(
      Math.max(window.innerWidth / bg.width, window.innerHeight / bg.height)
    );

    const player = data.player;
    const collidedPNJ = data.collidedPNJ;
    console.log(collidedPNJ);

    const endPhrase = collidedPNJ.endPhrase[0];
    console.log(endPhrase);

    // Affecter la valeur de endPhrase à la propriété de classe endPhrase
    this.endPhrase = endPhrase;

    const playerImage = this.add
      .image(400, 600, player.texture.key)
      .setScale(4);
    const pnjImage = this.add
      .image(1100, 300, collidedPNJ.texture.key)
      .setScale(4);

    const bubbleX = pnjImage.x - 230;
    const bubbleY = pnjImage.y - pnjImage.displayHeight / 2 - 170;

    const bubblePNJQuestion = this.add.graphics();
    bubblePNJQuestion.fillStyle(0xffffff, 1);
    bubblePNJQuestion.lineStyle(2, 0x000000, 1);
    bubblePNJQuestion.strokeRoundedRect(bubbleX, bubbleY, 500, 100, 10);
    bubblePNJQuestion.fillRoundedRect(bubbleX, bubbleY, 500, 100, 10);

    const style2 = {
      font: "16px Arial",
      fill: "#000000",
      align: "left",
      wordWrap: { width: 480 },
    };
    this.pnjText = this.add.text(bubbleX + 20, bubbleY + 20, "", style2);
    this.pnjText.setOrigin(0);

    this.pnjQuestions = collidedPNJ.questions;
    this.currentQuestionIndex = 0;

    this.pnjintro = collidedPNJ.introductionPhrases;
    this.currentIntroductionIndex = 0;

    this.player = player;
    this.pnj = collidedPNJ;

    this.playerHPText = this.add.text(
      200,
      600,
      `${player.texture.key.toUpperCase()} \nHP : ${player.hp}`,
      style2
    );
    this.pnjHPText = this.add.text(
      950,
      300,
      `${collidedPNJ.texture.key.toUpperCase()} \nHP : ${collidedPNJ.hp}`,
      style2
    );

    this.displayNextIntroduction();

    this.input.keyboard.on("keydown-SPACE", this.onNextSpace, this);

    this.input.keyboard.on("keydown-ESC", this.returnToMainScene, this);
  }

  onNextSpace() {
    console.log("Touche Espace pressée");

    if (this.currentIntroductionIndex < this.pnjintro.length) {
      this.displayNextIntroduction();
    } else if (this.currentQuestionIndex < this.pnjQuestions.length) {
      this.pnjText.setText("");
      this.displayNextQuestion();
    } else {
      this.endBattle();
    }
  }

  displayNextIntroduction() {
    if (this.currentIntroductionIndex < this.pnjintro.length) {
      this.pnjText.setText(this.pnjintro[this.currentIntroductionIndex]);
      this.currentIntroductionIndex++;
    }
  }

  displayNextQuestion() {
    if (this.currentQuestionIndex < this.pnjQuestions.length) {
      this.pnjText.setText("");

      const style = {
        font: "16px Arial",
        fill: "#000000",
        align: "left",
        wordWrap: { width: 480 },
      };
      const question = this.pnjQuestions[this.currentQuestionIndex].question; // Récupérer le texte de la question
      if (this.questionText) {
        this.questionText.destroy(); // Détruire l'ancienne instance de texte
      }
      this.questionText = this.add.text(
        this.pnjText.x + 220,
        this.pnjText.y + 20,
        question,
        style
      );
      this.questionText.setOrigin(0.5); // Centrer le texte horizontalement
      this.currentQuestionIndex++;

      const optionsBubbleX = this.playerHPText.x - 100;
      const optionsBubbleY = this.playerHPText.y - 200;
      const optionsBubbleWidth = 700;
      const optionsBubbleHeight = 100;
      this.optionsContainer = this.add.container(
        optionsBubbleX,
        optionsBubbleY
      );
      const optionsBubble = this.add.graphics();
      optionsBubble.fillStyle(0xffffff, 1);
      optionsBubble.lineStyle(6, 0xffa500, 1);
      optionsBubble.strokeRoundedRect(
        0,
        0,
        optionsBubbleWidth,
        optionsBubbleHeight,
        10
      );
      optionsBubble.fillRoundedRect(
        0,
        0,
        optionsBubbleWidth,
        optionsBubbleHeight,
        10
      );
      this.optionsContainer.add(optionsBubble);

      this.displayAnswerOptions();
    }
  }

  displayAnswerOptions() {
    const options = this.pnjQuestions[this.currentQuestionIndex - 1].options;
    const style = {
      font: "16px Arial",
      fill: "#000000",
      align: "left",
      wordWrap: { width: 140 },
    };

    options.forEach((option, index) => {
      const button = this.add
        .text(20 + 180 * index, 20, option, style)
        .setInteractive({ cursor: "pointer" }) // Ajouter le curseur pointer
        .on("pointerdown", () => {
          this.processAnswer(index);
        })
        .on("pointerover", () => {
          button.setStyle({ fill: "#ff0000" });
        })
        .on("pointerout", () => {
          button.setStyle({ fill: "#000000" });
        });

      this.optionsContainer.add(button);
    });
  }

  processAnswer(selectedIndex) {
    const correctAnswerIndex =
      this.pnjQuestions[this.currentQuestionIndex - 1].correctAnswerIndex;
    const isCorrect = selectedIndex === correctAnswerIndex;

    if (isCorrect) {
      console.log("Bonne réponse !");
      this.pnj.hp -= 25;
    } else {
      console.log("Mauvaise réponse !");
      this.player.hp -= 25;
    }

    this.updateHPText();
    this.displayNextQuestion();

    this.displayAnswerResult(isCorrect);
  }

  displayAnswerResult(isCorrect) {
    const resultMessage = isCorrect
      ? `Bonne réponse ! \n\n${this.player.texture.key.toUpperCase()} lance un ultimawashi sur le gros crâne de ${this.pnj.texture.key.toUpperCase()} \n\n${this.pnj.texture.key.toUpperCase()} perd 25 HP`
      : `Mauvaise réponse ! \n\n${this.player.texture.key.toUpperCase()} rate son attaque et se prend un coup de ${this.pnj.texture.key.toUpperCase()} \n\n${this.player.texture.key.toUpperCase()} perd 25 HP`;
    const resultColor = isCorrect ? 0x00ff00 : 0xff0000; // Vert si la réponse est correcte, rouge sinon

    const resultBubbleX = this.pnjText.x - -0;
    const resultBubbleY = this.pnjText.y - -300;
    const resultBubbleWidth = 500;
    const resultBubbleHeight = 130;

    const resultContainer = this.add.container(resultBubbleX, resultBubbleY);
    const resultBubble = this.add.graphics();
    resultBubble.fillStyle(0xffffff, 1);
    resultBubble.lineStyle(8, resultColor, 1);
    resultBubble.strokeRoundedRect(
      0,
      0,
      resultBubbleWidth,
      resultBubbleHeight,
      10
    );
    resultBubble.fillRoundedRect(
      0,
      0,
      resultBubbleWidth,
      resultBubbleHeight,
      10
    );
    resultContainer.add(resultBubble);

    const style = {
      font: "16px Arial",
      fill: "#000000",
      align: "center",
      wordWrap: { width: resultBubbleWidth - 20 },
    };
    const resultText = this.add.text(
      resultBubbleX + resultBubbleWidth / 2,
      resultBubbleY + resultBubbleHeight / 2,
      resultMessage,
      style
    );
    resultText.setOrigin(0.5);

    // Supprimer le message après un certain délai
    this.time.delayedCall(
      4000,
      () => {
        resultContainer.destroy();
        resultText.destroy(); // Détruire le texte également
      },
      [],
      this
    );
  }

  endBattle() {
    let resultMessage = "";
    if (this.player.hp <= 0) {
      resultMessage = "Game Over";
    } else if (this.player.hp > this.pnj.hp) {
      resultMessage = this.endPhrase;
    } else {
      resultMessage = "Mission Failed\nVotre candidature n'est pas retenue";
    }

    const resultBubbleX = 100;
    const resultBubbleY = 100;
    const resultBubbleWidth = 400;
    const resultBubbleHeight = 150;

    const resultContainer = this.add.container(resultBubbleX, resultBubbleY);
    const resultBubble = this.add.graphics();
    resultBubble.fillStyle(0xffffff, 1);
    resultBubble.lineStyle(10, 0xff69b4, 1);
    resultBubble.strokeRoundedRect(
      0,
      0,
      resultBubbleWidth,
      resultBubbleHeight,
      10
    );
    resultBubble.fillRoundedRect(
      0,
      0,
      resultBubbleWidth,
      resultBubbleHeight,
      10
    );
    resultContainer.add(resultBubble);

    const style = {
      font: "16px Arial",
      fill: "#000000",
      align: "center",
      wordWrap: { width: resultBubbleWidth - 20 },
    };
    const resultText = this.add.text(
      resultBubbleX + resultBubbleWidth / 2,
      resultBubbleY + resultBubbleHeight / 2,
      resultMessage,
      style
    );
    resultText.setOrigin(0.5);

    this.time.delayedCall(
      6000,
      () => {
        resultContainer.destroy();
        resultText.destroy();
        if (this.player.hp <= 0) {
          this.scene.start("CharacterSelectionScene");
        } else {
          this.scene.start("Main");
        }
      },
      [],
      this
    );
  }

  updateHPText() {
    this.playerHPText.setText(
      `${this.player.texture.key} \nHP : ${this.player.hp}`
    );
    this.pnjHPText.setText(`${this.pnj.texture.key} \nHP : ${this.pnj.hp}`);
  }

  returnToMainScene() {
    this.input.keyboard.off("keydown-ESC", this.returnToMainScene, this);
    this.scene.start("Main");
  }
}
