/*global module,console,require,exports,global,REQUIRE,PATH*/
var fs = require('fs'),
    handler = require('./handler'),
    path = require('path'),
    url = require('url'),
    mime = require('mime-types'),
    controller = require('./controller.js');
/*
 * 功能：路由程序，只处理链接路径，把路径路由到对应文件
 * 读取方法：localhost:port/dir/filename 或 localhost:port/dir/filename.html 读取模板，例：localhost:3000/reveal可读取localhost:3000/views/reveal.html的模板
 * 读取方法：静态资源同上，无需要加static这层路径
 */
function route(req, res) {
    'use strict';
    var pathname = url.parse(req.url).pathname,
        controllerMethod = '',
        ext = '';
    
    // 如果以"/"结尾，则自动补充index.html
    if (pathname.slice(-1) === '/') {
        pathname += 'index.html';
    }
    
    // 如果无扩展名，则默认为.html扩展名
    if (!path.extname(pathname)) {
        pathname += '.html';
    }
    
    ext = path.extname(pathname);
    
    if (ext === '.html') { // 读视图
        controllerMethod = pathname.slice(0, -5);   // 去掉后缀，即为对应的控制器方法
        if (typeof controller[controllerMethod] === 'function') {   // 如果存在此控制器，则读取
            pathname = '/views' + pathname;     // 指到视图的目录
            controller[controllerMethod](pathname, res);
        } else {
            handler['404'](res);
        }
    } else {    // 读静态资源
        pathname = '/static' + pathname;    // 指到静态资源目录
        handler.getStatic(pathname, res);
    }
}

exports.route = route;