// data/dataJobs.js
import { recruiterCharacters } from "../characters/recruiterCharacters.js";

export const dataJobs = [];

const titles = ["Alternant Développeur", "Développeur", "Ingénieur"];

const descriptions = [
    "Formation en alternance entre\nécole et entreprise. Développement\nde compétences pratiques en codage,\nrésolution de problèmes et\ncollaboration au sein d'une équipe de\ndéveloppement.",
    "Conception, développement, et\nmaintenance d'applications web.\nMaîtrise des langages (ex. JavaScript,\nHTML, CSS), frameworks,\net bases de données. Collaboration\navec des équipes pour assurer\ndes solutions fiables et\névolutives.",
    "Concevoir, développer, et optimiser\ndes applications web. Expérience\ndans les langages (ex. JavaScript,\nHTML, CSS), frameworks,\net architectures web. Analyser\nles besoins, assurer la qualité,\net rester à jour sur les\ndernières technologies.",
];

const languages = [
    "JavaScript, HTML, CSS,\nReact, Node.js, MongoDB",
    "PHP, SQL, Laravel,\nWordPress, WooCommerce",
    "Java, C++, Python,\nDjango, Flask, PostgreSQL"
];

const salaries = [
    "10k - 20k",
    "25k - 35k",
    "30k - 40k"
];

const vulnerabilities = [
    "confiance en soi",
    "orthographe",
    "franchise",
    "résistance au stress",
    "organisation",
    "autonomie"
];

recruiterCharacters.forEach(recruiter => {
    for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * titles.length);
        const title = titles[index];
        const description = descriptions[index];
        const skills = languages[index];
        const salary = salaries[index];
        const vulnerability = vulnerabilities[Math.floor(Math.random() * vulnerabilities.length)];

        dataJobs.push(
            {
                id: dataJobs.length + 1,
                building_key: recruiter.building_keys,
                company: recruiter.company,
                title: title,
                description: description,
                skills: skills,
                salary: salary,
                vulnerability: vulnerability
            }
        );
    }
});