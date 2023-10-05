import figlet from 'figlet';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';

let tasks = ["Sample Task 1", "Sample Task 2"];

console.log(
    chalk.blueBright(
        figlet.textSync('J.A.R.V.I.S(GPTV)', { horizontalLayout: 'full' })
    )
);

// Constructing the boxed layout
const horizontalLine = chalk.gray('+' + '-'.repeat(48) + '+');
const emptyLine = chalk.gray('|' + ' '.repeat(48) + '|');

console.log(horizontalLine);
console.log(emptyLine);
console.log(chalk.gray('| ') + chalk.green('Author: ') + chalk.white('Your Name') + ' '.repeat(31) + chalk.gray('|'));
console.log(chalk.gray('| ') + chalk.green('Email:  ') + chalk.white('your.email@example.com') + ' '.repeat(23) + chalk.gray('|'));
console.log(chalk.gray('| ') + chalk.green('Website:') + chalk.white.underline(' https://yourwebsite.com ') + chalk.gray('|'));
console.log(chalk.gray('| ') + chalk.green('Version:') + chalk.white(' 1.0.0') + ' '.repeat(32) + chalk.gray('|'));
console.log(emptyLine);
console.log(horizontalLine);


const SECRET_KEY = "123";
async function promptForSecretKey() {
    const { key } = await inquirer.prompt({
        type: 'password', // 'password' type hides the input
        name: 'key',
        message: 'Enter the secret key to access Task Manager:',
        mask: '*'  // This will mask the user's input with '*'
    });

    if (key === SECRET_KEY) {
        mainMenu(); // If the key is correct, proceed to the main menu
    } else {
        console.log(chalk.red('Incorrect key! Try again.'));
        promptForSecretKey(); // If the key is wrong, prompt again
    }
}


const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'List tasks',
            'Add a task',
            'Give your key',
            'Exit'
        ]
    });

    switch (action) {
        case 'List tasks':
            const spinner = ora('Fetching tasks...').start();
            setTimeout(() => {
                spinner.stop();
                console.log(chalk.green('\nTasks:'));
                tasks.forEach((task, index) => {
                    console.log(chalk.yellow(`[${index + 1}] ${task}`));
                });
                mainMenu();
            }, 1000);
            break;
        case 'Add a task':
            const { task } = await inquirer.prompt({
                type: 'input',
                name: 'task',
                message: 'Enter the name of the new task:'
            });
            tasks.push(task);
            console.log(chalk.green('Task added successfully!'));
            mainMenu();
            break;
        case 'Give your key':
            promptForSecretKey();
            break;
        case 'Exit':
            console.log(chalk.red('Goodbye!'));
            process.exit(0);
            break;
    }
};

mainMenu();
