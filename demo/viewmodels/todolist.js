var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TodoList = (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        _super.apply(this, arguments);
    }
    TodoList.prototype.init = function () {
        var data = [];
        this.mTodoList.SetData(data);
    };
    TodoList.prototype.RegisterEvents = function () {
        var me = this;
        me.mInput.On("keypress", function (event) {
            if (event.which == 13) {
                me.mTodoList.Add(new RadioModel(0, me.mInput.Value()));
            }
        });
        me.mTodoList.onItemClick = function (obj) {
            $(obj.target).remove();
        };
    };
    __decorate([
        view(TextBox), 
        __metadata('design:type', TextBox)
    ], TodoList.prototype, "mInput", void 0);
    __decorate([
        view(ItemList), 
        __metadata('design:type', ItemList)
    ], TodoList.prototype, "mTodoList", void 0);
    return TodoList;
})(BaseViewModel);
$().ready(function () {
    var tl = new TodoList();
    tl.init();
});
//# sourceMappingURL=todolist.js.map