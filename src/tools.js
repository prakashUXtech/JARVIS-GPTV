import { DynamicStructuredTool, DynamicTool, SerpAPI } from "langchain/tools";
import { z } from "zod";
import { executeCode } from "../runCode/executeCode.js";
import { generateAndSaveImage, readImage } from "../runCode/runReplicate.js";

const executeCodeTool = new DynamicStructuredTool({
    name: "executeCode",
    description: "Executes code on the user\'s machine and returns the output",
    schema: z.object({
      language: z.enum(['shell', 'R', 'python', 'applescript', 'javascript', 'html'])
        .describe("The programming languages required to run the code"),
      code: z.string().describe("The actual code to execute so make it proper"),
    }),
    func: executeCode,
  
  })
  
  const generateImage = new DynamicTool({
    name: "generateAndSaveImage",
    description: "Creates an image/art/picture using an API call and saves in the users system",
    func: generateAndSaveImage,
  
  })

  const readImageTool = new DynamicStructuredTool({
    name: "readImage",
    description: "it takes 2 args imagepath and queston, and reads the image",
    schema: z.object({
      imagePath: z.string().describe("The Image path to be read"),
      q: z.string().describe("users question about this image"),
    }),
    func: readImage,
  })
  
export  const tools = [
    executeCodeTool,
    generateImage,
    readImageTool,
    new SerpAPI(process.env.SERPAPI_API_KEY)
  ];