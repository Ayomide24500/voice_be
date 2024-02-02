import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/email";
import userModel from "../model/wordModel";
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, emails, voiceKey } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      password: hashed,
      emails,
      voiceKey,
    });

    return res.status(201).json({
      msg: "User created successfully",
      status: 201,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error creating user",
      status: 404,
    });
  }
};

export const sendEmails = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    console.log(req.params);
    console.log(userID);
    const { voiceKey } = req.body;

    const user: any = await userModel.findById(userID);

    console.log(user);
    if (user && voiceKey === user.voiceKey) {
      for (const i of user.emails) {
        console.log(i);

        sendEmail(i);
      }

      return res.status(200).json({
        msg: "User created successfully",
        status: 201,
        data: user,
      });
    } else {
      return res.status(404).json({
        msg: "User not found",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      msg: "Error creating user",
      status: 404,
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      msg: "User created successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error creating user",
      status: 404,
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(200).json({
        msg: "User created successfully",
        status: 200,
        data: user,
      });
    } else {
      return res.status(404).json({
        msg: "Error getting user",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      msg: "Error creating user",
      status: 404,
    });
  }
};
