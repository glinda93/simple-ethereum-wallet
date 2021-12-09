import { web3 } from "../contexts/Web3Context";

export const bytes32 = (string: string) => {
  const hex = web3.utils.asciiToHex(string);
  return hex.padStart(64, "0");
};
