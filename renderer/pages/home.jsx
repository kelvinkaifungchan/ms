import React, { useState } from 'react';
import { useRouter } from 'next/router';
import electron from "electron"
const ipcRenderer = electron.ipcRenderer || false;
import Split from 'react-split'
import { Dropdown } from '../components/dropdown';

function Home() {
  const router = useRouter()
  const [archive, setArchive] = useState()
  const [folder, setFolder] = useState()
  const [folderName, setFolderName] = useState()
  const [tabs, setTabs] = useState([])

  const handleOpenDirectory = () => {
    ipcRenderer.send("choose-directory")
    ipcRenderer.on("chosen-directory", (e, message) => {
      if (message.filePaths[0]) {
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

  const handleNewTab = (e, data) => {
    if (tabs[0]) {
      tabs[0].push(data)
    } else {
      tabs.push([data])
    }
  }

  console.log(tabs)

  return (
    <>
      <Split className="flex max-h-[96vh] h-[96vh] w-full" direction="horizontal" sizes={[15, 85]} cursor="col-resize" gutterSize={10} gutterAlign="center">
          <div className="p-2 space-y-2 max-h-[96vh] h-[96vh]">
              <div className='font-thin opacity-70'>
                EDITOR
              </div>
              {
                Array.isArray(folder) ? 
                (
                  <Dropdown title={folderName}>
                    <div className='overflow-auto'>
                      {folder.map((file, index) => {
                        if (file[0] === ".") {
                          return
                        }
                        return (
                          <div key={index} tabIndex="0" className="opacity-70 hover:cursor-pointer hover:opacity-100 hover:bg-gray-900 p-1 overflow-y-auto scrollBarHide" onClick={(e) => {handleNewTab(e, file)}}>
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
            tabs[0] != undefined ? (
              <div>
                Hi
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
