import { DataBindingType, DataBindingProperty, View } from './view';
/**
 * Meta 实现一个模版语法解析的类
 */

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

    /**
     * BindView 绑定数据属性和View
     * @param p 父View
     * @param propertyName 属性名
     * @param view 子view
     */
    static BindView(p: View, propertyName: string, view: View) {
        Object.defineProperty(p, propertyName, {
            get: () => {
                return view.Value();
            },
            set: (value) => {
                view.SetValue(value);
            }
        });
    }

    static ResolveDataBindingType(expression: string): DataBindingProperty {
        if (!expression) {
            return null;
        }

    }
}
