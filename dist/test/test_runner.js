// require('blanket')({
//     pattern: "core"
// });
var modules = [
    "./core/http.js",
    "./core/servicepool.js",
    "./core/view.js",
    "./utils/date.js"
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
