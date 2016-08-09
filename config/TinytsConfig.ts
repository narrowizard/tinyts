
export var controlConfig = {
    // edit dialog
    dialogMaskClass: "mask",
    dialogCloseButtonSelector: ".close",
    // item list
    itemlistActiveClass: "active",
    // radio button
    radiobuttonPrefix: "radio_",
    // select button
    selectbuttonActiveClass: "active",
    // table 
    tableNavItemClass: "btn btn-xs btn-info",
    // confirm dialog
    confirmDialogMessageSelector: ".confirm-message",
    confirmButton: ".btn-confirm",
    defaultPageSize: 10
};

/**
 * dataPoolReleaseRate 每次释放data pool时的比例
 */
export var dataPoolReleaseRate = 0.2;

/**
 * dirtyNeedRefreshData 需要刷新到local storage的最小dirty数
 */
export var dirtyNeedRefreshData = 10;

/**
 * writeInterval 脏检查时间间隔(秒)
 */
export var writeInterval = 5;
