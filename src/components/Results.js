import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const Results = ({ results }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Simulation Results</Typography>
      <Paper sx={{ p: 2 }}>
        <Typography>IPC: {results.ipc}</Typography>
        <Typography>Total Cycles: {results.cycles}</Typography>
        <Typography>Bubble Cycles: {results.bubble_cycles}</Typography>
      </Paper>
    </Box>
  );
};

export default Results;
