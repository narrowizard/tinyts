export class RadioModel implements IModel {
	Value: any;
	Text: string;
	Id: any;

	constructor(value: any, text: string) {
		this.Value = value;
		this.Text = text;
	}
}

export class SelectButtonModel implements IModel {
	Id: any;
	Text: string;
	Status: boolean;
}