var MessageIO = Class.extend({
                init: function(opencallback) {
                    log("opening connection to " + window.location.hostname);
                    this.ws = new WebSocket('ws://localhost:9000');
                    this.ws.binaryType = 'arraybuffer';
                    
                    var me = this;
                    this.ws.onmessage = function(e) {me.onMessage(e);};
                    this.ws.onopen = opencallback;
                    this.ws.onerror = function(err) {
                        log("Socket connection error: " + err.data);
                    };
                },
                send: function(msg) {
                    this.ws.send(message);
                },
                onMessage: function(e) {
                    var m = JSON.parse(e.data);
                    log("Got Message: " + m.url);
                    var image = document.getElementById("gifPortal");
                    image.src = m.url;
                }});

var messager;

window.onload = function start() {
    messager = new MessageIO(function() {
        log("Socket Connected");
        send();
    });
}

function send() {
    log("Send");
    messager.ws.send("Give me gif!");
}

function log(message) {
    var log = document.getElementById("logput");
    var logtext = log.innerHTML;
    log.innerHTML = logtext + message + "<br>";
}