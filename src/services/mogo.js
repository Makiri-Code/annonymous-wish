// const mongoose = require("mongoose");

// mongoose.connection.once("open", () => {
//   console.log("MongoDB is ready");
// });

// mongoose.connection.on("error", (error) => {
//   console.error("Database Error", error);
// });

// async function connectToMongo() {
//   await mongoose.connect(process.env.MONGO_URL);
// }

// module.exports = { connectToMongo };
const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToMongo() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URL).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connectToMongo };
