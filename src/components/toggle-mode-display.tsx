import { IconLayout2, IconList } from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props {
  onSet: (value: string) => void;
  valueSet: string;
  localStorageName: string;
}
const ToggleModeDisplay = ({ onSet, valueSet, localStorageName }: Props) => {
  const handleSwitchMode = (mode: string) => {
    localStorage.setItem(localStorageName, mode);

    onSet(mode);
  };

  return (
    <div className="flex items-center justify-between border  h-9 w-28 rounded-full">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            onClick={() => handleSwitchMode("list")}
            className={`cursor-pointer rounded-l-full flex items-center justify-center w-full h-full ${
              valueSet === "list" && "bg-secondary"
            }`}
          >
            <IconList className="w-5 h-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>List</p>
        </TooltipContent>
      </Tooltip>

      <div className="border-l h-full " />
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            onClick={() => handleSwitchMode("grid")}
            className={`cursor-pointer rounded-r-full flex items-center justify-center w-full h-full ${
              valueSet === "grid" && "bg-secondary"
            }`}
          >
            <IconLayout2 className="w-5 h-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Grid</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ToggleModeDisplay;
