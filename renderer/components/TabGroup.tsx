import path from "path";
import { useEffect, useState } from "react";
//Components
import Split from "react-split-it";
import { Tab } from "@headlessui/react";
import { Editor } from "./Editor";
import { Timer } from "./Timer";
import { Tooltip } from "./Tooltip";
import { Welcome } from "./Welcome";
//Icons
import { BsCircleFill } from "react-icons/bs";
import { FileIcon } from "./FileIcon";
import { VscLayoutSidebarRight, VscLayoutPanel } from "react-icons/vsc";

export const TabGroup = ({
  dir,
  active,
  tabs,
  index,
  handleNewTab,
  handleCloseTab,
  activeTab,
  handleActiveTab,
  handleNewTabGroup,
  handleActiveTabGroup,
  handleOpenDirectory,
}) => {
  const [changed, setChanged] = useState([]);
  const [timers, setTimers] = useState([]);
  const [timerRight, setTimerRight] = useState(true);

  useEffect(() => {
    const change = [];
    for (var i = 0; i < tabs.length; i++) {
      change.push(false);
    }
    setChanged(change);
  }, [tabs]);

  const handleChanged = (index) => {
    const update = [...changed];
    update[index] = true;
    setChanged(update);
  };

  const handleSaved = (index) => {
    const update = [...changed];
    update[index] = false;
    setChanged(update);
  };

  const handleNewTimer = () => {
    const update = [...timers];
    update.push(update.length);
    setTimers(update);
  };

  const handleCloseTimer = (index) => {
    const update = [...timers];
    update.splice(index, 1);
    setTimers(update);
  };

  return (
    <>
      {dir ? (
        <>
          {tabs?.length > 0 ? (
            <div
              className="w-full h-full overflow-hidden flex flex-col"
              onClick={(e) => {
                handleActiveTabGroup(index);
              }}>
              <Tab.Group selectedIndex={activeTab}>
                <Tab.List>
                  <div className="flex items-center justify-between space-x-5 h-full">
                    <div className="flex whitespace-nowrap overflow-scroll scrollBarHide">
                      {tabs?.map((tab, i) => {
                        return (
                          <Tab
                            key={i}
                            className={"focus:outline-none focus:border-none"}>
                            {({ selected }) => (
                              <div
                                className={`group flex items-center ${
                                  selected ? " opacity-100" : "opacity-30"
                                } focus:border-none focus:outline-none p-2 rounded-sm hover:opacity-100 duration-150 max-w-[300px]`}
                                onClick={(e) => {
                                  handleActiveTab(i, index);
                                }}>
                                <div>
                                  <FileIcon fileType={path.extname(tab.id)} />
                                </div>
                                <div className="ml-2 truncate">
                                  {tab.id.replace(/\.[^.]*$/, "")}
                                </div>
                                {changed[i] ? (
                                  <>
                                    <span className="ml-2">
                                      <BsCircleFill className="h-2 w-2" />
                                    </span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1}
                                      stroke="currentColor"
                                      className="w-4 h-4 rounded-md hover:bg-hl ml-3"
                                      onClick={(e) => {
                                        handleCloseTab(tab.id);
                                      }}>
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </>
                                ) : selected ? (
                                  <div
                                    onClick={(e) => {
                                      handleCloseTab(tab.id);
                                    }}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1}
                                      stroke="currentColor"
                                      className="w-4 h-4 rounded-md hover:bg-hl ml-3">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </div>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    className="w-4 h-4 invisible group-hover:visible hover:bg-mono-700 rounded-md ml-3"
                                    onClick={(e) => {
                                      handleCloseTab(tab.id);
                                    }}>
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                )}
                              </div>
                            )}
                          </Tab>
                        );
                      })}
                    </div>
                    {active ? (
                      <div className="flex items-center">
                        <Tooltip
                          tooltip={"Add Timer"}
                          position={"-translate-x-16 translate-y-10"}>
                          <div
                            className="p-1 hover:bg-hl rounded hover:cursor-pointer"
                            onClick={(e) => {
                              handleNewTimer();
                            }}>
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
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </Tooltip>
                        {timerRight ? (
                          <Tooltip
                            tooltip={"Split Timer Bottom"}
                            position={"-translate-x-28 translate-y-10"}>
                            <div
                              className="p-1 hover:bg-hl rounded hover:cursor-pointer"
                              onClick={() => {
                                setTimerRight(false);
                              }}>
                              <VscLayoutPanel className="w-5 h-5" />
                            </div>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            tooltip={"Split Timer Right"}
                            position={"-translate-x-28 translate-y-10"}>
                            <div
                              className="p-1 hover:bg-hl rounded hover:cursor-pointer"
                              onClick={() => {
                                setTimerRight(true);
                              }}>
                              <VscLayoutSidebarRight className="w-5 h-5" />
                            </div>
                          </Tooltip>
                        )}

                        <Tooltip
                          tooltip={"Split Editor Right (⌥)"}
                          position={"-translate-x-28 translate-y-10"}>
                          <div
                            className="p-1 hover:bg-hl rounded hover:cursor-pointer"
                            onClick={(e) => {
                              handleNewTabGroup();
                            }}>
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
                                d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
                              />
                            </svg>
                          </div>
                        </Tooltip>
                      </div>
                    ) : null}
                  </div>
                </Tab.List>
                <Tab.Panels className="h-full w-full overflow-hidden">
                  {tabs?.map((tab, index) => {
                    return (
                      <Tab.Panel
                        key={index}
                        className={`flex  h-full w-full overflow-hidden flex-col`}>
                        <Split
                          className={`h-full w-full flex ${
                            timerRight ? "" : "flex-col"
                          }`}
                          direction={timerRight ? "horizontal" : "vertical"}
                          minSize={150}
                          gutterSize={10}
                          sizes={[0.7, 0.2]}>
                          {tab.id.includes(".md") ? (
                            <Editor
                              index={index}
                              file={tab}
                              handleChanged={handleChanged}
                              handleSaved={handleSaved}
                              dir={dir}
                            />
                          ) : null}
                          {timers.length > 0 ? (
                            <Split
                              className={`flex  h-full w-full ${
                                timerRight ? "flex-col" : null
                              }`}
                              minSize={200}
                              direction={"vertical"}
                              gutterSize={10}>
                              {timers?.map((time, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex w-full h-full">
                                    <Timer
                                      index={index}
                                      handleCloseTimer={handleCloseTimer}
                                    />
                                  </div>
                                );
                              })}
                            </Split>
                          ) : null}
                        </Split>
                      </Tab.Panel>
                    );
                  })}
                </Tab.Panels>
              </Tab.Group>
            </div>
          ) : (
            <>
              <div className="p-2 flex items-center">
                Empty Tab{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-4 h-4 rounded-md hover:bg-hl ml-3"
                  onClick={() => {
                    console.log("clicked");
                  }}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div
                className="w-full h-full flex items-center justify-center"
                onClick={(e) => {
                  handleActiveTabGroup(index);
                }}>
                No File Open
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full">
          <Welcome handleOpenDirectory={handleOpenDirectory} />
        </div>
      )}
    </>
  );
};
