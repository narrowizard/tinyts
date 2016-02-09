var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Searcher = (function (_super) {
    __extends(Searcher, _super);
    function Searcher() {
        _super.apply(this, arguments);
    }
    Searcher.prototype.SetTemplate = function () {
        this.template = "<div>\n                            <h1>\u6807\u9898</h1>\n                            <div>\u5185\u5BB9\u5185\u5BB9\u5185\u5BB9</div>\n                            <input type='text' id='sInput' />\n                            <button type='button' id='btnSubmit'>\u63D0\u4EA4</button>\n                        </div>";
    };
    Searcher.prototype.RegisterEvents = function () {
        var me = this;
        this.btnSubmit.OnClick(function () {
            alert("hello" + me.sInput.Value());
        });
    };
    __decorate([
        view(TextBox), 
        __metadata('design:type', TextBox)
    ], Searcher.prototype, "sInput");
    __decorate([
        view(Button), 
        __metadata('design:type', Button)
    ], Searcher.prototype, "btnSubmit");
    return Searcher;
})(VirtualView);
//# sourceMappingURL=searcher.js.map