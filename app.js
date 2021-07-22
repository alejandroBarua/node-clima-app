require('dotenv').config();
const {showMenu, showHeader, pause, readInput} = require('./helpers/inquirer');
const Searches = require('./models/Searches');
const {loadDatabase, saveData} = require('./helpers/database')

//console.log(process.env.MAPBOX_KEY);

const main = async() => {

	const header = 'Weather App', 
	options = [
			'Search City',
			'History',
		];

	let opt = '';
	const history = loadDatabase();
	const search = new Searches(history);

 	do {
		
		showHeader(header);

		opt = await showMenu(options);

		switch (opt) {
			case '1':
				const city = await readInput('City:');
				if(city === '') break;
				const infoCities = await search.searchCity(city);
				const id = await showMenu(infoCities, 'Select a place', 'Cancel', true);
				if(id === '0') break;
				const selectedCity = infoCities.find(city => city.id == id);
				const wheather = await search.getWheather(selectedCity);
				showHeader(header);
				search.showWheather(wheather);
				break;
			case '2':
				const idHistory = await showMenu(search.toArray.reverse(), 'Select a place', 'Back');
				if(idHistory === '0') break;
				const wheatherHistory = await search.getWheather(search.history[idHistory]);
				showHeader(header);
				search.showWheather(wheatherHistory);
				break;
		}

		if(opt !== '0') await pause();

		saveData(search.history);

	} while (opt !== '0');

}

main();
