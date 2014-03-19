// Saves options to localStorage.
function save_options() {
  var ip = document.getElementById("ip");
  var ipAddress = ip.value;
  localStorage["ip_address"] = ipAddress;
    
  var port = document.getElementById("port");
  var portNumber = port.value;
  localStorage["port"] = portNumber;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 1000);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var ipAddress = localStorage["ip_address"];   
    if (ipAddress) {
        var ip = document.getElementById("ip");
        ip.value = ipAddress;
    }

    var portNumber = localStorage["port"];   
    if (portNumber) {
        var port = document.getElementById("port");
        port.value = portNumber;
    }

}

function clear_options() {
    localStorage.removeItem("ip_address");
    localStorage.removeItem("port");
    var ip = document.getElementById("ip");
    ip.value = "";
    
    var port = document.getElementById("port");
    port.value = "";
    
    var status = document.getElementById("status");
    status.innerHTML = "Options Reset.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 1000);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#clear').addEventListener('click', clear_options);