abstract class ListControl<T extends IModel> extends BaseControl {
	mData: T[];
	
	// RegisterEvents 在这里注册Item的事件
	registerEvents: () => void;

	constructor(id: string) {
		super(id);
	}

	SetData(data: T[]) {
		this.mData = data;
		this.RefreshView();
	}

	Add(model: T) {
		this.mData.push(model);
		this.target.append(this.GetView(this.mData.length));
	}

	Remove(index: number);
	Remove(obj: T);
	Remove(p: any) {
		if (typeof p == "number") {
			var index = <number>p;
			if (index < 0 || index > this.mData.length) {
				return;
			}
			for (var i = index; i < this.mData.length - 1; i++) {
				this.mData[i] = this.mData[i + 1];
			}
		} else {
			var obj = <T>p;
			for (var j = 0; j < this.mData.length; j++) {
				if (this.mData[j] == obj) {
					for (var i = j; i < this.mData.length - 1; i++) {
						this.mData[i] = this.mData[i + 1];
					}
					return;
				}
			}
		}
	}

	abstract GetView(index: number): string;

	GetItem(predicate: (p: T) => boolean): T;
	GetItem(index: number): T;
	GetItem(param: any) {
		if (typeof param == "number") {
			var index = <number>param;
			if (index < 0 || index > this.mData.length) {
				return null;
			}
			return this.mData[index];
		} else if (typeof param == "function") {
			var predicate = <(p: T) => boolean>param;
			return this.mData.where(predicate).first();
		}
	}

	GetItemId(index: number): number {
		if (index < 0 || index > this.mData.length) {
			return 0;
		} else {
			return this.mData[index].Id;
		}
	}

	Count(): number {
		return this.mData.length;
	}

	abstract RefreshView();

}