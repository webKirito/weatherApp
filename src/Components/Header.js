export class Header {
    constructor() {
        this.options = [];
    }

    renderOption(opt) {
        return `
            <option class = 'option'">${opt}</option>
        `
    }



    render(options = [1,2,3,4]) {
        this.options = options;
        return `
        <header>
            <button class="toggleSettingsBtn"><i class="fa fa-cog"></i></button>
            <input type="text" class="user-input" list="datalist">
                <datalist id='datalist'>
                ${this.options.map((opt) => { 
                    return this.renderOption(opt)
                }).join(``)}
                </datalist>
            <button class="addCityBtn"><i class="fa fa-plus"></i></button>
        </header>
        `
    }
}