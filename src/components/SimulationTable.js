import React from "react";
import { Box, Typography } from "@mui/material";
import ProcessBlock from "./ProcessBlock";

const SimulationTable = ({ columns, processes }) => {
  const randomizeProcessPosition = (processes) => {
    const positions = ["decode", "execute", "writeBack"];
    return processes.map((process) => ({
      process: process.name,
      //position: positions[Math.floor(Math.random() * positions.length)],
      position: positions[0],
    }));
  };

  const randomizedProcesses = randomizeProcessPosition(processes);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
      }}
    >
      {columns.map((column, index) => (
        <Box key={index} sx={{ margin: "0 16px" }}>
          <Typography variant="h6" align="center">
            {column.label}
          </Typography>
          {randomizedProcesses
            .filter((p) => p.position === column.id)
            .map((p, i) => (
              <ProcessBlock key={i} process={p.process} />
            ))}
        </Box>
      ))}
    </Box>
  );
};

export default SimulationTable;
