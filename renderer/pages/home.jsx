import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import electron from "electron"
const ipcRenderer = electron.ipcRenderer || false;
import Split from 'react-split-it';
import { Tab } from '@headlessui/react'
import { Dropdown } from '../components/dropdown';
import { TabGroup } from '../components/tabGroup';

function Home() {
  const router = useRouter()
  const [archive, setArchive] = useState()
  const [folder, setFolder] = useState()
  const [folderName, setFolderName] = useState()
  const [tabs, setTabs] = useState([[]])
  const [currentDirectory, setCurrentDirectory] = useState()
  const [activeTab, setActiveTab] = useState([])
  const [activeTabGroup, setActiveTabGroup] = useState(0)

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

  const handleNewTabGroup = () => {
    const update = [...tabs]
    update.push([])
    setTabs(update)
  }

  const handleActiveTabGroup = (index) => {
    setActiveTabGroup(index)
  }

  const handleNewTab = (data) => {
    if (tabs[activeTabGroup]) {
      if (tabs[activeTabGroup].filter(tab => tab.id === data).length > 0) {
        return
      } else {
        const update = [...tabs]
        const path = currentDirectory.split("/").join("+") + "+" + data
        fetch(`/api/recipe/${path}`)
        .then((res) => res.json())
        .then((data) => {
          update[activeTabGroup].push(data)
          setTabs(update)
          const updateActiveTab = activeTab
          updateActiveTab[activeTabGroup] = update[activeTabGroup].length-1
          setActiveTab(updateActiveTab)
        })
      }
    }
  }

  const handleCloseTab = (data) => {
    const update = [...tabs]
    update[activeTabGroup] = update[activeTabGroup].filter(tab => tab.id != data)
    if (update[activeTabGroup].length < 1) {
      update.splice(activeTabGroup, 1)
    }

    if (activeTab[activeTabGroup] > update[activeTabGroup]?.length -1) {
      const updateActiveTab = [...activeTab]
      updateActiveTab[activeTabGroup] = update[activeTabGroup].length -1
      setActiveTab(updateActiveTab)
    }
    setTabs(update)
  }

  const handleActiveTab = (tabIndex, tabGroupIndex) => {
    const updateActiveTab = [...activeTab]
    updateActiveTab[tabGroupIndex] = tabIndex
    setActiveTab(updateActiveTab)
  }

  return (
    <>
      <Split className="flex max-h-[96vh] h-[96vh] max-w-[96vw] w-full" gutterAlign="center" sizes={[0.1,0.7]} minSize={200}>
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
                          <div key={index} tabIndex="0" className="opacity-60 hover:cursor-pointer hover:opacity-100 hover:bg-mono-900 p-1 overflow-y-auto scrollBarHide font-thin" onClick={(e) => {handleNewTab(file)}}>
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
                      <button className='p-2 bg-mono-900 opacity-70 hover:opacity-100 w-full' onClick={() => handleOpenDirectory()}>
                        Select Folder
                      </button>
                    </div>
                  </Dropdown>
                )
              }
          </div>
          <Split className='flex w-full h-full' direction="horizontal" gutterSize={10} minSize={200}>
            {
              tabs?.map((group, index) => {
                return (
                  <TabGroup key={index} tabs={group} index={index} handleNewTab={handleNewTab} handleCloseTab={handleCloseTab} activeTab={activeTab[index]} handleActiveTab={handleActiveTab} handleNewTabGroup={handleNewTabGroup} handleActiveTabGroup={handleActiveTabGroup}/>
                )
              })
            }
          </Split>
      </Split>
    </>
  );
}

export default Home;
