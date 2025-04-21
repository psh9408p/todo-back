import express from "express";
import dotenv from "dotenv";
import authRoutes from "./auth/controller";
import todoRoutes from "./todos/controller";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes); // 👈 할 일 API 등록

app.listen(3000, () => {
  console.log("🚀 Server ready on http://localhost:3000");
});
