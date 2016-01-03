var LocalService = (function () {
    function LocalService() {
    }
    LocalService.prototype.GetReport = function (context) {
        $.getJSON("../data/report.json", function (data, textStatus, jqXHR) {
        });
    };
    return LocalService;
})();
//# sourceMappingURL=localService.js.map