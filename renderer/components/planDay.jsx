import { useEffect, useState } from "react"

export const PlanDay = ({day, meal, changed}) => {

    const [input, setInput] = useState()

    useEffect(() => {
        setInput(meal)
    }, [day, meal])

    const handleChange = (e) => {
        setInput(e.target.value)
      }
    
    return (
        <div className='space-y-5'>
            <div className='text-xl text-gray-800 font-bold'>
                {day}
            </div>
            <div className="text-gray-800">
                <textarea className="w-full resize-none h-[10vh] focus:outline-none bg-transparent" value={input || ""} onChange={(e) => {handleChange(e); changed()}} placeholder={"No meals planned"}/>
            </div>
        </div>
    )
}