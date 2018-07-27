export class Header {
    constructor() {
        this.options = [];
    }

    renderOption(opt) {
        return `
            <div class = 'option'">${opt}</div>
        `
    }

    optionOnClick() {

    }

    render(options = []) {
        this.options = options;
        return `
        <header>
            <button class="toggleSettings">Settings</button>
            <input type="text" class="user-input" list="user-input">
                <datalist id='user-input'>
                ${this.options.map((opt) => { 
                    return this.renderOption(opt)
                }).join(``)}
                </datalist>
            <button class="addCity">Add city</button>
        </header>
        `
    }
}