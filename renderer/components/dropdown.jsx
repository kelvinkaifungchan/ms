import { useState } from "react"

export const Dropdown = ({title, children}) => {
    const [toggle, setToggle] = useState(false)
    return (
        <>
            {
                toggle ?
                (
                    <div className='flex items-center space-x-2 hover:cursor-pointer' onClick={() => setToggle(!toggle)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="font-bold">
                            {title}
                        </span>
                    </div>
                )
                : 
                (
                    <>
                        <div className='flex items-center space-x-2 hover:cursor-pointer' onClick={() => setToggle(!toggle)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            <span className="font-bold">
                                {title}
                            </span>
                        </div>
                        <div className="pl-4">
                            {children}
                        </div>
                    </>
                )
            }
        
        </>
    )
}