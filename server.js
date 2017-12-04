#!/bin/env node
var Config = require('./config.js');
var fs = require('fs');
var cache = require('memory-cache');

ip = process.env.OPENSHIFT_NODEJS_IP ? process.env.OPENSHIFT_NODEJS_IP : Config.host; 
port = process.env.OPENSHIFT_NODEJS_PORT ? process.env.OPENSHIFT_NODEJS_PORT : Config.port;

var http = require('http');
var Router = require('node-simple-router');
var YouTube = require('./controller/YouTube');
var Location = require('./controller/Location');
var Article = require('./controller/Article');
var ImageColor = require('./controller/ImageColor');

var youtube = new YouTube();
var location = new Location();
var article = new Article();
var imagecolor = new ImageColor();
var router = new Router({static_route: __dirname + '/public'});

router.get("/getyoutubeurl/*", youtube.getURL);
router.get("/getlocation/*", location.get);
router.get("/getarticle/*", article.get);
// Must be done client side too muth be packages namely cairo.
//router.get("/getimagecolor/*", imagecolor.get);

var server = http.createServer(router);

server.listen(port,ip);

// Install python event-registry SDK
/*
var spawn = require('child_process').spawn;
const out = spawn("./event-registry-python-install.sh");

var outInstall = "";
out.stdout.on('data', (data) => {
  // console.log(`stdout: ${data}`);
  outInstall+=data;
});
out.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});
out.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
  console.log(outInstall)
});
*/
