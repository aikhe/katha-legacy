import { useEffect, useState } from "react";
import { maskInput } from "@/util/maskInput";
import { AuthPassFields } from "@/types/auth";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface FieldState {
  fieldArray: string[];
  showPlainText: boolean;
}

const useValidatePassword = <TFormValues extends FieldValues>(
  methods: UseFormReturn<TFormValues>,
  field: AuthPassFields,
) => {
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
      const input = document.getElementById(fieldId) as HTMLInputElement;
      if (input) {
        input.value = showPlainText
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

    methods.setValue(
      field === "password" ? "password" : ("confirmPassword" as any),
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

export const useValidateEmail = <TFormValues extends FieldValues>(
  methods: UseFormReturn<TFormValues>,
) => {
  const handleEmailInput = (
    e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>,
  ) => {
    const target = e.target as HTMLInputElement;

    methods.setValue("email" as any, target.value as any, {
      shouldValidate: true,
    });
  };

  return handleEmailInput;
};

export const useValidatePass = <TFormValues extends FieldValues>(
  form: UseFormReturn<TFormValues>,
) => {
  const [validatePassword, isValidatePassword] = useState(false);

  const { fieldState, handleOnInput, toggleShowPass } = useValidatePassword(
    form,
    "password",
  );

  const handlePassInput = (e: React.FormEvent<HTMLInputElement>) => {
    handleOnInput(e);

    if (validatePassword) {
      form.setValue(
        "confirmPassword" as any,
        form.getValues("confirmPassword" as any),
        {
          shouldValidate: true,
        },
      );
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

export const useValidateConfirmPass = <TFormValues extends FieldValues>(
  form: UseFormReturn<TFormValues>,
) => {
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
