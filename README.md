# JARVIS-GPTV

<!-- ![JARVIS-GPTV Logo](path/to/logo.png) -->

JARVIS-GPTV is a powerful CLI tool built on bun.js, leveraging the capabilities of OpenAI's API. With it, you can communicate directly through your terminal, requesting a variety of tasks ranging from generating images to complex system commands.

By default it uses gpt-3.5-turbo.

## Features

- **Converse with JARVIS**: Directly chat with the tool using natural language.
- **Image Generation**: Request JARVIS to generate images based on your description.
- **Image Reading**: Extract and understand information from provided images.
- **Web Search**: Ask JARVIS to search the web and return concise results.
- **Code Generation**: Describe your requirements and let JARVIS generate the code for you.
- **System Tasks**: Perform a wide range of tasks on your machine, from creating files to executing complex bash, AppleScript, and other CLI scripts.

## Installation
- Node or Bun Installed on your machine

And these APIs
- OPENAI_API_KEY =  [get here](https://openai.com/blog/openai-api)
- SERPAPI_API_KEY = [get here](https://serpapi.com/)
- REPLICATE_API_TOKEN = [get here](https://replicate.com/)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/prakashUXtech/JARVIS-GPTV.git
```

2. Navigate to the JARVIS-GPTV directory:
```bash
cd JARVIS-GPTV
```

3. Install the required dependencies:
```bash
bun install
```

4. Set up your OpenAI API key:
```bash
edit .env exmaple
```

## Usage

To start a conversation with JARVIS, use the following command:

```bash
bun run jarvis
```

Then, simply type in your request or question!

### Examples:

1. **Converse with JARVIS**:
    ```bash
    > How are you today, JARVIS?
    JARVIS: "I'm just a program, so I don't have feelings, but I'm functioning optimally! How can I assist you?"
    ```

2. **Generate an Image**:
    ```bash
    > Generate an image of a serene beach at sunset.
    JARVIS: "[Generates and provides a link or displays the image]"
    ```

3. **Execute System Commands**:
    ```bash
    > Create a new directory named "test".
    JARVIS: "Directory "test" created successfully!"
    ```

## Contribution

If you'd like to contribute to JARVIS-GPTV, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Heavily inspired by [Killian's Open-Interpreter](https://github.com/KillianLucas/open-interpreter)
- OpenAI for their amazing API.
- Langchianjs (Its not perfect yet, but it helped on lots of things like memoery etc)
- Replicate AI for their Image generation API
- SerpAPI for search
- All contributors and users of JARVIS-GPTV.

---

For more information, issues, or if you'd like to get in touch, please [visit our GitHub repository](https://github.com/prakashUXtech/JARVIS-GPTV).
