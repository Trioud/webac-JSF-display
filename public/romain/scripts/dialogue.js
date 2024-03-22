export default class DialogueHandler {
    constructor(scene) {
        this.scene = scene;
        this.dialogues = [];
        this.dialogueIndex = 0;
        this.choiceTexts = [];
        this.textDisplayed = false;
        this.showingChoices = false;

        this.dialogueBox = this.scene.add.graphics({ fillStyle: { color: 0xFFFFFF, alpha: 0.7 } });
        this.dialogueBox.fillRect(50, this.scene.cameras.main.height - 150, this.scene.cameras.main.width - 100, 100);
        this.dialogueName = this.scene.add.text(60, this.scene.cameras.main.height - 140, '', { fontSize: '16px', fill: '#000000' });
        this.dialogueText = this.scene.add.text(60, this.scene.cameras.main.height - 120, '', { fontSize: '16px', fill: '#000000', wordWrap: { width: this.scene.cameras.main.width - 120 } });

        this.scene.input.keyboard.on('keydown-SPACE', () => {
            if (this.textDisplayed && this.dialogues[this.dialogueIndex]?.choices && !this.showingChoices) {
                this.showChoices(this.dialogues[this.dialogueIndex].choices);
            } else if (this.textDisplayed) {
                this.nextDialogueOrHide();
            } else {
                this.textDisplayed = true;
            }
        });
        this.hideDialogue();
    }

    showDialogue() {
        this.hideDialogue();
    
        if (this.dialogueIndex < this.dialogues.length) {
            let dialogue = this.dialogues[this.dialogueIndex];
            this.dialogueBox.setVisible(true);
            this.dialogueName.setVisible(true).setText(this.dialogueNameText);
            this.dialogueText.setVisible(true).setText(dialogue.text);
        } else {
        }
    }
    
    nextDialogueOrHide() {
        this.dialogueIndex++;
        if (this.dialogueIndex >= this.dialogues.length) {
            console.log(this.dialogueIndex);
            this.hideDialogue();
            this.dialogueIndex = 0;
        } else {
            this.showDialogue();
        }
    }
    
    showChoices(choices) {
        this.dialogueText.setVisible(false);
        this.hideChoiceTexts();
    
        let choiceY = this.scene.cameras.main.height - 100;
    
        choices.forEach((choice, index) => {
            let choiceX = 60; 
            let choiceText = this.scene.add.text(choiceX, choiceY + (index * 20), choice.text, { fontSize: '16px', fill: '#000000' }).setInteractive();
    
            choiceText.on('pointerdown', () => {
                this.scene.handleChoiceSelection(choice.value);
                this.nextDialogueOrHide();
            });
    
            this.choiceTexts.push(choiceText);
        });
        this.showingChoices = true;
    }    

    setDialogues(dialogues, name) {
        this.dialogues = dialogues;
        this.dialogueIndex = 0;
        this.dialogueNameText = name;
        this.showingChoices = false; 
        this.hideChoiceTexts();
    }

    hideDialogue() {
        this.dialogueBox.setVisible(false);
        this.dialogueName.setVisible(false);
        this.dialogueText.setVisible(false);
        this.hideChoiceTexts();
    }

    hideChoiceTexts() {
        this.choiceTexts.forEach(choiceText => choiceText.destroy());
        this.choiceTexts = [];
        this.showingChoices = false; 
    }
}