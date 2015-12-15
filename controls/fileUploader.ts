class FileUploader extends TextView {

	GetFile(): any {
		var files = this.target.prop("files");
		if (files.length != 0) {
			return files[0];
		}
		return null;
	}
}