import { spawn } from 'child_process';
import {exec} from 'child_process';


const pythonScript = `
import time

for i in range(3):
    print(f"Hello from Python! {i + 1}")
    time.sleep(1)
`;
const checkVersion = (command) => {
    return new Promise((resolve) => {
        exec(command + ' --version', (error) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

const checkPythonInstallation = async () => {
    let pythonInstalled = await checkVersion('python');
    let python3Installed = await checkVersion('python3');

    return { pythonInstalled, python3Installed };
};

// Usage
export const runPythonCode = (code) => {
    checkPythonInstallation().then(result => {
        if(!result.python3Installed){
            console.log("Please install Python3 on this machine")
            return
        }else{
            const pythonProcess = spawn('python3', ['-c', code]);

            pythonProcess.stdout.on('data', (data) => {
              console.log(`stdout: \n${data.toString()}`);
              return data.toString()
            });
        
            pythonProcess.stderr.on('data', (data) => {
              console.error(`stderr: ${data.toString()}`);
              return data.toString()
            });
        
            pythonProcess.on('close', (code) => {
            //   console.log(`child process exited with code ${code}`);
                return code
        });
        }
    });
   
  
}

// testing
// runPythonCode(pythonScript)