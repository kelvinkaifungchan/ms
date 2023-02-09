
import fs from 'fs'
import matter from 'gray-matter';
const remark = await import("remark");
const html = await import("remark-html");

export async function getRecipeData(slug) {
    let title = slug.split("/")
    let id = title[title.length-1]
    const fileContents = fs.readFileSync(slug, 'utf8');

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