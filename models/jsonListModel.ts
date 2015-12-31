class JsonListModel {
    static curId = 1;
    Name: string = "";
    Option: string;
    Options: string[] = [];
    Product: number;
    Id: number;
    PId: number;
    Children: JsonListModel[] = [];

    SetData(obj: any, pid: number, name: string) {
        if (!this.Id) {
            this.Id = JsonListModel.curId++;
            this.PId = pid;
            this.Option = name;
        }
        //二级商品
        if (obj.Options == null) {
            this.Product = obj.Product;
            return;
        }
        
        //需要解析
        this.Name = obj.Name;
        this.Options = obj.Options;
        for (var i = 0; i < this.Options.length; i++) {
            var o = obj[this.Options[i]];
            var temp = new JsonListModel();
            temp.SetData(obj[this.Options[i]], this.Id, this.Options[i]);
            this.Children.push(temp);
        }
    }

    GetChild(id: number): JsonListModel {
        if (this.Id == id)
            return this;
        if (this.Children == null) {
            return null;
        }
        var target = this.Children.where((p) => { return p.Id == id }).first();
        if (target == null) {
            for (var i = 0; i < this.Children.length; i++) {
                target = this.Children[i].GetChild(id);
                if (target != null) {
                    return target;
                }
            }
        } else {
            return target;
        }
    }

    AddChild(c: JsonListModel) {
        this.Children.push(c);
    }

    RemoveChild(id: number): boolean {
        if (this.Id == id) {

        }
        if (this.Children == null) {
            return false;
        }

        for (var i = 0; i < this.Children.length; i++) {
            if (this.Children[i].Id == id) {
                for (var j = i; j < this.Children.length - 1; j++) {
                    this.Children[j] = this.Children[j + 1];
                }
                this.Children.pop();
                return true;
            }
        }
        for (var i = 0; i < this.Children.length; i++) {
            var r = this.Children[i].RemoveChild(id);
            if (r) {
                return true;
            }
        }
        return false;
    }

    SetOption(option: string) {
        this.Option = option;
    }

    SetProduct(id: number) {
        this.Product = id;
    }

    ToJsonObj(): Object {
        var obj = new Object();
        if (this.Product > 0) {
            //二级商品
            obj["Product"] = this.Product;
            return obj;
        }
        if (this.Name == "" && this.Children.length == 0) {
            return obj;
        }
        obj["Name"] = this.Name;
        this.Options = [];
        for (var i = 0; i < this.Children.length; i++) {
            var temp = this.Children[i].ToJsonObj();
            if (temp != null) {
                this.Options.push(this.Children[i].Option);
                obj[this.Children[i].Option] = temp;
            }
        }
        obj["Options"] = this.Options;
        return obj;
    }

    ToJsonString(): string {
        return JSON.stringify(this.ToJsonObj());
    }

}