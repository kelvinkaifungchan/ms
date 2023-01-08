import fs from 'fs';
import path from 'path';

async function createMarkdownFile (string, directory) {
  // Use path.join() to create a full file path
  const filePath = directory + '/' + `${string}.md`

  fs.writeFile(filePath, " ", (err) => {
    if (err) throw err;
  });
  const file = `${string}.md`
  return file
}

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const {name, currentDirectory} = req.body
        try {
            let recipe = await createMarkdownFile(name, currentDirectory)
                console.log("recipe", recipe)
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