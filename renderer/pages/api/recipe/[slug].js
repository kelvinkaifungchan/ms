import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { remark } from 'remark';
import html from 'remark-html';

const recipesDirectory = path.join(process.cwd(), 'recipes')

export async function getRecipeData(slug) {
    let path = slug.split("+").join("/")
    let title = slug.split("+")
    let id = title[title.length-1]
    const fileContents = fs.readFileSync(path, 'utf8');

    //Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    //Use remark to convert markdown into HTML string
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    const contentHtml = processedContent.toString()

    //Combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data
    };
}

export default async function handler(req, res) {

    if (req.method === 'GET') {
        const {slug} = req.query
        try {
            let recipe = await getRecipeData(slug)
                
            res.status(200).json(recipe)
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