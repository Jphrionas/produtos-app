import './config/environment';

import app from './app';

const port = process.env.PORT;
app.listen(port, () => console.log(`Api is running on ${port}`))

const gracefullShutdown = err => {
  console.log("Gracefull shutdown");

  const exitCode = err instanceof Error ? -1 : 0;
  setTimeout(() => process.exit(exitCode), 500);
}

process.on('SIGINT', gracefullShutdown);
process.on('SIGTERM', gracefullShutdown);
process.on('uncaughtException', gracefullShutdown)
process.on('unhandledRejection', gracefullShutdown);