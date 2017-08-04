import { ListView } from '../../control/list';

var assert = require('assert');

class DataModel {
    Name: string;
    Id: number;
}

describe("ListView", function () {

    it('render data', function () {
        var dataList = [];
        dataList.push({ Name: "John", Id: 1 });
        dataList.push({ Name: "Jaker", Id: 2 });
        dataList.push({ Name: "Queen", Id: 3 });

        var list = new ListView<DataModel>();
        list.SetSelector("#mListView");
        list.LoadView();
        list.SetData(dataList);
    });

});