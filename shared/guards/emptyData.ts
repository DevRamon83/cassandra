import {
  invalidType,
  nullish,
  unmatchedType,
  empty,
} from "../constants/errors.ts";
import { allowedTypes } from "../constants/atomics.ts";

const isPromiscuous = (value: unknown, type: string): boolean => {
  const valueType = typeof value;

  if (valueType !== "object" && valueType !== type) return true;

  if (Array.isArray(value) && type !== "array") return true;

  if (valueType === "object" && !Array.isArray(value) && type !== "object")
    return true;

  return false;
};

export const emptyData = (
  value: unknown,
  type: string,
  scope: string,
): boolean => {
  if (!allowedTypes.includes(type)) {
    console.error(`${invalidType} ${scope}`);
    return true;
  }

  if (value === null || value === undefined) {
    console.error(`${nullish} ${scope}`);
    return true;
  }

  if (isPromiscuous(value, type)) {
    console.error(`${unmatchedType} ${scope}`);
    return true;
  }

  let response = false;

  switch (type) {
    case "string":
      response = typeof value === "string" && value.trim().length === 0;
      break;
    case "boolean":
      break;
    case "number":
      break;
    case "object":
      response = Object.keys(value).length === 0;
      break;
    case "array":
      response = Array.isArray(value) && value.length === 0;
      break;
    default:
      break;
  }

  if (response) console.error(`${empty} ${scope}`);

  return response;
};
