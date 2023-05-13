import { Button } from "./Button";
import { HorizontalLine } from "./HorizontalLine";

export const SettingAbout = () => {
  return (
    <div className="space-y-2">
      <div className="p-1 font-bold">App</div>
      <HorizontalLine />
      <div>Current Version: v.0.1.0-beta</div>
      <HorizontalLine/>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold">Get Help</div>
          <div className="opacity-70">Contact us for help or feedback.</div>
        </div>
        <div>
          <Button button="Help" />
        </div>
      </div>
    </div>
  );
};
