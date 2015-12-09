var HttpRequest = (function () {
    function HttpRequest() {
    }
    HttpRequest.POST = function (url, data, callback) {
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function (res) {
                if (res.Code == 0) {
                    callback(res.Data);
                }
                else {
                }
            },
            error: function (res) {
            }
        });
    };
    HttpRequest.GET = function (url, data, callback) {
        $.ajax({
            url: url,
            type: "GET",
            data: data,
            success: function (res) {
                if (res.Code == 0) {
                    callback(res.Data);
                }
                else {
                }
            },
            error: function (res) {
            }
        });
    };
    return HttpRequest;
})();
//# sourceMappingURL=HttpRequest.js.map