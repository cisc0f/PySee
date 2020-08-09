const fs = require('fs');
// Searching for MacOS username
const username = require("os").userInfo().username;

// Selecting html element
var pythonPath = document.getElementById('python-path');

// Grab Python Path from .bash_profile 
function getPath() {
    fs.readFile("/Users/"+username+"/.bash_profile", function read(err, data) {
        if(err) {
            throw err;
        }
        processFile(data);
    });
}

// Converting buffer to string and selecting string
function processFile(data) {
    const filteredFile = data.toString().split('\n');
    const finalPathArray = filteredFile.filter((element) => element.includes("PATH="));
    pythonPath.innerText = finalPathArray[0];
}

getPath();