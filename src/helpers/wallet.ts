import { Contract } from "../contexts/ContractContext";

export const getBalance = async (
  contract: Contract,
  address: string,
  caller: string
) => {
  const result = await contract.methods
    .getBalance(address)
    .call({ from: caller });
  return parseInt(result);
};
