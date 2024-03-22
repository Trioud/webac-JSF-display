class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(_scene, _x, _y, _texture) {
    super(_scene, _x, _y, _texture);

    this.vie = 0;
    this.force = 0;
    this.bonus = "aucun";
    this.malus = "aucun";

    _scene.add.existing(this);
    _scene.physics.add.existing(this);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.setScale(1.9);

    _scene.anims.create({
      key: "left",
      frames: _scene.anims.generateFrameNumbers(_texture, { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    _scene.anims.create({
      key: "turn",
      frames: [{ key: _texture, frame: 1 }],
      frameRate: 20,
    });

    _scene.anims.create({
      key: "right",
      frames: _scene.anims.generateFrameNumbers(_texture, { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.pointsDeForceTexte = _scene.add.text(
      450,
      10,
      "Proposition d'alternance : " + this.force,
      {
        fontFamily: "Arial",
        fontSize: 24,
        color: "orange",
      }
    );
    this.pointsDeVieTexte = _scene.add.text(
      10,
      10,
      "Points de Vie : " + this.vie,
      {
        fontFamily: "Arial",
        fontSize: 24,
        color: "red",
      }
    );
    this.BonusTexte = _scene.add.text(10, 90, "Bonus : " + this.bonus, {
      fontFamily: "Arial",
      fontSize: 24,
      color: "red",
    });
    this.MalusTexte = _scene.add.text(10, 50, "Malus : " + this.malus, {
      fontFamily: "Arial",
      fontSize: 24,
      color: "red",
    });
  }
  update_stats() {
    this.pointsDeForceTexte.setText("Proposition d'alternance : " + this.force);
    this.pointsDeVieTexte.setText("Points de vie : " + this.vie);
    this.BonusTexte.setText("Bonus: " + this.bonus);
    this.MalusTexte.setText("Malus : " + this.malus);
  }

  set_vie(_nb) {
    this.vie += _nb;
  }
  set_force(_nb) {
    this.force += _nb;
  }

  text(_scene, _player, _text) {
    if (_player.Text) {
      _player.Text.destroy();
    }

    const boxWidth = 300;
    _player.Text = _scene.add
      .text(_player.x, _player.y, _text, {
        fontSize: "24px",
        fill: "black",
        backgroundColor: "white",
        wordWrap: { width: boxWidth, useAdvancedWrap: true },
      })
      .setOrigin(0.5, 2);
  }

  text_clear(_player) {
    if (_player.Text) {
      _player.Text.destroy();
    }
  }

  move(_cursors) {
    if (_cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play("left", true);
    } else if (_cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play("right", true);
    } else {
      this.setVelocityX(0);
      this.anims.play("turn");
    }

    if (_cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-330);
    }
  }
}
export default Player;
