export default class Background {
  constructor(scene, bgKey = "bg") {
    this.scene = scene;
    this.bgKey = bgKey;
    this.bgImage = null;
  }

  preload(bgKey) {
    this.bgKey = bgKey || this.bgKey;
    this.scene.load.image(
      this.bgKey,
      `romain/scripts/assets/backgrounds/${this.bgKey}.jpeg`
    );
  }

  create() {
    if (this.bgImage) {
      this.bgImage.destroy();
    }
    this.bgImage = this.scene.add.image(0, 0, this.bgKey).setOrigin(0, 0);
    this.bgImage.setScale(
      Math.max(
        window.innerWidth / this.bgImage.width,
        window.innerHeight / this.bgImage.height
      )
    );
  }

  changeBackground(newBgKey) {
    this.preload(newBgKey);
    this.scene.load
      .once("complete", () => {
        this.create();
      })
      .start();
  }
}
