class Pnj extends Phaser.Physics.Arcade.Sprite {
  constructor(_scene, _x, _y, _texture) {
    super(_scene, _x, _y, _texture);

    _scene.add.existing(this);
    _scene.physics.add.existing(this);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.setScale(1.9);

    _scene.anims.create({
      key: "left_pnj",
      frames: _scene.anims.generateFrameNumbers(_texture, { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    _scene.anims.create({
      key: "turn_pnj",
      frames: [{ key: _texture, frame: 1 }],
      frameRate: 20,
    });

    _scene.anims.create({
      key: "right_pnj",
      frames: _scene.anims.generateFrameNumbers(_texture, { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  move_right(_player) {
    _player.setVelocityX(160);
    _player.anims.play("right_pnj", true);
  }

  move_left(_player) {
    _player.setVelocityX(-160);
    _player.anims.play("left_pnj", true);
  }

  move_turn(_player) {
    _player.setVelocityX(0);
    _player.anims.play("turn_pnj", true);
  }

  text_clear(_player) {
    if (_player.playerText) {
      _player.playerText.destroy();
    }
  }

  question(
    _scene,
    _player,
    _question,
    _reponse1,
    _reponse2,
    _reponse3,
    _reponse4,
    _reponse_attendue,
    callback
  ) {
    if (_player.playerText) {
      _player.playerText.destroy();
    }

    const boxWidth = 300;
    const boxHeight = 150;
    const centerX = _scene.cameras.main.width / 2;
    const centerY = _scene.cameras.main.height / 2;

    // Positionnement du texte de la question
    _player.playerText = _scene.add
      .text(centerX, centerY - 100, _question, {
        fontSize: "24px",
        fill: "black",
        backgroundColor: "white",
        wordWrap: { width: boxWidth, useAdvancedWrap: true },
        align: "center",
      })
      .setOrigin(0.5);

    // Positionnement des réponses
    const margin = 20; // Marge entre les réponses
    const col1X = centerX - boxWidth / 2;
    const col2X = centerX + boxWidth / 2;
    const row1Y = centerY;
    const row2Y = centerY + 150;

    // Affichage des réponses
    _scene.add
      .text(col1X, row1Y, _reponse1, { fontSize: "18px", fill: "black" })
      .setOrigin(0.5);
    _scene.add
      .text(col2X, row1Y, _reponse2, { fontSize: "18px", fill: "black" })
      .setOrigin(0.5);
    _scene.add
      .text(col1X, row2Y, _reponse3, { fontSize: "18px", fill: "black" })
      .setOrigin(0.5);
    _scene.add
      .text(col2X, row2Y, _reponse4, { fontSize: "18px", fill: "black" })
      .setOrigin(0.5);

    // Création des zones interactives pour les réponses
    const reponse1Button = _scene.add
      .zone(col1X, row1Y, boxWidth / 2, boxHeight / 2)
      .setInteractive();
    const reponse2Button = _scene.add
      .zone(col2X, row1Y, boxWidth / 2, boxHeight / 2)
      .setInteractive();
    const reponse3Button = _scene.add
      .zone(col1X, row2Y, boxWidth / 2, boxHeight / 2)
      .setInteractive();
    const reponse4Button = _scene.add
      .zone(col2X, row2Y, boxWidth / 2, boxHeight / 2)
      .setInteractive();

    // Ajout d'événements de clic pour chaque réponse
    reponse1Button.on("pointerdown", () => {
      this.validation(_reponse1, _reponse_attendue, _scene, _player); // Appel d'une fonction pour traiter la sélection
    });

    reponse2Button.on("pointerdown", () => {
      this.validation(_reponse2, _reponse_attendue, _scene, _player); // Appel d'une fonction pour traiter la sélection
    });

    reponse3Button.on("pointerdown", () => {
      this.validation(_reponse3, _reponse_attendue, _scene, _player); // Appel d'une fonction pour traiter la sélection
    });

    reponse4Button.on("pointerdown", () => {
      this.validation(_reponse4, _reponse_attendue, _scene, _player);
    });
  }

  validation(_reponse, _reponse_attendue, _scene, _player) {
    if (_reponse == _reponse_attendue) {
      _player.set_vie(10);
    } else {
      _player.set_vie(-10);
    }
  }

  text(_scene, _player, _text) {
    if (_player.playerText) {
      _player.playerText.destroy();
    }

    const boxWidth = 300;
    _player.playerText = _scene.add
      .text(_player.x, _player.y, _text, {
        fontSize: "24px",
        fill: "black",
        backgroundColor: "white",
        wordWrap: { width: boxWidth, useAdvancedWrap: true },
      })
      .setOrigin(0.5, 1.7);
  }
}
export default Pnj;
