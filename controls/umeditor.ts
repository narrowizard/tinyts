class UMEditor extends View {
	editor: UE;

	LoadView() {
		var config = {
			toolbar: [
				'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
				'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize',
				'| justifyleft justifycenter justifyright justifyjustify |',
				'link unlink | image ',
				'| horizontal preview '
			],
			zIndex: 98
		};
		this.editor = UE.getEditor(this.ViewId(), config);
	}

	static ResizeEditor() {
		$(".edui-container").css("width", "95%");
		$(".edui-container").css("margin", "1%");
		$(".edui-body-container").css("width", "100%");
	}
}