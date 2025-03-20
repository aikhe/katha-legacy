import { useEffect, useState } from "react";
import { maskInput } from "@/util/maskInput";
import { AuthPassFields } from "@/types/auth";

const useValidatePassword = (form: any) => {
  const [passState, setPassState] = useState({
    fieldArray: [] as string[],
    showPlainText: false,
  });
  const [confirmPassState, setConfirmPassState] = useState({
    fieldArray: [] as string[],
    showPlainText: false,
  });
  const [validatePassword, isValidatePassword] = useState(false);

  useEffect(() => {
    const toggleFieldDisplay = (
      fieldId: string,
      fieldArray: string[],
      showPlainText: boolean,
    ) => {
      const field = document.getElementById(fieldId) as HTMLInputElement;
      if (field) {
        field.value = showPlainText
          ? fieldArray.join("")
          : "•".repeat(fieldArray.length);
      }
    };

    toggleFieldDisplay(
      "pass-field",
      passState.fieldArray,
      passState.showPlainText,
    );
    toggleFieldDisplay(
      "confirm-pass-field",
      confirmPassState.fieldArray,
      confirmPassState.showPlainText,
    );
  }, [passState.showPlainText, confirmPassState.showPlainText]);

  const handlePassInput = (e: any) => {
    const updatedArray = maskInput(
      e,
      passState.fieldArray,
      passState.showPlainText,
    );
    setPassState((prev) => ({ ...prev, fieldArray: updatedArray }));

    console.log("pass array:", passState.fieldArray);
    form.setValue("password", updatedArray.join(""), { shouldValidate: true });

    if (validatePassword) {
      form.setValue("confirmPassword", confirmPassState.fieldArray.join(""), {
        shouldValidate: true,
      });
    }
  };

  const handleConfirmPassInput = (e: any) => {
    const updatedArray = maskInput(
      e,
      confirmPassState.fieldArray,
      confirmPassState.showPlainText,
    );
    setConfirmPassState((prev) => ({ ...prev, fieldArray: updatedArray }));

    console.log("confirm pass array:", confirmPassState.fieldArray);

    form.setValue("confirmPassword", updatedArray.join(""), {
      shouldValidate: true,
    });
  };

  const toggleShowPass = (field: AuthPassFields) => {
    if (field === "pass") {
      setPassState((prev) => ({
        ...prev,
        showPlainText: !passState.showPlainText,
      }));
    } else {
      setConfirmPassState((prev) => ({
        ...prev,
        showPlainText: !confirmPassState.showPlainText,
      }));
    }
  };

  return {
    handlePassInput,
    handleConfirmPassInput,
    toggleShowPass,
    passState,
    confirmPassState,
    validatePassword,
    isValidatePassword,
  };
};

export default useValidatePassword;
