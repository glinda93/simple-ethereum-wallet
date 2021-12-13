import { useCallback, useState } from "react";

export type EthereumStatus =
  | "initial"
  | "disabled"
  | "pending"
  | "error"
  | "loaded";

const useEthereum = () => {
  const [state, setState] = useState<EthereumStatus>(
    window.ethereum ? "initial" : "disabled"
  );

  const connect = useCallback(() => {
    setState("pending");
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then(() => setState("loaded"))
      .catch((e: any) => {
        console.error(e);
        setState("error");
      });
  }, []);

  return [state, connect] as const;
};

export default useEthereum;
