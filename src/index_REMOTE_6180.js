import {Header} from './Components/Header.js'
import {App} from './Components/App.js'
import { WeatherContainer } from './Components/WeatherContainer.js';
import {Controller}  from './Components/Controller.js'
import {Storage} from './Components/Storage.js'

let App_Header = new Header();
let Weather_Container = new WeatherContainer();
let App_Components = { header : App_Header, weatherContainer : Weather_Container};

let App_Storage = new Storage();




const appState = {
    parts : App_Components,
    storage : App_Storage
}

let App_Main = new App(appState);

let App_Controller = new Controller(App_Storage, App_Main);

App_Controller.init();
App_Main.init();
console.log('This is main branch!')