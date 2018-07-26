export class Header {
    constructor() {
        this.options = [Math.random(),Math.random(),Math.random()];
    }

    renderOption(opt) {
        return `
            <div class = 'option'">${opt}</div>
        `
    }

    optionOnClick() {

    }

    render() {
        this.options = [Math.random(),Math.random(),Math.random()];
        return `
        <header>
            ${this.options.map((opt) => { 
                return this.renderOption(opt)
            }).join(``)}
        </header>
        `
    }
}