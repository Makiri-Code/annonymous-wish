const cors = require("cors");
const express = require("express");
const morgarn = require("morgan");
const path = require("path");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");

const wishesRoute = require("./routes/wishes.route");
const errorController = require("./utils/error");

const app = express();

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "https://annonymous-wish-mf84n6vzt-makiri-codes-projects.vercel.app",
      ],
    },
  }),
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://annonymous-wish-bjxb.vercel.app",
      "https://annonymous-wish-mf84n6vzt-makiri-codes-projects.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));

app.use(express.static(path.join(__dirname, "..", "dist")));

app.use(morgarn("common"));

app.use("/wishes", limiter, wishesRoute);
app.use(errorController);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

module.exports = app;
