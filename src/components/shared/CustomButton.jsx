import React from "react";
import { Slot } from "@radix-ui/react-slot";
import * as Btn from "@/components/ui/button";
import * as Tp from "@/components/ui/tooltip";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef(
  ({ tooltip, insidePopover, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : Btn.Button;
    const buttonComponent = <Comp ref={ref} {...props} />;

    if (insidePopover || asChild) {
      return buttonComponent;
    }

    return tooltip ? (
      <Tp.TooltipProvider>
        <Tp.Tooltip>
          <Tp.TooltipTrigger asChild>{buttonComponent}</Tp.TooltipTrigger>
          <Tp.TooltipContent side="top">
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {tooltip}
            </span>
          </Tp.TooltipContent>
        </Tp.Tooltip>
      </Tp.TooltipProvider>
    ) : (
      buttonComponent
    );
  },
);

Button.displayName = "Button";

export const SubmitButton = ({ isLoading, className, children, ...props }) => {
  return (
    <Button
      {...props}
      size="sm"
      type="submit"
      variant="default"
      disabled={isLoading}
      className={
        className ??
        "text-sm h-10 lg:flex justify-center align-middle items-center hover:cursor-pointer"
      }
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : (
        (children ?? `Submit`)
      )}
    </Button>
  );
};
