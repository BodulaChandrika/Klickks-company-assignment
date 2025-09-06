const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
