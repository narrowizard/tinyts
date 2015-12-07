class Demo implements IViewModel {

	@view(Button)
	btnSubmit: Button;



	RegisterEvents() {
		var me = this;
		this.btnSubmit.OnClick((obj: JQueryEventObject) => {
			
		});
	}

}