export const EditorTab = ({recipe}) => {
    return (
        <div className='p-20 pt-6 h-full overflow-scroll customScroll overflow-x-hidden px-5 rounded opacity-90 bg-white shadow-inset'>
            <div className='flex justify-center'>
                <div className='space-y-5 lg:w-1/2'>
                    <div className='text-4xl text-gray-800 font-bold'>
                    {recipe.title}
                    </div>
                    <div className='text-gray-800 font-bold'>
                    {recipe.cuisine}
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
                    <div className='prose leading-none text-sm prose-hr:border-none prose-hr:my-1' dangerouslySetInnerHTML={{__html: recipe.contentHtml}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}