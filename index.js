const fs = require('fs');
const inquirer = require('inquirer');
let licenseLink = '';

const promptUser = () => {
    console.log(`
    ===========================
    Enter your Repo Information
    ===========================
    `)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the Title of your Repository?',
            validate: titleInput => {
                if(titleInput) {
                    return true;
                } else {
                    console.log('Please enter a title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a summary description for your project',
            validate: descriptionInput => {
                if(descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a description for your repository');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Describe the necessary steps for installation'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter the usage information for your repository'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your repo:',
            choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense']
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Enter how others can contribute to the project'
        },
        {
            type: 'confirm',
            name: 'testsConfirm',
            message: 'Are tests implemented?',
            default: true
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Enter how to implement tests on this project:',
            when: ({ testsConfirm }) => testsConfirm
        },
        {
            type: 'input',
            name: 'gitHubUser',
            message: 'Enter your GitHub username:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email for contacting',
        }
    ])

    .then(repoData => {
        console.log(repoData);
        return repoData;
    }) 
    .then(repoData => {
        const completedMarkdown = generatePage(repoData);
        writeFile(completedMarkdown);
    })

    
};

const generatePage = repoData => {
    const { title, description, installation, usage, license, contributing, testsConfirm, tests, gitHubUser, email } = repoData;
    console.log('this is the chosen license' + license);
    const licenseChoice = checkLicense(license);
    return `
${licenseChoice}  

# ${title}  

## Description of Project  
- ${description}.  

##Table of Contents  
- [Installation](#Installation)  
- [Usage](#Usage)  
- [License](#License)  
- [Contributing](#Contributing)  
- [Tests](#Tests)  
- [Questions](#Questions)  

# Installation  
- How to install this application:  
-- ${installation}  

# Usage  
${usage}  

# License  
${license}  
# Contributing  
- How to contribute:  
-- ${contributing}  

# Tests  
- Tests are used: ${testsConfirm}  
- How to test this application:  
-- ${tests}  

# Questions
- If you have further questions, feel free to see my contact information below:  
-- [GitHub](https://github.com/${gitHubUser})  
-- Email: ${email}  
    `
}

const writeFile = (data) => {
    fs.writeFile('./dist/README.md', data, err => {
        if(err) {
            return console.log(err);
        }
        console.log("Document has been created!");
        });
    };

const checkLicense = licenseName => {
    switch (licenseName) {
        case 'GNU AGPLv3':
            licenseLink = '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)'
            return licenseLink;
        case 'GNU GPLv3' :
            licenseLink = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
            return licenseLink;
        case 'GNU LGPLv3' :
            licenseLink = '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)'
            return licenseLink;
        case 'Mozilla Public License 2.0':
            licenseLink = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
            return licenseLink;
        case 'Apache License 2.0':
            licenseLink = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
            return licenseLink;
        case 'MIT License': 
            licenseLink = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
            return licenseLink;
        case 'Boost Software License 1.0':
            licenseLink = '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)'
            return licenseLink;
        case 'The Unlicense':
            licenseLink = 'Unlicensed'
            return licenseLink;
    }
}
promptUser()

