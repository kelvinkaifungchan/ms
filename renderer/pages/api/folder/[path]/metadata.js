import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const getAllFileMetadata = function(dirPath, arrayOfFiles) {
    let files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFileMetadata(dirPath + "/" + file, arrayOfFiles)
      } else {
            const fileContents = fs.readFileSync(dirPath + "/" + file, 'utf8');
            const matterResult = matter(fileContents)
            matterResult.data.file = file
            arrayOfFiles.push(matterResult.data)
      }
    })
  
    return arrayOfFiles
  }

export default async function handler(req, res) {

    if (req.method === 'GET') {
        let dir = req.query.path.split("+").join("/")
        console.log("get", dir)
        try {
            let metadata = getAllFileMetadata(dir)
                
            res.status(200).json(metadata)
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