const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const config = require("./config");
const passport = require("passport");
const pool = require("./config/mysql");

const apiRouter = require("./routes");
require("./passport")();

const app = express();
app.set("port", config.port || 3000);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.cookieSecret));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: config.cookieSecret,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use("/api", apiRouter);
app.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL 연결 성공");
    connection.release(); // 연결 해제
    res.status(200).send("MySQL 연결 성공");
  } catch (error) {
    console.error("MySQL 연결 실패:", error);
    res.status(500).send("MySQL 연결 실패");
  }
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 는 잘못된 접근입니다 O.O`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
});

app.listen(config.port, () => {
  console.log(config.port, "번 포트에서 대기 중");
});
