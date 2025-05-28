import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import entitiesRouter from "./routes/entities";

dotenv.config();
const app = express();

const { NODE_ENV, PORT = 9000 } = process.env;
const isDev = NODE_ENV === "development";

app.use(express.json());
app.use("/entities", entitiesRouter);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Render server is running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT} in ${NODE_ENV} mode`);
  if (isDev) {
    console.log(`Open http://localhost:${PORT}/ and start hacking!`);
  }
});
