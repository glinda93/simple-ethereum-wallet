import React from "react";
import { Grid } from "@mui/material";
import { EthereumStatus } from "../hooks/useEthereum";
import LoadingButton from "@mui/lab/LoadingButton";

type HeaderProps = {
  ethereumStatus?: EthereumStatus;
  onConnect?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  ethereumStatus = "initial",
  onConnect = () => {},
}) => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        mt: 4,
      }}
    >
      <h1 style={{ marginTop: 0, marginBottom: 0, flex: 1 }}>
        Please use Rinkeby Test Network
      </h1>
      {ethereumStatus !== "loaded" && (
        <LoadingButton
          loadingPosition="start"
          loading={ethereumStatus === "pending"}
          variant="contained"
          onClick={onConnect}
        >
          Connect
        </LoadingButton>
      )}
    </Grid>
  );
};

export default Header;
