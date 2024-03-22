// ./dialog.js

import { SCENE_KEYS } from './scenes/scene_keys.js';

export class DialogManager {
    constructor(scene, char) {
        this.scene = scene;
        this.mainChar = char;
        this.dialogContainer = scene.add.container();

        this.dialogStyle = {
            fontFamily: 'Arial, sans-serif',
            fontSize: 16,
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: {
                x: 10,
                y: 10
            },
            cornerRadius: 10,
        };

        this.selectedJob = null;
        this.jobOffer = null;
        this.selectedAnswer = null;
        this.selectedCharacter = null;
    }

    showDialog(x, y, character, message) {
        const bubbleWidth = 300;

        const dialogBubble = this.scene.add.rectangle(0, 0, bubbleWidth, 0, 0xffffff)
            .setOrigin(0, 0)
            .setAlpha(0);

        const text = this.scene.add.text(
            dialogBubble.x + this.dialogStyle.padding.x,
            dialogBubble.y + this.dialogStyle.padding.y,
            message,
            this.dialogStyle
        ).setOrigin(0).setInteractive();

        this.dialogContainer.add([dialogBubble, text]);

        const bubbleX = character.x - x;
        const bubbleY = character.y - y;

        dialogBubble.setPosition(bubbleX, bubbleY);
        text.setPosition(bubbleX + this.dialogStyle.padding.x, bubbleY + this.dialogStyle.padding.y);

        const tween = this.scene.tweens.add({
            targets: [dialogBubble, text],
            alpha: 1,
            duration: 1500,
            ease: 'Power2',
        });

        return {
            type: 'dialog',
            hideDialog: () => {
                tween.stop();
                this.hideDialog(dialogBubble, text);
            }
        };
    }

    showCharacterOptions(x, y, character, message, options) {
        const dialogRectangle = this.scene.add.rectangle(
            character.x - x,
            character.y - y,
            370,
            45,
            0xffffff
        ).setDepth(0);

        const text = this.scene.add.text(
            dialogRectangle.x - dialogRectangle.width / 2,
            dialogRectangle.y - dialogRectangle.height / 2,
            `${message}`,
            this.dialogStyle
        );

        let characterImages = [];
        let charTexts = [];

        if (Array.isArray(options)) {
            options.forEach((option, index) => {
                // console.log(option.image_key);
                const characterImage = this.scene.add.image(
                    dialogRectangle.x - dialogRectangle.width / 2 + 20 + index * 180,
                    dialogRectangle.y + 100,
                    option.image_key
                ).setDisplaySize(80, 80).setDepth(0);

                let languagesText = '\t\t\t\tProgrammation:\n';
                for (const languageKey in option.skills.hard.languages) {
                    languagesText += `\t\t\t\t\t\t ${option.skills.hard.languages[languageKey]}\n`;
                }

                const charText = this.scene.add.text(
                    dialogRectangle.x - dialogRectangle.width / 2 - 50 + index * 180,
                    dialogRectangle.y + 150,
                    `\t\t\t\t\t\t\t\t${option.name}\n\n` +
                    `Âge: ${option.age}\nGenre: ${option.genre}\n\n` +
                    `Moral: ${option.health}\nVulnérabilité:\n\t\t\t\t${option.vulnerability}\n\n` +
                    `Compétences\n\t\t\t\tForce: ${option.skills.soft.force}\n\t\t\t\tIntelligence: ${option.skills.soft.genius}\n\t\t\t\tDéfense: ${option.skills.soft.defense}\n\n` +
                    `${languagesText}`,
                    this.dialogStyle
                ).setDepth(2);

                characterImages.push(characterImage);
                charTexts.push(charText);

                characterImage.setInteractive();
                characterImage.on('pointerdown', () => {
                    this.selectedCharacter = option.name;
                    // console.log(`Personnage sélectionné : ${this.selectedCharacter}`);
                });

                this.dialogContainer.add([characterImage, charText]);
            });
        }

        const tween = this.scene.tweens.add({
            targets: [dialogRectangle, text, ...characterImages, ...charTexts],
            alpha: 1,
            duration: 500,
            ease: 'Power2',
        });

        return {
            type: 'showCharacterOptions',
            hideDialog: () => {
                tween.stop();
                this.hideDialog(dialogRectangle, text, characterImages, charTexts);
            }
        };
    }

    showAnswersResults(answers) {
        const dialogRectangle = this.scene.add.rectangle(0, 0, 10, 10, 0xffffff).setDepth(1000);

        let answerTexts = [];

        if (Array.isArray(answers)) {
            answers.forEach((answer, index) => {
                const lineIndex = Math.floor(index / 3);
                const colIndex = index % 3;

                const answerText = this.scene.add.text(
                    dialogRectangle.x - dialogRectangle.width / 2 + 50 + colIndex * 300,
                    dialogRectangle.y - dialogRectangle.height / 2 + 620 - lineIndex * 100,
                    `${index + 1}. ` +
                    `${answer}\n\n` +
                    `[Cliquez pour sélectionner la réponse]\n` +
                    `[Espace pour envoyer la réponse]`,
                    this.dialogStyle
                ).setDepth(1001).setInteractive();

                answerText.on('pointerdown', () => {
                    this.selectedAnswer = index;
                    // console.log(this.selectedAnswer);
                });

                answerTexts.push(answerText);
            });
        }

        const tween = this.scene.tweens.add({
            targets: [dialogRectangle, ...answerTexts],
            alpha: 1,
            duration: 500,
            ease: 'Power2',
        });

        return {
            type: 'showAnswersResults',
            hideDialog: () => {
                tween.stop();
                this.hideDialog(dialogRectangle, answerTexts);
            }
        };
    }

    showJobOffers(jobs) {
        const dialogRectangle = this.scene.add.rectangle(0, 0, 10, 10, 0xffffff).setDepth(1000);

        let jobTexts = [];

        if (Array.isArray(jobs)) {
            jobs.forEach((job, index) => {
                const jobText = this.scene.add.text(
                    dialogRectangle.x - dialogRectangle.width / 2 + 50 + index * 300,
                    dialogRectangle.y - dialogRectangle.height / 2 + 200,
                    `\t\t\t\t\t\t\t\t${job.title}\n\n` +
                    `Salaire: ${job.salary}\n\n` +
                    `Compétences\n\t\t\t\t${job.skills}\n\n` +
                    `Vulnérabilité\n\t\t\t\t${job.vulnerability}\n\n` +
                    `Description\n\t\t\t\t${job.description}\n\n\n` +
                    `[Cliquez pour décrocher un entretien]\n` +
                    `[Espace pour fermer la fenêtre]`,
                    this.dialogStyle
                ).setDepth(1001).setInteractive();

                jobText.on('pointerdown', () => {
                    console.log(`Entretien décroché pour le poste de ${job.title}`);

                    this.selectedJob = job.title;
                    this.jobOffer = job;
                });

                let spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

                spaceKey.on('down', () => {
                    // console.log('La touche Espace a été pressée');
                    this.hideDialog(dialogRectangle, jobTexts);
                });

                jobTexts.push(jobText);
            });
        }

        const tween = this.scene.tweens.add({
            targets: [dialogRectangle, ...jobTexts],
            alpha: 1,
            duration: 500,
            ease: 'Power2',
        });

        return {
            type: 'showJobsOffer',
            hideDialog: () => {
                tween.stop();
                this.hideDialog(dialogRectangle, jobTexts);
            }
        };
    }

    hideDialog(...elements) {
        const hideTween = this.scene.tweens.add({
            targets: elements.flat(),
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                elements.flat().forEach(element => {
                    if (element && element.type === 'dialog') {
                        const [dialogBubble, text] = element.getChildren();
                        if (dialogBubble && text) {
                            dialogBubble.destroy();
                            text.destroy();
                        }
                    } else if (element && element.getChildren && typeof element.getChildren === 'function') {
                        const [dialogRectangle, text, ...rest] = element.getChildren();
                        // console.log("Number of characterImages:", rest.length / 2);
                        // console.log("Number of charTexts:", rest.length / 2);
                        if (dialogRectangle && text) {
                            dialogRectangle.destroy();
                            text.destroy();
                        }
                        rest.forEach(item => {
                            if (item && item.destroy && typeof item.destroy === 'function') {
                                item.destroy();
                            }
                        });
                    }
                });
            }
        });

        hideTween.play();
    }
}