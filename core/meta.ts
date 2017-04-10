import { View } from './view';
/**
 * Meta 实现一个模版语法解析的类
 */

class TreeNode {
    Expression: string;
    Child: TreeNode[];

    constructor() {
        this.Child = [];
    }

    AddChild(c: TreeNode) {
        // 遍历检查是否已存在
        var count = mx(this.Child).where(it => it.Expression == c.Expression).count();
        if (count == 1) {
            this.CombineChild(c);
        } else {
            this.Child.push(c);
        }
    }

    /**
     * CombineChild 合并两个子节点
     */
    protected CombineChild(c: TreeNode) {
        var child = mx(this.Child).where(it => it.Expression == c.Expression).first();
        for (var i = 0; i < c.Child.length; i++) {
            child.AddChild(c.Child[i]);
        }
    }

    Resolve(data: string[]): TreeNode {
        if (data.length < 1) {
            return null;
        }
        this.Expression = data[0];
        if (data.length > 1) {
            var temp = (new TreeNode()).Resolve(data.slice(1));
            if (temp) {
                this.Child.push(temp);
            }
        }
        return this;
    }
}

export class Meta {
    /**
     * Resolve 解析模版语法,返回嵌入data后的html string
     * @param viewString 模版语法
     * @param model 需要嵌入的data模型
     */
    static Resolve(viewString: string, model: Object): string {
        return Mustache.render(viewString, model);
    }

    static Compile(viewString: string) {
        Mustache.parse(viewString);
    }

    static ResolveDataBinding(bindingExpressions: string[]) {
        var root: TreeNode = new TreeNode();

        for (var i = 0; i < bindingExpressions.length; i++) {
            var segments = bindingExpressions[i].split('.');
            var node = new TreeNode();
            root.AddChild(node.Resolve(segments));
        }
    }

}
