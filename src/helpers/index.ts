import { web3 } from "../contexts/Web3Context";

// convert string to bytes32 that remixIDE accepts
export const bytes32 = (string: string) => {
  const hex = web3.utils.asciiToHex(string);
  return "0x" + hex.replace("0x", "").padStart(64, "0");
};
