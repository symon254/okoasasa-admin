import React, { useState, useRef, useCallback } from "react";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const TagInput = React.forwardRef(
  (
    {
      value = [],
      onChange,
      onBlur,
      placeholder = "Type and press Enter or comma to add...",
      className,
      disabled = false,
      maxTags = 100,
      fieldState,
      allowDuplicates = false,
      variant = "default",
      separator = null,
      validateNarrative = null,
      checkGlobalDuplicates = null,
      handleRemoveField = null,
      handleClearInput = null,
      fieldsLength = 1,
      fieldIndex = 0,
      canRemoveField = true,
      onValidationChange = null,
      showInlineInvalidSummary = true,
      showInlineFieldMessage = true,
      ...props
    },
    ref,
  ) => {
    // Helper function to clean and validate input
    const cleanAndValidateInput = (input) => {
      return input.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    };

    // Helper function to validate length (7-9 characters)
    const isValidLength = (input) => {
      return input.length >= 7 && input.length <= 9;
    };

    // Ensure value is always an array
    const safeValue = React.useMemo(() => {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === "string") {
        return value
          ? value
              .split(",")
              .map((item) => cleanAndValidateInput(item))
              .filter((item) => item && isValidLength(item))
          : [];
      }
      return [];
    }, [value]);

    const [inputValue, setInputValue] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [validationState, setValidationState] = useState({});
    const [validatingTags, setValidatingTags] = useState(new Set());
    const [duplicateState, setDuplicateState] = useState({});
    const [inputError, setInputError] = useState(null);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [pendingComma, setPendingComma] = useState(false);
    const [currentInputValidation, setCurrentInputValidation] = useState(null);
    const [isValidatingCurrentInput, setIsValidatingCurrentInput] =
      useState(false);
    const [editingValidation, setEditingValidation] = useState(null);
    const inputRef = useRef(null);
    const editInputRefs = useRef({});
    const containerRef = useRef(null);
    const debounceRef = useRef(null);
    const inputValidationRef = useRef(null);

    // // Check for duplicates across all fields
    // const checkForDuplicates = useCallback(() => {
    //   if (!checkGlobalDuplicates) return;

    //   const newDuplicateState = {};
    //   safeValue.forEach((tag) => {
    //     const isDuplicate = checkGlobalDuplicates(tag);
    //     if (isDuplicate) {
    //       newDuplicateState[tag] = {
    //         isDuplicate: true,
    //         message: "This invoice number appears in another field",
    //       };
    //     }
    //   });

    //   // Clean up duplicate states for tags that no longer exist
    //   setDuplicateState((prev) => {
    //     const cleanedState = {};
    //     safeValue.forEach((tag) => {
    //       if (newDuplicateState[tag]) {
    //         cleanedState[tag] = newDuplicateState[tag];
    //       }
    //     });
    //     return cleanedState;
    //   });
    // }, [safeValue, checkGlobalDuplicates]);

    // // Run duplicate check when values change
    // React.useEffect(() => {
    //   checkForDuplicates();
    // }, [checkForDuplicates]);
    // Check for duplicates across all fields
    const checkForDuplicates = useCallback(() => {
      if (!checkGlobalDuplicates) return;

      const newDuplicateState = {};
      safeValue.forEach((tag) => {
        const isDuplicate = checkGlobalDuplicates(tag);
        if (isDuplicate) {
          newDuplicateState[tag] = {
            isDuplicate: true,
            message: "This invoice number appears in another field",
          };
        }
      });

      // Only update state if there are actual changes
      setDuplicateState((prev) => {
        const cleanedState = {};
        safeValue.forEach((tag) => {
          if (newDuplicateState[tag]) {
            cleanedState[tag] = newDuplicateState[tag];
          }
        });

        // Check if state actually changed to prevent unnecessary updates
        const hasChanges =
          Object.keys(cleanedState).length !== Object.keys(prev).length ||
          Object.keys(cleanedState).some((tag) => !prev[tag]);

        return hasChanges ? cleanedState : prev;
      });
    }, [safeValue, checkGlobalDuplicates]);

    // Run duplicate check when values change - use safeValue directly
    React.useEffect(() => {
      if (!checkGlobalDuplicates) return;

      const newDuplicateState = {};
      safeValue.forEach((tag) => {
        const isDuplicate = checkGlobalDuplicates(tag);
        if (isDuplicate) {
          newDuplicateState[tag] = {
            isDuplicate: true,
            message: "This invoice number appears in another field",
          };
        }
      });

      setDuplicateState((prev) => {
        const cleanedState = {};
        safeValue.forEach((tag) => {
          if (newDuplicateState[tag]) {
            cleanedState[tag] = newDuplicateState[tag];
          }
        });

        // Check if state actually changed
        const prevKeys = Object.keys(prev);
        const newKeys = Object.keys(cleanedState);

        if (prevKeys.length !== newKeys.length) {
          return cleanedState;
        }

        const hasChanges = newKeys.some((key) => !prev[key]);
        return hasChanges ? cleanedState : prev;
      });
    }, [safeValue, checkGlobalDuplicates]);

    // Communicate validation state to parent
    React.useEffect(() => {
      if (onValidationChange) {
        const validationErrors = [];
        const duplicateErrors = [];

        // Collect validation errors from committed tags
        Object.entries(validationState).forEach(([tag, state]) => {
          if (state.status === "invalid") {
            validationErrors.push({ tag, message: state.message });
          }
        });

        // Collect duplicate errors from committed tags
        Object.entries(duplicateState).forEach(([tag, state]) => {
          if (state.isDuplicate) {
            duplicateErrors.push({ tag, message: state.message });
          }
        });

        // Add input error if exists
        const inputErrors = [];
        if (inputError) {
          inputErrors.push({ tag: inputValue, message: inputError });
        }

        // Include current input validation state for real-time feedback
        const currentTypingValue =
          inputValue && inputValue.length >= 7
            ? cleanAndValidateInput(inputValue)
            : null;
        const currentValidationState = currentInputValidation;

        onValidationChange({
          hasErrors:
            inputErrors.length > 0 ||
            validationErrors.length > 0 ||
            duplicateErrors.length > 0 ||
            currentValidationState?.status === "invalid",
          inputErrors,
          validationErrors,
          duplicateErrors,
          fieldIndex,
          currentTypingValue,
          currentValidationState,
        });
      }
    }, [
      validationState,
      duplicateState,
      inputError,
      inputValue,
      fieldIndex,
      onValidationChange,
      currentInputValidation,
    ]);

    // Focus input when container is clicked
    const handleContainerClick = () => {
      if (!disabled && inputRef.current && editingIndex === null) {
        inputRef.current.focus();
      }
    };

    //Fast validation function for current input
    const validateCurrentInput = useCallback(
      async (inputText) => {
        if (!validateNarrative || !inputText) return;

        const cleanValue = cleanAndValidateInput(inputText);
        if (cleanValue.length < 7) return;

        setIsValidatingCurrentInput(true);
        setCurrentInputValidation({
          status: "validating",
          message: "Validating...",
          cleanValue, // Add this line
        });

        try {
          const result = await validateNarrative(cleanValue);
          setCurrentInputValidation({
            status: result.isValid ? "valid" : "invalid",
            message: result.message || (result.isValid ? "Valid" : "Invalid"),
            cleanValue, // Add this line
          });
        } catch (error) {
          setCurrentInputValidation({
            status: "invalid",
            message: "Validation failed",
            cleanValue, // Add this line
          });
        } finally {
          setIsValidatingCurrentInput(false);
        }
      },
      [validateNarrative],
    );

    // Fast validation function for single tags (no debounce)
    const validateSingleTag = useCallback(
      async (tagValue) => {
        if (!validateNarrative) return;

        setValidatingTags((prev) => new Set([...prev, tagValue]));
        setValidationState((prev) => ({
          ...prev,
          [tagValue]: { status: "validating", message: "Validating..." },
        }));

        try {
          const result = await validateNarrative(tagValue);
          setValidationState((prev) => ({
            ...prev,
            [tagValue]: {
              status: result.isValid ? "valid" : "invalid",
              message: result.message || (result.isValid ? "Valid" : "Invalid"),
            },
          }));
        } catch (error) {
          setValidationState((prev) => ({
            ...prev,
            [tagValue]: {
              status: "invalid",
              message: "Validation failed",
            },
          }));
        } finally {
          setValidatingTags((prev) => {
            const newSet = new Set(prev);
            newSet.delete(tagValue);
            return newSet;
          });
        }
      },
      [validateNarrative],
    );
    // Bulk validation function with truly sequential processing
    const validateMultipleTags = useCallback(
      async (tagValues) => {
        if (!validateNarrative || tagValues.length === 0) return;

        // Set all tags to validating state immediately
        setValidatingTags((prev) => new Set([...prev, ...tagValues]));
        setValidationState((prev) => {
          const newState = { ...prev };
          tagValues.forEach((tag) => {
            newState[tag] = { status: "validating", message: "Validating..." };
          });
          return newState;
        });

        // Process tags ONE BY ONE sequentially
        for (const tagValue of tagValues) {
          try {
            // Wait 50ms between each validation to avoid rate limiting
            if (tagValues.indexOf(tagValue) > 0) {
              await new Promise((resolve) => setTimeout(resolve, 50));
            }

            const result = await validateNarrative(tagValue);

            // Update validation state immediately for this tag
            setValidationState((prev) => ({
              ...prev,
              [tagValue]: {
                status: result.isValid ? "valid" : "invalid",
                message:
                  result.message || (result.isValid ? "Valid" : "Invalid"),
              },
            }));

            // Remove from validating state
            setValidatingTags((prev) => {
              const newSet = new Set(prev);
              newSet.delete(tagValue);
              return newSet;
            });
          } catch (error) {
            console.error(`Validation error for ${tagValue}:`, error);

            setValidationState((prev) => ({
              ...prev,
              [tagValue]: {
                status: "invalid",
                message: "Validation failed",
              },
            }));

            setValidatingTags((prev) => {
              const newSet = new Set(prev);
              newSet.delete(tagValue);
              return newSet;
            });
          }
        }
      },
      [validateNarrative],
    );

    // Cleanup on unmount
    React.useEffect(() => {
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        if (inputValidationRef.current) {
          clearTimeout(inputValidationRef.current);
        }
      };
    }, []);

    // Validate all existing tags when validateNarrative function is available or tags change
    React.useEffect(() => {
      if (validateNarrative && safeValue.length > 0) {
        // Clean up validation states for tags that no longer exist
        setValidationState((prev) => {
          const cleanedState = {};
          safeValue.forEach((tag) => {
            if (prev[tag]) {
              cleanedState[tag] = prev[tag];
            }
          });
          return cleanedState;
        });

        // Clean up validating tags set
        setValidatingTags((prev) => {
          const newSet = new Set();
          prev.forEach((tag) => {
            if (safeValue.includes(tag)) {
              newSet.add(tag);
            }
          });
          return newSet;
        });

        const tagsToValidate = safeValue.filter((tag) => !validationState[tag]);
        if (tagsToValidate.length > 0) {
          validateMultipleTags(tagsToValidate);
        }
      } else if (safeValue.length === 0) {
        // Clear all validation states when no tags exist
        setValidationState({});
        setValidatingTags(new Set());
      }
    }, [validateNarrative, safeValue.length, validateMultipleTags]);

    // Validate current input as user types
    React.useEffect(() => {
      if (inputValue.length >= 7 && validateNarrative) {
        const cleanValue = cleanAndValidateInput(inputValue);

        // Only validate if we don't already have a result for this exact value
        if (
          !currentInputValidation ||
          (currentInputValidation.cleanValue !== cleanValue &&
            !isValidatingCurrentInput)
        ) {
          // Debounce the validation to avoid too many API calls
          if (inputValidationRef.current) {
            clearTimeout(inputValidationRef.current);
          }

          inputValidationRef.current = setTimeout(() => {
            validateCurrentInput(inputValue);
          }, 300);
        }
      } else {
        // Clear validation state for short inputs
        setCurrentInputValidation(null);
        setIsValidatingCurrentInput(false);
      }
    }, [inputValue, validateNarrative]);

    // Add multiple tags function
    const addTags = (tagValues, isPaste = false) => {
      let processedTags;

      if (isPaste) {
        // For paste operations, include ALL non-empty tags regardless of validation
        processedTags = tagValues
          .map((tag) => cleanAndValidateInput(tag))
          .filter((tag) => tag); // Only filter out completely empty tags
      } else {
        // For manual input, keep existing validation
        processedTags = tagValues
          .map((tag) => cleanAndValidateInput(tag))
          .filter((tag) => tag && isValidLength(tag));
      }

      if (processedTags.length === 0) return;

      const newTags = [...safeValue];

      processedTags.forEach((processedValue) => {
        // Check for duplicates if not allowed
        if (!allowDuplicates && newTags.includes(processedValue)) {
          return;
        }

        // Check max tags limit
        if (newTags.length >= maxTags) {
          return;
        }

        newTags.push(processedValue);

        // Trigger validation for the newly added tag
        if (validateNarrative) {
          validateSingleTag(processedValue);
        }
      });

      onChange(newTags);
    };
    // Process input with separator if provided, or handle comma-separated input
    const processInput = (inputText, isPaste = false) => {
      // Clear any existing input error since we're processing
      setInputError(null);
      setAttemptedSubmit(false);
      // Clear current input validation
      setCurrentInputValidation(null);
      setIsValidatingCurrentInput(false);

      let tags = [];

      // Handle comma-separated input (copy-paste mechanism)
      if (inputText.includes(",")) {
        tags = inputText
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
      } else if (separator && inputText.includes(separator)) {
        // Handle custom separator
        tags = inputText
          .split(separator)
          .map((tag) => tag.trim())
          .filter((tag) => tag);
      } else {
        // Handle single tag
        tags = [inputText.trim()];
      }

      // Add all tags at once, passing isPaste flag
      addTags(tags, isPaste);
      setInputValue("");
      setCurrentInputValidation(null);
      setIsValidatingCurrentInput(false);
      if (inputValidationRef.current) {
        clearTimeout(inputValidationRef.current);
      }
    };
    const removeSpecificTag = (tagToRemove) => {
      const newTags = safeValue.filter((tag) => tag !== tagToRemove);
      onChange(newTags);

      // Clean up validation and duplicate states for removed tag
      setValidationState((prev) => {
        const newState = { ...prev };
        delete newState[tagToRemove];
        return newState;
      });

      setDuplicateState((prev) => {
        const newState = { ...prev };
        delete newState[tagToRemove];
        return newState;
      });

      setValidatingTags((prev) => {
        const newSet = new Set(prev);
        newSet.delete(tagToRemove);
        return newSet;
      });

      // Cancel editing if we're removing the tag being edited
      if (safeValue[editingIndex] === tagToRemove) {
        setEditingIndex(null);
        setEditValue("");
      }
    };

    // Validate input attempt (for when user tries to submit invalid input)
    const validateInputAttempt = (inputText) => {
      const cleanInput = cleanAndValidateInput(inputText);

      if (!cleanInput) {
        setInputError("Please enter a value");
        setAttemptedSubmit(true);
        return false;
      }

      if (cleanInput.length < 7) {
        setInputError(`Minimum 7 characters required`);
        setAttemptedSubmit(true);
        return false;
      }

      if (cleanInput.length > 9) {
        setInputError(`Maximum 9 characters allowed`);
        setAttemptedSubmit(true);
        return false;
      }

      // Check for duplicates
      if (checkGlobalDuplicates && checkGlobalDuplicates(cleanInput)) {
        setInputError("This invoice number already exists in another field");
        setAttemptedSubmit(true);
        return false;
      }

      if (!allowDuplicates && safeValue.includes(cleanInput)) {
        setInputError("This item already exists in this field");
        setAttemptedSubmit(true);
        return false;
      }

      return true;
    };

    // Remove tag function
    const removeTag = (indexToRemove) => {
      const tagToRemove = safeValue[indexToRemove];
      const newTags = safeValue.filter((_, index) => index !== indexToRemove);
      onChange(newTags);

      // Clean up validation and duplicate states for removed tag
      setValidationState((prev) => {
        const newState = { ...prev };
        delete newState[tagToRemove];
        return newState;
      });

      setDuplicateState((prev) => {
        const newState = { ...prev };
        delete newState[tagToRemove];
        return newState;
      });

      setValidatingTags((prev) => {
        const newSet = new Set(prev);
        newSet.delete(tagToRemove);
        return newSet;
      });

      // Cancel editing if we're removing the tag being edited
      if (editingIndex === indexToRemove) {
        setEditingIndex(null);
        setEditValue("");
      }
    };

    // Start editing a tag - FIXED: Position cursor instead of selecting all
    const startEditing = (index, e) => {
      e.stopPropagation();
      setEditingIndex(index);
      setEditValue(safeValue[index]);

      // Focus and position cursor at click position
      setTimeout(() => {
        if (editInputRefs.current[index]) {
          const input = editInputRefs.current[index];
          input.focus();

          // Calculate cursor position based on click position
          if (e.detail === 1) {
            // Single click
            // Get click position relative to the input
            const rect = input.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const charWidth = 8; // Approximate character width
            const position = Math.min(
              Math.round(clickX / charWidth),
              input.value.length,
            );
            input.setSelectionRange(position, position);
          } else {
            // Double click - select all
            input.select();
          }
        }
      }, 0);
    };

    // Save edited tag
    const saveEdit = (index) => {
      setEditingValidation(null);
      const oldTag = safeValue[index];
      const processedValue = cleanAndValidateInput(editValue);

      // If edit value is empty, remove the tag
      if (!processedValue) {
        removeTag(index);
        setEditingIndex(null);
        setEditValue("");
        return;
      }

      if (!isValidLength(processedValue)) {
        // Cancel edit if invalid length
        setEditingIndex(null);
        setEditValue("");
        return;
      }

      // Check for duplicates (excluding the current item)
      if (!allowDuplicates) {
        const otherTags = safeValue.filter((_, i) => i !== index);
        if (otherTags.includes(processedValue)) {
          setEditingIndex(null);
          setEditValue("");
          return;
        }
      }

      const newTags = [...safeValue];
      newTags[index] = processedValue;
      onChange(newTags);

      // Always clean up old validation states first
      setValidationState((prev) => {
        const newState = { ...prev };
        delete newState[oldTag];
        if (oldTag !== processedValue) {
          // Also clear any existing validation for new value
          delete newState[processedValue];
        }
        return newState;
      });

      setDuplicateState((prev) => {
        const newState = { ...prev };
        delete newState[oldTag];
        return newState;
      });

      setValidatingTags((prev) => {
        const newSet = new Set(prev);
        newSet.delete(oldTag);
        newSet.delete(processedValue);
        return newSet;
      });

      setEditingIndex(null);
      setEditValue("");

      if (validateNarrative) {
        // Use setTimeout to ensure state updates have completed
        setTimeout(() => {
          validateSingleTag(processedValue);
        }, 0);
      }
    };

    // Cancel editing
    const cancelEdit = () => {
      setEditingIndex(null);
      setEditValue("");
      setEditingValidation(null);
    };

    // Handle key events for main input
    const handleKeyDown = (e) => {
      const processedValue = cleanAndValidateInput(inputValue);

      switch (e.key) {
        case "Enter":
        case "Tab":
        case ",":
          e.preventDefault();
          if (validateInputAttempt(inputValue)) {
            processInput(inputValue);
            setPendingComma(true);
          }
          break;
        case "Backspace":
          // Clear error when user starts deleting
          if (inputError && inputValue.length <= 1) {
            setInputError(null);
            setAttemptedSubmit(false);
          }

          // If input is empty and there are tags, start editing the last tag
          if (!inputValue && safeValue.length > 0) {
            e.preventDefault();
            const lastIndex = safeValue.length - 1;
            const lastTag = safeValue[lastIndex];
            setEditingIndex(lastIndex);
            setEditValue(lastTag);

            setTimeout(() => {
              if (editInputRefs.current[lastIndex]) {
                const input = editInputRefs.current[lastIndex];
                input.focus();
                input.setSelectionRange(lastTag.length, lastTag.length);
              }
            }, 0);
          }
          break;
        case "Escape":
          setInputValue("");
          setInputError(null);
          setAttemptedSubmit(false);
          setCurrentInputValidation(null);
          setIsValidatingCurrentInput(false);
          inputRef.current?.blur();
          break;
      }
    };

    // Handle key events for edit input
    const handleEditKeyDown = (e, index) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveEdit(index);
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancelEdit();
      } else if (e.key === "Backspace" && !editValue) {
        // If the edit input is empty and backspace is pressed, remove the tag
        e.preventDefault();
        removeTag(index);
        // Focus back to main input
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      } else if (
        e.key === "ArrowLeft" &&
        e.target.selectionStart === 0 &&
        index > 0
      ) {
        // Move to previous tag when at the beginning of current tag
        e.preventDefault();
        setEditingIndex(index - 1);
        setEditValue(safeValue[index - 1]);
        setTimeout(() => {
          if (editInputRefs.current[index - 1]) {
            const input = editInputRefs.current[index - 1];
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
          }
        }, 0);
      } else if (
        e.key === "ArrowRight" &&
        e.target.selectionStart === e.target.value.length &&
        index < safeValue.length - 1
      ) {
        // Move to next tag when at the end of current tag
        e.preventDefault();
        setEditingIndex(index + 1);
        setEditValue(safeValue[index + 1]);
        setTimeout(() => {
          if (editInputRefs.current[index + 1]) {
            const input = editInputRefs.current[index + 1];
            input.focus();
            input.setSelectionRange(0, 0);
          }
        }, 0);
      } else if (
        e.key === "ArrowRight" &&
        e.target.selectionStart === e.target.value.length &&
        index === safeValue.length - 1
      ) {
        // Move to main input when at the end of last tag
        e.preventDefault();
        saveEdit(index);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    };

    // Handle input change
    const handleInputChange = (e) => {
      const newValue = e.target.value;
      const cleanValue = cleanAndValidateInput(newValue);

      if (cleanValue.length > 9) {
        return;
      }

      setInputValue(cleanValue);

      // Clear errors when: empty, valid length reached, or user is actively correcting
      if (inputError) {
        if (cleanValue.length === 0 || cleanValue.length >= 7) {
          setInputError(null);
          setAttemptedSubmit(false);
        }
      }
    };

    // Handle edit input change
    // In handleEditChange - this already triggers validation
    const handleEditChange = (e, index) => {
      const newValue = e.target.value;
      const cleanValue = cleanAndValidateInput(newValue);

      if (cleanValue.length > 9) {
        return;
      }

      setEditValue(cleanValue);

      // Clear editing validation for short inputs
      if (cleanValue.length < 7) {
        setEditingValidation(null);
        return;
      }

      // Validate when editing and user reaches 7+ characters
      if (cleanValue.length >= 7 && validateNarrative) {
        // Cancel any existing debounce
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }

        // Set validating state immediately
        setEditingValidation({
          value: cleanValue,
          status: "validating",
          message: "Validating...",
        });

        debounceRef.current = setTimeout(async () => {
          try {
            const result = await validateNarrative(cleanValue);
            setEditingValidation({
              value: cleanValue,
              status: result.isValid ? "valid" : "invalid",
              message: result.message || (result.isValid ? "Valid" : "Invalid"),
            });
          } catch (error) {
            setEditingValidation({
              value: cleanValue,
              status: "invalid",
              message: "Validation failed",
            });
          }
        }, 300);
      }
    };

    // Handle blur event
    const handleBlur = (e) => {
      setIsFocused(false);
      // Only validate and add if user has attempted to submit or if valid
      const processedValue = cleanAndValidateInput(inputValue);
      if (processedValue && isValidLength(processedValue)) {
        processInput(inputValue);
      }
      onBlur?.(e);
    };

    // Handle focus event
    const handleFocus = () => {
      setIsFocused(true);
    };

    // Handle paste event for comma-separated values
    const handlePaste = (e) => {
      const pastedText = e.clipboardData.getData("text");
      if (pastedText.includes(",")) {
        e.preventDefault();
        processInput(pastedText, true);
      }
    };

    // Handle edit blur
    const handleEditBlur = (index) => {
      // Small delay to prevent issues with rapid clicking
      setTimeout(() => {
        if (editingIndex === index) {
          saveEdit(index);
        }
      }, 150);
    };

    // Get color based on validation state and duplicate state
    const getTagColor = (tag) => {
      // Priority: duplicates > validation states > defaults
      if (duplicateState[tag]?.isDuplicate) {
        return "text-orange-600";
      }

      const validation = validationState[tag];

      if (validation) {
        switch (validation.status) {
          case "validating":
            return "text-blue-600";
          case "valid":
            return "text-green-600";
          case "invalid":
            return "text-red-600";
        }
      }

      // Default color - neutral until validated
      return "text-gray-800";
    };

    // Get input text color
    const getInputTextColor = () => {
      if (!inputValue) return "text-gray-900";
      const cleanValue = cleanAndValidateInput(inputValue);

      // Show red only if attempted to submit invalid input
      if (attemptedSubmit && inputError) {
        return "text-red-500";
      }

      // Check for duplicates first
      if (checkGlobalDuplicates && checkGlobalDuplicates(cleanValue)) {
        return "text-orange-600";
      }

      if (!allowDuplicates && safeValue.includes(cleanValue)) {
        return "text-orange-600";
      }

      // Check if currently validating
      if (isValidatingCurrentInput) {
        return "text-blue-500";
      }

      // Check current input validation state
      if (currentInputValidation) {
        switch (currentInputValidation.status) {
          case "valid":
            return "text-green-600";
          case "invalid":
            return "text-red-600";
          case "validating":
            return "text-blue-500";
        }
      }

      // Default color
      return "text-gray-900";
    };

    // IMPROVED: Get edit input text color
    const getEditInputTextColor = (editValue, index) => {
      if (!editValue) return "text-gray-900";

      const cleanValue = cleanAndValidateInput(editValue);
      const originalTag = safeValue[index];

      // Show red for too short (only if user has typed something)
      if (cleanValue.length > 0 && cleanValue.length < 7) {
        return "text-red-500";
      }

      // Show red for too long
      if (cleanValue.length > 9) {
        return "text-red-500";
      }

      // Check for duplicates (excluding current tag being edited)
      if (
        checkGlobalDuplicates &&
        checkGlobalDuplicates(cleanValue) &&
        cleanValue !== originalTag
      ) {
        return "text-orange-600";
      }

      if (!allowDuplicates) {
        const otherTags = safeValue.filter((_, i) => i !== index);
        if (otherTags.includes(cleanValue)) {
          return "text-orange-600";
        }
      }

      if (cleanValue.length >= 7) {
        // Check editing validation state first
        if (editingValidation && editingValidation.value === cleanValue) {
          switch (editingValidation.status) {
            case "validating":
              return "text-blue-500";
            case "valid":
              return "text-green-600";
            case "invalid":
              return "text-red-600";
          }
        }
      }

      return "text-gray-900";
    };

    // Check if there are any invalid tags
    const invalidTagsCount = Object.values(validationState).filter(
      (state) => state.status === "invalid",
    ).length;
    const hasInvalidTags = invalidTagsCount > 5;

    // Clear all invalid tags
    const clearInvalidTags = () => {
      const validTags = safeValue.filter((tag) => {
        const validation = validationState[tag];
        const isDuplicate = duplicateState[tag]?.isDuplicate;
        return validation?.status !== "invalid" && !isDuplicate;
      });
      onChange(validTags);

      // Clean up validation states
      setValidationState((prev) => {
        const newState = {};
        validTags.forEach((tag) => {
          if (prev[tag]) {
            newState[tag] = prev[tag];
          }
        });
        return newState;
      });

      setDuplicateState((prev) => {
        const newState = {};
        validTags.forEach((tag) => {
          if (prev[tag]) {
            newState[tag] = prev[tag];
          }
        });
        return newState;
      });
    };

    // Clear all tags
    const clearAllTags = () => {
      onChange([]);
      setValidationState({});
      setDuplicateState({});
      setValidatingTags(new Set());
      setInputValue("");
      setInputError(null);
      setAttemptedSubmit(false);
      setCurrentInputValidation(null);
      setIsValidatingCurrentInput(false);
      if (inputValidationRef.current) {
        clearTimeout(inputValidationRef.current);
      }
    };

    const getBorderColor = () => {
      const tagBeingEdited =
        editingIndex !== null ? safeValue[editingIndex] : null;

      // Check for ANY invalid states (immediately when validation returns invalid)
      const hasInvalidCurrentInput =
        currentInputValidation?.status === "invalid";
      const hasInvalidEditing = editingValidation?.status === "invalid";
      const hasInvalidTags = Object.entries(validationState).some(
        ([tag, state]) => tag !== tagBeingEdited && state.status === "invalid",
      );
      const hasDuplicates = Object.entries(duplicateState).some(
        ([tag, state]) => tag !== tagBeingEdited && state.isDuplicate,
      );

      // Show red immediately if ANY invalid state exists
      if (
        hasInvalidCurrentInput ||
        hasInvalidEditing ||
        hasInvalidTags ||
        hasDuplicates
      ) {
        return "border-red-500";
      }

      // Check for ANY valid states (immediately when validation returns valid)
      const hasValidCurrentInput = currentInputValidation?.status === "valid";
      const hasValidEditing = editingValidation?.status === "valid";
      const hasValidTags = Object.entries(validationState).some(
        ([tag, state]) => tag !== tagBeingEdited && state.status === "valid",
      );

      // Show green immediately if ANY valid state exists AND no invalid states
      if (hasValidCurrentInput || hasValidEditing || hasValidTags) {
        return "border-green-500";
      }

      const isValidating =
        validatingTags.size > 0 ||
        isValidatingCurrentInput ||
        editingValidation?.status === "validating";

      if (isFocused || isValidating) return "border-primary";

      return "border-input";
    };

    return (
      <div className="w-full">
        <div
          ref={containerRef}
          className={cn(
            "min-h-[2.5rem] w-full rounded-md border bg-background px-3 py-2 text-base",
            "cursor-text transition-colors duration-200",
            getBorderColor(),
            disabled && "cursor-not-allowed bg-muted opacity-50",
            className,
          )}
          onClick={handleContainerClick}
        >
          <div className="flex flex-wrap items-center">
            {/* Render existing tags as editable text spans with commas */}
            {safeValue.map((tag, index) => {
              const isDuplicate = duplicateState[tag]?.isDuplicate;
              const isEditing = editingIndex === index;
              const validation = validationState[tag];
              const hasError = validation?.status === "invalid" || isDuplicate;
              const editInputColor = isEditing
                ? getEditInputTextColor(editValue)
                : "";

              return (
                <React.Fragment key={`fragment-${tag}-${index}`}>
                  <div className="flex items-center group">
                    {isEditing ? (
                      <input
                        key={`edit-${tag}-${index}`}
                        ref={(el) => (editInputRefs.current[index] = el)}
                        type="text"
                        value={editValue}
                        onChange={handleEditChange}
                        onKeyDown={(e) => handleEditKeyDown(e, index)}
                        onBlur={() => handleEditBlur(index)}
                        className={cn(
                          "border-none bg-transparent outline-none text-base font-medium px-0 py-0",
                          "focus:ring-0 focus:border-none focus:outline-none",
                          editInputColor,
                        )}
                        style={{
                          width: `${Math.max(editValue.length * 8 + 8, 60)}px`,
                        }}
                        autoComplete="off"
                        spellCheck="false"
                      />
                    ) : (
                      <span
                        key={`${tag}-${index}`}
                        className={cn(
                          "cursor-text text-sm font-medium hover:bg-gray-50 transition-colors px-1 py-0.5 rounded-sm",
                          getTagColor(tag),
                          disabled && "opacity-50 cursor-not-allowed",
                        )}
                        title={
                          isDuplicate
                            ? duplicateState[tag].message
                            : validationState[tag]?.message
                        }
                        onClick={(e) => !disabled && startEditing(index, e)}
                        onDoubleClick={(e) =>
                          !disabled && startEditing(index, e)
                        }
                      >
                        {tag}
                      </span>
                    )}

                    {!isEditing && !disabled && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSpecificTag(tag);
                        }}
                        className={cn(
                          "ml-1 hover:bg-gray-100 transition-colors p-0.5 rounded-sm cursor-pointer",
                          hasError
                            ? "text-red-400 hover:text-red-600 hover:bg-red-50"
                            : "text-gray-400 hover:text-gray-600",
                        )}
                        title="Remove tag"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>

                  {/* Add comma after each tag except the last one, or when editing */}
                  {!isEditing && index < safeValue.length - 1 && (
                    <span className="text-gray-400 text-sm mr-1">,</span>
                  )}
                </React.Fragment>
              );
            })}

            {/* Show pending comma when user just pressed comma */}
            {pendingComma && safeValue.length > 0 && (
              <span className="text-gray-400 text-sm mr-1 animate-pulse">
                ,
              </span>
            )}

            {/* Inline input */}
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onPaste={handlePaste}
              disabled={disabled}
              placeholder={safeValue.length === 0 ? placeholder : ""}
              className={cn(
                "border-none bg-transparent outline-none text-base h-auto p-0 shadow-none",
                "placeholder:text-muted-foreground min-w-0 flex-1",
                "focus:ring-0 focus:ring-offset-0 focus:border-none focus:shadow-none focus:outline-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none",
                disabled && "cursor-not-allowed",
                getInputTextColor(),
                fieldsLength > 1 && canRemoveField && handleRemoveField
                  ? "pr-8"
                  : "pr-2",
              )}
              style={{
                width: inputValue || safeValue.length === 0 ? "auto" : "60px",
                minWidth: safeValue.length === 0 ? "100%" : "60px",
                boxShadow: "none !important",
              }}
              autoComplete="off"
              spellCheck="false"
            />

            {/* Remove field button */}
            {fieldsLength > 1 && canRemoveField && handleRemoveField && (
              <button
                type="button"
                onClick={() => handleRemoveField(fieldIndex)}
                className="text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors p-1 rounded-sm ml-auto"
                disabled={disabled}
                title="Remove this field"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
        {!disabled && (
          <div className="mt-1 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Press Enter once done adding an invoice number to continue.
            </div>

            {/* Clear buttons - only visible when there are invalid tags */}
            {hasInvalidTags && safeValue.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearInvalidTags}
                  className="text-xs text-red-600 hover:text-red-700 hover:underline font-medium transition-colors"
                >
                  Clear Invalid
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={clearAllTags}
                  className="text-xs text-gray-600 hover:text-gray-700 hover:underline font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        )}

        {showInlineFieldMessage && (
          <div className="overflow-y-auto">
            {/* Error messages - FIXED: Now shows input errors */}
            {(fieldState?.error || inputError) && (
              <div className="mt-1 text-xs text-destructive flex items-center gap-1">
                {inputError || fieldState.error?.message}
              </div>
            )}
          </div>
        )}

        {/* Invalid tags summary as wrapped comma-separated list */}
        {showInlineInvalidSummary && (() => {
          const committedInvalidTags = safeValue.filter(
            (tag) =>
              validationState[tag]?.status === "invalid" ||
              duplicateState[tag]?.isDuplicate,
          );

          const hasCommittedInvalid = committedInvalidTags.length > 0;
          const hasCurrentInvalid =
            currentInputValidation?.status === "invalid" &&
            inputValue.length >= 7;

          // Only show box if there's at least one committed invalid tag
          if (!hasCommittedInvalid) return null;

          return (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center gap-2 text-sm font-medium text-red-800 mb-2">
                <AlertTriangle className="h-4 w-4" />
                Invalid invoice(s):
              </div>

              <div className="text-sm text-red-700 flex flex-wrap gap-y-1">
                {[
                  ...committedInvalidTags,
                  // Show current invalid input only if there's already at least one committed invalid tag
                  ...(hasCurrentInvalid
                    ? [cleanAndValidateInput(inputValue)]
                    : []),
                ].map((tag, index, array) => (
                  <span key={tag}>
                    {tag}
                    {index < array.length - 1 && ","}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    );
  },
);

TagInput.displayName = "TagInput";
export default TagInput;
