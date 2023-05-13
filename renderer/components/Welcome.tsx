import React, { useEffect, useState } from "react";
import path from "path";
import { ipcRenderer } from "electron";

export const Welcome = ({ handleOpenDirectory }) => {
  const [recentDirectories, setRecentDirectories] = useState([]);

  useEffect(() => {
    getRecentDirectories().then((result) => {
      setRecentDirectories(result);
    });
  }, []);
  const getRecentDirectories = async () => {
    const recentDirectories = await ipcRenderer.invoke(
      "get-recent-directories"
    );
    return recentDirectories;
  };

  return (
    <div className="shadow-inner flex h-full w-full justify-center items-center space-x-5">
      <div className="space-y-5 p-5">
        <div className="text-lg">Recent</div>
        <div>
          {recentDirectories
            ? recentDirectories.map((project) => {
                return (
                  <div
                    key={project}
                    className="space-x-5 hover:cursor-pointer hover:bg-hl p-2 rounded-md"
                    onClick={() => {
                      handleOpenDirectory(project);
                    }}>
                    <span className="font-black">
                      {project ? path.basename(project) : null}
                    </span>
                    <span className="truncate">{project}</span>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
