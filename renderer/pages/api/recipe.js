import fs from 'fs';
import path from 'path';
const TurndownService = require('turndown')
const turndownService = new TurndownService()

async function createMarkdownFile (string, directory, title, content) {
  // Use path.join() to create a full file path
  if (content) {
    const filePath = directory + '/' + `${string}.md`
    const headers = `---\ntitle: '${title}'\n---\n`
    const markdown = turndownService.turndown(content)
    fs.writeFile(filePath, headers + markdown, (err) => {
      if (err) throw err;
    });
    const file = {id: `${string}.md`, file: `${string}.md`, title: title, contentHtml: content}
    return file
  } else {
    const filePath = directory + '/' + `${string}.md`
    fs.writeFile(filePath, " ", (err) => {
      if (err) throw err;
    });
    const file = {id: `${string}.md`, file: `${string}.md`, title: title, contentHtml: content}
    return file
  }

}

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const {name, currentDirectory, title, body} = req.body
        try {
            let recipe = await createMarkdownFile(name, currentDirectory, title, body)
            res.status(200).json(recipe)
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
    // HTTP method not supported!
    else {
        res.setHeader('Allow', ['POST']);
        res
        .status(405)
        .json({ message: `HTTP method ${req.method} is not supported.` });
    }
}