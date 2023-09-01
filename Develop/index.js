// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Project title',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Project description',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation Instructions',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Project Usage',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Contribution info',
    },
    {
        type: 'input',
        name: 'email',
        message: 'email',
    },
    {
        type: 'input',
        name: 'github',
        message: 'github url',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license does this project have?',
        choices: ["MIT", "GNU", "Apache", "none"],
    }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName+'.md', data, (err) =>
        err ? console.error(err) : console.log('Success!')
    );
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
        .then((response) => {
            console.log(response);
            const readmeString = generateMarkdown(response);
            console.log(readmeString);
            writeToFile("readMe", readmeString)
        })


};

function generateMarkdown(data) {
    return `# ${data.title}
${renderLicenseBadge(data.license)}
## Description
  ${data.description}

## Installation 
  ${data.installation}

## Contributions
  ${data.contribution}

## Project Usage
${data.usage}

## GitHub
${data.github}

## Email
  <a href="mailto:${data.email}">${data.email}</a>
  `
}

function renderLicenseBadge(license){
let licenseBadge;
if (license === "MIT") {
    licenseBadge = `![License](https://img.shields.io/badge/License-MIT-darkblue)`
} else if (license === "GNU") {
    licenseBadge = `![License](https://img.shields.io/badge/License-GNU-blue)`
} else if (license === "Apache") {
    licenseBadge = `![License](https://img.shields.io/badge/License-Apache-green)`
} else {
    licenseBadge = `![License](https://img.shields.io/badge/No-license-red)`
}
return `[${licenseBadge}](LICENSE)`;
}

// Function call to initialize app
init(); 
