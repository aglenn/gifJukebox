var messager;
var retries = 0;

var MessageIO = Class.extend({
                init: function(opencallback) {
                    //log("opening connection to " + window.location.hostname);
                    this.ws = new WebSocket('ws://gifjukebox.com:9000');
                    this.ws.binaryType = 'arraybuffer';
                    
                    var me = this;
                    this.ws.onmessage = function(e) {me.onMessage(e);};
                    this.ws.onopen = opencallback;
                    this.ws.onerror = function(err) {
                        log("Server connection error, retrying");
                    };
                    this.ws.onclose = function() {
                        if(retries > 10) {
                            log("Server connection failure. Try refreshing later.");    
                        }
                        else {
                            setTimeout(start, 2000);
                            retries++;
                        }
                    }
                },
                send: function(msg) {
                    this.ws.send(message);                    
                },
                onMessage: function(e) {
                    var m = JSON.parse(e.data);
                    log(m.url);
                    var image = document.getElementById("gifPortal");
                    image.src = m.url;
                }});

window.onload = start;

function start() {
    log("starting...");
    delete messager;
    messager = new MessageIO(function() {
        //log("Socket Connected");
        send();
    });
}

function send() {
    //log("Send");
    messager.ws.send("Give me gif!");
}

function log(message) {
    var log = document.getElementById("logput");
    log.innerHTML = message
    console.log(message);
}