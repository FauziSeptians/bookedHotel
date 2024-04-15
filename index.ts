import express, { Express, Request, Response } from "express";
import cors from "cors";
import { UserController } from "./src/controllers/user-controllers";

const app: Express = express();
const PORT: number = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server running on " + PORT);
});

app.get("/api/crete/users", UserController.Register)


