/*global require,exports,module,console,global,PATH*/
var fs = require('fs'),
    path = require('path'),
    mime = require('mime-types'),
    ejs = require('ejs');

/*
 * 功能：读取资源，返回给客户端
 */
var handler = {
    // 读取模板
    getView: function (filename, res, option, callback) {
        'use strict';
        filename = global.ROOTPATH + filename;  // 转为绝对路径
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                handler['404'](res);
            } else {
                res.writeHead(200, {'Content-Type': mime.lookup(path.extname(filename)) + '; charset=utf-8'});
                if (option && typeof option !== 'function') {
                    if (typeof callback === 'function') {
                        res.write(ejs.render(data, option), 'utf8', callback);    // option为模板变量
                    } else {
                        res.write(ejs.render(data, option), 'utf8');
                    }
                } else {
                    res.write(data, 'utf8', option);
                }
                res.end();
            }
        });
    },
    // 读取静态资源
    getStatic: function (filename, res) {
        'use strict';
        filename = global.ROOTPATH + filename;  // 转为绝对路径
        fs.readFile(filename, 'binary', function (err, data) {
            if (err) {
                handler['404'](res);
            } else {
                res.writeHead(200, {'Content-Type': mime.lookup(path.extname(filename)) + '; charset=utf-8'});
                res.write(data, 'binary');
                res.end();
            }
        });
    },
    '404': function (res) {
        'use strict';
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('404 Not Found');
        res.end();
    }
};

module.exports = handler;