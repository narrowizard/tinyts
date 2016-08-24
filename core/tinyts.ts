import {View} from './view';
import * as $ from 'jquery';
import * as linq from 'linqjs';

export class VmTc {
    constructor() {
        var v = new View();
        $.ajax({});
        linq.from([1, 2, 3]).where(it => it == 1).firstOrDefault();
    }
}

export function v() {

}

export function p() {

}