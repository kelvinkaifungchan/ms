import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { PopDropdownItem, PopDropdownContent } from "./PopDropdown";

export const NewFileDropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-6 h-6 hover:cursor-pointer hover:bg-hl rounded-md">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <PopDropdownContent>
          <PopDropdownItem>
            <div>New Folder</div>
          </PopDropdownItem>
          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </PopDropdownContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
