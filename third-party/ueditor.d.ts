interface UE {

}

interface UESTATIC {
	getEditor(id: string, config?: any): UE;
}

declare var UE: UESTATIC;