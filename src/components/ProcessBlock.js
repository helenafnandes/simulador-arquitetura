import React from "react";
import { Box, Typography } from "@mui/material";

const ProcessBlock = ({ process }) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "4px",
        padding: "8px",
        margin: "4px 0",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
      }}
    >
      <Typography>{process}</Typography>
    </Box>
  );
};

export default ProcessBlock;
