import { ChatOpenAI } from "langchain/chat_models/openai"
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { sysM, userDetails } from "./context.js";
import { tools } from "./tools.js";

import 'dotenv/config'

const model = new ChatOpenAI({ 
    temperature: 0, 
    streaming:true, 
    openAIApiKey: process.env.OPENAI_API_KEY, 
    modelName: "gpt-3.5-turbo-0613", // gpt-3.5-turbo-0613, gpt-4-0613
  });
  
export const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "openai-functions",
    returnIntermediateSteps: false,
    verbose: false,
    agentArgs: {
      prefix:sysM+userDetails+`Response Like JARVIS from IRON MAN Movie` ,
    },
  });