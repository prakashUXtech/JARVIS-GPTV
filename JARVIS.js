import { ChatOpenAI } from "langchain/chat_models/openai"
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import * as readline from 'node:readline';
import { marked } from 'marked';
import clui from 'clui';
import 'dotenv/config'
import { JARVIS_Dialogs, sysM, userDetails } from "./context.js";
import { tools } from "./tools.js";
import { displayInfo } from "./welcome.js";

const spinner = new clui.Spinner(`...`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.env.LANGCHAIN_HANDLER = "langchain";
// gpt-3.5-turbo-0613, gpt-4-0613
const model = new ChatOpenAI({ 
  temperature: 0, 
  streaming:true, 
  openAIApiKey: process.env.OPENAI_API_KEY, 
  modelName: "gpt-3.5-turbo-0613", 
});

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "openai-functions",
  returnIntermediateSteps: false,
  verbose: false,
  agentArgs: {
    prefix:sysM+userDetails+`Response Like JARVIS from IRON MAN Movie` ,
  },
});

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