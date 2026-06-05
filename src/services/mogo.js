const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDB is ready");
});

mongoose.connection.on("error", (error) => {
  console.error("Database Error", error);
});

async function connectToMongo() {
  await mongoose.connect(process.env.MONGO_URL);
}

module.exports = { connectToMongo };
