import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { formatEmail } from "@/lib/utils";

export const PopoverAction = ({
  triggerLabel,
  triggerIcon,
  content,
  onOpenChange,
  align = "end",
}) => {
  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="px-4 py-2 border dark:border-gray-600 border-gray-300 rounded-md text-sm font-medium flex items-center gap-2"
        >
          {triggerIcon}
          {triggerLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align={align}>
        {content}
      </PopoverContent>
    </Popover>
  );
};

export const EmailWithTooltip = ({ email }) => {
  return (
    <p className="text-sm font-medium text-[#0F1447] dark:text-gray-200 relative group">
      {formatEmail(email)}
      {email && email.length > 20 && (
        <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-[#0F1447] dark:bg-gray-200 text-white dark:text-[#0F1447] text-xs px-2 py-1 rounded-lg bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap transition-opacity duration-200">
          {email}
        </span>
      )}
    </p>
  );
};
