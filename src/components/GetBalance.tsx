import { Grid, TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const GetBalance = () => {
  const [address, setAddress] = useState("");

  return (
    <Grid item xs={12}>
      <Box alignItems="center" display="flex">
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          sx={{ whiteSpace: "nowrap", marginLeft: "1rem" }}
          variant="contained"
        >
          Get Balance
        </Button>
      </Box>
    </Grid>
  );
};

export default GetBalance;
