/*global module,exports,require,console*/
var handler = require('./handler.js');

/*
 * 功能：控制器，控制输出视图
 */
module.exports = {
    '/reveal': function (filename, res) {
        'use strict';
        handler.getView(filename, res);
    },
    '/test': function (filename, res) {
        'use strict';
        handler.getView(filename, res);
    }
};