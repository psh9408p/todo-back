import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./auth/controller";
import todoRoutes from "./todos/controller";

dotenv.config();
const app = express();
app.use(express.json());

// CORS 미들웨어 추가
app.use(
  cors({
    origin: "http://localhost:3001", // 프론트엔드 주소 (Next.js는 보통 3000이 아닌 다른 포트 사용)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes); // 👈 할 일 API 등록

app.listen(3000, () => {
  console.log("🚀 Server ready on http://localhost:3000");
});
