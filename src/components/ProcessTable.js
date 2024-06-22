import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ProcessTable = ({ processes }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Process State</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Process</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Current Instruction</TableCell>
              <TableCell>Cycle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processes.map((process, index) => (
              <TableRow key={index}>
                <TableCell>{process.name}</TableCell>
                <TableCell>{process.status}</TableCell>
                <TableCell>{process.currentInstruction}</TableCell>
                <TableCell>{process.cycle}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProcessTable;
