const fs = require('fs');

const file = './database/data.json';

const loadDatabase = () => {

	if(!fs.existsSync(file)) return {};
	const data = fs.readFileSync(file);
	return JSON.parse(data);
}

const saveData = data => fs.writeFileSync(file, JSON.stringify(data));


module.exports = {loadDatabase, saveData};