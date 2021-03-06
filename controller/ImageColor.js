var Config = require('../config.js');

function ImageColor() {}
ImageColor.prototype.get = function(request, response) {
    
    var country = request.get.country;
    
    var cache = require('memory-cache');
    
    var cached=cache.get(country);
    if (cached) {
        console.log("From cache!");
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(cached);
        return;         
    }

    var cmd = "python ./controller/python/ImageColor.py"
 
    var sys = require('sys');
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { 
        if (stderr) {
            console.log(stderr);
        }
        cache.put(country, stdout, Config.cachetimeout); 
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(stdout);
    }

    exec(cmd, puts);
}

module.exports = ImageColor;