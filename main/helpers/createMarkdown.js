import fs from 'fs';
const TurndownService = require('turndown')
const turndownService = new TurndownService()

export default async function createMarkdown (string, directory, title, content) {

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