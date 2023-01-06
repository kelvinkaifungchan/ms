import { useState } from "react"

export const NewFile = ({toggle}) => {
    const [input, setInput] = useState()

    const handleInputs = (e) => {
        setInput(e.target.value)
    }

    return (
        <div>
            <input type="text" className="bg-transparent w-auto focus:outline-none border border-gray-800 rounded-sm" onBlur={toggle} value={input || ""} onChange={(e) => {handleInputs(e)}} autoFocus/>
        </div>
    )
}