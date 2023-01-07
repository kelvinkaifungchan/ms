import { Tab } from "@headlessui/react"
import { useState } from "react"
import { EditorTab } from "./editorTab"

export const TabGroup = ({active, tabs, index, handleCloseTab, activeTab, handleActiveTab, handleNewTabGroup, handleActiveTabGroup}) => {
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
                                <div className='p-2 hover:bg-mono-700 rounded hover:cursor-pointer' onClick={(e) => {handleNewTabGroup()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                </div>

                                )
                                : null
                            }
                        </div>
                        </Tab.List>
                        <Tab.Panels>
                        {
                            tabs?.map((tab, index) => {
                                console.log(tab)
                            return (
                                <Tab.Panel key={index}>
                                    <EditorTab recipe={tab}/>
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