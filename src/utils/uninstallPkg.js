var sudo = require('sudo-js');
var Dialogs = require('dialogs');

// Filtering and grabbing command output
function askPassword(package) {

    const dialogs = Dialogs();

    // Prompt user password
    dialogs.promptPassword(`Uninstall ${package}? Enter Password:`, ok => {
        
        if(!ok) {
            console.log("User cancelled!");
        } else {
            console.log("User entered psw!");
            var container = document.getElementById('loader-modal-container');
            container.style.display = 'block';
            uninstallPip3(package, ok);
        }

    })
    
}

// Execute uninstall pkg command
function uninstallPip3(package, password) {

    sudo.setPassword(password);
 
    var command = ['pip3', 'uninstall', '-y', package];
    sudo.exec(command, function(err, pid, result) {
        if (err == true) {
            
            // Appear red banner
            var banner_container = document.getElementById('banner-container');
            var banner = document.createElement('div');
            banner.className = "top-error-banner";
            banner.id = "banner";
            banner.innerText = pid.msg;
            banner_container.appendChild(banner);

        } else {
            console.log(command);
            var resArray = result.split('\n');
            resArray.forEach((str) => {
                str.trim();
            });
            // Appear green banner
            var resString = resArray.filter((elem) => elem.includes("Successfully uninstalled " + package));
            
            var banner_container = document.getElementById('banner-container');
            var banner = document.createElement('div');
            banner.className = "top-success-banner";
            banner.id = "banner";
            banner.innerText = resString;
            banner_container.appendChild(banner);
            
            setTimeout(function(){ 
                window.location.reload();
            }, 5000);
        }
    });

}