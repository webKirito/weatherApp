export class App {
    constructor(obj) {
        this.parts = obj.parts;
        this.entryHtmlComponent = document.getElementById('App');
        this.storage = obj.storage;
    }

    init() {
        this.render();
    }

    render() {
        let appHtml = this.entryHtmlComponent.innerHTML = '';
        appHtml = Object.values(this.parts).map((part) => {
            return part.render();
        }).join('');
        // console.log(appHtml);
        
        this.entryHtmlComponent.innerHTML = appHtml;
        console.log('App was rerendered');
        
    }

}

