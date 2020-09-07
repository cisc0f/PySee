const util = require('util');
// Module exec command in terminal
const { exec } = require('child_process');
const execProm = util.promisify(exec);

// General function command execution
async function getPythonVersions(command) {
    let result;
    try {
        result = await execProm(command);
    } catch (e) {
        result = e;
    }
    if (Error[Symbol.hasInstance](result))
        return;

        console.log(result);

    return result;
}

// Filtering and grabbing command output
function startProcess() {

    var system_container = document.getElementById('system-container');
    var brew_container = document.getElementById('brew-container');

    // Get System python versions
    getPythonVersions("ls /usr/bin/python*").then((result) => {
        // Filtering output
        const matchArray = result.stdout.toString().split('\n');
        const pcPython = matchArray.filter((match) => match !== "");
        pcPython.forEach((e, index, array) => {
            array[index] = array[index].replace("/usr/bin/", "");
        });

        const data = {
            system: pcPython
        };
        
        // Appending data to html element
        data.system.forEach(element => {
            var grid_elem = document.createElement('div');
            grid_elem.className = "grid-item";
            grid_elem.id = "grid-item";
            grid_elem.innerText = element;
            system_container.appendChild(grid_elem);
        });

    });

    // Get Homebrew python versions
    getPythonVersions("/usr/local/Homebrew/bin/brew list").then((result) => {
        // Filtering output
        const matchArray = result.stdout.toString().split('\n');
        const hbPython = matchArray.filter((match) => match !== "");
        const hbData = hbPython.filter((element) => element.includes("python"));

        if(hbData.length <= 0) {
            hbData.push("No versions found")
        }

        const data = {
            homebrew: hbData
        };

        // Appending data to html element
        data.homebrew.forEach(element => {
            var grid_elem = document.createElement('div');
            grid_elem.className = "grid-item";
            grid_elem.id = "grid-item";
            grid_elem.innerText = element;
            brew_container.appendChild(grid_elem);
        });
        
    });
}


startProcess();