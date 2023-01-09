import { useEffect, useState } from 'react';
import axios from 'axios';
import { NewPlan } from './newPlan';

export const PlanPanel = ({active, folderName, currentDirectory, handleNewTab}) => {
    const [plans, setPlans] = useState([])
    const [newPlan, setNewPlan] = useState(false)

    useEffect(() => {
        if (currentDirectory) {
            fetch(`api/folder/${currentDirectory.split("/").join("+")}/plans`)
            .then((res) => res.json())
            .then((data) => {
                let processedFiles = data.files.map((file) => {
                    let f = file.split(currentDirectory + "/.metalspoon/plans/")
                    return f[1].replace(/\.json$/, '')
                  })
                  setPlans(processedFiles.filter(file => file[0] != "."))
            })
        }
    }, [currentDirectory])

    const updatePlanList = (data) => {
        const update = [...plans]
        update.push(data)
        setPlans(update)
    }

    return (
        <div className={`p-2 max-h-[96vh] h-[96vh] ${active ? "block" : "hidden"}`}>
            <div className='opacity-70'>
            PLAN
            </div>
            {
                currentDirectory ? (
                    <div className='p-2 space-y-3'>
                        <div className='opacity-70'>
                            Create a new week-long meal plan.
                        </div>
                        <button className='p-2 bg-mono-900 opacity-70 hover:opacity-100 w-full' onClick={(e) => {setNewPlan(true)}}>
                            Create Plan
                        </button>
                        {
                            newPlan ? <NewPlan toggle={() => setNewPlan(!newPlan)} currentDirectory={currentDirectory} updatePlanList={updatePlanList}/> : null
                        }
                        {plans.map((plan, index) => {
                            return (
                            <div key={index} tabIndex="0" className="opacity-60 hover:cursor-pointer hover:opacity-100 hover:bg-mono-900 p-1 overflow-y-auto scrollBarHide font-thin" onClick={(e) => {handleNewTab(plan)}}>
                                {plan}
                            </div>
                            )
                        })}
                    </div>
                )
                :
                (
                    <div className='p-2 space-y-3'>
                        <div className='opacity-70'>
                            No folder selected.<br/>Select a folder for your metalspoon via the Archive tab first.
                        </div>
                    </div>
                )
            }
        
          </div>
    )
}