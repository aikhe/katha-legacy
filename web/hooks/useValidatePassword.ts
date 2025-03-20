import { useEffect, useState } from "react";
import { maskInput } from "@/util/maskInput";
import { AuthPassFields } from "@/types/auth";

const useValidatePassword = (form: any, field: AuthPassFields) => {
  const [fieldState, setFieldState] = useState({
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

    toggleFieldDisplay(field, fieldState.fieldArray, fieldState.showPlainText);
  }, [fieldState.showPlainText]);

  const handleOnInput = (e: any) => {
    const updatedArray = maskInput(
      e,
      fieldState.fieldArray,
      fieldState.showPlainText,
    );
    setFieldState((prev) => ({ ...prev, fieldArray: updatedArray }));

    form.setValue(
      field === "password" ? "password" : "confirmPassword",
      updatedArray.join(""),
      {
        shouldValidate: true,
      },
    );

    if (validatePassword && field === "password") {
      form.setValue("confirmPassword", form.getValues("confirmPassword"), {
        shouldValidate: true,
      });
    }
  };

  const toggleShowPass = () => {
    setFieldState((prev) => ({
      ...prev,
      showPlainText: !fieldState.showPlainText,
    }));
  };

  return {
    fieldState,
    handleOnInput,
    toggleShowPass,
    validatePassword,
    isValidatePassword,
  };
};

export const useValidatePass = (form: any, field: AuthPassFields) => {
  const {
    fieldState,
    handleOnInput,
    toggleShowPass,
    validatePassword,
    isValidatePassword,
  } = useValidatePassword(form, field);

  return {
    passFieldState: fieldState,
    handlePassInput: handleOnInput,
    toggleShowPassInput: toggleShowPass,
    validatePassword,
    isValidatePassword,
  };
};

export const useValidateConfirmPass = (form: any, field: AuthPassFields) => {
  const { fieldState, handleOnInput, toggleShowPass } = useValidatePassword(
    form,
    field,
  );

  return {
    confirmPassFieldState: fieldState,
    handleConfirmPassInput: handleOnInput,
    toggleShowConfirmPassInput: toggleShowPass,
  };
};
