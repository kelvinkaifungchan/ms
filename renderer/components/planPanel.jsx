import { useState } from 'react';
import { Dropdown } from '../components/dropdown';

export const PlanPanel = ({active, folderName, handleOpenDirectory, handleNewTab}) => {
    const [plans, setPlans] = useState([])

    return (
        <div className={`p-2 max-h-[96vh] h-[96vh] ${active ? "block" : "hidden"}`}>
            <div className='opacity-70'>
            PLAN
            </div>
            {
                plans.length > 0 ? (
                    <div>
                    </div>
                )
                :
                (
                    <div className='p-2 space-y-3'>
                        <div className='opacity-70'>
                            Create a new week-long meal plan.
                        </div>
                        <button className='p-2 bg-mono-900 opacity-70 hover:opacity-100 w-full' onClick={() => handleOpenDirectory()}>
                            Create Plan
                        </button>
                    </div>
                )
            }
          </div>
    )
}