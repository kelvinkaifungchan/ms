import fs from 'fs';
import path from 'path';

const getAllFiles = function(dirPath, arrayOfFiles) {
    let files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(dirPath, file))
      }
    })
  
    return arrayOfFiles
  }

function createMetalspoonFolder(directory) {
    // Create the hidden folder path
    const hiddenFolderPath = `${directory}/.metalspoon/plans`;
  
    try {
      // Create the hidden folder
      fs.mkdirSync(hiddenFolderPath, { recursive: true, mode: 0o700 });

    } catch (error) {
      console.error(error);
    }
  
    return directory;
  }

export default async function handler(req, res) {

    if (req.method === 'GET') {
        let dir = req.query.path.split("+").join("/")
        try {
            if (fs.existsSync(dir + "/.metalspoon/plans")) {
                let files = getAllFiles(dir + "/.metalspoon/plans")
                res.status(200).json({files: files})
              } else {
                createMetalspoonFolder(dir)
                res.status(200).json({files: []})
            }
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
    // HTTP method not supported!
    else {
        res.setHeader('Allow', ['GET']);
        res
        .status(405)
        .json({ message: `HTTP method ${req.method} is not supported.` });
    }
}