import express from "express";
import cors from "cors";
import "dotenv/config";
import startDB from "startup/db";
import { auth, user, group, expense } from "routes";
import path from 'path';

(async () => await startDB())();
const app = express();
app.use(express.json());
app.use(cors());

const __dirname = path.resolve();

if (!process.env.JWT_PRIVATE_KEY) {
  console.error("FATAL ERROR: JWT_PRIVATE_KEY is not defined.");
  process.exit(1);
}

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/group", group);
app.use("/api/expense", expense);

const PORT = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, '../SplitBill-frontend-main/build')));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});

export default server;
