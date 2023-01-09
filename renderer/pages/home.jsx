import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import electron from "electron"
const ipcRenderer = electron.ipcRenderer || false;
import Split from 'react-split-it';
import { ToolBar } from '../components/toolBar';
import { ArchivePanel } from '../components/archivePanel';
import { SearchPanel } from '../components/searchPanel';
import { TabGroup } from '../components/tabGroup';
import { PlanPanel } from '../components/planPanel';

function Home() {
  const router = useRouter()
  const [archive, setArchive] = useState()
  const [folder, setFolder] = useState()
  const [folderName, setFolderName] = useState()
  const [tabs, setTabs] = useState([[]])
  const [currentDirectory, setCurrentDirectory] = useState()
  const [activeTab, setActiveTab] = useState([])
  const [activeTabGroup, setActiveTabGroup] = useState(0)
  const [activeTool, setActiveTool] = useState(0)

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
          setFolder(processedFiles.filter(file => file[0] != "."))
          setFolderName(message.filePaths[0].split("/").pop().toUpperCase())
        })
      }
    })
  }

  const handleActiveTool = (tool) => {
    setActiveTool(tool)
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
        if (data.includes(".md")) {
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
        } else {
          const path = currentDirectory.split("/").join("+") + "+.metalspoon+plans+" + data + ".json"
          fetch(`/api/plan/${path}`)
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
    if (update.length < 1) {
      update.push([])
    }
    setTabs(update)
  }

  const handleActiveTab = (tabIndex, tabGroupIndex) => {
    const updateActiveTab = [...activeTab]
    updateActiveTab[tabGroupIndex] = tabIndex
    setActiveTab(updateActiveTab)
  }

  const updateFileList = (file) => {
    const update = [...folder]
    update.push(file)
    setFolder(update.sort())
  }

  const handleHotkey = (e) => {
    // "Option" + "w" to close tab
    if (e.altKey && e.keyCode === 87 && activeTab) {
      const tabId = activeTab[activeTabGroup]
      const tabName = tabs[activeTabGroup][tabId].id
      handleCloseTab(tabName)
    }
    else if (e.altKey && e.keyCode === 220) {
      handleNewTabGroup()
    }
  }

  return (
    <div>
      <Head>
        <title>Spoon</title>
      </Head>
      <div className='h-[4vh] drag flex justify-center font-bold p-2'>
      </div>
      <div className='flex w-full' onKeyDown={(e) => {handleHotkey(e)}}>
        <ToolBar handleActiveTool={handleActiveTool}/>
        <div className="w-full h-[96vh]">
          <Split className="flex max-h-[96vh] h-[96vh] max-w-[96vw] w-full" gutterAlign="center" sizes={[0.1,0.7]} minSize={200}>
              <div>
                <ArchivePanel active={activeTool === 0} folder={folder} folderName={folderName} handleNewTab={handleNewTab} handleOpenDirectory={handleOpenDirectory} currentDirectory={currentDirectory} updateFileList={updateFileList}/>
                <SearchPanel active={activeTool === 1} folder={folder} currentDirectory={currentDirectory} handleNewTab={handleNewTab} handleOpenDirectory={handleOpenDirectory}/> 
                <PlanPanel active={activeTool === 2} folderName={folderName} currentDirectory={currentDirectory} handleNewTab={handleNewTab}/>
              </div>
              <Split className='flex w-full h-full' direction="horizontal" gutterSize={10} minSize={100}>
                {
                  tabs?.map((group, index) => {
                    return (
                      <TabGroup active={index === activeTabGroup ? true : false} key={index} tabs={group} index={index} handleNewTab={handleNewTab} handleCloseTab={handleCloseTab} activeTab={activeTab[index]} handleActiveTab={handleActiveTab} handleNewTabGroup={handleNewTabGroup} handleActiveTabGroup={handleActiveTabGroup}/>
                    )
                  })
                }
              </Split>
          </Split>
        </div>
      </div>
    </div>
  );
}

export default Home;
