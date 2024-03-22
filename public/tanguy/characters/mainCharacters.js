// characters/mainCharacters.js

export const mainCharacters = [
    {
        key: 'character_tanguy',
        name: 'Tanguy',
        image_key: 'option_tanguy',
        image: 'tanguy/assets/chars/tanguy.png',
        sprite: 'tanguy/assets/chars/char_tanguy.png',
        age: 22,
        genre: 'homme',
        health: 100,
        vulnerability: 'confiance en soi',
        skills: {
            soft: {
                force: 30,
                genius: 100,
                defense: 30,
            },
            hard: {
                languages: {
                    1: 'PHP',
                    2: 'React',
                    3: 'ThreeJS',
                    4: 'SQL'
                }
            }
        }
    },
    {
        key: 'character_dylan',
        name: 'Dylan',
        image_key: 'option_dylan',
        image: 'tanguy/assets/chars/dylan.png',
        sprite: 'tanguy/assets/chars/char_dylan.png',
        age: 26,
        genre: 'homme',
        health: 50,
        vulnerability: 'orthographe',
        skills: {
            soft: {
                force: 100,
                genius: 60,
                defense: 70,
            },
            hard: {
                languages: {
                    1: 'Laravel',
                    2: 'React',
                    3: 'Node',
                    4: 'TailwindCSS'
                }
            }
        }
    },
    {
        key: 'character_nathan',
        name: 'Nathan',
        image_key: 'option_nathan',
        image: 'tanguy/assets/chars/nathan.png',
        sprite: 'tanguy/assets/chars/char_nathan.png',
        age: 27,
        genre: 'homme',
        health: 70,
        vulnerability: 'franchise',
        skills: {
            soft: {
                force: 90,
                genius: 80,
                defense: 30,
            },
            hard: {
                languages: {
                    1: 'PHP'
                }
            }
        }
    },
];