import { exec } from 'child_process';
import { Script } from 'vm';

const checkNodeInstallation = async () => {
    return new Promise((resolve) => {
        exec('node --version', (error) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

export const runJsCode = async (code) => {
    const isNodeInstalled = await checkNodeInstallation();

    if (!isNodeInstalled) {
        console.log("Please install Node.js on this machine");
        return { logs: [], result: undefined };
    } else {
        try {
            // Capture console.log output
            let logs = [];
            const originalConsoleLog = console.log;
            console.log = (...args) => {
                logs.push(args.join(' '));
                originalConsoleLog.apply(console, args);
            };

            const script = new Script(code);
            const result = script.runInThisContext();

            // Restore original console.log
            console.log = originalConsoleLog;

            return { logs, result };
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return { logs: [], result: undefined, error: error.message };
        }
    }
}



// const testCode = `

// for (let i = 0; i < 5; i++) {
//     console.log(i);
//   }

// `;

// runJsCode(testCode).then(output => {
//     console.log(output.logs);
//     console.log(`Output: ${output.result}`);
//     if (output.error) {
//         console.error(`Error: ${output.error}`);
//     }
// });