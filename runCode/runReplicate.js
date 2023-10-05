import 'dotenv/config';
import Replicate from 'replicate';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import open from 'open';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


// Ensure the creations directory exists
const creationsDir = path.join('.', 'creations');
if (!fs.existsSync(creationsDir)) {
    fs.mkdirSync(creationsDir);
}

/**
 * Download image from a URL and save it to a file
 * @param {string} imageUrl URL of the image to download
 * @param {string} outputPath Path to save the downloaded image
 */
async function downloadImage(imageUrl, outputPath) {
    const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer'
    });
    fs.writeFileSync(outputPath, response.data);
}

/**
 * Generate an image using the replicate API and save it to the creations directory
 * @param {string} prompt Text prompt for the model
 */
export async function generateAndSaveImage(prompt) {
  const model = "stability-ai/sdxl:1bfb924045802467cf8869d96b231a12e6aa994abfe37e337c63a4e49a8c6c41";
  const input = { prompt };
  
  try {
    const output = await replicate.run(model, { input });

    if (output && Array.isArray(output) && output[0]) {
      // Generate a unique filename based on the current timestamp
      const filename = `image_${Date.now()}.png`; // .png 
      const outputPath = path.join(creationsDir, filename);
      
      // Download and save the image
      await downloadImage(output[0], outputPath);

      console.log(`Image saved at: ${outputPath}`);
      await open(outputPath);
      return (`Image saved at: ${outputPath} and opened on your screen`);
      
    } else {
      console.error('Error generating image or no image link received.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


export async function readImage({imagePath, q}) {
  const model = "andreasjansson/blip-2:9109553e37d266369f2750e407ab95649c63eb8e13f13b1f3983ff0feb2f9ef7";
  const input = { image: imagePath, question: q };

  try {
    const output = await replicate.run(model, { input });
    // console.log(`Image: ${output}`);
    return output
      
  } 
  catch (error) {
    console.error('Error:', error);
  }

}

// readImage(
//   'https://storage.googleapis.com/sfr-vision-language-research/LAVIS/assets/merlion.png',
//   'What is the statue about in this pic and what is the lake/sea name?'
// )
