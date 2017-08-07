import { ListView } from '../../control/list';
import { AncView, v } from '../../core/tinyts';

var assert = require('assert');

class DataModel {
    Name: string;
    Id: number;
}

class TestView extends AncView {

    model: DataModel[];

    @v(ListView)
    mListView: ListView<DataModel>;

    AfterInject() {

        this.mListView.GetPageManager().getData = (index, pagesize) => {
            var temp = [];
            for (var i = 0; i < pagesize; i++) {
                temp.push({ Name: "narro", Id: index });
            }
            this.mListView.SetData(temp);
            this.mListView.GetPageManager().SetPageCount(2);
        };

        this.mListView.SetEventHandler("li", () => {

        });

        this.mListView.RemoveEventHandler("li");

        this.mListView.UnbindEvents("li");
    }

}

describe("ListView", function () {

    it('array proxy', function () {
        var vm = new TestView();
        vm.model.push({ Name: "John", Id: 1 });
        vm.model.push({ Name: "Jaker", Id: 2 });
        vm.model.push({ Name: "Queen", Id: 3 });
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "John", Id: 1 }, { Name: "Jaker", Id: 2 }, { Name: "Queen", Id: 3 }]);

        vm.model.pop();
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "John", Id: 1 }, { Name: "Jaker", Id: 2 }]);

        vm.model.shift();
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "Jaker", Id: 2 }]);

        vm.model.unshift({ Name: "John", Id: 1 });
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "John", Id: 1 }, { Name: "Jaker", Id: 2 }]);

        vm.model.reverse();
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "Jaker", Id: 2 }, { Name: "John", Id: 1 }]);

        vm.model.sort((a, b) => { return a.Id - b.Id });
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "John", Id: 1 }, { Name: "Jaker", Id: 2 }]);

        vm.model.splice(0, 1);
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "Jaker", Id: 2 }]);

        vm.mListView.Traverse((index, elem) => {
            assert.equal($(elem).attr('data-id'), 2);
            return true;
        });

        vm.mListView.SetPageSize(1);

        vm.mListView.GetPageManager().FirstPage();
        assert.deepEqual(vm.mListView.GetData()[0], { Name: "narro", Id: 1 });

        vm.mListView.GetPageManager().LastPage();
        assert.deepEqual(vm.mListView.GetData()[0], { Name: "narro", Id: 2 });

        vm.mListView.GetPageManager().PrevPage();
        assert.deepEqual(vm.mListView.GetData()[0], { Name: "narro", Id: 1 });

        vm.mListView.GetPageManager().NextPage();
        assert.deepEqual(vm.mListView.GetData()[0], { Name: "narro", Id: 2 });

        vm.mListView.GetPageManager().TurnToPage(1);
        assert.deepEqual(vm.mListView.GetData()[0], { Name: "narro", Id: 1 });
    });

    it('multipart list', function () {
        var ll = new ListView<DataModel>();
        ll.SetSelector(".list-view");
        ll.LoadView();
        assert.equal(ll.IsMultiparted(), true);

        ll.SetData([{ Name: "John", Id: 1 }, { Name: "Jaker", Id: 2 }, { Name: "Queen", Id: 3 }]);

    });

});