import { DataBindingType, DataBindingProperty } from './view';
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

    static ResolveDataBindingType(expression: string): DataBindingProperty {
        if (!expression) {
            return null;
        }
        
    }
}