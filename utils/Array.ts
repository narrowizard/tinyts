
Array.prototype.remove = function (param) {
    if (typeof param == "number") {
        if (param < 0 || param > this.length) {
            return;
        }
        this.splice(param, 1);
        return;
    } else if (typeof param == "function") {
        for (var i = 0; i < this.length; i++) {
            if (param(this[i])) {
                this.splice(i, 1);
            }
        }
        return;
    }
};

export function Extend() {

}