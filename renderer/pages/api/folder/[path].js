const fs = require('fs')
const path = require('path')

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
  
  const convertBytes = function(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  
    if (bytes == 0) {
      return "n/a"
    }
  
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  
    if (i == 0) {
      return bytes + " " + sizes[i]
    }
  
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
  }
  
  const getTotalSize = function(directoryPath) {
    const arrayOfFiles = getAllFiles(directoryPath)
  
    let totalSize = 0
  
    arrayOfFiles.forEach(function(filePath) {
      totalSize += fs.statSync(filePath).size
    })
  
    return convertBytes(totalSize)
  }

export default async function handler(req, res) {

    if (req.method === 'GET') {
        let dir = req.query.path.split("+").join("/")
        try {
            let files = getAllFiles(dir)
            let size = getTotalSize(dir)
                
            res.status(200).json({files: files, size: size})
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