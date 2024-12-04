import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

app.use(logger);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚗`);

app.listen(PORT, handleListening);
