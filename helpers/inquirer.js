const inquirer = require('inquirer');
require('colors');

const showHeader = (header = 'Hello World') => {
	console.clear();
	const blocks = '=============================\n';
	console.log(`${blocks}      ${header + '\n'}${blocks}`.blue);
}

const showMenu = async(options = ['opt1', 'opt2', 'opt3'], 
										message = 'What would you like to do?', 
										nameEscape = 'Exit', 
										upEscape = false) => {

	const choices = [];

	const escape = {
			value: '0',
			name: `0. ${nameEscape}`.red
		}

	options.forEach((el, index) => {
		choices.push({
			value: `${el.id || index+1}`,
			name: `${(index+1).toString().blue}${'.'.blue} ${el.name || el} ${el.date? '::': ''} ${(el.date || '').toString().blue}`
		})
	});

	upEscape? choices.unshift(escape) : choices.push(escape);

	const questions = [
		{
			type: 'list',
			name: 'option',
			message,
			choices
		}
	];

	const {option} = await inquirer.prompt(questions);
	return option;
}


const pause = () => {
	console.log('\n');

	return inquirer.prompt([{
		type: 'input',
		name: 'continue',
		message: `Press ${'ENTER'.blue} to continue\n`
	}]);
}

const readInput = async(message) => {

	const question = [{
		type: 'input',
		name: 'description',
		message,
	}];

	const {description} = await inquirer.prompt(question);
	return description;
}


module.exports = {showMenu, showHeader, pause, readInput, };