#!/bin/env node

baseurl = "http://www.gugamarket.com";
ip = process.env.OPENSHIFT_NODEJS_IP;
port = process.env.OPENSHIFT_NODEJS_PORT;

var http = require('http');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./public");

var server = http.createServer(function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  	var done = finalhandler(req, res)
  	serve(req, res, done)
});

server.listen(port,ip);