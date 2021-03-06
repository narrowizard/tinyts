var jsdom = require('jsdom').JSDOM;
var mx = require('../../libs/multiplex');
var Mustache = require('../../libs/mustache');

var dom = new jsdom(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="TestView" style="display:none">
        <div id="testor" data-property="Name"></div>
        <div id="testor2" data-property="Name">
            <div id="testor3"></div>
        </div>
        <div class="multi"></div>
        <div class="multi"></div>
        <input type="text" id="mInput" data-bind="model.name" />
        <p id="mOutput" data-bind="model.name:tov"></p>
        <div id="mViewV"></div>
        <p id="mTextView"></p>
        <input type="text" id="mInputView" data-accept-button="#mButton" />
        <button type="button" id="mButton"></button>
        <ul id="mListView" data-bind="model" data-pagable="async">
            <li data-id="{{Id}}">{{Name}}</li>
        </ul>
        <div class="list-view" data-pagable="sync">
            <p data-id="{{Id}}">{{Name}}</p>
        </div>
        <ul class="list-view" data-pagable="sync">
            <li data-id="{{Id}}">{{Name}}</li>
        </ul>
    </div>
</body>
</html>`);

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
