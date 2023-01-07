import { useState } from "react"
import { NewFile } from "./newFile"

export const Dropdown = ({title, children}) => {
    const [toggle, setToggle] = useState(false)
    const [newFile, setNewFile] = useState(false)

    const newFileToggle = () => {
        setNewFile(!newFile)
    }

    return (
        <>
            {
                toggle ?
                (
                    <div className="group flex justify-between hover:cursor-pointer py-1" >
                        <div className='flex items-center space-x-2 w-auto' onClick={() => setToggle(!toggle)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            <span className="font-bold opacity-70">
                                {title}
                            </span>
                        </div>
                        <span className="opacity-70 hover:bg-gray-700 p-1 group-hover:visible invisible rounded" onClick={(e) => {setNewFile(true)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </span>
                    </div>
                )
                : 
                (
                    <>
                        <div className="group flex justify-between hover:cursor-pointer py-1">
                            <div className='flex items-center space-x-2 w-auto' onClick={() => setToggle(!toggle)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                <span className="font-bold opacity-70">
                                    {title}
                                </span>
                            </div>
                            <span className="opacity-70 hover:bg-gray-700 p-1 group-hover:visible invisible rounded" onClick={(e) => {setNewFile(true)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </span>
                        </div>
                        <div className="pl-4 overflow-auto h-[88.5vh] customScroll">
                            { newFile ? <NewFile toggle={newFileToggle}/> : null}
                            <div className={ newFile ? "opacity-30" : "opacity-100"}>
                                {children}
                            </div>
                        </div>
                    </>
                )
            }
        
        </>
    )
}