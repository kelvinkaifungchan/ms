import React, { useEffect, useState } from "react";
import { Tooltip } from "./Tooltip";
import { InfoModal } from "./InfoModal";

export const WindowBar = ({ dir, refresh, refreshing }) => {
  const [infoModal, setInfoModal] = useState(false);
  return (
    <div className="h-[40px] min-h-[40px] drag flex flex-none items-center justify-between p-2 space-x-3">
      <div></div>
      <div className="w-1/4">
        <div className="opacity-50 hover:opacity-100 hover:cursor-pointer duration-150 text-xs border rounded-md p-1 flex items-center space-x-4 justify-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <div>{dir}</div>
        </div>
        {/* <input type="text" className="border border-lightgreen w-full rounded-md"/> */}
      </div>
      <div className="flex items-center space-x-2">
        {dir ? (
          refreshing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-6 h-6 hover:bg-hl rounded-md hover:cursor-pointer animate-spin opacity-50">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          ) : (
            <Tooltip
              tooltip={"Refresh"}
              position={"translate-y-10 -translate-x-10"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-6 h-6 hover:bg-hl rounded-md hover:cursor-pointer"
                onClick={() => {
                  refresh();
                }}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </Tooltip>
          )
        ) : null}
        <Tooltip tooltip={"Info"} position={"translate-y-10 -translate-x-10"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-6 h-6 hover:bg-hl rounded-md hover:cursor-pointer"
            onClick={() => {
              setInfoModal(!infoModal);
            }}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </Tooltip>
        <InfoModal
          toggle={() => {
            setInfoModal(!infoModal);
          }}
          modal={infoModal}
        />
      </div>
    </div>
  );
};
