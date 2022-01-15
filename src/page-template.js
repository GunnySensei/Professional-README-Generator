const generatePage = repoData => {
    return `
    ${license}

    ##Title
    ${repoData.title}
    
    ##Description
    ${repoData.description}.
    
    ##Table of Contents
    [Installation](#Installation)
    [Usage](#Usage)
    [License](#License)
    [Contributing](#Contributing)
    [Tests](#Tests)
    [Questions](#Questions)
    
    #Installation
    ${repoData.installation}
    
    #Usage
    ${repoData.usage}
    #License
    
    #Contributing
    
    #Tests
    
    #Questions
    `
}

module.exports = { generatePage };
