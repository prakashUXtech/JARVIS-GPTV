import {marked} from 'marked';
import cardinal from 'cardinal';

const terminalRenderer = new marked.Renderer();

terminalRenderer.heading = function (text, level) {
    const chars = ['#', '=', '-', '^'];
    return text + '\n' + chars[level - 1].repeat(text.length);
};

terminalRenderer.listitem = function (text) {
    return ' * ' + text;
};

terminalRenderer.code = function (code, language) {
    try {
        return '\n' + cardinal.highlight(code, { lang: language }) + '\n';
    } catch (e) {
        return '\n' + code + '\n';  // Fallback to plain text if there's an issue
    }
};

marked.setOptions({
    renderer: terminalRenderer,
});

const md = `
# This is a Heading

Here's some JavaScript code:

\`\`\`python
# function with two arguments
def add_numbers(num1, num2):
    sum = num1 + num2
    print('Sum: ',sum)

# function with no argument
def add_numbers():
    # code
\`\`\`
`;

console.log(marked(md));
