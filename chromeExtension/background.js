function pressed() {   

    chrome.tabs.getSelected(function callback(tab) {
        var url = tab.url;
        var lastString = url.split(".").pop();
        console.log("Last object was " + lastString);

        if(lastString == "gif") {
            var xhr = new XMLHttpRequest();
            var params = '{"url":"' + url + '"}';
            //http.open("POST", "http://172.29.96.71:8080, true);
            
            var ipAddress = localStorage["ip_address"];   
            var portNumber = localStorage["port"];  
            
            if(ipAddress && portNumber) {
                xhr.open("POST", "http://"+ ipAddress + ":" + portNumber, true);
            }
            else {
                xhr.open("POST", "http://localhost:8080", true);
            }
            xhr.setRequestHeader("Content-type", "application/json");
            //xhr.setRequestHeader("Content-length", params.length);
            //xhr.setRequestHeader("Connection", "close");
            xhr.send(params);
            setGreen();
            console.log("URL Sent");
        }
        else {
            console.log("Bad URL");
            setRed();    
        }
        setTimeout(setBlack, 2000);
    });
}

function setBlack() {
    chrome.browserAction.setIcon({path:"black.png"});
}

function setGreen() {
    chrome.browserAction.setIcon({path:"green.png"});
}

function setRed() {
    chrome.browserAction.setIcon({path:"red.png"});
}

chrome.browserAction.onClicked.addListener(pressed);
setBlack();