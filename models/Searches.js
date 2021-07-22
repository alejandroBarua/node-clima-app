const axios = require('axios');

class Searches {

	constructor(data= {}){
		
		this.history = data;
	}

	addHistory(city){

		if(this.history.hasOwnProperty(city.id)) delete this.history[city.id];

		const arrayHistory = this.toArray;
		if(arrayHistory.length >= 5){
			delete this.history[arrayHistory[0].id];
		}

		const now = new Date();
		city['date'] = now.toLocaleString();
		this.history[city.id] = city;

	}

	get toArray(){
		return Object.values(this.history);
	}

	get paramsMapbox() {
		return {
			'access_token': process.env.MAPBOX_KEY,
			'limit': 5
		}
	}

	async searchCity(city = '') {

		try {
			
			const intance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
				params: this.paramsMapbox
			})
	
			const res = await intance.get();
			return res.data.features.map(city => ({
					id: city.id,
					name: city.place_name,
					lon: city.center[0],
					lat: city.center[1]
			}));

		} catch (error) {
			return error;
		}

	}

	paramsOpenWeather(city) {
		return {
			'lat': city.lat,
			'lon': city.lon,
			'appid': process.env.OPENWEATHER_KEY,
			'units': 'metric'
		}
	}

	async getWheather(city) {

		try {
			
			const intance = axios.create({
				baseURL: 'https://api.openweathermap.org/data/2.5/weather',
				params: this.paramsOpenWeather(city)
			})
		
			console.log('Please wait...');
			
			const res = await intance.get();
			
			this.addHistory(city);
			
			return {
					'name': city.name,
					'lon': city.lon,
					'lat': city.lat,
					'description': res.data.weather[0].description,
					'temp': res.data.main.temp,
					'temp_min': res.data.main.temp_min,
					'temp_max': res.data.main.temp_max
			};

		} catch (error) {
			return "error";
		}
		
	}

	showWheather(wheater){
		console.log(`${'City:'.blue} ${wheater.name}`);
		console.log(`${'Longitude:'.blue} ${wheater.lon}`);
		console.log(`${'Latitude:'.blue} ${wheater.lat}`);
		console.log(`${'description:'.blue} ${wheater.description}`);
		console.log(`${'Temperature:'.blue} ${wheater.temp}`);
		console.log(`${'Min:'.blue} ${wheater.temp_min}`);
		console.log(`${'Max:'.blue} ${wheater.temp_max}`);

	}
	
}

module.exports = Searches;