export default class UserInterface {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.statsTexts = {};

        this.createBackground();
        this.createTexts();
    }
    toggleUIVisibility() {
        if (this.statsBackground) {
            this.statsBackground.setVisible(!this.statsBackground.visible);
        }
    
        Object.values(this.statsTexts).forEach(text => {
            if (text && typeof text.setVisible === 'function') {
                text.setVisible(!text.visible);
            }
        });
    
        if (this.statsTexts.skills) {
            Object.values(this.statsTexts.skills).forEach(skillText => {
                if (skillText && typeof skillText.setVisible === 'function') {
                    skillText.setVisible(!skillText.visible);
                }
            });
        }
    }
    

    createBackground() {
        const startX = 10;
        const startY = 10;
        const width = 200; 
        let height = 20; 
        const lineSpacing = 20;
        const skillCount = Object.keys(this.player.skill).length;
        
        height += (lineSpacing * (3 + skillCount - 1));

        const background = this.scene.add.graphics();
        background.fillStyle(0xffffff, 1); 
        background.fillRect(startX - 5, startY - 5, width, height);

        this.statsBackground = background;
    }

    createTexts() {
        const startX = 10;
        const startY = 10;
        const lineSpacing = 20;
        
        this.statsTexts.name = this.scene.add.text(startX, startY, '', { fontSize: '16px', fill: '#000000' });
        this.statsTexts.ascendancy = this.scene.add.text(startX, startY + lineSpacing, '', { fontSize: '16px', fill: '#0000FF' });
        this.statsTexts.hp = this.scene.add.text(startX, startY + (lineSpacing * 2), '', { fontSize: '16px', fill: '#FF0000' });
    
        this.statsTexts.skills = {};
        let skillY = startY + (lineSpacing * 3);
        for (const skill in this.player.skill) {
            this.statsTexts.skills[skill] = this.scene.add.text(startX, skillY, '', { fontSize: '16px', fill: '#A020F0' });
            skillY += lineSpacing;
        }
    
        this.updateTexts();
    }
    

    updateTexts() {
        this.statsTexts.name.setText(`Name: ${this.player.getName()}`);
        this.statsTexts.ascendancy.setText(`Class: ${this.player.getAscendance()}`);
        this.statsTexts.hp.setText(`HP: ${this.player.getHp()}`);
    
        for (const skill in this.player.skill) {
            const skillLevel = this.player.getSkill(skill);
            this.statsTexts.skills[skill].setText(`${skill.toUpperCase()}: ${skillLevel}`);
        }
    }
    

    refresh() {
        this.updateTexts();
    }
}
