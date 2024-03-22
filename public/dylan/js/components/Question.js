class Question {
  constructor(
    _scene,
    _question,
    _response1,
    _response2,
    _response3,
    _response4,
    _goodanswer,
    _callback
  ) {
    this.scene = _scene;
    this.question = _question;
    this.response1 = _response1;
    this.response2 = _response2;
    this.response3 = _response3;
    this.response4 = _response4;
    this.callback = _callback;
    this.good_answer = _goodanswer;

    const boxWidth = 300;
    const boxHeight = 150;
    const centerX = this.scene.cameras.main.width / 2;
    const centerY = this.scene.cameras.main.height / 2;

    this.playerText = this.scene.add
      .text(centerX, centerY - 200, this.question, {
        fontSize: "30px",
        fill: "black",
        backgroundColor: "white",
        wordWrap: { width: boxWidth, useAdvancedWrap: true },
        align: "center",
      })
      .setOrigin(0.5);

    const margin = 40;
    const col1X = centerX - boxWidth / 2;
    const col2X = centerX + boxWidth / 2;
    const row1Y = centerY;
    const row2Y = centerY + 150;

    this.response1Text = this.scene.add
      .text(col1X - 40, row1Y - 40, this.response1, {
        fontSize: "20px",
        fill: "white",
        backgroundColor: "black",
        wordWrap: { width: boxWidth - margin * 2, useAdvancedWrap: true },
        align: "center",
      })
      .setOrigin(0.5);

    this.response2Text = this.scene.add
      .text(col2X + 40, row1Y - 40, this.response2, {
        fontSize: "20px",
        fill: "white",
        backgroundColor: "black",
        wordWrap: { width: boxWidth - margin * 2, useAdvancedWrap: true },
        align: "center",
      })
      .setOrigin(0.5);

    this.response3Text = this.scene.add
      .text(col1X - 40, row2Y - 40, this.response3, {
        fontSize: "20px",
        fill: "white",
        backgroundColor: "black",
        wordWrap: { width: boxWidth - margin * 2, useAdvancedWrap: true },
        align: "center",
      })
      .setOrigin(0.5);

    this.response4Text = this.scene.add
      .text(col2X + 40, row2Y - 40, this.response4, {
        fontSize: "20px",
        fill: "white",
        backgroundColor: "black",
        wordWrap: { width: boxWidth - margin * 2, useAdvancedWrap: true },
        align: "center",
      })
      .setOrigin(0.5);

    const reponse1Button = this.scene.add
      .zone(col1X, row1Y, boxWidth, boxHeight)
      .setInteractive();
    const reponse2Button = this.scene.add
      .zone(col2X, row1Y, boxWidth, boxHeight)
      .setInteractive();
    const reponse3Button = this.scene.add
      .zone(col1X, row2Y, boxWidth, boxHeight)
      .setInteractive();
    const reponse4Button = this.scene.add
      .zone(col2X, row2Y, boxWidth, boxHeight)
      .setInteractive();

    reponse1Button.on("pointerdown", () => {
      this.callback(this.response1, this.good_answer);
      this.destroy();
    });

    reponse2Button.on("pointerdown", () => {
      this.callback(this.response2, this.good_answer);
      this.destroy();
    });

    reponse3Button.on("pointerdown", () => {
      this.callback(this.response3, this.good_answer);
      this.destroy();
    });

    reponse4Button.on("pointerdown", () => {
      this.callback(this.response4, this.good_answer);
      this.destroy();
    });
  }
  destroy() {
    this.playerText.destroy();
    this.response1Text.destroy();
    this.response2Text.destroy();
    this.response3Text.destroy();
    this.response4Text.destroy();
  }
}

export default Question;
