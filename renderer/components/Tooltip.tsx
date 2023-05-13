export const Tooltip = ({children, tooltip, position}) => {
    return (
        <div className="group flex">
            {children}
            <span className={`delay-500 z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-[#0f0b13] absolute p-2 ${position} z-10 transition text-xs whitespace-nowrap border`}>
                {tooltip}
            </span>
        </div>
    )
}