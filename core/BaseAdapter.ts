abstract class BaseAdapter implements IListAdapter {

	abstract Count(): number;

	abstract Item(index: number): any;

	abstract ItemId(index: number): number;

	abstract View(index: number);

	Empty(): boolean {
		return this.Count() == 0;
	}

	StableIds() {
		return false;
	}


}