import fs from 'fs';
import path from 'path';
import open from 'open';

export const saveAndOpenHtmlCode = async (htmlContent) => {
    const directoryPath = path.join('.', 'Projects', 'html');
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    let fileNameBase = 'htmlProject';
    let index = 1;

    while (fs.existsSync(path.join(directoryPath, `${fileNameBase}${index}.html`))) {
        index++;
    }

    const filePath = path.join(directoryPath, `${fileNameBase}${index}.html`);
    fs.writeFileSync(filePath, htmlContent);
    await open(filePath);
    console.log(`stdout:Saved to ${filePath} and opened in the default web browser.`);
    return `Saved to ${filePath} and opened in the default web browser.`;
    
};

// Usage:
// const htmlContent = "<html>Hello world</html>";
// await saveAndOpenHtmlCode(htmlContent);
