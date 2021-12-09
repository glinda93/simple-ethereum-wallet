import { createContext } from "react";
import Web3 from "web3";

export const web3 = new Web3(Web3.givenProvider || "ws:localhost:8545");

const Web3Context = createContext(web3);

export default Web3Context;
