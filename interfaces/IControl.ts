// IControl 控件实现该接口
// 请为实现该接口的类提供一个构造函数 constructor(id : string)
// 这里的id表示DOM中id为此id的元素，并将id记录在类中
interface IControl
{
	// LoadView 请在这个函数中绑定DOM与控件并做一些初始化处理
	LoadView();	
		
}