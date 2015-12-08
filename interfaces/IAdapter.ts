interface IAdapter {
	Count(): number;
	Item(index: number): any;
	ItemId(index: number): number;
	StableIds(): boolean;
	Empty(): boolean;
	View(index: number);
}