import {$} from './$.js';

export class Controller {
    constructor(storage, app) {
        this.app = app;
        this.storage = storage;
    }

    async getWeather({lat , lng}, adress) {
        const key = '4f1e43658b1f986467c466d087707c14' ;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        return await fetch(proxyUrl + `https://api.darksky.net/forecast/${key}/${lat},${lng}`)
        .then(res => res.json())
        .then((response) => {
            console.log('Weather was set', response);
            this.setWeatherToStorage(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    setWeatherToStorage(response) {
        if (!this.storage.getItem('weatherObj')) {
            this.storage.setItem('weatherObj',JSON.stringify({
                [adress] : response.daily.data
            }));
        } else {
            this.storage.setItem('weatherObj',JSON.stringify({
                ...JSON.parse(this.storage.getItem('weatherObj')),
                [adress] : response.daily.data
            }))
        }
    }

    async getGeoCoordinatesByAdress(adress) {
        const gKey = 'AIzaSyCOnhqpXxTyJ6O31n7yxcreIUAK6-I7aTU';
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=${gKey}`)
        .then(res => res.json())
        .then(async (response) => {
            console.log(response);
            await this.getWeather(response.results[0].geometry.location, adress);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getPlacesByString(str) {
        const gKey = 'AIzaSyCOnhqpXxTyJ6O31n7yxcreIUAK6-I7aTU';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        
        fetch(proxyUrl + `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${str}&types=(cities)&key=${gKey}`)
        .then( res => res.json())
        .then((response) => {
            console.log(response);
            userInputDatalist.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                if (response.predictions[i]) {
                    this.createOption('user-input', response.predictions[i].description);
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    createOption(container, text) {
        const node = document.createElement("option");                 
        const textnode = document.createTextNode(text);        
        node.appendChild(textnode);                              
        document.getElementById(container).appendChild(node);
    }

    debounce(func, delay) {
        let inDebounce;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    }

    timeValidation() {
        if (!this.storage.getItem('time')) {
            const yesterday = new Date().getTime();
            const tomorrow = yesterday + msInDay;
            this.storage.setItem('time' , JSON.stringify({
                'yesterday' : yesterday,
                'tomorrow' : tomorrow
            }))
            return true;
        } else {
            const date = JSON.parse(localStorage.getItem('time'));
            const now = new Date().getTime()
            if ( now > date.tomorrow) {
                this.storage.setItem('time' , JSON.stringify({
                    'yesterday' : now,
                    'tomorrow' : now + msInDay
                }))
                return true;
            }  else {
                return false;
            }
        }
    }

    setWeather() {
        const arr = JSON.parse(this.storage.getItem('cityArr'));
        for (let elem of arr) {
            this.getGeoCoordinatesByAdress(elem);
        }
    }

    init() {
        let appView = document.getElementById('App');

        $.delegate(appView, '.option', 'click', ({target}) => {
            console.log(target);
        });

        $.delegate(appView, '.user-input', 'keyup', ({target}) => {
            console.log(target.value);
        })

        $.delegate(appView, '.addCity', 'click', ({target}) => {
            let input = $.qs('.user-input');
            if (!input.value.trim()) {
                let datalist = $.qs('#user-input');
                datalist.innerHTML += this.app.parts['header'].renderOption(input.value);
                input.value = "";
            }
            
        })
        

        // Should be used!
        
        // appView.addEventListener('click', (e) => {
        //     if (e.target.className === 'option') {
        //         let opt = e.target;
        //         opt.textContent !== 'Yes' ? opt.textContent = "Yes" : opt.textContent = 'No';
        //         // this.app.render();

        //         console.log('Site was rendered!');
        //     }
        // }, false);

        // Rewrite

        // userInputDatalist.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     userInputDatalist.innerHTML = '';
        //     console.log('Node clicked!');
        // }, false);

        // weatherRangeInput.addEventListener('change', () => {
        //     const label = document.querySelector(`[for="${weatherRangeInput.id}"]`);
        //     label.innerHTML = `Forecast for ${weatherRangeInput.value} day(s).`;
        //     renderPage();
        // } , false);

        // settingsBtb.addEventListener('click',() => {
        //     settingsContainer.classList.toggle('is-shown');
        // }, false);

        // input.addEventListener("keyup", this.debounce(() => this.getPlacesByString(input.value) , 1000), false); 
    }
}