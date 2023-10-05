import figlet from 'figlet';
import chalk from 'chalk';

export function displayInfo() {
    console.log(
        chalk.magentaBright(
            figlet.textSync('J.A.R.V.I.S.(GPTV)',
                {
                    width: 80,
                    whitespaceBreak: true,
                },
            )
        )
    );

    // Constructing the boxed layout
    const horizontalLine = chalk.gray('+' + '-'.repeat(48) + '+');
    const emptyLine = chalk.gray('|' + ' '.repeat(48) + '|');

    console.log(horizontalLine);
    console.log(emptyLine);
    console.log(chalk.gray('| ') + chalk.green('Author: ') + chalk.white('Prakash Dalai') + ' '.repeat(25) + chalk.gray('|'));
    console.log(chalk.gray('| ') + chalk.green('Website: ') + chalk.white.underline('interacly.com') + 
    ' '.repeat(25) + chalk.gray('|'));
    console.log(chalk.gray('| ') + chalk.green('Version: ') + chalk.white('0.5.1') + ' '.repeat(34) + chalk.gray('|'));
    console.log(emptyLine);
    console.log(horizontalLine);

    console.log(chalk.gray('Welcome, prompt to start..'))
}