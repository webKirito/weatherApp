export class $ {
    constructor() {}
    
    static qs(selector, scope = document) {
        return document.querySelector(selector); 
    }

    static on(target, type, callback, capture = false) {
        target.addEventListener(type, callback, capture)
    }

    static delegate(target, selector, type, handler, capture) {
        const dispatchEvent = event => {
            const targetElement = event.target;
            const potentialElements = target.querySelectorAll(selector);
            let i = potentialElements.length;
    
            while (i--) {
                if (potentialElements[i] === targetElement) {
                    handler.call(targetElement, event);
                    break;
                }
            }
        };
        $.on(target, type, dispatchEvent, capture);
    }
}