import { Request, Response, NextFunction, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createTodo, getUserTodos } from "./service";

// Express의 Request 타입을 확장
declare module "express" {
  interface Request {
    user?: {
      email: string;
      [key: string]: any;
    };
  }
}

const router = Router();

// POST /todos - 할 일 등록
router.post("/", authMiddleware, (req: Request, res: Response) => {
  const content = req.body.content;
  const userEmail = req.user?.email;
  if (!userEmail) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const todo = createTodo(userEmail, content);
  res.status(201).json(todo);
});

// GET /todos - 내 할 일 목록 조회
router.get("/", authMiddleware, (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  if (!userEmail) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const myTodos = getUserTodos(userEmail);
  res.json(myTodos);
});

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "No token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "default"
    ) as JwtPayload & { email: string };
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
}

export default router;
