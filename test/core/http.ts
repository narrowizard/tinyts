import { UrlParser } from '../../core/http';
var assert = require('assert');

describe('Core', function () {
    describe('#UrlParser()', () => {
        it('test http://example.com/seg1/seg2?param=1&param=2&param=3&param2=3#title1', () => {
            var url = "http://example.com/seg1/seg2?param=1&param=2&param=3&param2=3#title1";
            var parser = new UrlParser();
            parser.Parse(url);

            assert.equal(parser.url, url);
            assert.equal(parser.pathname, "/seg1/seg2");
            assert.equal(parser.hash, "#title1");
            assert.equal(parser.host, "example.com");
            assert.equal(parser.hostname, "example.com");
            assert.equal(parser.port, "");
            assert.equal(parser.protocol, "http:");
            assert.equal(parser.search, "?param=1&param=2&param=3&param2=3");
            assert.deepEqual(parser.segments, ["seg1", "seg2"]);
            assert.deepEqual(parser.searchObject, {
                param: ["1", "2", "3"],
                param2: "3"
            });
        });

        it('test https://example.com/', () => {
            var url = "https://example.com/";
            var parser = new UrlParser();
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

        it('generate url with protocol', () => {
            var urlparser = new UrlParser();
            urlparser.host = "example.com";
            urlparser.pathname = "/seg1/seg2";
            urlparser.hash = "#cat";
            urlparser.port = "8080";
            urlparser.protocol = "http";
            urlparser.searchObject = {
                "age": "11",
                "what": "qq"
            };
            assert.equal(urlparser.Generate(), "http://example.com:8080/seg1/seg2?age=11&what=qq#cat");
        });

        it('test url compare', function () {
            var result = UrlParser.CompareUrls("http://example.com/seg1/seg2?param=1&param=2&param=3&param2=3#title1", "http://example.com/seg1/seg2?param=1&param=2&param=3&param2=3#title2");
            assert.ok(!result.Hash);
            assert.ok(result.Host);
            assert.ok(result.Path);
            assert.ok(result.Search);
            assert.ok(!result.Complete);
        });
    });
});