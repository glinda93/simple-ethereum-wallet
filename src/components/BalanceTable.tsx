import { useCallback, useContext, useEffect } from "react";
import Web3Context from "../contexts/Web3Context";

const BalanceTable = () => {
  const web3 = useContext(Web3Context);

  const getAccount = useCallback(async () => {
    const accounts = await web3.eth.getAccounts();
  }, [web3]);

  useEffect(() => {
    getAccount();
  }, [getAccount]);

  return <p>Balance Table</p>;
};

export default BalanceTable;
