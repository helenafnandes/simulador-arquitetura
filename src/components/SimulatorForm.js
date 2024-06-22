import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const defaultInstructions = `LOAD R1, 0(R2)
ADD R3, R1, R4
STORE 0(R2), R3
SUB R5, R1, R6`;

const SimulatorForm = ({ onSubmit }) => {
  const [architecture, setArchitecture] = useState("scalar");
  const [threading, setThreading] = useState("SMT");
  const [instructions, setInstructions] = useState(defaultInstructions);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      architecture,
      threading,
      instructions: instructions.split("\n"),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">Simulator Configuration</Typography>
      <Box sx={{ mb: 2 }}>
        <Select
          fullWidth
          value={architecture}
          onChange={(e) => setArchitecture(e.target.value)}
          displayEmpty
        >
          <MenuItem value="scalar">Scalar</MenuItem>
          <MenuItem value="superscalar">Superscalar</MenuItem>
        </Select>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Select
          fullWidth
          value={threading}
          onChange={(e) => setThreading(e.target.value)}
          displayEmpty
        >
          <MenuItem value="SMT">SMT</MenuItem>
          <MenuItem value="IMT">IMT</MenuItem>
          <MenuItem value="BMT">BMT</MenuItem>
          <MenuItem value="None">None</MenuItem>
        </Select>
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Instructions (one per line)"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Simulate
      </Button>
    </Box>
  );
};

export default SimulatorForm;
