import { Dropdown } from '../components/dropdown';

export const ArchivePanel = ({active, folder, folderName, handleOpenDirectory, handleNewTab}) => {

    return (
        <div className={`p-2 max-h-[96vh] h-[96vh] ${active ? "block" : "hidden"}`}>
              <div className='opacity-70'>
                ARCHIVE
              </div>
              {
                Array.isArray(folder) ? 
                (
                  <Dropdown title={folderName}>
                    <div>
                      {folder.map((file, index) => {
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
    )
}