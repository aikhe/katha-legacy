export const maskInput = (
  e: React.FormEvent<HTMLInputElement>,
  fieldArray: string[],
  showPlainText?: boolean,
) => {
  const target = e.target as HTMLInputElement;
  const numAdded = target.value.length - fieldArray.length;
  console.log("numAdded", numAdded);

  const selectionStart = target.selectionStart ?? 0;

  if (numAdded > 0) {
    const charsAdded = target.value.slice(
      selectionStart - numAdded,
      selectionStart,
    );
    console.log("ChardAdded", charsAdded);

    console.log(`${selectionStart - numAdded}, ${target.selectionStart}`);

    fieldArray.splice(selectionStart - numAdded, 0, ...charsAdded);

    if (!showPlainText) {
      setTimeout(() => {
        const cursorPos = target.selectionStart;

        target.value = "•".repeat(target.value.length);

        target.setSelectionRange(cursorPos, cursorPos);
      }, 500);
    }
  } else if (numAdded <= 0) {
    fieldArray.splice(selectionStart, Math.abs(numAdded));
  }

  console.log(fieldArray);
  console.log(fieldArray.join(""));

  return fieldArray;
};
