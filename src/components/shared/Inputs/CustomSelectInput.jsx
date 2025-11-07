/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import {
  CaretSortIcon,
  CheckIcon,
  Cross2Icon as CloseIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { FixedSizeList as List } from "react-window";
import { matchSorter } from "match-sorter";

/**
 * Styles that align with shadcn/ui
 */
const Styles = {
  control: {
    base: "flex !min-h-10 w-full rounded-md border border-input bg-transparent pl-3 py-1 pr-1 gap-1 text-base shadow-sm transition-colors hover:cursor-pointer",
    focus: "outline-none ring-1 ring-ring",
    disabled: "cursor-not-allowed opacity-50",
    error: "border-error", // Error border style
    success: "border-success", // Success border style
  },
  placeholder: "text-base text-gray-400 dark:text-gray-600",
  valueContainer: "gap-1",
  multiValue:
    "inline-flex items-center gap-2 rounded-md border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  indicatorsContainer: "gap-1",
  clearIndicator: "p-1 rounded-md",
  dropdownIndicator: "p-1 rounded-md",
  menu: "p-1 mt-2 border bg-popover shadow-md rounded-md text-popover-foreground",
  groupHeading: "py-2 px-1 text-secondary-foreground text-sm font-semibold",
  option: {
    base: "hover:cursor-pointer hover:bg-accent hover:text-accent-foreground px-2 py-1.5 rounded-sm !text-base !cursor-default !select-none !outline-none font-sans",
    focus: "active:bg-accent/90 bg-accent text-accent-foreground",
    disabled: "pointer-events-none opacity-50",
  },
  noOptionsMessage:
    "text-accent-foreground p-2 bg-accent border border-dashed border-border rounded-sm",
  loadingIndicator: "flex items-center justify-center h-4 w-4 opacity-50",
  loadingMessage: "text-accent-foreground p-2 bg-accent",
};

/**
 * Factory method to create classNames configuration
 */
const createClassNames = (classNames, fieldState = {}) => {
  const generateClassName = (base, state) =>
    cn(base, classNames?.[state]?.(state));

  return {
    clearIndicator: () =>
      generateClassName(Styles.clearIndicator, "clearIndicator"),
    control: (state) =>
      cn(
        Styles.control.base,
        state.isDisabled ? Styles.control.disabled : "",
        state.isFocused ? Styles.control.focus : "",
        fieldState.error ? Styles.control.error : "", // Apply error border
        !fieldState.error && (fieldState.isValid || state.selectProps.value)
          ? Styles.control.success
          : "", // Apply success border
      ),
    dropdownIndicator: () =>
      generateClassName(Styles.dropdownIndicator, "dropdownIndicator"),
    groupHeading: () => generateClassName(Styles.groupHeading, "groupHeading"),
    indicatorsContainer: () =>
      generateClassName(Styles.indicatorsContainer, "indicatorsContainer"),
    menu: () => generateClassName(Styles.menu, "menu"),
    multiValue: () => generateClassName(Styles.multiValue, "multiValue"),
    noOptionsMessage: () =>
      generateClassName(Styles.noOptionsMessage, "noOptionsMessage"),
    option: (state) =>
      cn(
        Styles.option.base,
        state.isFocused ? Styles.option.focus : "",
        state.isDisabled ? Styles.option.disabled : "",
      ),
    placeholder: () => generateClassName(Styles.placeholder, "placeholder"),
    valueContainer: () =>
      generateClassName(Styles.valueContainer, "valueContainer"),
  };
};

/* ----------- components ----------- */
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretSortIcon className={"size-4 opacity-50"} />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <CloseIcon className={"size-3.5 opacity-50"} />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon className={"size-3 opacity-50"} />
    </components.MultiValueRemove>
  );
};

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div className={`flex items-center justify-between`}>
        <p className={`${props.isSelected && "text-primary font-medium"}`}>
          {props.data.label}
        </p>
        {props.isSelected && (
          <CheckIcon
            className={cn("ml-auto size-5 text-primary font-medium")}
          />
        )}
      </div>
    </components.Option>
  );
};

const Menu = (props) => {
  return <components.Menu {...props}>{props.children}</components.Menu>;
};

const MenuList = (props) => {
  const { children, maxHeight } = props;

  const childrenArray = React.Children.toArray(children);

  const calculateHeight = () => {
    const totalHeight = childrenArray.length * 35; // Adjust item height if different
    return totalHeight < maxHeight ? totalHeight : maxHeight;
  };

  const height = calculateHeight();

  if (!childrenArray || childrenArray.length - 1 === 0) {
    return <components.MenuList {...props} />;
  }
  return (
    <List
      height={height}
      itemCount={childrenArray.length}
      itemSize={35} // Adjust item height if different
      width="100%"
    >
      {({ index, style }) => (
        <div style={style} className="h-28">
          {childrenArray[index]}
        </div>
      )}
    </List>
  );
};

export const defaultClassNames = createClassNames({});

export const defaultStyles = {
  input: (base) => ({
    ...base,
    fontSize: "16px",
    lineHeight: "1.5",
    "input:focus": {
      boxShadow: "none",
    },
  }),
  multiValueLabel: (base) => ({
    ...base,
    whiteSpace: "normal",
    overflow: "visible",
  }),
  control: (base) => ({
    ...base,
    transition: "none",
  }),
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      background: "transparent",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "hsl(var(--border))",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "transparent",
    },
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 2,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 2,
  }),
};

export const SelectInput = React.forwardRef(
  (
    {
      defaultValue,
      value,
      onChange,
      options = [],
      styles = defaultStyles,
      classNames = defaultClassNames,
      components = {},
      isClearable = true,
      onBlur,
      onFocus,
      fieldState = {}, // Added to pass error/success state
      ...props
    },
    ref,
  ) => {
    const id = React.useId();

    const sortedOptions =
      options && options.length > 0
        ? matchSorter(options, {
            keys: ["label"],
            threshold: matchSorter.rankings.STARTS_WITH,
          })
        : options;

    const filterOptions = (inputValue) => {
      return sortedOptions.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
    };

    const loadOptions = (inputValue, callback) => {
      setTimeout(() => {
        callback(filterOptions(inputValue));
      }, 1000);
    };

    // Pass fieldState to createClassNames for dynamic styling
    const dynamicClassNames = createClassNames(classNames, fieldState);

    return (
      <AsyncSelect
        ref={ref}
        instanceId={id}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        loadOptions={loadOptions}
        defaultOptions={sortedOptions}
        cacheOptions
        unstyled
        components={{
          DropdownIndicator,
          ClearIndicator,
          MultiValueRemove,
          Option,
          Menu,
          MenuList,
          ...components,
        }}
        styles={styles}
        classNames={dynamicClassNames} // Use dynamic classNames with fieldState
        isClearable={isClearable}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />
    );
  },
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
