export class Controller {
    constructor(storage, app) {
        this.app = app;
        this.storage = storage;
    }


    init() {
        let appView = document.getElementById('App');
        appView.addEventListener('click', (e) => {
            if (e.target.className === 'option') {
                let opt = e.target;
                opt.textContent !== 'Yes' ? opt.textContent = "Yes" : opt.textContent = 'No';
                // this.app.render();

                console.log('Site was rendered!');
            }
        }, false);
    }
}