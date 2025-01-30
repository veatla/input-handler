import {
  special_keys,
  inputModifierKeys,
} from "../constants/keys";
// import { wrapper } from "../main";

export const isInputKey = (key: string): boolean => {
  return !special_keys.includes(key) || inputModifierKeys.includes(key);
};

export const isFunctionalKey = (key: string): boolean => {
  if (/F([0-9])+/.test(key)) return true;
  return false;
};

// let selection_start = null as null | number;
// let selRange: Range | null;
