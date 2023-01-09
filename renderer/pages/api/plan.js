import fs from 'fs';
import path from 'path';

async function createPlanFile (name, directory) {
  // Use path.join() to create a full file path
  const filePath = directory + '/' + `${name}.json`

  fs.writeFile(filePath, "{monday: [], tuesday: [], wednesday: []}, thursday: [], friday: [], saturday: [], sunday: []}", (err) => {
    if (err) throw err;
  });
  const file = `${name}`
  return file
}

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const { name, directory } = req.body
        try {
            let plan = await createPlanFile(name, directory)
            res.status(200).json(plan)
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