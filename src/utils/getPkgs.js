const util = require('util');
// Module exec command in terminal
const { exec } = require('child_process');
const execProm = util.promisify(exec);

// General function command execution
async function getPipList(command) {
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

    var pip3_container = document.getElementById('pip3-container');

    // Get System python versions
    getPipList("python3 -m pip list").then((result) => {
        // Filtering output
        const matchArray = result.stdout.toString().split('\n');
        const splicedArray = matchArray.splice(2, matchArray.length);
        const pips3 = splicedArray.filter((match) => match !== "");

        const data = {
            system: pips3
        };
        
        // Appending data to html element
        data.system.forEach(element => {
            var grid_elem = document.createElement('div');
            var grid_text = document.createElement('a');
            var delete_button = document.createElement('span');
            grid_elem.className = "grid-item";
            delete_button.className = "material-icons";
            grid_text.className = "grid-item-text";
            grid_elem.id = "grid-item";
            grid_text.innerText = element;
            delete_button.innerText = "cancel";
            var spaceIndex = element.indexOf(' ');
            var filteredPackage = element.substring(0, spaceIndex);
            delete_button.setAttribute("onclick", "askPassword('"+filteredPackage+"');");
            grid_elem.appendChild(grid_text);
            grid_elem.appendChild(delete_button);
            pip3_container.appendChild(grid_elem);
        });

    });

    
}


startProcess();