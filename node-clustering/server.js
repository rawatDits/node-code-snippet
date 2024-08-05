const cluster = require('cluster');
const os = require('os');
const express = require('express');

const numCPUs = os.cpus().length; 


if (cluster.isPrimary) {
  console.log(`Master process  running in ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); //creating worker_processes
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} 
else {
  const app = express();
  const PORT = 3000;
  app.get('/', (req, res)=>{
    return res.json({message: `Hello from express server ${process.pid} `})
  })

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
}
