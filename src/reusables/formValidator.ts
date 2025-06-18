/**
 * Validates and sanitizes a given input string to ensure it contains only numeric characters.
 *
 * @param value - The input string to be validated and sanitized.
 * @returns A sanitized string containing only numeric characters.
 */
export const useNumericInput = (value: string): string => {
  const regex = /^[0-9]*$/;

  if (!regex.test(value)) {
    value = value.replace(/[^0-9]/g, "");
  }

  return value;
};

export const useStringInput = (value: string) => {
  if (value.trim() !== "") {
    return value;
  }

  return "";
};
