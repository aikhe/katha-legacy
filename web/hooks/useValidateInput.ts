import { useEffect, useState } from "react";
import { maskInput } from "@/util/maskInput";
import { AuthPassFields } from "@/types/auth";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

interface FormMethods {
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

interface FieldState {
  fieldArray: string[];
  showPlainText: boolean;
}

const useValidatePassword = (form: any, field: AuthPassFields) => {
  const [fieldState, setFieldState] = useState<FieldState>({
    fieldArray: [],
    showPlainText: false,
  });

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

  const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
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
  };
};

export const useValidateEmail = (form: any) => {
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("email", e.target.value, {
      shouldValidate: true,
    });
  };

  return handleEmailInput;
};

export const useValidatePass = (form: any) => {
  const [validatePassword, isValidatePassword] = useState(false);

  const { fieldState, handleOnInput, toggleShowPass } = useValidatePassword(
    form,
    "password",
  );

  const handlePassInput = (e: React.FormEvent<HTMLInputElement>) => {
    handleOnInput(e);

    if (validatePassword) {
      form.setValue("confirmPassword", form.getValues("confirmPassword"), {
        shouldValidate: true,
      });
    }
  };

  return {
    passFieldState: fieldState,
    handlePassInput,
    toggleShowPassInput: toggleShowPass,
    validatePassword,
    isValidatePassword,
  };
};

export const useValidateConfirmPass = (form: any) => {
  const { fieldState, handleOnInput, toggleShowPass } = useValidatePassword(
    form,
    "confirmPassword",
  );

  return {
    confirmPassFieldState: fieldState,
    handleConfirmPassInput: handleOnInput,
    toggleShowConfirmPassInput: toggleShowPass,
  };
};
