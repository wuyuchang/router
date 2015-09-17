/*global module,exports,require,console*/
var handler = require('./handler.js');

/*
 * 功能：控制器，控制输出视图
 */
module.exports = {
    '/reveal': function (filename, res, callback) {
        'use strict';
        
        handler.getFile(filename, res);
    },
    '/test': function (filename, res) {
        'use strict';
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('this is a test file');
        res.end();
    }
};