import { createContext } from "react";
import { web3 } from "./Web3Context";

export type Contract = InstanceType<typeof web3["eth"]["Contract"]>;

//@ts-ignore
const ContractContext = createContext<Contract>();

export default ContractContext;
