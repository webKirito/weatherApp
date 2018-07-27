export class Settings {
    constructor() {

    }

    render() {
        return `
        <footer class="footer">
        <div class="wrap">
                <label for="weather-range">Forecast for 4 day(s).</label>
                <input type="range" id="weather-range" name="weatherDelay" min="1" max="7" />
        </div>
        <div class="f-to-c">
                <label class="switch">
                        <input type="checkbox">
                        <span class="slider"></span>
                </label>
                <div id="f-to-c">F</div>  
        </div>
        
    </footer>`;
    }
}