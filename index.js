const fs = require('fs');
const inquirer = require('inquirer');

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
        }
    ])

    .then(repoData => {
        console.log(repoData);
        return repoData;
    }) 
    .then(repoData => {
        generatePage(repoData)});

    
};

const generatePage = (repoData) => {
    console.log(repoData);
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', repoData, err => {
            if(err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    });
};

promptUser();

