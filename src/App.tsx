import { useCallback, useEffect, useState } from "react";
import { AbiItem } from "web3-utils";
import { Grid } from "@mui/material";
import Web3Context, { web3 } from "./contexts/Web3Context";
import AccountsContext from "./contexts/AccountsContext";
import ContractContext from "./contexts/ContractContext";

import {
  WalletAddress,
  SimpleEthereumWalletJsonABI as SimpleEthereumWallet,
} from "./constants";
import Header from "./components/Header";
import EthereumDisabled from "./components/EthereumDisabled";
import BalanceTable from "./components/BalanceTable";
import GetBalance from "./components/GetBalance";
import useEthereum from "./hooks/useEthereum";
import "./App.css";

function App() {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [contract] = useState(
    new web3.eth.Contract(SimpleEthereumWallet as AbiItem[], WalletAddress)
  );

  const getAccounts = useCallback(async () => {
    const fetchedAccounts = await web3.eth.getAccounts();
    setAccounts(fetchedAccounts);
  }, []);

  const [ethereumStatus, connectToEthereum] = useEthereum();

  useEffect(() => {
    if (ethereumStatus === "loaded") {
      getAccounts();
    }
  }, [getAccounts, ethereumStatus]);

  if (ethereumStatus === "disabled") {
    return <EthereumDisabled />;
  }

  return (
    <Web3Context.Provider value={web3}>
      <AccountsContext.Provider value={accounts}>
        <ContractContext.Provider value={contract}>
          <Grid container spacing={4} sx={{ px: 4 }}>
            <Header
              ethereumStatus={ethereumStatus}
              onConnect={connectToEthereum}
            />
            <BalanceTable />
            <GetBalance />
          </Grid>
        </ContractContext.Provider>
      </AccountsContext.Provider>
    </Web3Context.Provider>
  );
}

export default App;
