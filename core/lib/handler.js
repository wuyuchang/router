/*global require,exports,module,console,global,PATH*/
var fs = require('fs'),
    path = require('path'),
    mime = require('mime-types');

/*
 * 功能：读取资源，返回给客户端
 */
var handler = {
    getFile: function (filename, res, option) {
        'use strict';
        filename = global.ROOTPATH + filename;  // 转为绝对路径
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                handler['404'](res);
            } else {
                res.writeHead(200, {'Content-Type': mime.lookup(path.extname(filename)) + '; charset=utf-8'});
                if (option) {
                    res.write(data, option);    // option为模板变量
                } else {
                    res.write(data);
                }
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