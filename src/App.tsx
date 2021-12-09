import React, { useCallback, useEffect, useState } from "react";
import Web3Context, { web3 } from "./contexts/Web3Context";
import AccountsContext from "./contexts/AccountsContext";
import BalanceTable from "./components/BalanceTable";
import "./App.css";

function App() {
  const [accounts, setAccounts] = useState<string[]>([]);

  const getAccounts = useCallback(async () => {
    const fetchedAccounts = await web3.eth.getAccounts();
    setAccounts(fetchedAccounts);
  }, []);

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  return (
    <Web3Context.Provider value={web3}>
      <AccountsContext.Provider value={accounts}>
        <BalanceTable />
      </AccountsContext.Provider>
    </Web3Context.Provider>
  );
}

export default App;
