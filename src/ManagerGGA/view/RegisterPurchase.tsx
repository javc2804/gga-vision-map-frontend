import { AddOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const RegisterPurchase = () => {
  return (
    <Box>
      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "#17dbeb",
          ":hover": { backgroundColor: "#17dbeb", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
};

export default RegisterPurchase;
