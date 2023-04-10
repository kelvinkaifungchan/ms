export const Tooltip = ({children, tooltip, position}) => {
    return (
        <div className="group flex">
            {children}
            <span className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-900 border border-gray-800 absolute p-2 ${position} z-10 transition text-xs whitespace-nowrap`}>
                {tooltip}
            </span>
        </div>
    )
}