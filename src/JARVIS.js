import * as readline from 'node:readline';
import { marked } from 'marked';
import clui from 'clui';
import { displayInfo } from "./welcome.js";
import { executor } from './agent.js';
import 'dotenv/config'

const spinner = new clui.Spinner(`...`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.env.LANGCHAIN_HANDLER = "langchain";

displayInfo()

const promptUser = async () => {
  const askQuestion = async () => {
    rl.question("JARVIS 🤖 >  ", async (input_text) => {
      if (input_text === "q") {
        rl.close();
        return;
      }
      const input = input_text
      try {
         spinner.start();
         await executor.run(input, [
          {
            handleAgentEnd(action) {
              console.log("\n🤖👍", marked(action.log));
            },
          },
        ]);
        spinner.stop();
      } catch (error) {
        console.log(error)
      }
      askQuestion();
    });
  };
  askQuestion();
};

promptUser();