import { Application, Request, Response } from "express";
import word from "./router/wordRouter";
export const mainApp = (app: Application) => {
  try {
    app.use("/", word);
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Voice speech platform",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error loading",
        });
      }
    });
  } catch (error) {
    return error;
  }
};
