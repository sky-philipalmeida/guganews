#!/bin/env node



baseurl = "http://www.guganews.com";
ip = process.env.OPENSHIFT_NODEJS_IP ? process.env.OPENSHIFT_NODEJS_IP : "172.21.215.87"; 
port = process.env.OPENSHIFT_NODEJS_PORT ? process.env.OPENSHIFT_NODEJS_PORT : "8000";


var http = require('http');
var Router = require('node-simple-router');
var YouTube = require('./controller/YouTube');


var youtube = new YouTube();
var router = new Router({static_route: __dirname + '/public'});

router.get("/getyoutubeurl/*", youtube.getURL);

var server = http.createServer(router);

server.listen(port,ip);