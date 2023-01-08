import { Tab } from "@headlessui/react"
import { useState } from "react"
import Split from 'react-split-it';
import { EditorTab } from "./editorTab"
import { Timer } from "./timer";
import { Tooltip } from "./tooltip"

export const TabGroup = ({active, tabs, index, handleCloseTab, activeTab, handleActiveTab, handleNewTabGroup, handleActiveTabGroup}) => {
    const [timers, setTimers] = useState([])

    const handleNewTimer = () => {
        const update = [...timers]
        update.push(update.length)
        setTimers(update)
    }

    const handleCloseTimer = (index) => {
        ("close", index)
        const update = [...timers]
        update.splice(index, 1)
        setTimers(update)
    }

    return (
        <>
        {
            tabs?.length > 0 ? (
                <div className='w-full h-full' onClick={(e) => {handleActiveTabGroup(index)}}>
                    <Tab.Group selectedIndex={activeTab}>
                        <Tab.List>
                        <div className="flex items-center justify-between space-x-5">
                            <div className='flex whitespace-nowrap overflow-scroll scrollBarHide'>
                            {
                                tabs?.map((tab, i) => {
                                return (
                                    <Tab key={i}>
                                    {({ selected }) => (
                                        <div className="group flex items-center ui-selected:bg-pink-700 ui-selected:outline-none focus:border-none focus:outline-none p-3 rounded" onClick={(e) => {handleActiveTab(i, index)}}>
                                        {tab.id}
                                        {
                                            selected ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 ml-2 rounded-md hover:bg-mono-700" onClick={(e) => {
                                                handleCloseTab(tab.id)
                                            }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            )
                                            : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 invisible group-hover:visible hover:bg-mono-700 rounded-md ml-2" onClick={(e) => {
                                                handleCloseTab(tab.id)
                                            }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            )
                                        }  
                                        </div>
                                    )}
                                    </Tab>
                                )
                                })
                            }
                            </div>
                            {
                                active ? (
                                <div className="flex">
                                    <Tooltip tooltip={"Split Editor Right"} position={"-translate-x-24 translate-y-12"}>
                                        <div className='p-2 hover:bg-mono-700 rounded hover:cursor-pointer' onClick={(e) => {handleNewTabGroup()}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                        </div>
                                    </Tooltip>
                                    <Tooltip tooltip={"Add Timer"} position={"-translate-x-14 translate-y-12"}>
                                        <div className='p-2 hover:bg-mono-700 rounded hover:cursor-pointer' onClick={(e) => {handleNewTimer()}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </Tooltip>
                                </div>
                                )
                                : null
                            }
                        </div>
                        </Tab.List>
                        <Tab.Panels>
                        {
                            tabs?.map((tab, index) => {
                            return (
                                <Tab.Panel key={index}>
                                    <Split className="h-[90vh] max-h-[90vh] flex flex-col" direction={"vertical"} minSize={150} gutterSize={10}>
                                        <EditorTab recipe={tab}/>
                                        {
                                            timers.length > 0 ? (
                                                <Split className="flex h-full w-full" minSize={200}>
                                                {timers?.map((time, index) => {
                                                    return (
                                                        <div key={index} className="flex w-full h-full">
                                                            <Timer index={index} handleCloseTimer={handleCloseTimer}/>
                                                        </div>
                                                    )
                                                })}
                                                </Split>
                                            )
                                            : null
                                        }
                                    </Split>
                                </Tab.Panel>
                            )
                            })
                        }
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            )
            :
            (
                <div className='w-full h-full' onClick={(e) => {handleActiveTabGroup(index)}}>
                    <div className="flex items-center justify-center h-full w-full">
                        <div className='space-y-5'>
                            <div className='opacity-10 text-7xl font-bold text-center'>
                                METALSPOON
                            </div>
                            <div className='text-center opacity-70'>
                                Open a file to start editing
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}