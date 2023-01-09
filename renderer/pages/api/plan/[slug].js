import fs from 'fs';

export async function getPlanData(slug) {
    let path = slug.split("+").join("/")
    const data = fs.readFileSync(path);
    const dataString = data.toString();
    const jsonData = JSON.parse(dataString);

    const id = path.split('/').pop().replace(/\.json$/, '')
    // Create the output object
    const output = {
      id: id,
      plan: jsonData,
    };
    return output;
}

export default async function handler(req, res) {

    if (req.method === 'GET') {
        const {slug} = req.query
        try {
            let plan = await getPlanData(slug)
            res.status(200).json(plan)
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