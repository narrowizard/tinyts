import {View} from './view';

export class VmTc {
    constructor() {

    }
}

export function v() {

}

export function p() {

}

function observe(o, fn) {
    return new Proxy(o, {
        set(target, property, value) {
            fn(property, value);
            target[property] = value;
        },
    })
}

let x = { name: 'BB-8' };
let p1 = observe(x, function (property, value) { console.info(property, value) });
p1.name = 'BB-9';