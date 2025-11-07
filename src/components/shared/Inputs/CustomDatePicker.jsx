import * as React from "react";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  format,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  subHours,
  startOfDay,
  endOfDay,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { DateInput } from "./DateInput";
import { SelectInput } from "./CustomSelectInput";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomDatePicker = React.forwardRef(
  (
    {
      value,
      onChange,
      locale = enUS,
      disabled = false,
      initialDate = {
        from: new Date(),
        to: new Date(),
      },
      mode = "range", // "single"
      displayFormat = "dd-MMM-yyyy",
      placeholder = "Pick a date",
      fromYear = 1997,
      toYear = new Date().getFullYear(),
      align = "end",
      loading,
      customPresets = [],
      openCalendar = true,
      presetsLeft = false, // prop to enable left rail quick presets
      disableFuture,
      ...props
    },
    ref,
  ) => {
    const buttonRef = React.useRef(null);
    const selectPresetRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [range, setRange] = React.useState(value ?? initialDate);
    const [selectedPreset, setSelectedPreset] = React.useState(undefined);
    const isMobile = useIsMobile();

    React.useImperativeHandle(
      ref,
      () => ({
        ...buttonRef.current,
        value,
      }),
      [value],
    );

    const initFormat = {
      display: customPresets.length > 0 ? "dd-MMM-yyyy hh:mm" : displayFormat,
    };

    // Presets
    const today = new Date();
    const defaultPresets = [
      { label: "Today", value: [startOfDay(today), endOfMonth(today)] },
      {
        label: "Yesterday",
        value: [startOfDay(subDays(today, 1)), endOfDay(today)],
      },
      { label: "This Week", value: [startOfWeek(today), today] },
      {
        label: "Last Week",
        value: [startOfWeek(subDays(today, 7)), endOfWeek(subDays(today, 7))],
      },
      { label: "This Month", value: [startOfMonth(today), today] },
      {
        label: "Last Month",
        value: [
          startOfMonth(subDays(today, 30)),
          endOfMonth(subDays(today, 30)),
        ],
      },
      { label: "This Year", value: [startOfYear(today), today] },
    ];

    const availablePresets = {
      "Last 1 hour": [subHours(today, 1), today],
      "Last 2 hours": [subHours(today, 2), today],
      "Last 3 hours": [subHours(today, 3), today],
      Today: [startOfDay(today), endOfDay(today)],
      Yesterday: [startOfDay(subDays(today, 1)), endOfDay(subDays(today, 1))],
      "This Week": [startOfWeek(today), today],
      "Last Week": [
        startOfWeek(subDays(today, 7)),
        endOfWeek(subDays(today, 7)),
      ],
      "This Month": [startOfMonth(today), today],
      "Last Month": [
        startOfMonth(subDays(today, 30)),
        endOfMonth(subDays(today, 30)),
      ],
    };

    const Presets =
      customPresets.length > 0
        ? customPresets
            .filter((label) => availablePresets[label])
            .map((label) => ({ label, value: availablePresets[label] }))
        : defaultPresets;

    const applyPreset = (preset) => {
      const v = preset?.value ?? preset;
      const from = v?.from ? v.from : v[0];
      const to = v?.to ? v.to : v[1];

      setRange({ from, to });
      setSelectedPreset(preset);
      onChange?.({ from, to });
    };

    const setPreset = (e, action) => {
      const v = e?.value ? e.value : e ? e : "";
      const from = v?.from ? v.from : v[0];
      const to = v?.to ? v.to : v[1];

      setRange({ from, to });
      setSelectedPreset(e);
      if (action === "clear") {
        setSelectedPreset(undefined);
        onChange?.({ from: initialDate?.from, to: initialDate?.to });
        setRange({ from: initialDate?.from, to: initialDate?.to });
        if (selectPresetRef.current?.clearValue)
          selectPresetRef.current.clearValue();
      }
    };

    const resetValues = () => {
      onChange?.({ from: initialDate?.from, to: initialDate?.to });
      setRange({ from: initialDate?.from, to: initialDate?.to });
      setSelectedPreset(undefined);
      if (selectPresetRef.current?.clearValue)
        selectPresetRef.current.clearValue();
    };

    const onUpdate = () => {
      onChange?.(range);
    };

    const QuickPresetButton = ({ preset }) => {
      const isActive = preset.label === selectedPreset?.label;
      return (
        <button
          key={preset.label}
          type="button"
          onClick={() => applyPreset(preset)}
          className={cn(
            "w-full h-9 text-left rounded-md px-2 flex items-center text-sm transition border cursor-pointer ",

            isActive
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent",
          )}
          aria-pressed={isActive}
        >
          {preset.label}
        </button>
      );
    };

    return (
      <Popover
        modal={true}
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className={cn(
              "w-full h-10 justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
            ref={buttonRef}
          >
            <CalendarIcon className="mr-3 -ml-1 h-4 w-4" />
            {mode === "range" ? (
              value?.from ? (
                value?.to ? (
                  <>
                    {format(value?.from, initFormat.display, { locale })} -{" "}
                    {format(value?.to, initFormat.display, { locale })}
                  </>
                ) : (
                  format(value?.from, initFormat.display, { locale })
                )
              ) : (
                <span>{placeholder}</span>
              )
            ) : value ? (
              format(value, initFormat.display, { locale })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            "flex flex-col space-y-2 p-3",
            "w-full",
            "max-h-[80vh] overflow-y-auto",
          )}
          align={align}
        >
          {presetsLeft ? (
            <div className="flex flex-col md:flex-row gap-4 w-full">
              {/* Left rail - Responsive preset list */}
              <div className="md:w-44 flex-shrink-0">
                <Label className="text-xs font-medium text-muted-foreground py-4 uppercase tracking-wide">
                  Quick presets
                </Label>
                <div className="space-y-1 overflow-y-auto max-h-[55vh] pr-1">
                  {Presets.map((p) => (
                    <QuickPresetButton key={p.label} preset={p} />
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="flex-1 min-w-0">
                {openCalendar && (
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                    <DateInput
                      value={range?.from}
                      onChange={(date) => {
                        const toDate =
                          range?.to == null || date > range?.to
                            ? date
                            : range?.to;
                        setRange({ from: date, to: toDate });
                      }}
                    />
                    <div className="py-1">-</div>
                    <DateInput
                      value={range?.to}
                      onChange={(date) => {
                        const fromDate =
                          date < range?.from ? date : range?.from;
                        setRange({ from: fromDate, to: date });
                      }}
                    />
                  </div>
                )}

                <div className="flex justify-center">
                  <Calendar
                    mode={mode}
                    locale={locale}
                    captionLayout="dropdown"
                    selected={mode === "range" ? range : value}
                    onSelect={(selected) => {
                      if (mode === "range") setRange(selected);
                      else onChange?.(selected);
                    }}
                    disabled={(date) =>
                      disabled || disableFuture ? date > new Date() : false
                    }
                    fromYear={fromYear}
                    toYear={toYear}
                    className="w-full max-w-none"
                  />
                </div>

                {/* Footer - Responsive button layout */}
                <div className="flex gap-2 justify-between items-center w-full pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-sm h-9 sm:h-10 order-3 sm:order-1"
                    onClick={resetValues}
                  >
                    Reset
                  </Button>

                  <div className="flex gap-2 order-1 sm:order-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="text-sm h-9 sm:h-10 flex-1 sm:flex-initial"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      type="button"
                      disabled={loading}
                      className="text-sm h-9 sm:h-10 flex-1 sm:flex-initial"
                      onClick={onUpdate}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          <span className="hidden sm:inline">Loading...</span>
                        </div>
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-1 grid grid-cols-1 gap-2 w-full items-center">
                {openCalendar && (
                  <div className="flex gap-2 w-full justify-center">
                    <DateInput
                      value={range?.from}
                      onChange={(date) => {
                        const toDate =
                          range?.to == null || date > range?.to
                            ? date
                            : range?.to;
                        setRange({ from: date, to: toDate });
                      }}
                    />
                    <div className="py-1">-</div>
                    <DateInput
                      value={range?.to}
                      onChange={(date) => {
                        const fromDate =
                          date < range?.from ? date : range?.from;
                        setRange({ from: fromDate, to: date });
                      }}
                    />
                  </div>
                )}
                <SelectInput
                  ref={selectPresetRef}
                  id="presets"
                  name="presets"
                  placeholder="Select Presets"
                  options={Presets}
                  value={Presets.find(
                    (obj) => obj.label === selectedPreset?.label,
                  )}
                  onChange={(e, { action }) => setPreset(e, action)}
                  className="w-full"
                />
              </div>

              <div className="flex justify-center">
                <Calendar
                  mode={mode}
                  locale={locale}
                  selected={mode === "range" ? range : value}
                  onSelect={(selected) =>
                    mode === "range" ? setRange(selected) : onChange?.(selected)
                  }
                  disabled={(date) =>
                    disabled || disableFuture ? date > new Date() : false
                  }
                  fromYear={fromYear}
                  toYear={toYear}
                  className="w-full max-w-none"
                />
              </div>

              {/* Footer - Responsive button layout */}
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-between items-stretch sm:items-center w-full pt-3 border-t border-border mt-3">
                <Button
                  type="button"
                  variant="outline"
                  className="text-sm h-9 sm:h-10 order-3 sm:order-1"
                  onClick={resetValues}
                >
                  Reset
                </Button>

                <div className="flex gap-2 order-1 sm:order-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-sm h-9 sm:h-10 flex-1 sm:flex-initial"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    disabled={loading}
                    className="text-sm h-9 sm:h-10 flex-1 sm:flex-initial"
                    onClick={onUpdate}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        <span className="hidden sm:inline">Loading...</span>
                      </div>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    );
  },
);

CustomDatePicker.displayName = "CustomDatePicker";

export { CustomDatePicker };
