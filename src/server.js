const app = require("./app");
const http = require("http");
const { connectToMongo } = require("./services/mogo");
require("dotenv").config();
const PORT = process.env.PORT;
const server = http.createServer(app);

async function startServer() {
  await connectToMongo();
  server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
}

startServer();
