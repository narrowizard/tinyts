requirejs.config({
    baseUrl: "../../"
});

requirejs(["public/jquery.min", "core/ViewFilter", "core/BaseViewModel", "core/View", "core/ViewGroup", "core/TextView", "core/ListView", "core/VirtualView",
    "models/tableColumn",
    "controls/TextBox", "controls/Button", "controls/tableView", "demo/virtuals/searcher", "demo/models/user",
    "demo/viewmodels/demo"], function () {

    });