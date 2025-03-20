export const maskInput = (e: any, fieldArray: any, showPlainText?: boolean) => {
  const numAdded = e.target.value.length - fieldArray.length;
  console.log("numAdded", numAdded);

  if (numAdded > 0) {
    const charsAdded = e.target.value.slice(
      e.target.selectionStart - numAdded,
      e.target.selectionStart,
    );
    console.log("ChardAdded", charsAdded);
    console.log(
      `${e.target.selectionStart - numAdded}, ${e.target.selectionStart}`,
    );

    fieldArray.splice(e.target.selectionStart - numAdded, 0, ...charsAdded);

    if (!showPlainText) {
      setTimeout(() => {
        const cursorPos = e.target.selectionStart;

        e.target.value = "•".repeat(e.target.value.length);

        e.target.setSelectionRange(cursorPos, cursorPos);
      }, 500);
    }
  } else if (numAdded < 0) {
    fieldArray.splice(e.target.selectionStart, Math.abs(numAdded));
  }
  console.log(fieldArray);
  console.log(fieldArray.join(""));

  return fieldArray;
};
