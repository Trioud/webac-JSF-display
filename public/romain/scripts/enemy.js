export default class bossNo1 {
    constructor(scene) {
        this.scene = scene;
        this.questions = [
            {
                question: "Quelle est la première lettre de l'alphabet ?",
                choices: ["B", "C", "A", "D"],
                correctAnswer: "A"
            },
        ];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalQuestions = this.questions.length;
        this.questionText = null;
        this.choicesTexts = []; 
        this.scoreText = null;
    }

    displayQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.choicesTexts.forEach(choiceText => choiceText.destroy());
        this.choicesTexts = [];

        if (!this.questionText) {
            this.questionText = this.scene.add.text(100, 50, currentQuestion.question, { fontSize: '24px', color: '#fff' });
        } else {
            this.questionText.setText(currentQuestion.question);
        }

        currentQuestion.choices.forEach((choice, index) => {
            const choiceText = this.scene.add.text(100, 100 + (index * 30), choice, { fontSize: '20px', color: '#fff', backgroundColor: '#000' })
                .setInteractive()
                .on('pointerdown', () => this.selectAnswer(choice));

            this.choicesTexts.push(choiceText);
        });

        if (!this.scoreText) {
            this.scoreText = this.scene.add.text(100, 20, `Score: ${this.score}`, { fontSize: '20px', color: '#fff' });
        } else {
            this.scoreText.setText(`Score: ${this.score}`);
        }
    }

    selectAnswer(selectedChoice) {
        this.scoreText.setText(`Score: ${this.score}`);
        
    }

    endQuiz() {
        
    }
}
