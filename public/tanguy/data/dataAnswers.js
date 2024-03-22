// data/dataAnswers.js

import { mainCharacters } from "../characters/mainCharacters.js";

const generateRandomMalus = () => {
    const values = [-1, 1, 2];
    return values[Math.floor(Math.random() * values.length)];
};

export const dataAnswers = mainCharacters.map(character => {
    return {
        character: character.name,
        technical_answers: [
            {
                id: 1,
                id_question: 1,
                answer: "Je suis un développeur full-stack.",
                malus: generateRandomMalus(),
            },
            {
                id: 2,
                id_question: 1,
                answer: "Je suis un développeur front-end.",
                malus: generateRandomMalus(),
            },
            {
                id: 3,
                id_question: 1,
                answer: "Je suis un développeur back-end.",
                malus: generateRandomMalus(),
            },
            {
                id: 4,
                id_question: 2,
                answer: Object.values(character.skills.hard.languages).join(", "),
                malus: generateRandomMalus(),
            },
            {
                id: 5,
                id_question: 2,
                answer: "Django, Laravel, PostgreSQL",
                malus: generateRandomMalus(),
            },
            {
                id: 6,
                id_question: 2,
                answer: "React, Vue.js, Angular, Node.js",
                malus: generateRandomMalus(),
            },
            {
                id: 7,
                id_question: 2,
                answer: "Java, C#, .NET, SQL Server",
                malus: generateRandomMalus(),
            },
            {
                id: 8,
                id_question: 3,
                answer: Object.values(character.skills.hard.languages).join(", "),
                malus: generateRandomMalus(),
            },
            {
                id: 9,
                id_question: 3,
                answer: "SQL, NoSQL, MongoDB, Firebase",
                malus: generateRandomMalus(),
            },
            {
                id: 10,
                id_question: 3,
                answer: "SQL, NoSQL, PostgreSQL, MySQL",
                malus: generateRandomMalus(),
            },
            {
                id: 11,
                id_question: 3,
                answer: "SQL, NoSQL, Oracle, SQL Server",
                malus: generateRandomMalus(),
            },
            {
                id: 12,
                id_question: 4,
                answer: Object.values(character.skills.hard.languages).join(", "),
                malus: generateRandomMalus(),
            },
            {
                id: 13,
                id_question: 4,
                answer: "React, Vue.js, Angular, Node.js",
                malus: generateRandomMalus(),
            },
            {
                id: 14,
                id_question: 4,
                answer: "Django, Laravel, Python",
                malus: generateRandomMalus(),
            },
            {
                id: 15,
                id_question: 4,
                answer: "NextJS, NestJS, Express, MongoDB, Firebase",
                malus: generateRandomMalus(),
            },
            {
                id: 16,
                id_question: 5,
                answer: "Je veux devenir un développeur\nfull-stack.",
                malus: generateRandomMalus(),
            },
            {
                id: 17,
                id_question: 5,
                answer: "Je veux devenir un développeur\nsenior.",
                malus: generateRandomMalus(),
            },
            {
                id: 18,
                id_question: 5,
                answer: "Je veux devenir un développeur\nlead.",
                malus: generateRandomMalus(),
            },
            {
                id: 19,
                id_question: 6,
                answer: "Je veux apprendre de nouvelles\ntechnologies.",
                malus: generateRandomMalus(),
            },
            {
                id: 20,
                id_question: 6,
                answer: "Je veux travailler sur des\nprojets innovants.",
                malus: generateRandomMalus(),
            },
            {
                id: 21,
                id_question: 6,
                answer: "Je veux travailler sur des\nprojets impactants.",
                malus: generateRandomMalus(),
            },
            {
                id: 22,
                id_question: 7,
                answer: "Je suis autonome.",
                malus: generateRandomMalus(),
            },
            {
                id: 23,
                id_question: 7,
                answer: "Je suis organisé.",
                malus: generateRandomMalus(),
            },
            {
                id: 24,
                id_question: 7,
                answer: "Je suis communicatif.",
                malus: generateRandomMalus(),
            },
            {
                id: 25,
                id_question: 8,
                answer: "Je suis perfectionniste.",
                malus: generateRandomMalus(),
            },
            {
                id: 26,
                id_question: 8,
                answer: "Je suis impatient.",
                malus: generateRandomMalus(),
            },
            {
                id: 27,
                id_question: 8,
                answer: "Je suis stressé.",
                malus: generateRandomMalus(),
            },
            {
                id: 28,
                id_question: 9,
                answer: "Je suis agile.",
                malus: generateRandomMalus(),
            },
            {
                id: 29,
                id_question: 9,
                answer: "Je suis méthodique.",
                malus: generateRandomMalus(),
            },
            {
                id: 30,
                id_question: 9,
                answer: "Je suis adaptable.",
                malus: generateRandomMalus(),
            },
        ],
        personal_answers: [
            {
                id: 1,
                id_question: 1,
                answer: `Je m'appelle ${character.name}.`,
                malus: generateRandomMalus(),
            },
            {
                id: 2,
                id_question: 1,
                answer: `Bonjour, je m'appelle ${character.name}.`,
                malus: generateRandomMalus(),
            },
            {
                id: 3,
                id_question: 1,
                answer: `Yo ! Moi c'est ${character.name} !`,
                malus: generateRandomMalus(),
            },
            {
                id: 4,
                id_question: 2,
                answer: `Je suis un ${character.genre}.`,
                malus: generateRandomMalus(),
            },
            {
                id: 5,
                id_question: 2,
                answer: `Mon genre est ${character.genre}.`,
                malus: generateRandomMalus(),
            },
            {
                id: 6,
                id_question: 2,
                answer: `Je m'identifie comme étant du\ngenre ${character.genre}.`,
                malus: generateRandomMalus(),
            },
            {
                id: 7,
                id_question: 3,
                answer: `J'ai ${character.age} ans.`,
                malus: generateRandomMalus(),
            },
            {
                id: 8,
                id_question: 3,
                answer: `Mon âge est ${character.age}.`,
                malus: generateRandomMalus(),
            },
            {
                id: 9,
                id_question: 3,
                answer: `Je suis âgé de ${character.age} ans.`,
                malus: generateRandomMalus(),
            },
        ],
    };
});