export function Tag(tagName: string) {
    return (target: IModel, decoratedPropertyName: string) => {
        const targetType: { __tag__?: Object } = target.constructor;

        if (!targetType.hasOwnProperty('__tag__')) {
            targetType.__tag__ = {};
        }
        targetType.__tag__[decoratedPropertyName] = tagName;
    }
}