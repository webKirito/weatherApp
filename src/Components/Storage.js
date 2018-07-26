export class Storage {
    constructor() {
        this.storage = localStorage;
    }

    setItem(key, val) {
        this.storage.setItem(key , val);
    }

    getItem(key) {
        return this.storage.getItem(key);
    }
}