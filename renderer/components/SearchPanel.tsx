import { useEffect, useState } from "react";
import path from "path";
import { Button } from "./Button";
import { FileList } from "./FileList";
import RingLoader from "react-spinners/RingLoader";
import { NewFileDropdown } from "./NewFileDropdown";
import { HiOutlineFolderOpen } from "react-icons/hi";

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
}) => {
  //Files
  const [fileArchive, setFileArchive] = useState([]);
  //Loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    setFileArchive(filtered);
  }, [dir, files]);

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
        <input type="text" className="w-full" />
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
      <div className="overflow-y-auto h-full"></div>
    </div>
  );
};
