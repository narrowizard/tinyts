class ArrayAdapter<T> extends BaseAdapter {
	mData: T[];

	constructor(data: T[]) {
		super();
		this.mData = data;
	}

	Count(): number {
		return this.mData.length;
	}

	Item(index: number): T {
		if (index < 0 || index > this.mData.length) {
			return null;
		} else {
			return this.mData[index];
		}
	}

	ItemId(index: number): number {
		return 0;
	}

	View(index: number) {

	}
}