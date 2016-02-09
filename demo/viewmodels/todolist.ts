class TodoList extends BaseViewModel {

    @view(TextBox)
    mInput: TextBox;

    @view(ItemList)
    mTodoList: ItemList;

    init() {
        var data = [];
        this.mTodoList.SetData(data);
    }

    RegisterEvents() {
        var me = this;
        me.mInput.On("keypress", (event) => {
            if (event.which == 13) {
                me.mTodoList.Add(new RadioModel(0, me.mInput.Value()));
            }
        });

        me.mTodoList.onItemClick = (obj) => {
            $(obj.target).remove();
        };
    }
}

$().ready(() => {
    var tl = new TodoList();
});