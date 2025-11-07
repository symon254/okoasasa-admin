/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import {
  Eye,
  EyeOff,
  InfoIcon,
  CalendarIcon,
  AsteriskIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import * as Tooltip from "@/components/ui/tooltip";
import * as Iotp from "@/components/ui/input-otp";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { PhoneInput } from "./CustomPhoneInput";
import { SelectInput } from "./CustomSelectInput";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CustomDatePicker } from "./CustomDatePicker";
import { DateTimePicker } from "./CustomDateTimePicker";
import TagInput from "./CustomInputBadge";
import { useFormContext } from "react-hook-form";

export const FormFieldType = {
  INPUT: "input",
  PASSWORD: "password",
  OTP: "otp",
  TEXTAREA: "textarea",
  PHONE_INPUT: "phoneInput",
  CHECKBOX: "checkbox",
  DATE_PICKER: "datePicker",
  DATE_TIME_PICKER: "dateTimePicker",
  DATE: "datePick",
  SELECT: "select",
  SWITCH: "switch",
  SKELETON: "skeleton",
  TAGS: "tags",
};

const RenderInput = ({ field, fieldState, props }) => {
  const inputRefs = React.useRef([]);
  const [showPassword, setShowPassword] = React.useState(false);

  const arr = new Array(props?.maxLength).fill("-");

  const renderIcon = () =>
    props.iconsrc && (
      <props.iconsrc
        className="text-gray-400 absolute left-0 top-[10px] ml-2"
        aria-hidden="true"
        size={19}
      />
    );

  // Common input props for all text inputs
  const commonInputProps = {
    placeholder: props.placeholder,
    className: `shad-input ${props.iconsrc ? "pl-10" : ""}`,
    ...field,
    ...props,
  };

  switch (props.fieldtype) {
    case FormFieldType.INPUT:
      return (
        <InputWrapper
          renderIcon={renderIcon}
          inputType="text"
          fieldState={fieldState}
          field={field}
          {...commonInputProps}
        />
      );

    case FormFieldType.PASSWORD:
      return (
        <InputWrapper
          renderIcon={renderIcon}
          inputType={showPassword ? "text" : "password"}
          fieldState={fieldState}
          field={field}
          {...commonInputProps}
          rightElement={
            <PasswordToggleButton
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          }
        />
      );

    case FormFieldType.OTP:
      return (
        <OTPInput
          arr={arr}
          field={field}
          maxLength={props.maxLength}
          inputRefs={inputRefs}
        />
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea {...commonInputProps} disabled={props.disabled} />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      // Provide { fieldState } to ensure error styling
      return (
        <FormControl>
          <PhoneInput
            international
            defaultCountry="KE"
            limitMaxLength
            placeholder={props.placeholder}
            fieldState={fieldState}
            {...field}
            {...props}
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
    case FormFieldType.SWITCH:
      return (
        <FormControl>
          <SwitchOrCheckbox props={props} field={field} />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <FormControl>
          <CustomDatePicker
            displayFormat="dd MMM yyyy"
            disabled={true}
            {...field}
            {...props}
          />
        </FormControl>
      );

    case FormFieldType.DATE_TIME_PICKER:
      return (
        <FormControl>
          <DateTimePicker
            className="w-full"
            granularity="minute"
            hourCycle={12}
            displayFormat={{ hour12: "dd-MMM-yyyy hh:mm a" }}
            value={field.value}
            onChange={field.onChange}
            placeholder={props.placeholder}
            {...field}
            {...props}
          />
        </FormControl>
      );

    case FormFieldType.DATE:
      return (
        <DatePickerComponent
          field={field}
          placeholder={props.placeholder}
          toYear={props.toYear}
          captionLayout={props?.captionLayout}
          allowAllDates={props?.allowAllDates}
          disablePastDates={props?.disablePastDates}
          {...field}
          {...props}
        />
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <SelectInput
            value={field?.value}
            onChange={field?.onChange}
            onBlur={field?.onBlur}
            onFocus={props?.onFocus}
            fieldState={fieldState}
            {...props}
          />
        </FormControl>
      );

    case FormFieldType.TAGS:
      return (
        <FormControl>
          <TagInput
            {...field}
            placeholder={props.placeholder}
            disabled={props.disabled}
            maxTags={props.maxTags}
            allowDuplicates={props.allowDuplicates}
            variant={props.variant}
            separator={props.separator}
            validateNarrative={props.validateNarrative}
            checkGlobalDuplicates={props.checkGlobalDuplicates}
            handleRemoveField={props.handleRemoveField}
            handleClearInput={props.handleClearInput}
            onValidationChange={props.onValidationChange}
            fieldsLength={props.fieldsLength}
            fieldIndex={props.fieldIndex}
            canRemoveField={props.canRemoveField}
            fieldState={fieldState}
            // Pass through any other props
            {...props}
          />
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    default:
      return null;
  }
};

// A wrapper to unify input styling & forwardRef usage
const InputWrapper = React.forwardRef(
  (
    { renderIcon, inputType, rightElement, fieldState, className, ...props },
    ref,
  ) => (
    <div className="relative flex items-center">
      {renderIcon && renderIcon()}
      <FormControl>
        <Input
          type={inputType}
          ref={ref}
          fieldState={fieldState}
          className={cn(
            className,
            fieldState?.error
              ? "border-destructive focus-visible:ring-destructive"
              : !fieldState?.error && fieldState?.isDirty && props.value
                ? "border-green-500"
                : "",
          )}
          {...props}
        />
      </FormControl>
      {rightElement && <div className="absolute right-2">{rightElement}</div>}
    </div>
  ),
);

InputWrapper.displayName = "InputWrapper";

const SwitchOrCheckbox = ({ props, field }) => {
  if (props.fieldtype === FormFieldType.CHECKBOX) {
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id={props.name}
          checked={field.value}
          onCheckedChange={field.onChange}
          {...props}
        />
        {props.label && <span>{props.label}</span>}
      </div>
    );
  }
  // FormFieldType.SWITCH
  return (
    <div
      className={cn(
        "flex items-center cursor-pointer transition-colors duration-300 p-1 rounded-full",
        field.value ? "bg-green-200" : "bg-red-200",
        props.text ? "w-20" : "w-28",
      )}
    >
      <Switch
        id={props.name}
        checked={field.value}
        onCheckedChange={field.onChange}
        {...props}
        className="mr-1"
      />
      <span
        className={cn(
          "text-sm font-semibold transition-colors duration-300",
          field.value ? "text-green-700" : "text-red-700",
        )}
      >
        {props.text
          ? field.value
            ? props.text[0]
            : props.text[1]
          : field.value
            ? "Active"
            : "Inactive"}
      </span>
    </div>
  );
};

// Toggles password visibility
const PasswordToggleButton = ({ showPassword, setShowPassword }) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    className="px-3 py-1 hover:bg-transparent text-muted-foreground"
    onClick={() => setShowPassword((prev) => !prev)}
  >
    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
    <span className="sr-only">
      {showPassword ? "Hide password" : "Show password"}
    </span>
  </Button>
);

const OTPInput = React.forwardRef(
  ({ arr, field, maxLength, inputRefs }, ref) => (
    <div
      className="flex items-center justify-center space-x-2 sm:space-x-3"
      ref={ref}
    >
      <FormControl>
        <Iotp.InputOTP
          id="otpInput"
          inputMode="numeric"
          maxLength={maxLength}
          {...field}
        >
          {arr.map((_, index) => (
            <Iotp.InputOTPGroup key={index}>
              <Iotp.InputOTPSlot
                index={index}
                ref={(el) => el && (inputRefs.current[index] = el)}
                className="h-10 w-10 text-base sm:h-11 sm:w-11 sm:text-lg md:h-12 md:w-12 md:text-xl"
                style={{ WebkitTextSecurity: "disc" }}
              />
            </Iotp.InputOTPGroup>
          ))}
        </Iotp.InputOTP>
      </FormControl>
    </div>
  ),
);

OTPInput.displayName = "OTPInput";

const DatePickerComponent = ({
  field,
  placeholder,
  captionLayout,
  allowAllDates,
  disablePastDates,
  disabled,
  disableFuture,
  toYear,
}) => (
  <FormControl>
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "w-full h-10 justify-start text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value && !isNaN(new Date(field.value)) ? (
              format(new Date(field.value), "PPP")
            ) : (
              <span>{placeholder || "Pick a date"}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 -mb-10" side="top" align="end">
        <Calendar
          mode="single"
          toYear={toYear}
          selected={field.value}
          onSelect={field.onChange}
          captionLayout="dropdown"
          // disabled={(date) => {
          //   const today = new Date();
          //   const minDate = new Date("1900-01-01");

          //   if (disablePastDates || disabled || disableFuture) {
          //     return date < today || date < minDate;
          //   } else if (allowAllDates) {
          //     return date < minDate;
          //   } else {
          //     return date > today || date < minDate;
          //   }
          // }}
          disabled={(date) =>
            disablePastDates || disabled || disableFuture
              ? date > new Date()
              : false
          }
          initialFocus
          className="scale-110"
        />
      </PopoverContent>
    </Popover>
  </FormControl>
);

const CustomFormField = (props) => {
  const { form, control, name, label, info, required, description, fieldtype } =
    props;

  // Access RHF context to set/clear errors
  const { setError, clearErrors } = useFormContext() || {};

  // Hold latest validation snapshot from TagInput
  const latestValidationRef = React.useRef(null);

  // Capture TagInput validation snapshot and optionally pass-through to any provided handler
  const handleValidationChange = React.useCallback(
    (snapshot) => {
      latestValidationRef.current = snapshot;
      if (typeof props.onValidationChange === "function") {
        props.onValidationChange(snapshot);
      }
    },
    [props],
  );

  return (
    <FormField
      control={control}
      name={name}
      form={form}
      render={({ field, fieldState }) => {
        // For TAGS fields, wrap onBlur to set/clear RHF errors based on TagInput validation
        const isTags = fieldtype === FormFieldType.TAGS;

        const handleTagsBlur = (e) => {
          // Always call the original field onBlur first so resolver runs,
          // then override messages if needed (required/manual) to avoid being clobbered.
          field.onBlur(e);

          if (isTags) {
            // Defer to end of event loop to let RHF/resolver update its state, then set/clear our errors
            setTimeout(() => {
              // Helper to determine if current field value is empty
              const isEmpty = (val) => {
                if (Array.isArray(val)) return val.filter(Boolean).length === 0;
                if (typeof val === "string") return val.trim().length === 0;
                return !val;
              };

              const snapshot = latestValidationRef.current;

              // 1) Required: if required and empty, set required error
              if (props?.required && isEmpty(field.value)) {
                setError?.(name, {
                  type: "required",
                  message: "This field is required",
                });
                // Also set a root narratives error to surface in summary if helpful
                const parentArrayName = name?.split(".")?.[0];
                if (parentArrayName === "narratives") {
                  setError?.("narratives", {
                    type: "manual",
                    message: "At least one invoice number is required",
                  });
                }
                return;
              }

              // 2) Validation/duplicate errors reported by TagInput snapshot
              if (snapshot?.hasErrors) {
                setError?.(name, {
                  type: "manual",
                  message: "Please correct invalid or duplicate invoice numbers.",
                });
                return;
              }

              // 3) Clear field error when resolved
              clearErrors?.(name);

              // Also clear the root narratives error (if any) when this field is now valid
              const parentArrayName2 = name?.split(".")?.[0];
              if (parentArrayName2 === "narratives") {
                clearErrors?.("narratives");
              }
            }, 0);
          }
        };

        // Props passed down to RenderInput/TagInput
        const propsForInput = isTags
          ? { ...props, onValidationChange: handleValidationChange }
          : props;

        // Field object passed down, with onBlur wrapped for TAGS
        const fieldForInput = isTags ? { ...field, onBlur: handleTagsBlur } : field;

        return (
          <div className="flex flex-col w-full">
            <FormItem
              className={cn(
                "flex-1 mb-2",
                fieldtype === FormFieldType.SWITCH && "flex items-center gap-4",
              )}
            >
              {fieldtype === FormFieldType.SWITCH ? (
                <RenderInput
                  field={fieldForInput}
                  fieldState={fieldState}
                  props={propsForInput}
                />
              ) : (
                <>
                  {fieldtype !== FormFieldType.CHECKBOX && label && (
                    <LabelWithInfo
                      label={label}
                      required={required}
                      info={info}
                      fieldState={fieldState}
                    />
                  )}
                  <RenderInput
                    field={fieldForInput}
                    fieldState={fieldState}
                    props={propsForInput}
                  />
                </>
              )}
            <FormDescription>{description}</FormDescription>
            {fieldtype !== FormFieldType.TAGS && (
              <FormMessage className="shad-error w-full max-w-[370px]" />
            )}
          </FormItem>
        </div>
      )}
      }
    />
  );
};

const LabelWithInfo = ({ label, required, info, fieldState }) => (
  <div className="flex items-center justify-between">
    <FormLabel
      className={cn(
        "shad-input-label flex gap-1",
        fieldState.error && "text-red-500",
        !fieldState.error &&
          (fieldState.isValid || fieldState.field?.value) &&
          "text-green-500",
      )}
    >
      {label}{" "}
      {required && (
        <AsteriskIcon
          className="text-red-500 text-muted-foreground"
          aria-hidden="true"
          size={10}
        />
      )}
    </FormLabel>

    {info && (
      <Tooltip.TooltipProvider>
        <Tooltip.Tooltip>
          <Tooltip.TooltipTrigger asChild>
            <InfoIcon
              className="text-gray-500 text-muted-foreground"
              aria-hidden="true"
              size={14}
            />
          </Tooltip.TooltipTrigger>
          <Tooltip.TooltipContent side="top">{info}</Tooltip.TooltipContent>
        </Tooltip.Tooltip>
      </Tooltip.TooltipProvider>
    )}
  </div>
);

export default CustomFormField;
