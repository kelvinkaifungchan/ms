import { useEffect, useRef, useState } from "react"
import axios from "axios"

export const EditorTab = ({recipe, index, handleChanged, handleSaved, currentDirectory, updateRecipe}) => {
    const [inputs, setInputs] = useState()
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const object = {
            title: recipe.title,
            body: recipe.contentHtml
        }
        setInputs(object)
    }, [recipe])

    const handleInputs = (e, name) => {
        handleChanged(index)
        setInputs((prevState) => ({ ...prevState, [name]: e.target.innerHTML }))
    }

    const handleSave = (e) => {
        if (e.altKey && e.keyCode === 83) {
            setSaving(true)
            return axios.post('/api/recipe/', { name: recipe.id.replace(/\.md$/, ''), currentDirectory: currentDirectory, title: inputs.title, body: inputs.body})
            .then((res) => {
                updateRecipe(index, res.data)
            })
            .then(() => {
                setSaving(false)
                handleSaved(index)
            })
        }
    }

    return (
        <div className='p-20 pt-6 h-full overflow-scroll customScroll overflow-x-hidden px-5 rounded opacity-90 bg-white shadow-inset' onKeyDown={(e) => {handleSave(e)}} tabIndex="0">
            <div className='flex justify-center'>ßßß
                <div className='space-y-5 lg:w-1/2 min-w-[300px]'>
                    <div className="text-4xl text-gray-800 font-bold focus:outline-none" contentEditable onInput={(e) => {handleInputs(e, "title")}} dangerouslySetInnerHTML={{__html: recipe.title || recipe.id.replace(/\.md$/, '')}}/>
                    <div className='text-gray-800 font-bold'>
                    {recipe.cuisine ? recipe.cuisine : null}
                    </div>
                    <div className='space-x-2 flex max-w-full'>
                    {
                        recipe.tags ? recipe.tags.map((tag, index) => {
                        return (
                            <div className='bg-mono-700 rounded-md p-1 px-2 whitespace-nowrap' key={index}>
                                {tag}
                            </div>
                        )
                        })
                        : null
                    }
                    </div>
                    <div>
                        <div className='prose focus:outline-none leading-snug text-sm prose-hr:border-none prose-hr:my-1' contentEditable="true" dangerouslySetInnerHTML={{__html: recipe.contentHtml || "Add instructions..."}} onInput={(e) => {handleInputs(e, "body")}}></div>
                    </div>
                    {
                        saving ? 
                        (
                            <div className="absolute right-10 top-5 bg-pink-700 rounded p-2 animate-pulse">
                                Saving
                            </div>
                        )
                        : null
                    }
                </div>
            </div>
        </div>
    )
}