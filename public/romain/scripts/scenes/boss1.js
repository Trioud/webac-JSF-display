import Background from '../background.js';
import userInterface from '../interface.js';
import { levels } from '../mapConfig.js';
import { Player } from '../player.js';
import Obstacles from '../obstacles.js';
import gamePhysics from '../physics.js';

export class FullStackScene extends Phaser.Scene {
    constructor() {
        super({key: 'FullStackScene'})
        this.isUIDisplayed = false;

        this.questions = [
            {
                question: "Quel langage est principalement utilisé pour styliser les pages web ?",
                choices: ["HTML", "CSS", "JavaScript", "Python"],
                correctAnswer: "CSS"
            },
            {
                question: "Quelle méthode HTTP est utilisée pour mettre à jour des données sur le serveur ?",
                choices: ["GET", "POST", "DELETE", "PUT"],
                correctAnswer: "PUT"
            },
            {
                question: "Quel outil est utilisé pour contrôler les versions de votre code ?",
                choices: ["Git", "SVN", "Mercurial", "Docker"],
                correctAnswer: "Git"
            },
            {
                question: "Quel format est couramment utilisé pour l'échange de données sur le web ?",
                choices: ["XML", "HTML", "JSON", "YAML"],
                correctAnswer: "JSON"
            },
            {
                question: "Quelle propriété CSS détermine la taille d'une police ?",
                choices: ["font-style", "text-size", "font-size", "text-style"],
                correctAnswer: "font-size"
            },
            {
                question: "En Node.js, quel module est utilisé pour créer un serveur HTTP ?",
                choices: ["http", "web", "server", "node"],
                correctAnswer: "http"
            },
            {
                question: "Quelle commande Git permet de cloner un dépôt ?",
                choices: ["git clone", "git commit", "git push", "git branch"],
                correctAnswer: "git clone"
            },
            {
                question: "Quel framework JavaScript est également connu sous le nom de 'Vue' ?",
                choices: ["Angular", "React", "Ember", "Vue.js"],
                correctAnswer: "Vue.js"
            },
            {
                question: "Quel est le port par défaut pour une application web HTTP ?",
                choices: ["3000", "8080", "80", "443"],
                correctAnswer: "80"
            },
            {
                question: "Quelle commande SQL est utilisée pour sélectionner des données d'une base de données ?",
                choices: ["SELECT", "INSERT", "UPDATE", "DELETE"],
                correctAnswer: "SELECT"
            },
            {
                question: "Quel est le but principal d'un Dockerfile ?",
                choices: ["Configurer un conteneur Docker", "Créer une image Docker", "Déployer une application Docker", "Gérer les volumes Docker"],
                correctAnswer: "Créer une image Docker"
            },
            {
                question: "Quel outil de construction est utilisé dans les projets Java pour automatiser la compilation ?",
                choices: ["Gradle", "Maven", "Gulp", "Webpack"],
                correctAnswer: "Maven"
            }
        ];        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questionText = null;
        this.choicesTexts = [];
        this.scoreText = null;
        this.alertText = null;
    }

    preload() {
        this.background = new Background(this, 'battle1');
        this.background.preload();

        this.load.image('ground', 'romain/scripts/assets/platform.png');
        this.load.spritesheet('1stRecruiter', 'romain/scripts/assets/1stRecruiter.png', { frameWidth: 32, frameHeight: 32});

        this.load.audio('win', 'romain/scripts/music/win.mp3');
        this.load.audio('lose', 'romain/scripts/music/lose.mp3');

        this.player = new Player(this, this.x, this.y);
        this.player.preload();
    }

    init(data){
        this.playerData = data.playerData;
    }

    userUi() {
        this.userInterface.toggleUIVisibility();
    
        if (this.isUIDisplayed) {
            this.userInterface.refresh();
        }
    
        this.isUIDisplayed = !this.isUIDisplayed;
    }

    loadLevel(levelKey) {
        const levelConfig = levels[levelKey];
        this.background.create();

        if (levelConfig.music) {
            this.load.once('complete', () => {
                this.backgroundMusic = this.sound.add('Contract1Music', { loop: true });
                this.backgroundMusic.play();
            });
    
            this.load.audio('Contract1Music', levelConfig.music);
            this.load.start();
        }

        this.obstacles = new Obstacles(this);

        levelConfig.obstacles.forEach(obstacleConfig => {
            this.obstacles.addObstacle(obstacleConfig.x, obstacleConfig.y, obstacleConfig.texture, obstacleConfig.scale, obstacleConfig.width, obstacleConfig.moving, obstacleConfig.speed, obstacleConfig.distance);
        });

        this.playerData = this.playerData || {}
        this.player = new Player(this, this.playerData);
        this.player.create(levelConfig.playerStart.x, levelConfig.playerStart.y);

        this.recruiterSprite = this.physics.add.sprite(1000, 570, '1stRecruiter');

        this.gamePhysics = new gamePhysics(this);

        this.gamePhysics.initPlayerPhysics(this.player);

        this.gamePhysics.addCollision(this.player.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.recruiterSprite, this.obstacles.group);
    }

    create() {
        if (this.sound.get('levelMusic') && this.sound.get('levelMusic').isPlaying) {
            this.sound.stopAll();
        }

        let tabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        tabKey.on('down', (event) => {
            this.userUi();
        });

        this.currentLevel = 'Contract1';
        this.loadLevel(this.currentLevel);

        this.userInterface = new userInterface(this, this.player);
        this.displayQuestion();
    }

    displayQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.choicesTexts.forEach(choiceText => choiceText.destroy()); 
        this.choicesTexts = [];

        let questionStyle = {
            fontSize: '24px', 
            color: '#fff',
            wordWrap: { width: 800 }
        };
        
        if (!this.questionText) {
            this.questionText = this.add.text(100, 100, currentQuestion.question, questionStyle);
        } else {
            this.questionText.setText(currentQuestion.question);
        }
    
        if (!this.questionText) {
            this.questionText = this.add.text(100, 100, currentQuestion.question, { fontSize: '24px', color: '#fff' });
        } else {
            this.questionText.setText(currentQuestion.question);
        }
    
        currentQuestion.choices.forEach((choice, index) => {
            const choiceText = this.add.text(100, 150 + (index * 50), choice, { fontSize: '20px', color: '#fff', backgroundColor: '#000' })
                .setInteractive()
                .on('pointerdown', () => this.selectAnswer(choice));
    
            this.choicesTexts.push(choiceText);
        });
    
        if (!this.scoreText) {
            this.scoreText = this.add.text(100, 20, `Satisfaction recruiter: ${this.score}/10`, { fontSize: '20px', color: '#fff' });
        } else {
            this.scoreText.setText(`Satisfaction recruiter: ${this.score}/10`);
        }
    }    

    selectAnswer(selectedChoice) {
        const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer;
        const isCorrect = selectedChoice === correctAnswer;
    
        if (isCorrect) {
            this.score++;
        } else {
            this.score--;
            const alertMessage = `Faux, la bonne réponse était : ${correctAnswer}`;
            const centerX = this.cameras.main.width / 2;
            const centerY = this.cameras.main.height - 100; 
    
            if (!this.alertText) {
                this.alertText = this.add.text(centerX, centerY, alertMessage, {
                    fontSize: '20px',
                    color: '#ff0000',
                    backgroundColor: '#000',
                    padding: {
                        left: 5,
                        right: 5,
                        top: 5,
                        bottom: 5
                    },
                }).setOrigin(0.5);
            } else {
                this.alertText.setText(alertMessage);
                this.alertText.setPosition(centerX, centerY);
                this.alertText.setVisible(true);
            }
    
            this.time.delayedCall(2000, () => {
                this.alertText.setVisible(false);
                this.showNextQuestionOrEndQuiz(); 
            }, [], this);
            return;
        }
        
        if (isCorrect) {
            this.showNextQuestionOrEndQuiz();
        }
    
        this.scoreText.setText(`Satisfaction recruiter: ${this.score}/10`);
    }
    
    showNextQuestionOrEndQuiz() {
        this.currentQuestionIndex++; 
        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        } else {
            this.endQuiz();
        }
    }    
    
    endQuiz() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
            this.backgroundMusic.stop();
        }    

        if (this.score < 7) {
            this.backgroundMusic = this.sound.add('lose', { volume: 0.5 });
            this.backgroundMusic.play();

            const failText = this.add.text(centerX, centerY - 50, "Vous avez échoué !", {
                fontSize: '32px',
                color: '#ff0000',
                fontStyle: 'bold'
            }).setOrigin(0.5);
    
            const restartText = this.add.text(centerX, centerY + 50, "Recommencer", {
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5
                }
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true }) 
            .on('pointerdown', () => this.restart());
    
        } else {
            this.victory = true;

            this.backgroundMusic = this.sound.add('win', { volume: 0.5 });
            this.backgroundMusic.play();

            const winText = this.add.text(centerX, centerY - 50, "Vous avez obtenu une alternance !!", {
                fontSize: '32px',
                color: '#008000',
                fontStyle: 'bold'
            }).setOrigin(0.5);
    
            const continueNext = this.add.text(centerX, centerY + 50, "Continuer", {
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5
                }
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true }) 
            .on('pointerdown', () => this.nextLevel());
        }
    }

    restart() {
        this.scene.start('MainScene');
    }

    nextLevel(playerData) {
        this.events.on('shutdown', () => {
            if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
                this.backgroundMusic.stop();
            }
        });

        this.scene.stop('FullStackScene');
        this.scene.start('Battle1_Success', { victory: this.victory, playerData: this.playerData });
    }

    update() {
        this.userInterface.refresh();
    }
}

export class BackEndScene extends Phaser.Scene {
    constructor() {
        super({key: 'BackEndScene'})
        this.isUIDisplayed = false;

        this.questions = [
            {
                question: "Quelle méthode HTTP est utilisée pour créer une ressource sur un serveur ?",
                choices: ["GET", "POST", "DELETE", "PATCH"],
                correctAnswer: "POST"
            },
            {
                question: "Dans quel langage de programmation le framework 'Django' est-il écrit ?",
                choices: ["JavaScript", "Python", "Ruby", "PHP"],
                correctAnswer: "Python"
            },
            {
                question: "Quel est le principal usage de Redis ?",
                choices: ["Base de données relationnelle", "Système de cache en mémoire", "Moteur de recherche", "Outil de surveillance"],
                correctAnswer: "Système de cache en mémoire"
            },
            {
                question: "Quel format est principalement utilisé pour échanger des données entre un serveur et un client web ?",
                choices: ["XML", "HTML", "JSON", "CSV"],
                correctAnswer: "JSON"
            },
            {
                question: "Quel outil de versionnage est le plus utilisé dans le développement logiciel ?",
                choices: ["Subversion", "Mercurial", "Git", "CVS"],
                correctAnswer: "Git"
            },
            {
                question: "Quelle technologie est utilisée pour créer des conteneurs logiciels ?",
                choices: ["Kubernetes", "Docker", "Vagrant", "Ansible"],
                correctAnswer: "Docker"
            },
            {
                question: "Quel framework Node.js est populairement utilisé pour construire des applications web ?",
                choices: ["Express", "Django", "Flask", "Spring"],
                correctAnswer: "Express"
            },
            {
                question: "Quelle commande Git permet de télécharger le dernier état d'un dépôt distant ?",
                choices: ["git push", "git fetch", "git commit", "git clone"],
                correctAnswer: "git fetch"
            },
            {
                question: "Quel est le protocole standard pour sécuriser les communications entre un navigateur web et un serveur web ?",
                choices: ["HTTP", "HTTPS", "SSH", "FTP"],
                correctAnswer: "HTTPS"
            },
            {
                question: "Dans le modèle MVC, que signifie 'M' ?",
                choices: ["Model", "View", "Controller", "Module"],
                correctAnswer: "Model"
            },
            {
                question: "Quelle est la commande pour installer une nouvelle dépendance dans un projet Node.js ?",
                choices: ["npm install <nom_paquet>", "npm update <nom_paquet>", "npm delete <nom_paquet>", "npm create <nom_paquet>"],
                correctAnswer: "npm install <nom_paquet>"
            },
            {
                question: "Quel code de statut HTTP représente 'Not Found' ?",
                choices: ["200", "404", "500", "301"],
                correctAnswer: "404"
            }
        ];              
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questionText = null;
        this.choicesTexts = [];
        this.scoreText = null;
        this.alertText = null;
    }

    preload() {
        this.background = new Background(this, 'battle1');
        this.background.preload();

        this.load.image('ground', 'romain/scripts/assets/platform.png');
        this.load.spritesheet('1stRecruiter', 'romain/scripts/assets/1stRecruiter.png', { frameWidth: 32, frameHeight: 32});

        this.load.audio('win', 'romain/scripts/music/win.mp3');
        this.load.audio('lose', 'romain/scripts/music/lose.mp3');

        this.player = new Player(this, this.x, this.y);
        this.player.preload();
    }

    init(data){
        this.playerData = data.playerData;
    }

    userUi() {
        this.userInterface.toggleUIVisibility();
    
        if (this.isUIDisplayed) {
            this.userInterface.refresh();
        }
    
        this.isUIDisplayed = !this.isUIDisplayed;
    }

    loadLevel(levelKey) {
        const levelConfig = levels[levelKey];
        this.background.create();

        if (levelConfig.music) {
            this.load.once('complete', () => {
                this.backgroundMusic = this.sound.add('Contract1Music', { loop: true });
                this.backgroundMusic.play();
            });
    
            this.load.audio('Contract1Music', levelConfig.music);
            this.load.start();
        }

        this.obstacles = new Obstacles(this);

        levelConfig.obstacles.forEach(obstacleConfig => {
            this.obstacles.addObstacle(obstacleConfig.x, obstacleConfig.y, obstacleConfig.texture, obstacleConfig.scale, obstacleConfig.width, obstacleConfig.moving, obstacleConfig.speed, obstacleConfig.distance);
        });

        this.playerData = this.playerData || {}
        this.player = new Player(this, this.playerData);
        this.player.create(levelConfig.playerStart.x, levelConfig.playerStart.y);

        this.recruiterSprite = this.physics.add.sprite(1000, 570, '1stRecruiter');

        this.gamePhysics = new gamePhysics(this);

        this.gamePhysics.initPlayerPhysics(this.player);

        this.gamePhysics.addCollision(this.player.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.recruiterSprite, this.obstacles.group);
    }

    create() {
        if (this.sound.get('levelMusic') && this.sound.get('levelMusic').isPlaying) {
            this.sound.stopAll();
        }

        let tabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        tabKey.on('down', (event) => {
            this.userUi();
        });

        this.currentLevel = 'Contract1';
        this.loadLevel(this.currentLevel);

        this.userInterface = new userInterface(this, this.player);
        this.displayQuestion();
    }

    displayQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.choicesTexts.forEach(choiceText => choiceText.destroy()); 
        this.choicesTexts = [];

        let questionStyle = {
            fontSize: '24px', 
            color: '#fff',
            wordWrap: { width: 800 }
        };
        
        if (!this.questionText) {
            this.questionText = this.add.text(100, 100, currentQuestion.question, questionStyle);
        } else {
            this.questionText.setText(currentQuestion.question);
        }
    
        if (!this.questionText) {
            this.questionText = this.add.text(100, 100, currentQuestion.question, { fontSize: '24px', color: '#fff' });
        } else {
            this.questionText.setText(currentQuestion.question);
        }
    
        currentQuestion.choices.forEach((choice, index) => {
            const choiceText = this.add.text(100, 150 + (index * 50), choice, { fontSize: '20px', color: '#fff', backgroundColor: '#000' })
                .setInteractive()
                .on('pointerdown', () => this.selectAnswer(choice));
    
            this.choicesTexts.push(choiceText);
        });
    
        if (!this.scoreText) {
            this.scoreText = this.add.text(100, 20, `Satisfaction recruiter: ${this.score}/10`, { fontSize: '20px', color: '#fff' });
        } else {
            this.scoreText.setText(`Satisfaction recruiter: ${this.score}/10`);
        }
    }    

    selectAnswer(selectedChoice) {
        const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer;
        const isCorrect = selectedChoice === correctAnswer;
    
        if (isCorrect) {
            this.score++;
        } else {
            this.score--;
            const alertMessage = `Faux, la bonne réponse était : ${correctAnswer}`;
            const centerX = this.cameras.main.width / 2;
            const centerY = this.cameras.main.height - 100; 
    
            if (!this.alertText) {
                this.alertText = this.add.text(centerX, centerY, alertMessage, {
                    fontSize: '20px',
                    color: '#ff0000',
                    backgroundColor: '#000',
                    padding: {
                        left: 5,
                        right: 5,
                        top: 5,
                        bottom: 5
                    },
                }).setOrigin(0.5);
            } else {
                this.alertText.setText(alertMessage);
                this.alertText.setPosition(centerX, centerY);
                this.alertText.setVisible(true);
            }
    
            this.time.delayedCall(2000, () => {
                this.alertText.setVisible(false);
                this.showNextQuestionOrEndQuiz(); 
            }, [], this);
            return;
        }
        
        if (isCorrect) {
            this.showNextQuestionOrEndQuiz();
        }
    
        this.scoreText.setText(`Satisfaction recruiter: ${this.score}/10`);
    }
    
    showNextQuestionOrEndQuiz() {
        this.currentQuestionIndex++; 
        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        } else {
            this.endQuiz();
        }
    }    
    
    endQuiz() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
            this.backgroundMusic.stop();
        }    

        if (this.score < 7) {
            this.backgroundMusic = this.sound.add('lose', { volume: 0.5 });
            this.backgroundMusic.play();

            const failText = this.add.text(centerX, centerY - 50, "Vous avez échoué !", {
                fontSize: '32px',
                color: '#ff0000',
                fontStyle: 'bold'
            }).setOrigin(0.5);
    
            const restartText = this.add.text(centerX, centerY + 50, "Recommencer", {
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5
                }
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true }) 
            .on('pointerdown', () => this.restart());
    
        } else {
            this.victory = true;

            this.backgroundMusic = this.sound.add('win', { volume: 0.5 });
            this.backgroundMusic.play();

            const winText = this.add.text(centerX, centerY - 50, "Vous avez obtenu une alternance !!", {
                fontSize: '32px',
                color: '#008000',
                fontStyle: 'bold'
            }).setOrigin(0.5);
    
            const continueNext = this.add.text(centerX, centerY + 50, "Continuer", {
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5
                }
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true }) 
            .on('pointerdown', () => this.nextLevel());
        }
    }

    restart() {
        this.scene.start('MainScene');
    }

    nextLevel(playerData) {
        this.events.on('shutdown', () => {
            if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
                this.backgroundMusic.stop();
            }
        });

        this.scene.stop('FullStackScene');
        this.scene.start('Battle1_Success', { victory: this.victory, playerData: this.playerData });
    }

    update() {
        this.userInterface.refresh();
    }
}

export class FrontEndScene extends Phaser.Scene {
    constructor() {
        super({key: 'FrontEndScene'})
        this.isUIDisplayed = false;

        this.questions = [
            {
                question: "Quel langage est utilisé pour structurer les pages web ?",
                choices: ["HTML", "CSS", "JavaScript", "Ruby"],
                correctAnswer: "HTML"
            },
            {
                question: "Quelle propriété CSS est utilisée pour changer la couleur de fond d'un élément ?",
                choices: ["color", "background-color", "font-color", "background-image"],
                correctAnswer: "background-color"
            },
            {
                question: "Quel est l'objectif principal de JavaScript dans le développement web ?",
                choices: ["Créer des pages statiques", "Styliser les pages", "Programmer le comportement des pages", "Gérer la base de données"],
                correctAnswer: "Programmer le comportement des pages"
            },
            {
                question: "Quelle balise HTML est utilisée pour insérer une image dans une page web ?",
                choices: ["<img>", "<image>", "<insert>", "<src>"],
                correctAnswer: "<img>"
            },
            {
                question: "Quel sélecteur CSS cible un élément avec un id spécifique ?",
                choices: [".", "#", ":", "!"],
                correctAnswer: "#"
            },
            {
                question: "Quelle fonction JavaScript est utilisée pour écrire du texte dans un élément HTML ?",
                choices: ["document.writeText()", "document.write()", "document.text()", "console.log()"],
                correctAnswer: "document.write()"
            },
            {
                question: "Quelle propriété CSS est utilisée pour changer la couleur du texte d'un élément ?",
                choices: ["text-color", "font-color", "color", "background-color"],
                correctAnswer: "color"
            },
            {
                question: "Quel outil est utilisé pour inspecter et débuguer les pages web dans le navigateur ?",
                choices: ["IDE", "Console", "Debugger", "Inspecteur"],
                correctAnswer: "Inspecteur"
            },
            {
                question: "Quelle balise HTML est utilisée pour définir un paragraphe ?",
                choices: ["<p>", "<paragraph>", "<pg>", "<text>"],
                correctAnswer: "<p>"
            },
            {
                question: "Comment ajoute-t-on un commentaire en CSS ?",
                choices: ["// Ceci est un commentaire", "/* Ceci est un commentaire */", "<!-- Ceci est un commentaire -->", "# Ceci est un commentaire"],
                correctAnswer: "/* Ceci est un commentaire */"
            },
            {
                question: "Quel attribut HTML spécifie l'URL d'une image ?",
                choices: ["src", "href", "url", "link"],
                correctAnswer: "src"
            },
            {
                question: "Quel élément HTML est utilisé pour inclure un fichier JavaScript dans une page web ?",
                choices: ["<javascript>", "<script>", "<js>", "<code>"],
                correctAnswer: "<script>"
            }
        ];        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questionText = null;
        this.choicesTexts = [];
        this.scoreText = null;
        this.alertText = null;
    }

    preload() {
        this.background = new Background(this, 'battle1');
        this.background.preload();

        this.load.image('ground', 'romain/scripts/assets/platform.png');
        this.load.spritesheet('1stRecruiter', 'romain/scripts/assets/1stRecruiter.png', { frameWidth: 32, frameHeight: 32});

        this.load.audio('win', 'romain/scripts/music/win.mp3');
        this.load.audio('lose', 'romain/scripts/music/lose.mp3');

        this.player = new Player(this, this.x, this.y);
        this.player.preload();
    }

    init(data){
        this.playerData = data.playerData;
    }

    userUi() {
        this.userInterface.toggleUIVisibility();
    
        if (this.isUIDisplayed) {
            this.userInterface.refresh();
        }
    
        this.isUIDisplayed = !this.isUIDisplayed;
    }

    loadLevel(levelKey) {
        const levelConfig = levels[levelKey];
        this.background.create();

        if (levelConfig.music) {
            this.load.once('complete', () => {
                this.backgroundMusic = this.sound.add('Contract1Music', { loop: true });
                this.backgroundMusic.play();
            });
    
            this.load.audio('Contract1Music', levelConfig.music);
            this.load.start();
        }

        this.obstacles = new Obstacles(this);

        levelConfig.obstacles.forEach(obstacleConfig => {
            this.obstacles.addObstacle(obstacleConfig.x, obstacleConfig.y, obstacleConfig.texture, obstacleConfig.scale, obstacleConfig.width, obstacleConfig.moving, obstacleConfig.speed, obstacleConfig.distance);
        });

        this.playerData = this.playerData || {}
        this.player = new Player(this, this.playerData);
        this.player.create(levelConfig.playerStart.x, levelConfig.playerStart.y);

        this.recruiterSprite = this.physics.add.sprite(1000, 570, '1stRecruiter');

        this.gamePhysics = new gamePhysics(this);

        this.gamePhysics.initPlayerPhysics(this.player);

        this.gamePhysics.addCollision(this.player.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.recruiterSprite, this.obstacles.group);
    }

    create() {
        if (this.sound.get('levelMusic') && this.sound.get('levelMusic').isPlaying) {
            this.sound.stopAll();
        }

        let tabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        tabKey.on('down', (event) => {
            this.userUi();
        });

        this.currentLevel = 'Contract1';
        this.loadLevel(this.currentLevel);

        this.userInterface = new userInterface(this, this.player);
        this.displayQuestion();
    }

    displayQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.choicesTexts.forEach(choiceText => choiceText.destroy()); 
        this.choicesTexts = [];

        let questionStyle = {
            fontSize: '24px', 
            color: '#fff',
            wordWrap: { width: 800 }
        };
        
        if (!this.questionText) {
            this.questionText = this.add.text(100, 100, currentQuestion.question, questionStyle);
        } else {
            this.questionText.setText(currentQuestion.question);
        }
    
        if (!this.questionText) {
            this.questionText = this.add.text(100, 100, currentQuestion.question, { fontSize: '24px', color: '#fff' });
        } else {
            this.questionText.setText(currentQuestion.question);
        }
    
        currentQuestion.choices.forEach((choice, index) => {
            const choiceText = this.add.text(100, 150 + (index * 50), choice, { fontSize: '20px', color: '#fff', backgroundColor: '#000' })
                .setInteractive()
                .on('pointerdown', () => this.selectAnswer(choice));
    
            this.choicesTexts.push(choiceText);
        });
    
        if (!this.scoreText) {
            this.scoreText = this.add.text(100, 20, `Satisfaction recruiter: ${this.score}/10`, { fontSize: '20px', color: '#fff' });
        } else {
            this.scoreText.setText(`Satisfaction recruiter: ${this.score}/10`);
        }
    }    

    selectAnswer(selectedChoice) {
        const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer;
        const isCorrect = selectedChoice === correctAnswer;
    
        if (isCorrect) {
            this.score++;
        } else {
            this.score--;
            const alertMessage = `Faux, la bonne réponse était : ${correctAnswer}`;
            const centerX = this.cameras.main.width / 2;
            const centerY = this.cameras.main.height - 100; 
    
            if (!this.alertText) {
                this.alertText = this.add.text(centerX, centerY, alertMessage, {
                    fontSize: '20px',
                    color: '#ff0000',
                    backgroundColor: '#000',
                    padding: {
                        left: 5,
                        right: 5,
                        top: 5,
                        bottom: 5
                    },
                }).setOrigin(0.5);
            } else {
                this.alertText.setText(alertMessage);
                this.alertText.setPosition(centerX, centerY);
                this.alertText.setVisible(true);
            }
    
            this.time.delayedCall(2000, () => {
                this.alertText.setVisible(false);
                this.showNextQuestionOrEndQuiz(); 
            }, [], this);
            return;
        }
        
        if (isCorrect) {
            this.showNextQuestionOrEndQuiz();
        }
    
        this.scoreText.setText(`Satisfaction recruiter: ${this.score}/10`);
    }
    
    showNextQuestionOrEndQuiz() {
        this.currentQuestionIndex++; 
        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        } else {
            this.endQuiz();
        }
    }    
    
    endQuiz() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
            this.backgroundMusic.stop();
        }    

        if (this.score < 7) {
            this.backgroundMusic = this.sound.add('lose', { volume: 0.5 });
            this.backgroundMusic.play();

            const failText = this.add.text(centerX, centerY - 50, "Vous avez échoué !", {
                fontSize: '32px',
                color: '#ff0000',
                fontStyle: 'bold'
            }).setOrigin(0.5);
    
            const restartText = this.add.text(centerX, centerY + 50, "Recommencer", {
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5
                }
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true }) 
            .on('pointerdown', () => this.restart());
    
        } else {
            this.victory = true;

            this.backgroundMusic = this.sound.add('win', { volume: 0.5 });
            this.backgroundMusic.play();

            const winText = this.add.text(centerX, centerY - 50, "Vous avez obtenu une alternance !!", {
                fontSize: '32px',
                color: '#008000',
                fontStyle: 'bold'
            }).setOrigin(0.5);
    
            const continueNext = this.add.text(centerX, centerY + 50, "Continuer", {
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5
                }
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true }) 
            .on('pointerdown', () => this.nextLevel());
        }
    }

    restart() {
        this.scene.start('MainScene');
    }

    nextLevel(playerData) {
        this.events.on('shutdown', () => {
            if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
                this.backgroundMusic.stop();
            }
        });

        this.scene.stop('FullStackScene');
        this.scene.start('Battle1_Success', { victory: this.victory, playerData: this.playerData });
    }

    update() {
        this.userInterface.refresh();
    }
}