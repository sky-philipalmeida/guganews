/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function YouTube(/*name*/) {
  /*this.name = name;
}
/*
YouTube.prototype.greet = function() {
  return "Hi, I'm " + this.name;
};*/
}
    
YouTube.prototype.getURL = function(request, response) {
    
    // console.log(request.get.link);
    
    var videourl = request.get.link;
    
    var cache = require('memory-cache');    
    
    var cached=cache.get(videourl);
    if (cached) {
        console.log("From cache!");
        response.end(cached);
        return;
    }
    
    var sys = require('sys');
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { 
        if (stderr) {
            console.log(stderr);
        }
        // sys.puts(stdout);
        cache.put(videourl, stdout, 1000*60*30); 
        response.end(stdout);
    }

    exec("./other/youtube-dl -v -g  "+videourl, puts);
  
}

module.exports = YouTube;