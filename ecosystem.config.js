module.exports = {
  apps: [
    {
      name: "sudoku",
      script: "npm",
      args: "run prod",
      instances: "1",
      exec_mode: "fork",
    },
    {
      name: "sudoku-server",
      script: "npm",
      args: "--prefix ../sudoku-server run prod",
      instances: "1",
      exec_mode: "fork",
    },
  ],
};
