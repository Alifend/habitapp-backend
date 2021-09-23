import express from "express";
import userRouter from "./routes/userRoutes.js";
import bodyParser from "body-parser";

const app = express();
// Middlewares
app.use(bodyParser.json());
app.use("/users", userRouter);
//

app.get("/", async (req, res) => {
  res.send("This is an API");
});

app.listen(4000);
