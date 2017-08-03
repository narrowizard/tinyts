import { View } from '../../core/view';

var assert = require('assert');
var jsdom = require('jsdom').JSDOM;

var dom = new jsdom(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="testor"></div>
</body>
</html>`);

global.window = dom.window;
global.document = dom.window.document;

describe('Core', function () {

    before(function () {
        global.$ = require('jquery')
    });

    it('test view', function () {
        var v = new View();
        v.SetSelector("#testor");
        assert.equal(v.LoadView(), true);
    })

})



