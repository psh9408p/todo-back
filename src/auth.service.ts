import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "./user.store";
import dotenv from "dotenv";

dotenv.config();

export async function registerUser(email: string, password: string) {
  const existing = users.find((u) => u.email === email);
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  return { message: "User registered" };
}

export async function loginUser(email: string, password: string) {
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ email }, process.env.JWT_SECRET || "default", {
    expiresIn: "7d",
  });

  return { accessToken: token };
}
