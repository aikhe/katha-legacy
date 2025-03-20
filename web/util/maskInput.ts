/**
 * Handles password masking and state management
 *
 * @param event - The input event
 * @param currentValue - Current array of characters
 * @param showPlaintext - Whether to show plaintext or masked characters
 * @returns Updated array of characters
 */
export const maskInput = (
  event: React.FormEvent<HTMLInputElement>,
  currentValue: string[],
  showPlaintext = false,
): string[] => {
  const input = event.currentTarget;
  const newValue = [...currentValue]; // Create a copy to avoid mutating the original
  const cursorPosition = input.selectionStart || 0;
  const previousLength = currentValue.length;
  const currentLength = input.value.length;
  const diff = currentLength - previousLength;

  // Handle text addition
  if (diff > 0) {
    const addedChars = input.value
      .substring(cursorPosition - diff, cursorPosition)
      .split("");
    newValue.splice(cursorPosition - diff, 0, ...addedChars);

    // Mask the input if not showing plaintext
    if (!showPlaintext) {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const maskedValue = "•".repeat(newValue.length);
        input.value = maskedValue;
        input.setSelectionRange(cursorPosition, cursorPosition);
      });
    }
  }
  // Handle text deletion
  else if (diff < 0) {
    newValue.splice(cursorPosition, Math.abs(diff));
  }

  return newValue;
};
