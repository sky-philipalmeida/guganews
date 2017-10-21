#!/bin/env node

baseurl = "http://www.guganews.com";
ip = process.env.OPENSHIFT_NODEJS_IP ? process.env.OPENSHIFT_NODEJS_IP : "0.0.0.0"; 
port = process.env.OPENSHIFT_NODEJS_PORT ? process.env.OPENSHIFT_NODEJS_PORT : "8080";


var http = require('http');
var Router = require('node-simple-router');
var YouTube = require('./controller/YouTube');


var youtube = new YouTube();
var router = new Router({static_route: __dirname + '/public'});

router.get("/getyoutubeurl/*", youtube.getURL);

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
