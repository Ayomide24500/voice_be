import { Document, Schema, Types, model } from "mongoose";

interface iUser {
  name: string;
  password: string;
  voiceKey: string;

  email: string;
  emails: Array<{}>;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    name: { type: String },
    voiceKey: { type: String },
    password: { type: String },
    email: { type: String },
    emails: [{ type: String }],
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
