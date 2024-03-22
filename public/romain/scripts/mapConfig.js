export const levels = {
    level1: {
        obstacles: [
            { x: 1000, y: 867, texture: 'ground', scale: 5 },
            { x: 0, y: 500, texture: 'ground' },
            { x: 900, y: 710, texture: 'ground' },
            { x: 1250, y: 100, texture: 'ground' },
            { x: 450, y: 650, texture: 'ground', width: 200, moving: 'y_axe'},
            { x: 450, y: 450, texture: 'ground', width: 200, moving: 'x_axe'},
            { x: 900, y: 300, texture: 'ground', width: 200, moving: 'y_axe', speed: 1000},
            { x: 700, y: 360, texture: 'ground', width: 100}, 
        ],
        playerStart: { 
            x: 0, 
            y: 740,
            texture: "player",
        },
        npc: {
            x: 1095,
            y: 68,
            texture: 'said',
        },
        portal: {
            x: 1160,
            y: 40,
            texture: 'portal',
            nextLevel: 'level2',
        },
        music: 'romain/scripts/music/level1_bg_music.mp3',
    },
    level2: {
        obstacles: [
            { x: 1000, y: 867, texture: 'ground', scale: 5 },
            { x: 1070, y: 450, texture: 'ground', width: 70 },
            { x: 880, y: 450, texture: 'ground', width: 70 },
            { x: 345, y: 480, texture: 'ground', width: 70 },
            { x: 570, y: 480, texture: 'ground', width: 70, moving: 'x_axe', speed: 1200 },
            { x: 570, y: 700, texture: 'ground', width: 70, moving: 'y_axe', speed: 1000 },
        ],
        playerStart: {
            x: 0, 
            y: 740,
            texture: "player",
        },
        npc: {
            x: 1095,
            y: 695,
            texture: 'said',
        },
        portal: {
            x: 1160,
            y: 743,
            texture: 'portal',
            nextLevel: 'level3',
        },
        music: 'romain/scripts/music/level2_bg_music.mp3',
    },
    level3: {
        obstacles: [
            { x: 1000, y: 867, texture: 'ground', scale: 5 },
            { x: 1100, y: 270, texture: 'ground', width: 300 },
            { x: 200, y: 395, texture: 'ground', width: 400 },
            { x: 30, y: 110, texture: 'ground', width: 140 },
            { x: 200, y: 110, texture: 'ground', width: 50 },
            { x: 330, y: 110, texture: 'ground', width: 50 },
            { x: 450, y: 110, texture: 'ground', width: 50 },
            { x: 600, y: 110, texture: 'ground', width: 50 },
            { x: 750, y: 110, texture: 'ground', width: 50 },
            { x: 900, y: 710, texture: 'ground', width: 200},
            { x: 700, y: 640, texture: 'ground', width: 50 },
            { x: 600, y: 570, texture: 'ground', width: 50 },
            { x: 500, y: 500, texture: 'ground', width: 50 },
            { x: 500, y: 330, texture: 'ground', width: 50, moving: 'x_axe'},
            { x: 700, y: 330, texture: 'ground', width: 50, moving: 'x_axe'},
            { x: 900, y: 200, texture: 'ground', width: 50, moving: 'y_axe'},
        ],
        playerStart: {
            x: 0, 
            y: 740,
            texture: "player",
        },
        portal: {
            x: 50,
            y: 50,
            texture: 'portal',
            nextLevel: 'level4',
        },
        music: '',
    },
    Contract1:  {
        obstacles: [
            { x: 300, y: 600, texture: 'ground', width: 100 },
            { x: 1000, y: 600, texture: 'ground', width: 100 },
        ],
        playerStart: {
            x: 300,
            y: 560,
            texture: "player",
        },
        music: 'romain/scripts/music/boss1.mp3',
    }
};
