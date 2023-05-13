import { useState } from "react";
import { Modal } from "./Modal";
import { SettingAbout } from "./SettingAbout";

const Item = ({ item, selected, onClick }) => {
  return (
    <div
      className={`p-1 rounded-md hover:cursor-pointer whitespace-nowrap ${selected ? "bg-primary text-black" : "hover:bg-hl"}`}
      onClick={() => {
        onClick();
      }}>
      {item}
    </div>
  );
};

export const SettingModal = ({ toggle, modal }) => {
  const [activeTool, setActiveTool] = useState(0);
  return (
    <Modal name={"Settings"} modal={modal} toggle={toggle}>
      <div className="flex w-full h-full">
        <div className="border-hl border-r pr-2 p-4">
          <Item
            item={"About"}
            selected={activeTool === 0}
            onClick={() => {
              setActiveTool(0);
            }}
          />
          <Item
            item={"Appearance"}
            selected={activeTool === 1}
            onClick={() => {
              setActiveTool(1);
            }}
          />
          <Item
            item={"Hotkeys"}
            selected={activeTool === 2}
            onClick={() => {
              setActiveTool(2);
            }}
          />
        </div>
        <div className="w-full p-4">
          <SettingAbout />
        </div>
      </div>
    </Modal>
  );
};
