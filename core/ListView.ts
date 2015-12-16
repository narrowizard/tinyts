class ListView<T> extends View {
	mData: T[];

	/**
	 * 设置数据,并刷新视图
	 * @param data 数据集合
	 */
	SetData(data: T[]) {
		this.mData = data;
		this.RefreshView();
	}
	
	/**
	 * 添加数据,并刷新视图
	 * @param T 数据元素
	*/
	Add(model: T) {
		this.mData.push(model);
		this.append(this.GetView(this.mData.length));
	}
	
	/**
	 * 清空列表
	*/
	Clear() {
		this.target.html("");
	};

	/**
	 * 移除某个指定元素
	 * @param index 指定索引
	 * @param obj 指定元素的引用,可由GetItem得到
	 */
	Remove(index: number);
	Remove(obj: T);
	Remove(p: any) {
		if (typeof p == "number") {
			var index = <number>p;
			if (index < 0 || index > this.mData.length) {
				return;
			}
			for (var i = index; i < this.mData.length - 1; i++) {
				this.mData[i] = this.mData[i + 1];
			}
		} else {
			var obj = <T>p;
			for (var j = 0; j < this.mData.length; j++) {
				if (this.mData[j] == obj) {
					for (var i = j; i < this.mData.length - 1; i++) {
						this.mData[i] = this.mData[i + 1];
					}
					break;
				}
			}
		}
		this.RefreshView();
	}
	
	/**
	 * 获取某个指定的元素
	 * @param index 指定索引
	 * @param predicate 指定条件,返回true表示满足条件
	 */
	GetItem(predicate: (p: T) => boolean): T;
	GetItem(index: number): T;
	GetItem(param: any) {
		if (typeof param == "number") {
			var index = <number>param;
			if (index < 0 || index > this.mData.length) {
				return null;
			}
			return this.mData[index];
		} else if (typeof param == "function") {
			var predicate = <(p: T) => boolean>param;
			return this.mData.where(predicate).first();
		}
	}

	/**
	 * 获取数组元素的长度
	 */
	Count(): number {
		return this.mData.length;
	}

	/**
	 * 获取指定索引元素的Id(唯一编号)
	 * 未在该类中实现,请在子类中实现
	 * @param index 索引
	 */
	GetItemId(index: number): number {
		return 0;
	}
	/**
	 * 获取列表中某一个元素的html代码
	 * @param index 索引
	*/
	GetView(index: number): string{
		return "";
	};

	/**
	 * 刷新整个ListView的列表部分
	 */
	RefreshView() {
		this.Clear();
		for (var i = 0; i < this.mData.length; i++) {
			this.append(this.GetView(i));
		}
	}
	
	/**
	 * 在列表的最后插入元素,请在子类中实现该方法
	 * @param viewString 元素的html字符串
	 */
	protected append(viewString: string) {
		this.target.append(viewString);
	}
}