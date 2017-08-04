var jsdom = require('jsdom').JSDOM;
var mx = require('../../libs/multiplex');
var Mustache = require('../../libs/mustache');
var dom = new jsdom("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n    <title>Document</title>\n</head>\n<body>\n    <div id=\"TestView\" style=\"display:none\">\n        <div id=\"testor\" data-property=\"Name\"></div>\n        <div id=\"testor2\" data-property=\"Name\">\n            <div id=\"testor3\"></div>\n        </div>\n        <div class=\"multi\"></div>\n        <div class=\"multi\"></div>\n        <input type=\"text\" id=\"mInput\" data-bind=\"model.name\" />\n        <p id=\"mOutput\" data-bind=\"model.name:tov\"></p>\n        <div id=\"mViewV\"></div>\n        <p id=\"mTextView\"></p>\n        <input type=\"text\" id=\"mInputView\" data-accept-button=\"#mButton\" />\n        <button type=\"button\" id=\"mButton\"></button>\n        <ul id=\"mListView\">\n            <li data-id=\"{{Id}}\">{{Name}}</li>\n        </ul>\n    </div>\n</body>\n</html>");
global.window = dom.window;
global.document = dom.window.document;
global.mx = mx;
global.Mustache = Mustache;
var modules = [
    "./core/http.js",
    "./core/servicepool.js",
    "./core/view.js",
    "./core/tinyts.js",
    "./utils/date.js",
    "./control/dialog.js",
    "./control/input.js",
    "./control/list.js",
    "./control/table.js",
    "./control/text.js",
    "./control/button.js"
];
(function () {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        for (var i = 0; i < modules.length; i++) {
            require(modules[i]);
        }
    }
    else if (typeof define === 'function') {
        require(modules);
    }
})();
