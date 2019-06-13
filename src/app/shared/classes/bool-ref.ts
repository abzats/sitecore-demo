export class BoolRef {

    value: boolean;

    static get True() {
        return new BoolRef(true);
    }

    static get False() {
        return new BoolRef(false);
    }

    constructor(value: boolean) {
        this.value = value;
    }
}
