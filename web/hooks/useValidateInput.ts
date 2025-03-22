import { useEffect, useState } from "react";
import { maskInput } from "@/util/maskInput";
import { AuthPassFields } from "@/types/auth";
import { Path, PathValue, FieldValues, UseFormReturn } from "react-hook-form";

type FieldState = {
  fieldArray: string[];
  showPlainText: boolean;
};

const useValidatePassword = <T extends FieldValues>(
  methods: UseFormReturn<T>,
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
      (field === "password" ? "password" : "confirmPassword") as Path<T>,
      updatedArray.join("") as PathValue<T, Path<T>>,
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

export const useValidateEmail = <T extends { email: string } & FieldValues>(
  methods: UseFormReturn<T>,
) => {
  const handleEmailInput = (
    e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    methods.setValue(
      "email" as Path<T>,
      target.value as PathValue<T, Path<T>>,
      {
        shouldValidate: true,
      },
    );
  };
  return handleEmailInput;
};

export const useValidatePass = <T extends FieldValues>(
  methods: UseFormReturn<T>,
) => {
  const [validatePassword, isValidatePassword] = useState(false);

  const { fieldState, handleOnInput, toggleShowPass } = useValidatePassword(
    methods,
    "password",
  );

  const handlePassInput = (e: React.FormEvent<HTMLInputElement>) => {
    handleOnInput(e);

    if (validatePassword) {
      methods.setValue(
        "confirmPassword" as Path<T>,
        methods.getValues("confirmPassword" as Path<T>),
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

export const useValidateConfirmPass = <T extends FieldValues>(
  methods: UseFormReturn<T>,
) => {
  const { fieldState, handleOnInput, toggleShowPass } = useValidatePassword(
    methods,
    "confirmPassword",
  );

  return {
    confirmPassFieldState: fieldState,
    handleConfirmPassInput: handleOnInput,
    toggleShowConfirmPassInput: toggleShowPass,
  };
};
