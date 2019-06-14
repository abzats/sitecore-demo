export class BoolRefClass {

    value: boolean;

    static get True() {
        return new BoolRefClass(true);
    }

    static get False() {
        return new BoolRefClass(false);
    }

    constructor(value: boolean) {
        this.value = value;
    }
}
