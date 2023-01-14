import { PlanDay } from "./planDay"

export const PlanTab = ({plan, index, handleChanged}) => {
    

    return (
        <div className='p-20 h-full overflow-scroll customScroll overflow-x-hidden rounded opacity-90 bg-white shadow-inset text-gray-800'>
            <div>
                Title
            </div>
            <hr className="py-5"/>
            <div className='flex space-x-2 flex-wrap'>
                    <PlanDay day={"Monday"} meals={plan.monday} changed={(e) => handleChanged(index)}/>
                    <PlanDay day={"Tuesday"} meals={plan.tuesday}/>
                    <PlanDay day={"Wednesday"} meals={plan.wednesday}/>
                    <PlanDay day={"Thursday"} meals={plan.thursday}/>
                    <PlanDay day={"Friday"} meals={plan.friday}/>
                    <PlanDay day={"Saturday"} meals={plan.saturday}/>
                    <PlanDay day={"Sunday"} meals={plan.sunday}/>
            </div>
        </div>
    )
}