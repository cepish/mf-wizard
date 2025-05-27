import express, { Request, Response } from "express";
import entitiesRouter from "./routes/entities";

const app = express();
const PORT = 9000;

app.use(express.json());
app.use("/entities", entitiesRouter);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
