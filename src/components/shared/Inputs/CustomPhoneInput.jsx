import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Pv from "@/components/ui/popover";
import * as Cmd from "@/components/ui/command";
import { cn } from "@/lib/utils";

const PhoneInput = React.forwardRef(
  (
    {
      className,
      onChange,
      countries = ["KE", "UG", "TZ", "RW"],
      defaultCountry = "KE",
      fieldState = {},
      value,
      ...props
    },
    ref,
  ) => {
    // Provide a safe default string if value is null or undefined
    const safeValue = value ?? "";

    return (
      <div
        className={cn(
          "flex rounded-md h-10 border bg-transparent transition-colors duration-200 focus-within:ring-1 focus-within:ring-primary",
          fieldState.error
            ? "border-destructive"
            : !fieldState.error && safeValue
              ? "border-green-500"
              : "border-input",
          className,
        )}
      >
        <RPNInput.default
          ref={ref}
          className={cn("flex w-full", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          onChange={(value) => onChange?.(value || "")}
          value={safeValue}
          countries={countries}
          defaultCountry="KE"
          {...props}
        />
      </div>
    );
  },
);
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn(
      "rounded-e-md rounded-s-none px-3 border-0 focus:ring-0 focus-visible:ring-0 shadow-none h-full",
      className,
    )}
    {...props}
  />
));
InputComponent.displayName = "InputComponent";

const CountrySelect = ({ disabled, value, onChange, options }) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchInputRef = React.useRef(null);

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) {
      return options.filter((x) => x && x.value);
    }
    return options.filter((option) => {
      if (!option || !option.value || !option.label) return false;

      try {
        const countryCode = RPNInput.getCountryCallingCode(option.value);
        return (
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (countryCode && countryCode.includes(searchQuery))
        );
      } catch (error) {
        console.warn(`Invalid country code: ${option.value}`, error);
        return option.label.toLowerCase().includes(searchQuery.toLowerCase());
      }
    });
  }, [options, searchQuery]);

  const handleSelect = React.useCallback(
    (country) => {
      console.log("handleSelect called with:", country);
      onChange(country);
      setOpen(false);
      setSearchQuery(""); // Reset search when closing
    },
    [onChange],
  );

  const handleItemClick = React.useCallback(
    (e, country) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Item clicked:", country);
      handleSelect(country);
    },
    [handleSelect],
  );

  const handleSearchChange = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchQuery(e.target.value);
  }, []);

  // Focus search input when popover opens
  React.useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  return (
    <Pv.Popover open={open} onOpenChange={setOpen}>
      <Pv.PopoverTrigger asChild>
        <Button
          type="button"
          role="combobox"
          variant={"outline"}
          className={cn(
            "flex rounded-e-none h-full rounded-s-md px-3 border-0 shadow-none focus:ring-0 focus-visible:ring-0",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          disabled={disabled}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <FlagComponent country={value} countryName={value} />
          <CaretSortIcon
            className={cn(
              "-mr-2 size-4 opacity-50 shrink-0",
              disabled ? "hidden" : "opacity-50",
            )}
          />
        </Button>
      </Pv.PopoverTrigger>
      <Pv.PopoverContent
        className="w-[300px] p-0 z-[60]"
        align="start"
        sideOffset={4}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col max-h-[300px]">
          {/* Search Input */}
          <div className="p-3 border-b bg-background sticky top-0 z-10">
            <input
              ref={searchInputRef}
              className="w-full h-9 px-3 text-base border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              placeholder="Search country..."
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                e.stopPropagation();
                // Prevent form submission when pressing Enter
                if (e.key === "Enter") {
                  e.preventDefault();
                }
                // Handle arrow keys for keyboard navigation
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  // Focus first/last country option if available
                  const firstOption = document.querySelector('[role="option"]');
                  if (firstOption) {
                    firstOption.focus();
                  }
                }
              }}
            />
          </div>

          {/* Scrollable Country List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-accent rounded-md transition-colors duration-150 focus:bg-accent focus:outline-none",
                      option.value === value &&
                        "bg-accent border border-primary/20",
                    )}
                    onClick={(e) => handleItemClick(e, option.value)}
                    onMouseDown={(e) => e.preventDefault()}
                    role="option"
                    tabIndex={0}
                    aria-selected={option.value === value}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleItemClick(e, option.value);
                      }
                    }}
                  >
                    <FlagComponent
                      country={option.value}
                      countryName={option.label}
                    />
                    <span className="flex-1 text-sm font-medium min-w-0 truncate">
                      {option.label}
                    </span>
                    <span className="text-muted-foreground text-sm font-mono">
                      +
                      {(() => {
                        try {
                          return (
                            RPNInput.getCountryCallingCode(option.value) || ""
                          );
                        } catch (error) {
                          console.warn(
                            `Invalid country code: ${option.value}`,
                            error,
                          );
                          return "";
                        }
                      })()}
                    </span>
                    <CheckIcon
                      className={cn(
                        "ml-1 size-4 flex-shrink-0",
                        option.value === value
                          ? "opacity-100 text-primary"
                          : "opacity-0",
                      )}
                    />
                  </div>
                ))
              ) : (
                <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No countries found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      </Pv.PopoverContent>
    </Pv.Popover>
  );
};

CountrySelect.displayName = "CountrySelect";

const FlagComponent = ({ country, countryName }) => {
  const Flag = flags[country];
  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };
