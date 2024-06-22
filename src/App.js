import React, { useState } from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import SimulatorForm from "./components/SimulatorForm";
import ProcessTable from "./components/ProcessTable";
import SimulationTable from "./components/SimulationTable";
import Results from "./components/Results";

const simulate = (data) => {
  // Simulação baseada na arquitetura e suporte de threading
  const { architecture, threading, instructions } = data;

  // Inicializar métricas
  let ipc = 0;
  let cycles = 0;
  let bubble_cycles = 0;

  // Simular processos (exemplo simples)
  let processes = instructions.map((inst, index) => ({
    name: `Process ${index + 1}`,
    status: "Executing",
    currentInstruction: inst,
    cycle: 0,
  }));

  // Exemplo de lógica de simulação
  processes.forEach((process, index) => {
    // Contabilizar ciclos (exemplo simples)
    cycles += 1;
    if (
      process.currentInstruction.startsWith("LOAD") ||
      process.currentInstruction.startsWith("STORE")
    ) {
      bubble_cycles += 1;
    }
    // Atualizar processo (exemplo simples)
    process.status = "Completed";
    process.cycle = cycles;
  });

  ipc = instructions.length / cycles;

  return {
    results: { ipc, cycles, bubble_cycles },
    processes,
  };
};

function analyzeDependencies(instructions) {
  let dependencies = {
    RAW: [],
    WAR: [],
    WAW: [],
  };

  for (let i = 0; i < instructions.length; i++) {
    let currentInstruction = instructions[i];
    let currentRegWrite = null;

    // Extract destination register of the current instruction
    if (currentInstruction.includes("STORE")) {
      // STORE instruction format: STORE offset(base), Rd
      let parts = currentInstruction.split(",");
      currentRegWrite = parts[1].trim(); // Rd
    } else {
      // Other instructions format: OP Rd, Rs, Rt
      let parts = currentInstruction.split(",");
      currentRegWrite = parts[0].split(" ")[1].trim(); // Rd
    }

    // Check RAW (Read After Write) dependencies
    for (let j = i - 1; j >= 0; j--) {
      let previousInstruction = instructions[j];
      let previousRegRead = null;

      // Extract source register(s) of the previous instruction
      if (previousInstruction.includes("LOAD")) {
        // LOAD instruction format: LOAD offset(base), Rs
        let parts = previousInstruction.split(",");
        previousRegRead = parts[1].trim(); // Rs
      } else if (previousInstruction.includes("STORE")) {
        // STORE instruction format: STORE offset(base), Rs
        let parts = previousInstruction.split(",");
        previousRegRead = parts[1].trim(); // Rs
      } else {
        // Other instructions format: OP Rd, Rs, Rt
        let parts = previousInstruction.split(",");
        previousRegRead = parts
          .slice(1)
          .map((part) => part.trim())
          .join(", "); // Rs, Rt
      }

      // Detect RAW (Read After Write) dependencies
      if (
        currentRegWrite &&
        previousRegRead &&
        currentRegWrite === previousRegRead
      ) {
        dependencies.RAW.push(`Instruction ${j + 1} -> Instruction ${i + 1}`);
      }
    }

    // Check WAR (Write After Read) dependencies
    for (let j = i - 1; j >= 0; j--) {
      let previousInstruction = instructions[j];
      let previousRegWrite = null;

      // Extract destination register of the previous instruction
      if (previousInstruction.includes("STORE")) {
        // STORE instruction format: STORE offset(base), Rd
        let parts = previousInstruction.split(",");
        previousRegWrite = parts[1].trim(); // Rd
      } else {
        // Other instructions format: OP Rd, Rs, Rt
        let parts = previousInstruction.split(",");
        previousRegWrite = parts[0].split(" ")[1].trim(); // Rd
      }

      // Detect WAR (Write After Read) dependencies
      if (
        currentRegWrite &&
        previousRegWrite &&
        currentRegWrite === previousRegWrite
      ) {
        dependencies.WAR.push(`Instruction ${j + 1} -> Instruction ${i + 1}`);
      }
    }

    // Check WAW (Write After Write) dependencies
    for (let j = i - 1; j >= 0; j--) {
      let previousInstruction = instructions[j];
      let previousRegWrite = null;

      // Extract destination register of the previous instruction
      if (previousInstruction.includes("STORE")) {
        // STORE instruction format: STORE offset(base), Rd
        let parts = previousInstruction.split(",");
        previousRegWrite = parts[1].trim(); // Rd
      } else {
        // Other instructions format: OP Rd, Rs, Rt
        let parts = previousInstruction.split(",");
        previousRegWrite = parts[0].split(" ")[1].trim(); // Rd
      }

      // Detect WAW (Write After Write) dependencies
      if (
        currentRegWrite &&
        previousRegWrite &&
        currentRegWrite === previousRegWrite
      ) {
        dependencies.WAW.push(`Instruction ${j + 1} -> Instruction ${i + 1}`);
      }
    }
  }

  return dependencies;
}

// Example usage:
let instructions = ["ADD R1, R2, R3", "SUB R5, R1, R6"];

let result = analyzeDependencies(instructions);
console.log("RAW Dependencies:", result.RAW);
console.log("WAR Dependencies:", result.WAR);
console.log("WAW Dependencies:", result.WAW);

const App = () => {
  const [results, setResults] = useState(null);
  const [processes, setProcesses] = useState([]);

  const handleSimulate = (data) => {
    const simulationResults = simulate(data);
    setResults(simulationResults.results);
    setProcesses(simulationResults.processes);
  };

  const columns = [
    { id: "decode", label: "Decodificação" },
    { id: "execute", label: "Execução" },
    { id: "writeBack", label: "Write-back" },
  ];

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography variant="h3" component="h1" gutterBottom>
        Multithreading Simulator
      </Typography>
      <SimulatorForm onSubmit={handleSimulate} />
      {processes.length > 0 && (
        <>
          <SimulationTable columns={columns} processes={processes} />
          <ProcessTable processes={processes} />
        </>
      )}
      {results && <Results results={results} />}
    </Container>
  );
};

export default App;
