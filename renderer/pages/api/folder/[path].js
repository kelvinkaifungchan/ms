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

export default async function handler(req, res) {

    if (req.method === 'GET') {
        let dir = req.query.path.split("+").join("/")
        try {
            let files = getAllFiles(dir)
                
            res.status(200).json({files: files})
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