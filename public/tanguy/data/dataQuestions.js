// data/dataQuestions.js

import { dataJobs } from "./dataJobs.js";
import { recruiterCharacters } from "../characters/recruiterCharacters.js";

export const dataQuestions = [];

const technicalQuestions = [
    { id: 1, question: "Quelles sont vos compétences techniques ?" },
    { id: 2, question: "Quelle est votre expérience avec les\nlangages de programmation ?" },
    { id: 3, question: "Quelle est votre expérience avec les\nbases de données ?" },
    { id: 4, question: "Quelle est votre expérience avec les\nframeworks ?" },
    { id: 5, question: "Quels sont vos objectifs professionnels ?" },
    { id: 6, question: "Quelles sont vos attentes pour ce poste ?" },
    { id: 7, question: "Quels sont vos atouts ?" },
    { id: 8, question: "Quels sont vos points faibles ?" },
    { id: 9, question: "Quelle est votre méthode de\ntravail ?" },
];

const personnalQuestions = [
    { id: 1, question: "Quel est votre prénom ?" },
    { id: 2, question: "Quel est votre sexe ?" },
    { id: 3, question: "Quel est votre âge ?" },
];

recruiterCharacters.forEach(recruiter => {
    dataJobs
        .filter(job => job.building_key[0] === recruiter.building_keys[0])
        .forEach(job => {
            dataQuestions.push({
                id: dataQuestions.length + 1,
                building_key: job.building_key,
                company: recruiter.company,
                title: job.title,
                personnal_questions: personnalQuestions,
                technical_questions: technicalQuestions,
                vulnerability: job.vulnerability,
            });
        });
}
);