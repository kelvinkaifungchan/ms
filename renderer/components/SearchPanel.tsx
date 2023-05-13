import { useEffect, useState } from "react";
import path from "path";
import { Button } from "./Button";
import { FileList } from "./FileList";
import RingLoader from "react-spinners/RingLoader";
import { NewFileDropdown } from "./NewFileDropdown";
import { HiOutlineFolderOpen } from "react-icons/hi";
import { FileName } from "./FileName";

interface SearchPanelProps {
  active: boolean;
  dir: string;
  files: string[];
  handleOpenNewDirectory: () => void;
  handleNewTab: (file: string) => void;
  refresh: () => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  active,
  dir,
  files,
  handleNewTab,
}) => {
  //Files
  const [fileArchive, setFileArchive] = useState([]);
  const [query, setQuery] = useState("");
  //Loading
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    setLoading(true);
    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      const f = files
      .map((filePath) => {
        if (filePath.includes(".md")) {
          return path.relative(dir, filePath);
        }
        return null;
      })
      .filter((file) => {
        return file != null;
      });
      const filtered = f.filter((file) => 
        file.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFileArchive(filtered);
    } else {
      const filtered = files
        .map((filePath) => {
          if (filePath.includes(".md")) {
            return path.relative(dir, filePath);
          }
          return null;
        })
        .filter((file) => {
          return file != null;
        });
      setFileArchive([]);
    }
    setLoading(false);
  };

  return (
    <div
      className={`py-3 duration-150 ${
        active ? "flex flex-col h-full overflow-hidden space-y-4" : "hidden"
      }`}>
      <div className="group flex justify-between items-center w-full overflow-hidden">
        <div className="flex items-center space-x-4">
          <div>SEARCH</div>
          {loading ? <RingLoader color="#00ff00" size={20} /> : null}
        </div>
      </div>
      <div className="border p-1 flex items-center justify-between rounded-md opacity-70 hover:opacity-100 focus:opacity-100 duration-150">
        <input
          type="text"
          className="w-full"
          value={query}
          onChange={(e) => {
            handleSearch(e);
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="overflow-y-auto h-full">
        {fileArchive.map((file) => {
          return (
            <div
              className="p-1 hover:bg-hl rounded-md whitespace-nowrap hover:cursor-pointer"
              onClick={() => {
                handleNewTab(file);
              }}>
              <div className="truncate">
                <FileName text={path.basename(file)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
