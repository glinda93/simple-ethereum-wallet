import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import AccountsContext from "../contexts/AccountsContext";
import ContractContext from "../contexts/ContractContext";
import { getBalance } from "../helpers/wallet";

const BalanceTable = () => {
  const accounts = useContext(AccountsContext);
  const contract = useContext(ContractContext);
  const [balances, setBalances] = useState<Record<string, any>>({});

  const getBalances = useCallback(() => {
    const promises = accounts.map((account) =>
      getBalance(contract, account, accounts[0])
    );
    Promise.all(promises).then((results) => {
      const newBalances: Record<string, any> = {};
      accounts.forEach((account, index) => {
        newBalances[account] = results[index];
      });
      setBalances(newBalances);
    });
  }, [accounts, contract]);

  useEffect(() => {
    getBalances();
  }, [getBalances]);

  return (
    <Grid item xs={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account}>
              <TableCell>{account}</TableCell>
              <TableCell>{balances[account] ?? ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default BalanceTable;
