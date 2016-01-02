requirejs.config({
    baseUrl: "../../"
});

requirejs(["public/jquery.min", "core/ViewFilter", "core/BaseViewModel", "core/View", "core/ViewGroup", "core/TextView", "controls/TextBox", "controls/Button", "demo/view/addDialog", "demo/viewmodels/demo"], function () {

});