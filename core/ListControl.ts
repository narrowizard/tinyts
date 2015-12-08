class ListControl extends BaseControl {
	// adapter: IAdapter;
	mData: any[];

	constructor(id: string) {
		super(id);
	}

	SetData(data: any[]) {
		this.mData = data;
	}

	NotifyDataSetChanged() {

	}
	
	
	RefreshView(){
		
	}

	// SetAdapter(a: IAdapter) {
	// this.adapter = a;
	// }
}