export class Header {
    constructor() {
        this.options = [];
    }

    renderOption(opt) {
        return `
            <option class = 'option'">${opt}</option>
        `
    }

    optionOnClick() {

    }

    render(options = [1,2,3,4]) {
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