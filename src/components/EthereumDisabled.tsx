import { Grid } from "@mui/material";

const EthereumDisabled = () => (
  <Grid
    container
    spacing={4}
    sx={{ paddingLeft: "4rem", paddingRight: "4rem" }}
  >
    <Grid item>
      <p>This wallet requires MetaMask. Please install it and try again.</p>
    </Grid>
  </Grid>
);

export default EthereumDisabled;
