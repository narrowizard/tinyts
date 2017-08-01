"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../../core/http");
var assert = require('assert');
describe('Core', function () {
    describe('#UrlParser()', function () {
        it('test http://example.com/seg1/seg2?param=1&param=2&param2=3#title1', function () {
            var url = "http://example.com/seg1/seg2?param=1&param=2&param2=3#title1";
            var parser = new http_1.UrlParser();
            parser.Parse(url);
            assert.equal(parser.url, url);
            assert.equal(parser.pathname, "/seg1/seg2");
            assert.equal(parser.hash, "#title1");
            assert.equal(parser.host, "example.com");
            assert.equal(parser.hostname, "example.com");
            assert.equal(parser.port, "");
            assert.equal(parser.protocol, "http:");
            assert.equal(parser.search, "?param=1&param=2&param2=3");
            assert.deepEqual(parser.segments, ["seg1", "seg2"]);
            assert.deepEqual(parser.searchObject, {
                param: [1, 2],
                param2: 3
            });
        });
        it('test https://example.com/', function () {
            var url = "https://example.com/";
            var parser = new http_1.UrlParser();
            parser.Parse(url);
            assert.equal(parser.url, url);
            assert.equal(parser.pathname, "/");
            assert.equal(parser.hash, "");
            assert.equal(parser.host, "example.com");
            assert.equal(parser.hostname, "example.com");
            assert.equal(parser.port, "");
            assert.equal(parser.protocol, "https:");
            assert.equal(parser.search, "");
            assert.deepEqual(parser.segments, [""]);
        });
    });
});
