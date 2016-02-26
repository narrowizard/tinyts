requirejs.config({
    baseUrl: "../../"
});

requirejs(["public/jquery.min", "core/ViewFilter", "core/BaseViewModel", "core/View", "core/ViewGroup", "core/TextView", "core/InputView", "core/ListView", "core/VirtualView",
    "validators/IValidator", "validators/StringValidator",
    "models/tableColumn",
    "controls/TextBox", "controls/Button", "controls/tableView", "demo/virtuals/searcher", "demo/models/user",
    "demo/views/test", "demo/viewmodels/demo"], function () {

    });