import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

function detectDependency(inst1, inst2) {
  // Função para extrair os registradores usados em uma instrução
  function extractRegisters(inst) {
    // Regex para encontrar tokens que correspondam a registradores (R1, R2, ..., R31)
    let regex = /R\d+/g;
    console.log(inst.match(regex) || []);
    return inst.match(regex) || []; // Retorna um array com os registradores encontrados na instrução
  }

  // Função para verificar dependência RAW (Read After Write)
  function checkRAW(inst1Regs, inst2Regs) {
    // RAW ocorre se há um registrador de escrita na primeira instrução
    // que é lido pela segunda instrução
    console.log(inst1Regs[0], inst2Regs.slice(1));
    if (inst2Regs.slice(1).includes(inst1Regs[0])) {
      return true;
    }
    return false;
  }

  // Função para verificar dependência WAR (Write After Read)
  function checkWAR(inst1Regs, inst2Regs) {
    // WAR ocorre se há um registrador de leitura na segunda instrução
    // que é escrito pela primeira instrução
    if (inst1Regs.slice(1).includes(inst2Regs[0])) {
      return true;
    }
    return false;
  }

  // Função para verificar dependência WAW (Write After Write)
  function checkWAW(inst1Regs, inst2Regs) {
    // WAW ocorre se há um registrador de escrita em ambas as instruções
    if (inst1Regs[0] === inst2Regs[0]) {
      return true;
    }
    return false;
  }

  // Extrair os registradores de cada instrução
  let inst1Regs = extractRegisters(inst1);
  let inst2Regs = extractRegisters(inst2);

  // Verificar as três dependências
  if (checkRAW(inst1Regs, inst2Regs)) {
    return "Dependência RAW encontrada";
  } else if (checkWAR(inst1Regs, inst2Regs)) {
    return "Dependência WAR encontrada";
  } else if (checkWAW(inst1Regs, inst2Regs)) {
    return "Dependência WAW encontrada";
  } else {
    return "Sem dependência encontrada";
  }
}

// Exemplos de instruções RISC-V
let inst1, inst2, result;

// Exemplo 1: RAW
inst1 = "sub R1, R2, R5";
inst2 = "add R3, R1, R4";
result = detectDependency(inst1, inst2);
console.log(result); // Saída esperada: "Dependência RAW encontrada"

// Exemplo 2: WAR
inst1 = "add R3, R1, R4";
inst2 = "sub R1, R2, R5";
result = detectDependency(inst1, inst2);
console.log(result); // Saída esperada: "Dependência WAR encontrada"

// Exemplo 3: WAW
inst1 = "add R1, R2, R3";
inst2 = "sub R1, R4, R5";
result = detectDependency(inst1, inst2);
console.log(result); // Saída esperada: "Dependência WAW encontrada"

// Exemplo 4: Sem dependência
inst1 = "add R3, R1, R2";
inst2 = "sub R4, R1, R5";
result = detectDependency(inst1, inst2);
console.log(result); // Saída esperada: "Sem dependência encontrada"

inst1 = "LOAD R1, 0(R10)";
inst2 = "sub R4, R1, R5";
result = detectDependency(inst1, inst2);
console.log(result); // Saída esperada: "RAW"
