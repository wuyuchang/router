/*jslint nomen:true*/
/*global global,require,console,PATH,CONFIG,REQUIRE,VAR,__dirname*/
global.ROOTPATH = __dirname;
var http = require('http'),
    router = require('./core/lib/router.js');

http.createServer(function (req, res) {
    'use strict';
    router.route(req, res);
}).listen(3000);

console.log('localhost:3000 was started.');