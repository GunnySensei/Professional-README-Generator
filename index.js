const { rejects } = require('assert');
const fs = require('fs');
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const { resolve } = require('path');

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
        const completedMarkdown = generatePage(repoData)
        console.log(completedMarkdown);
        writeFile(completedMarkdown);
    })

    
};

const generatePage = repoData => {
    const { title, description, installation, usage, license, contributing, testsConfirm, tests, gitHubUser, email } = repoData;
    return `
${license}  

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
- How to contribute ${contributing}  

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

promptUser()

