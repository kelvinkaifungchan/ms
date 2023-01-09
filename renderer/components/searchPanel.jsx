import { useEffect, useState } from 'react';

export const SearchPanel = ({active, folder, currentDirectory, handleNewTab}) => {
    const [search, setSearch] = useState()
    const [results, setResults] = useState([])
    const [metadata, setMetadata] = useState()

    useEffect(() => {
        if (currentDirectory) {
            fetch(`/api/folder/${currentDirectory.split("/").join("+")}/metadata`)
            .then((res) => res.json())
            .then((data) => {
                const meta = data.filter(object => object.title)
                setMetadata(meta)
            })
        }
    }, [currentDirectory, folder])

    const handleSearch = (e) => {
        setSearch(e.target.value)
        if (metadata) {
            const result = metadata.filter((recipe) => {
                let cuisine = recipe.cuisine
                let tags = recipe.tags
                let title = recipe.title
                let concat = recipe.file.concat(title, cuisine, tags)
                return concat.toLowerCase().match(e.target.value.toLowerCase())
            })
            setResults(result)
        }
    }

    return (
        <div className={`p-2 space-y-2 max-h-[96vh] h-[96vh] ${active ? "block" : "hidden"}`}>
            <div className='opacity-70'>
                SEARCH
            </div>
            <div>
                <input type="text" className='bg-transparent border border-gray-800 focus:outline-none p-2 placeholder-opacity-25' placeholder='Search archive' onChange={(e) => {handleSearch(e)}} value={search || ""}/>
            </div>
            <div className='space-y-1 h-[87vh] overflow-auto customScroll'>
                {
                    results.map((result, index) => {
                        return (
                            <div key={index} tabIndex="0" className="opacity-60 hover:cursor-pointer hover:opacity-100 hover:bg-mono-900 p-1 font-thin space-y-1" onClick={(e) => {handleNewTab(result.file)}}>
                                <div>
                                    {result.title}
                                </div>
                                <div className='text-xs'>
                                    {result.cuisine}
                                </div>
                                <div className='text-xs max-w-full flex flex-wrap'>
                                    {result.tags?.map((tag) => {
                                        return (
                                            <div className='bg-gray-800 whitespace-nowrap px-2 m-1 ml-0'>
                                                {tag}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}