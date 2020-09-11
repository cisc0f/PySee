var sudo = require('sudo-js');
const prompt = require('electron-prompt');


// Filtering and grabbing command output
function askPassword(package) {

    prompt({
        title: 'PySee',
        label: 'Type in your pc password to uninstall ' + package,
        alwaysOnTop: true,
        height: 200,
        width: 500,
        inputAttrs: {
            type: 'password',
            required: true
        },
        type: 'input'
    })
    .then((r) => {
        if(r === null) {
            console.log('User cancelled!');
        } else {
            console.log('User pass inserted!');
            var container = document.getElementById('loader-modal-container');
            container.style.display = 'block';
            uninstallPip3(package, r);
        }
    })
    .catch(console.error);   
    
}

function uninstallPip3(package, password) {

    sudo.setPassword(password);
 
    var command = ['pip3', 'uninstall', '-y', package];
    sudo.exec(command, function(err, pid, result) {
        if (err == true) {
            var banner_container = document.getElementById('banner-container');
            var banner = document.createElement('div');
            banner.className = "top-error-banner";
            banner.id = "banner";
            banner.innerText = pid.msg;
            banner_container.appendChild(banner);
        } else {
            var resArray = result.split('\n');
            resArray.forEach((str) => {
                str.trim();
            });
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