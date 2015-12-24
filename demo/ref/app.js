requirejs.config({
    baseUrl: "../../"
});

requirejs(["public/jquery.min", "public/jquery.mousewheel.min", "core/ViewFilter", "core/ViewBinder", "core/View", "core/ListView", "models/scrollPageModel", "controls/scrollPageView", "demo/viewmodels/demo"], function () {

});