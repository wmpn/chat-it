import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";

interface LoginPayloadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const body: LoginPayloadType = req.body;
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }

      let jwtPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };

      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("token----: ", token);
      return res
        .status(200)
        .json({ user: { ...findUser, token: `Bearer ${token}` } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong, Please try again" });
    }
  }
}

export default AuthController;
