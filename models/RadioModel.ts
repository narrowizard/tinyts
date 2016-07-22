/**
 * 该类将在接下来的版本被废弃掉
 */
export class RadioModel implements IModel {
	Value: any;
	Text: string;
	Id: any;

	constructor(value: any, text: string) {
		this.Value = value;
		this.Text = text;
	}
}
/**
 * 该类将在接下来的版本被废弃掉
 */
export class SelectButtonModel implements IModel {
	Id: any;
	Text: string;
	Status: boolean;
}