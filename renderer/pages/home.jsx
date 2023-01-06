import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import electron from "electron"
const ipcRenderer = electron.ipcRenderer || false;
import Split from 'react-split'
import { Tab } from '@headlessui/react'
import { Dropdown } from '../components/dropdown';

function Home() {
  const router = useRouter()
  const [archive, setArchive] = useState()
  const [folder, setFolder] = useState()
  const [folderName, setFolderName] = useState()
  const [tabs, setTabs] = useState([])
  const [currentDirectory, setCurrentDirectory] = useState()

  const handleOpenDirectory = () => {
    ipcRenderer.send("choose-directory")
    ipcRenderer.on("chosen-directory", (e, message) => {
      if (message.filePaths[0]) {
        setCurrentDirectory(message.filePaths[0])
        const path = message.filePaths[0].split("/").join("+")
        fetch(`/api/folder/${path}`)
        .then((res) => res.json())
        .then((data) => {
          setArchive(data)
          let processedFiles = data.files.map((file) => {
            let f = file.split(message.filePaths[0] + "/")
            return f[1]
          })
          setFolder(processedFiles)
          setFolderName(message.filePaths[0].split("/").pop().toUpperCase())
        })
      }
    })
  }

  const handleNewTab = (data) => {
    if (tabs[0]) {
      if (tabs[0].filter(tab => tab.id === data).length > 0) {
        return
      } else {
        const update = [...tabs]
        const path = currentDirectory.split("/").join("+") + "+" + data
        fetch(`/api/recipe/${path}`)
        .then((res) => res.json())
        .then((data) => {
          update[0].push(data)
          setTabs(update)
        })
      }
    } else {
      const array = [[]]
      const path = currentDirectory.split("/").join("+") + "+" + data
      fetch(`/api/recipe/${path}`)
      .then((res) => res.json())
      .then((data) => {
        array[0].push(data)
        setTabs(array)
      })

    }
  }

  const handleCloseTab = (data) => {
    const update = []
    const filtered = tabs[0].filter(tab => tab.id != data)
    update.push(filtered)
    setTabs(update)
  }

  return (
    <>
      <Split className="flex max-h-[96vh] h-[96vh] max-w-[95vw] w-full" direction="horizontal" sizes={[15, 85]} cursor="col-resize" gutterSize={10} gutterAlign="center">
          <div className="p-2 max-h-[96vh] h-[96vh]">
              <div className='opacity-70'>
                ARCHIVE
              </div>
              {
                Array.isArray(folder) ? 
                (
                  <Dropdown title={folderName}>
                    <div>
                      {folder.map((file, index) => {
                        if (file[0] === ".") {
                          return
                        }
                        return (
                          <div key={index} tabIndex="0" className="opacity-60 hover:cursor-pointer hover:opacity-100 hover:bg-gray-900 p-1 overflow-y-auto scrollBarHide font-thin" onClick={(e) => {handleNewTab(file)}}>
                            {file}
                          </div>
                        )
                      })}
                    </div>
                  </Dropdown>
                )
                :
                (
                  <Dropdown title={"NO FOLDER OPEN"}>
                    <div className='p-2 space-y-3'>
                      <div className='opacity-70'>
                        Select a folder where you would like to store your recipes.
                      </div>
                      <button className='p-2 bg-gray-900 opacity-80 hover:opacity-100 w-full' onClick={() => handleOpenDirectory()}>
                        Select Folder
                      </button>
                    </div>
                  </Dropdown>
                )
              }
          </div>
          {
            tabs[0]?.length > 0 ? (
              <div className='max-w-full'>
                <Tab.Group>
                  <Tab.List >
                    <div className="flex items-center justify-between space-x-5">
                      <div className='flex whitespace-nowrap overflow-scroll scrollBarHide'>
                        {
                          tabs[0].map((tab, index) => {
                            return (
                              <Tab key={index}>
                                {({ selected }) => (
                                  <div className="group flex items-center ui-selected:bg-gray-900 ui-selected:outline-none focus:border-none focus:outline-none p-3 rounded">
                                  {tab.id}
                                    {
                                      selected ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 ml-2 rounded-md hover:bg-gray-700" onClick={(e) => {
                                          handleCloseTab(tab.id)
                                        }}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      )
                                      : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 invisible group-hover:visible hover:bg-gray-700 rounded-md ml-2" onClick={(e) => {
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
                      <div className='p-2 hover:bg-gray-800 rounded hover:cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                      </div>
                    </div>
                  </Tab.List>
                  <Tab.Panels>
                    {
                      tabs[0].map((tab, index) => {
                        return (
                          <Tab.Panel key={index}>
                            <div className='p-2 space-y-5 pt-6 h-[90vh] overflow-scroll customScroll overflow-x-hidden px-5'>
                              <div className='text-4xl'>
                                {tab.title}
                              </div>
                              <div className='space-x-2'>
                                {
                                  tab.tags ? tab.tags.map((tag) => {
                                    return (
                                      <span className='bg-gray-800 rounded-md p-1 px-2'>
                                        {tag}
                                      </span>
                                    )
                                  })
                                  : null
                                }
                              </div>
                              <div>
                                <div className='prose text-white prose-li:text-white prose-ol:text-white prose-a:text-gray-300 leading-none text-sm prose-hr:border-none prose-hr:my-1' dangerouslySetInnerHTML={{__html: tab.contentHtml}}/>
                              </div>
                            </div>
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
              <div className='flex items-center justify-center'>
                <div className='space-y-5'>
                  <div className='opacity-10 text-7xl font-bold text-center'>
                    METALSPOON
                  </div>
                  <div className='text-center opacity-70'>
                    Open a file to start editing
                  </div>
                </div>
              </div>
            )
          }
      </Split>
    </>
  );
}

export default Home;
