import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" fontWeight="bold">
        404
      </Typography>

      <Typography variant="h5">
        Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;