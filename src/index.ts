import express from "express";
import authRoutes from "./auth.controller";

const app = express();
app.use(express.json()); // JSON 바디 파싱
app.use("/auth", authRoutes); // /auth/register, /auth/login

app.listen(3000, () => {
  console.log("✅ Server listening on http://localhost:3000");
});

console.log(authRoutes, "Hello, TypeScript!");
