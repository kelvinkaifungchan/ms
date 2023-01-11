import { useEffect, useState } from 'react';
import { Dropdown } from '../components/dropdown';

export const ArchivePanel = ({active, folder, folderName, handleOpenDirectory, handleNewTab, currentDirectory, updateFileList}) => {
  const [files, setFiles] = useState()
  
  useEffect(() => {
    setFiles(folder)
  }, [folder])

    return (
        <div className={`p-2 max-h-[96vh] h-[96vh] ${active ? "block" : "hidden"}`}>
              <div className='opacity-70'>
                ARCHIVE
              </div>
              {
                Array.isArray(files) ? 
                (
                  <Dropdown title={folderName} currentDirectory={currentDirectory} updateFileList={updateFileList}>
                    <div>
                      {files.map((file, index) => {
                        return (
                          <div key={index} tabIndex="0" className="opacity-60 hover:cursor-pointer hover:opacity-100 hover:bg-mono-900 p-1 overflow-y-auto scrollBarHide font-thin" onClick={(e) => {handleNewTab(file)}}>
                            {file.replace(/\.md$/, '')}
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
    )
}