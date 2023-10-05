import { exec } from 'child_process';
import os from 'os';
import { marked } from 'marked';
import 'dotenv/config'
import { runJsCode } from "./runJsCode.js";
import { saveAndOpenHtmlCode } from "./runHtmlCode.js";
import { runPythonCode } from "./runPythonCode.js";
import TerminalRenderer from 'marked-terminal';
import chalk from 'chalk';


marked.setOptions({
    renderer: new TerminalRenderer({
      code: chalk.blueBright.green,
      codespan: chalk.yellow,
      firstHeading: chalk.bold.red,
      heading: chalk.bold.magenta,
      strong: chalk.bold.blue,
      em: chalk.italic,
      del: chalk.dim.gray.strikethrough,
      link: chalk.blue,
      listitem: chalk.white,
      table: chalk.gray,
      paragraph: chalk.white,
      blockquote: chalk.gray.italic,
      hr: chalk.reset,
      html: chalk.red,
      text: chalk.grey,
      cmd: chalk.bgBlue,
      unstyled: chalk.cyan // Default style for anything not specifically styled
    })
  });

const languageMap = {
    python: {
      startCmd: 'python3 -c',
      printCmd: 'print("{}")'
    },
    javascript: {
      startCmd: 'node -i',
      printCmd: 'console.log("{}")'
    },
    R: {
      startCmd: 'R -q --vanilla',
      printCmd: 'print("{}")'
    },
    shell: {
      startCmd: os.platform() === 'win32' ? 'cmd.exe' : '',
      printCmd: 'echo "{}"'
    },
    applescript: {
      startCmd: 'osascript',
      printCmd: 'log "{}"'
    },
    html: {
      // runFunction: runHtml()
    }
    // Add more languages as required
  };

export const executeCode = async ({language, code}) => {
    if (language === 'python') {
      runPythonCode(code) //todo return the result from this 
    }else if(language === 'javascript') {
      runJsCode(code).then(output => {
        return {
          'output logs': output.logs, 
          'result': output.result,
          'error': output.error};
      });
    }else if(language === 'html'){
      saveAndOpenHtmlCode(code)
    }
    else {
      return new Promise((resolve, reject) => {
        const langDetails = languageMap[language];
        if (!langDetails) {
          reject({ error: "Unsupported language" });
        }
  
        console.log(`\n🤖🪄 Executing the following code in ${language}:\n`);
  
        console.log(marked(code))
  
        const cmd = `${langDetails.startCmd} ${code}`;
        // console.log("comand",cmd)
        exec(cmd, (error, stdout, stderr) => {
          console.log("exec running..")
          if (error) {
            resolve(error.message);
          } else if (stdout) {
            resolve(stdout);
            // console.log('stdout', stdout)
          } else if (stderr) {
            resolve(stderr);
            // console.log('stderr', stderr)
          } else {
            // If neither stdout nor stderr has content, resolve with a message.
            resolve("Command executed successfully, but produced no output.");
          }
        });
      });
    }
  
  };
  