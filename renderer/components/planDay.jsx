import { useEffect, useState } from "react"

export const PlanDay = ({day, meal}) => {

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
                <textarea className="w-full resize-none h-[20vh] focus:outline-none " value={input || ""} onChange={(e) => {handleChange(e)}} placeholder={"No meals planned"}/>
            </div>
        </div>
    )
}